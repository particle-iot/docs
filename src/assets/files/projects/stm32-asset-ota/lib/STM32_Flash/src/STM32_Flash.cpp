/*
 * Library to flash an asset to an STM32 microcontroller using UART, BOOT0 and RESET pins
 */

#define LOG_CHECKED_ERRORS 1
#include "STM32_Flash.h"

// STM32 communication parameters
const auto BAUD_RATE = 115200;

const auto COMMAND_TIMEOUT = 1000;
const auto ERASE_FLASH_TIMEOUT = 1000;
const auto WRITE_BLOCK_TIMEOUT = 1000;

// STM32 bootloader commands
const uint8_t GET_INFO = 0x00;
const uint8_t WRITE_MEMORY = 0x31;
const uint8_t ERASE_FLASH = 0x43;
const uint8_t ERASE_FLASH_EXTENDED = 0x44;
const uint8_t ENTER_BOOTLOADER = 0x7F;
const uint8_t ACK = 0x79;

// STM32 memory map
const uint32_t FLASH_START = 0x08000000;

bool useExtendedErase = false;

void setupStm32(pin_t boot0Pin, pin_t resetPin);
int performFlashSteps(ApplicationAsset& asset, pin_t boot0Pin, pin_t resetPin, uint32_t options);
int enterBootloader(pin_t boot0Pin, pin_t resetPin, uint32_t options);
void resetStm32(pin_t resetPin, uint32_t options);
void exitBootloader(pin_t boot0Pin, pin_t resetPin, uint32_t options);
int getInfo();
int eraseFlash();
int flashBinary(ApplicationAsset& asset);
int writeBlock(uint32_t address, uint8_t* data, uint16_t size);
int sendCommand(uint8_t command, uint16_t timeout = COMMAND_TIMEOUT);
int waitForAck(uint8_t command, int timeout = COMMAND_TIMEOUT);

int flashStm32Binary(ApplicationAsset& asset, pin_t boot0Pin, pin_t resetPin, uint32_t options) {
  setupStm32(boot0Pin, resetPin);
  int ret = performFlashSteps(asset, boot0Pin, resetPin, options);
  exitBootloader(boot0Pin, resetPin, options);
  return ret;
}

void setupStm32(pin_t boot0Pin, pin_t resetPin) {
  // Set the GPIO pins as output
  pinMode(boot0Pin, OUTPUT);
  pinMode(resetPin, OUTPUT);

  // Initialize the UART
  // The STM32 bootloader expects even parity
  Serial1.begin(BAUD_RATE, SERIAL_PARITY_EVEN);
}

int performFlashSteps(ApplicationAsset& asset, pin_t boot0Pin, pin_t resetPin, uint32_t options) {
  CHECK(enterBootloader(boot0Pin, resetPin, options));
  CHECK(getInfo());
  CHECK(eraseFlash());
  CHECK(flashBinary(asset));
  return SYSTEM_ERROR_NONE;
}

int enterBootloader(pin_t boot0Pin, pin_t resetPin, uint32_t options) {
  LOG(INFO, "Resetting STM32 into bootloader mode");

  // Set BOOT0 pin to enter the bootloader mode
  digitalWrite(boot0Pin, (options & STM32_BOOT_NONINVERTED) ? HIGH : LOW);
  delay(1);

  // Reset the STM32
  resetStm32(resetPin, options);

  delay(10);

  // Send the bootloader start command
  Serial1.write(ENTER_BOOTLOADER);

  // Wait to get acknowledgement
  for (int i = 0; i < 100; i++) {
    waitFor(Serial1.available, 100);
    if (Serial1.available()) {
      auto resp = Serial1.read();
      if (resp == ACK) {
        LOG(INFO, "STM32 in bootloader mode");
        return SYSTEM_ERROR_NONE;
      } else {
        LOG(INFO, "Ignoring unexpected response from STM32: 0x%02x", resp);
      }
    }
  }
  return SYSTEM_ERROR_TIMEOUT;
}

void resetStm32(pin_t resetPin, uint32_t options) {
  digitalWrite(resetPin, (options & STM32_RESET_NONINVERTED) ? LOW : HIGH);
  delay(1);
  digitalWrite(resetPin, (options & STM32_RESET_NONINVERTED) ? HIGH : LOW);
  delay(1);
}

