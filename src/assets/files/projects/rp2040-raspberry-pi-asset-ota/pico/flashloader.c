//****************************************************************************
// Copyright 2021 Richard Hulme
//
// SPDX-License-Identifier: BSD-3-Clause
//
// Flashloader for the RP2040
//
// If there is no new application to be flashed (according to the watchdog
// scratch registers), the flashloader will simply transfer control to the
// existing application starting in the erase block following the flashloader.
// This is the normal case.
//
// If the watchdog scratch registers are correctly set, the flashloader will
// replace the existing application with the new one stored in the location
// provided and then reboot the processor.
//
// If the existing application is invalid, the flashloader will check
// each erase block for a valid update image and flash that if successful.
//
// If all else fails (application is invalid and no update image can be found)
// the flashloader will drop back to bootrom bootloader.

#include <stdint.h>
#include "hardware/regs/addressmap.h"
#include "hardware/regs/m0plus.h"
#include "hardware/structs/watchdog.h"
#include "hardware/clocks.h"
#include "hardware/pll.h"
#include "hardware/xosc.h"
#include "hardware/resets.h"
#include "hardware/dma.h"
#include "hardware/flash.h"
#include "hardware/watchdog.h"
#include "pico/bootrom.h"
#include "pico/binary_info.h"
#include "flashloader.h"

bi_decl(bi_program_version_string("1.10"));

#if !PICO_FLASH_SIZE_BYTES
    #error PICO_FLASH_SIZE_BYTES not defined!
#endif

extern void* __APPLICATION_START;

//****************************************************************************
// We don't normally want to link against pico_stdlib as that pulls in lots of
// other stuff we don't need here and we end up at just under 8k before we've
// even started.
// Sometimes though it *is* helpful to use pico_stdlib for checking weird
// errors aren't because of some missing initialisation here so uncomment this
// define to make the necessary changes here but don't forget to change the
// start address for the application in the linker script!
//#define USE_PICO_STDLIB

#define flashoffset(x) (((uint32_t)x) - XIP_BASE)
#define bl2crc(x)      (*((uint32_t*)(((uint32_t)(x) + 0xfc))))

static const uint32_t  sStart = XIP_BASE + (uint32_t)&__APPLICATION_START;

// The maximum number of times the flashloader will try to flash an image
// before it gives up and boots in the bootrom bootloader
static const uint32_t  sMaxRetries = 3;

// Nothing else is running on the system, so it doesn't matter which
// DMA channel we use
static const uint8_t sDMAChannel = 0;

// Buffer to store a page's worth of data for flashing.
// Must be aligned to a 256 byte boundary to allow use as a DMA ring buffer
static uint8_t sPageBuffer[256] __attribute__ ((aligned(256)));


#ifndef USE_PICO_STDLIB
//****************************************************************************
// These functions are normally provided as part of pico_stdlib so we have to
// provide them here if not we're not using it.
void exit(int ret)
{
    (void)ret;
    while(true)
        tight_loop_contents();
}

void panic(const char* fmt,...)
{
    (void)fmt;
    while(true)
        tight_loop_contents();
}

void hard_assertion_failure(void)
{
    while(true)
        tight_loop_contents();
}

//****************************************************************************
// Provide our own assert function to prevent the default version pulling
// in 'printf' functions in debug builds
void __assert_func(const char *filename,
                   int line,
                   const char *assert_func,
                   const char *expr)
{
    (void)filename;
    (void)line;
    (void)assert_func;
    (void)expr;

    __breakpoint();

    while(true)
        tight_loop_contents();
}
#endif

//****************************************************************************
// Calculate the CRC32 (no reflection, no final XOR) of a block of data.
// This makes use of the DMA sniffer to calculate the CRC for us.  Speed is
// not really a huge issue as most of the time we just need to check the
// boot2 image is valid (252 bytes) but using DMA ought to be faster than
// looping over the data without a lookup table and is certainly a lot smaller
// than the lookup table.
uint32_t crc32(const void *data, size_t len, uint32_t crc)
{
    uint8_t dummy;

    dma_channel_config c = dma_channel_get_default_config(sDMAChannel);
    channel_config_set_transfer_data_size(&c, DMA_SIZE_8);
    channel_config_set_read_increment(&c, true);
    channel_config_set_write_increment(&c, false);
    channel_config_set_sniff_enable(&c, true);

    // Turn on CRC32 (non-bit-reversed data)
    dma_sniffer_enable(sDMAChannel, 0x00, true);
    dma_hw->sniff_data = crc;

    dma_channel_configure(
        sDMAChannel,
        &c,
        &dummy,
        data,
        len,
        true    // Start immediately
    );

    dma_channel_wait_for_finish_blocking(sDMAChannel);

    return(dma_hw->sniff_data);
}