void exitBootloader(pin_t boot0Pin, pin_t resetPin, uint32_t options) {
  // Set BOOT0 pin to run the program
  digitalWrite(boot0Pin, (options & STM32_BOOT_NONINVERTED) ? LOW : HIGH);
  delay(1);

  resetStm32(resetPin, options);
}

int getInfo() {
  CHECK(sendCommand(GET_INFO));

  // info response shows which erase command to use
  while (true) {
    waitFor(Serial1.available, 100);
    if (!Serial1.available()) {
      LOG(ERROR, "Timeout waiting for get info response");
      return SYSTEM_ERROR_TIMEOUT;
    }
    auto resp = Serial1.read();
    switch (resp) {
      case ERASE_FLASH:
        useExtendedErase = false;
        break;
      case ERASE_FLASH_EXTENDED:
        useExtendedErase = true;
        break;
      case ACK:
        return SYSTEM_ERROR_NONE;
    }
  }
}

int eraseFlash() {
  LOG(INFO, "Erasing STM32 flash");
  if (useExtendedErase) {
    CHECK(sendCommand(ERASE_FLASH_EXTENDED));

    // Global erase
    uint8_t buf[3] = { 0xFF, 0xFF, 0x00 };
    Serial1.write(buf, sizeof(buf));

    CHECK(waitForAck(ERASE_FLASH_EXTENDED));
  } else {
    CHECK(sendCommand(ERASE_FLASH));

    // Erase all blocks
    CHECK(sendCommand(0xFF, ERASE_FLASH_TIMEOUT));
  }

  LOG(INFO, "Erased STM32 flash");
  return SYSTEM_ERROR_NONE;
}

int flashBinary(ApplicationAsset& asset) {
  LOG(INFO, "Flashing STM32 binary");
  auto address = FLASH_START;

  while (asset.available()) {
    uint8_t buf[256];
    int read = asset.read((char*) buf, sizeof(buf));
    if (read < 0) {
      LOG(ERROR, "Error %d reading binary from asset", read);
    }

    CHECK(writeBlock(address, buf, read));
    address += read;
  }
  LOG(INFO, "Flashed STM32");

  return SYSTEM_ERROR_NONE;
}

int writeBlock(uint32_t address, uint8_t* data, uint16_t size) {
  LOG(INFO, "Writing %d bytes to 0x%08x", size, address);

  // Send the write command
  CHECK(sendCommand(WRITE_MEMORY));

  // write the address and checksum
  uint8_t buf[5];
  buf[0] = address >> 24;
  buf[1] = (address >> 16) & 0xFF;
  buf[2] = (address >> 8) & 0xFF;
  buf[3] = address & 0xFF;
  buf[4] = buf[0] ^ buf[1] ^ buf[2] ^ buf[3];
  Serial1.write(buf, sizeof(buf));

  CHECK(waitForAck(WRITE_MEMORY));

  // send the number of bytes, the data and the checksum
  uint16_t alignedSize = (size + 3) & ~0x03;
  uint8_t sizeTx = (alignedSize - 1) & 0xFF;
  Serial1.write(&sizeTx, sizeof(sizeTx));
  Serial1.write(data, size);
  for (auto i = size; i < alignedSize; i++) {
    Serial1.write(0xFF);
  }

  uint8_t checksum = sizeTx;
  for (auto i = 0; i < size; i++) {
    checksum ^= data[i];
  }
  for (auto i = size; i < alignedSize; i++) {
    checksum ^= 0xFF;
  }
  Serial1.write(checksum);

  CHECK(waitForAck(WRITE_MEMORY, WRITE_BLOCK_TIMEOUT));

  return SYSTEM_ERROR_NONE;
}

int sendCommand(uint8_t command, uint16_t timeout) {
  // each command must be written twice: once as is and once with the complement
  uint8_t buf[] = { command, (uint8_t) (command ^ 0xFF) };
  Serial1.write(buf, sizeof(buf));

  // wait for response
  return waitForAck(command, timeout);
}

int waitForAck(uint8_t command, int timeout) {
  waitFor(Serial1.available, timeout);
  if (!Serial1.available()) {
    LOG(ERROR, "Timeout waiting for STM32 to acknowledge command 0x%02x", command);
    return SYSTEM_ERROR_TIMEOUT;
  }

  auto resp = Serial1.read();
  if (resp != ACK) {
    LOG(ERROR, "Unexpected response from STM32 after command 0x%02x: 0x%02x", command, resp);
    return SYSTEM_ERROR_INVALID_STATE;
  }

  return SYSTEM_ERROR_NONE;
}