//****************************************************************************
// Prepare DMA channel to read a page (256 bytes) worth of data into the
// page buffer starting from the given address.
// The copying will be triggered by calling 'copyPage'
void copyPageInit(const void* src)
{
    dma_channel_config c = dma_channel_get_default_config(sDMAChannel);
    channel_config_set_transfer_data_size(&c, DMA_SIZE_32);
    channel_config_set_read_increment(&c, true);
    channel_config_set_write_increment(&c, true);
    channel_config_set_sniff_enable(&c, true);
    channel_config_set_ring(&c, true, 8); // (log2(256) == 8)

    // Turn on CRC32 (non-bit-reversed data)
    dma_sniffer_enable(sDMAChannel, 0x00, true);
    dma_hw->sniff_data = 0xffffffff;

    dma_channel_configure(
        sDMAChannel,
        &c,
        sPageBuffer,
        src,
        256 / 4,
        false    // Do not start immediately
    );
}

//****************************************************************************
// Copy the next page of data to the page buffer and return the updated CRC32
uint32_t copyPage()
{
    dma_channel_start(sDMAChannel);
    dma_channel_wait_for_finish_blocking(sDMAChannel);
    return(dma_hw->sniff_data);
}

//****************************************************************************
// Start the main application if its boot2 image is valid.
// Will not return unless the image is invalid
int startMainApplication()
{
    if(crc32((const void*)sStart, 252, 0xffffffff) == bl2crc(sStart))
    {
        // Main application appears to be OK so we can map the application's
        // vector table and jump to the start of its code

        // First make sure we don't get retriggered
        if((watchdog_hw->scratch[0] == FLASH_MAGIC1) ||
           (watchdog_hw->scratch[0] == ~FLASH_MAGIC1))
        {
            watchdog_hw->scratch[0] = 0;
        }

        // Hold DMA block in reset again (in case the application doesn't
        // need DMA and doesn't want to waste power)
        reset_block(RESETS_RESET_DMA_BITS);

        asm volatile (
        "mov r0, %[start]\n"
        "ldr r1, =%[vtable]\n"
        "str r0, [r1]\n"
        "ldmia r0, {r0, r1}\n"
        "msr msp, r0\n"
        "bx r1\n"
        :
        : [start] "r" (sStart + 0x100), [vtable] "X" (PPB_BASE + M0PLUS_VTOR_OFFSET)
        :
        );
    }

    // We will only return if the main application couldn't be started
    return 0;
}

//****************************************************************************
// Flash the main application using the provided image.
void flashFirmware(const tFlashHeader* header, uint32_t eraseLength)
{
    uint32_t crc = 0;
    uint32_t offset = 256;

    // Start the watchdog and give us 500ms for each erase/write cycle.
    // This should be more than enough time but in case anything happens,
    // we'll reset and try again.
    watchdog_reboot(0, 0, 500);

    // Erase the target memory area
    uint32_t start = flashoffset(sStart);

    for(uint32_t sectors = eraseLength / FLASH_SECTOR_SIZE; sectors > 0; sectors--)
    {
        flash_range_erase(start, FLASH_SECTOR_SIZE);
        start += FLASH_SECTOR_SIZE;
        watchdog_update();
    }

    // Write everything except the first page.  If there's any kind
    // of power failure during writing, this will prevent anything
    // trying to boot the partially flashed image

    // Get total number of pages - 1 (because we're flashing the first page
    // separately)
    uint32_t pages = ((header->length - 1) >> 8);

    // Prepare the DMA channel for copying
    copyPageInit(header->data + offset);

    while(pages > 0)
    {
        // Reset the watchdog counter
        watchdog_update();

        // Copy the page to a RAM buffer so we're not trying to read from
        // flash whilst writing to it
        crc = copyPage();
        flash_range_program(flashoffset(sStart + offset),
                            sPageBuffer,
                            256);
        offset += 256;
        pages--;
    }

    // Reset the watchdog counter
    watchdog_update();

    // Check that everything so far has been written correctly
    if(crc == crc32(&header->data[256], offset - 256, 0xffffffff))
    {
        // Now flash the first page which is the boot2 image with CRC.
        copyPageInit(header->data);
        crc = copyPage();

        flash_range_program(flashoffset(sStart),
                            sPageBuffer,
                            256);

        // Reset the watchdog counter
        watchdog_update();

        if(crc == crc32(header->data, 256, 0xffffffff))
        {
            // Invalidate the start of the flash image to prevent it being
            // picked up again (prevents cyclic flashing if the image is bad)
            flash_range_erase(flashoffset(header), 4096);

            // Indicate to the application that it has been updated
            watchdog_hw->scratch[0] = FLASH_APP_UPDATED;
        }
    }

    // Disable the watchdog
    hw_clear_bits(&watchdog_hw->ctrl, WATCHDOG_CTRL_ENABLE_BITS);
}

//****************************************************************************
// Configure one of either clk_ref or clk_sys.
//
// This is mostly lifted from clock_configure with some code removed that
// doesn't apply to clk_ref or clk_sys and using a fixed divisor
void configClock(enum clock_index clk_index, uint32_t src, uint32_t auxsrc)
{
    clock_hw_t *clock = &clocks_hw->clk[clk_index];

    clock->div = 0x100; // divisor == 1.00

    if(src == CLOCKS_CLK_SYS_CTRL_SRC_VALUE_CLKSRC_CLK_SYS_AUX)
    {
        hw_clear_bits(&clock->ctrl, CLOCKS_CLK_REF_CTRL_SRC_BITS);
        while(!(clock->selected & 1u))
            tight_loop_contents();
    }

    // Set aux mux first, and then glitchless mux
    hw_write_masked(&clock->ctrl,
                    (auxsrc << CLOCKS_CLK_SYS_CTRL_AUXSRC_LSB),
                    CLOCKS_CLK_SYS_CTRL_AUXSRC_BITS);

    hw_write_masked(&clock->ctrl,
                    src << CLOCKS_CLK_REF_CTRL_SRC_LSB,
                    CLOCKS_CLK_REF_CTRL_SRC_BITS);
    while(!(clock->selected & (1u << src)))
        tight_loop_contents();
}

//****************************************************************************
// Use the external oscillator as the clock reference to gain a bit of speed!
void initClock()
{
    // Start tick in watchdog
    watchdog_start_tick(XOSC_MHZ);

    clocks_hw->resus.ctrl = 0;

    xosc_init();

    // Before we touch PLLs, switch sys and ref cleanly away from their aux sources.
    hw_clear_bits(&clocks_hw->clk[clk_sys].ctrl, CLOCKS_CLK_SYS_CTRL_SRC_BITS);
    while (clocks_hw->clk[clk_sys].selected != 0x1)
        tight_loop_contents();
    hw_clear_bits(&clocks_hw->clk[clk_ref].ctrl, CLOCKS_CLK_REF_CTRL_SRC_BITS);
    while (clocks_hw->clk[clk_ref].selected != 0x1)
        tight_loop_contents();

    pll_init(pll_sys, 1, 1500 * MHZ, 6, 2);

    configClock(clk_ref,
                CLOCKS_CLK_REF_CTRL_SRC_VALUE_XOSC_CLKSRC,
                0); // No aux mux

    configClock(clk_sys,
                CLOCKS_CLK_SYS_CTRL_SRC_VALUE_CLKSRC_CLK_SYS_AUX,
                CLOCKS_CLK_SYS_CTRL_AUXSRC_VALUE_CLKSRC_PLL_SYS);
}

//****************************************************************************
int main(void)
{
    const tFlashHeader* header;
    uint32_t eraseLength = 0;

    uint32_t scratch = watchdog_hw->scratch[0];
    uint32_t image   = watchdog_hw->scratch[1];

    // Use xosc, which will give us a speed boost
    initClock();

    // Take DMA block out of reset so we can use it to calculate CRCs
    unreset_block_wait(RESETS_RESET_DMA_BITS);

    if((scratch == FLASH_MAGIC1) && ((image & 0xfff) == 0) && (image > sStart))
    {
        // Invert the magic number (so we know we've been here) and
        // initialise the retry counter
        watchdog_hw->scratch[0] = ~FLASH_MAGIC1;
        watchdog_hw->scratch[2] = 0;
    }
    else
    if(scratch == ~FLASH_MAGIC1)
        watchdog_hw->scratch[2]++;
    else
    if(!startMainApplication())
    {
        // Tried and failed to start the main application so try to find
        // an update image
        image = sStart + 0x1000;

        // In case there are any problems during flashing, make it look like
        // an update was requested so that the retry mechanism is correctly
        // initialised.
        watchdog_hw->scratch[0] = ~FLASH_MAGIC1;
        watchdog_hw->scratch[1] = image;
        watchdog_hw->scratch[2] = 0;
    }

    while(image < (XIP_BASE + PICO_FLASH_SIZE_BYTES))
    {
        header = (const tFlashHeader*)image;

        if((header->magic1 == FLASH_MAGIC1) &&
           (header->magic2 == FLASH_MAGIC2) &&
           (crc32(header->data, header->length, 0xffffffff) == header->crc32) &&
           (crc32(header->data, 252, 0xffffffff) == bl2crc(header->data)))
        {
            // Round up erase length to next 4k boundary
            eraseLength = (header->length + 4095) & 0xfffff000;

            // Looks like we've found a valid image but only use it if we
            // are sure that it won't get clobbered when we erase the flash
            // before programming.
            if((sStart + eraseLength) < (uint32_t)header)
                break;
            else
                eraseLength = 0;
        }

        image += 0x1000;
    }

    // If we've found a new, valid image, go ahead and flash it!
    if((eraseLength != 0) && (watchdog_hw->scratch[2] < sMaxRetries))
    {
        flashFirmware(header, eraseLength);

        // Reboot into the new image
        watchdog_reboot(0, 0, 50);

        while(true)
            tight_loop_contents();
    }

    // Something's gone wrong.  The main application is corrupt and/or
    // there was a problem with the update image (or it couldn't be found).

    // If we were originally explicitly triggered by a watchdog reset, try
    // to start the normal application since we didn't before
    if((scratch == FLASH_MAGIC1) || (scratch == ~FLASH_MAGIC1))
        startMainApplication();

    // Otherwise go to the bootrom bootloader as a last resort
    reset_usb_boot(0, 0);
}
