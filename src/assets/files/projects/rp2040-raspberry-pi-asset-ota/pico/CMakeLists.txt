cmake_minimum_required(VERSION 3.5)
set(CMAKE_C_STANDARD 11)

set(PICO_PLATFORM rp2040)
set(PICO_BOARD pico)

# Pull in SDK (must be before project)
include(pico_sdk_import.cmake)

set(PROJECT flashloader_test)

project(${PROJECT} C CXX)

pico_sdk_init()

# Need at least SDK v1.3.0 (due to https://github.com/raspberrypi/pico-sdk/issues/573)
if(${PICO_SDK_VERSION_STRING} VERSION_LESS "1.3.0")
    message(FATAL_ERROR "Pico SDK v1.3.0 or greater is required.  You have ${PICO_SDK_VERSION_STRING}")
endif()

################################################################################
# Helper function
function(set_linker_script TARGET script)
    target_link_directories(${TARGET} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})
    pico_set_linker_script(${TARGET} ${CMAKE_CURRENT_SOURCE_DIR}/${script})

    # Add dependencies on the 'included' linker scripts so that the target gets
    # rebuilt if they are changed
    pico_add_link_depend(${TARGET} ${CMAKE_CURRENT_SOURCE_DIR}/memmap_defines.ld)
    pico_add_link_depend(${TARGET} ${CMAKE_CURRENT_SOURCE_DIR}/memmap_default.ld)
endfunction()

################################################################################
# Flashloader
set(FLASHLOADER pico-flashloader)

add_executable(${FLASHLOADER})

target_sources(${FLASHLOADER} PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}/flashloader.c
        )

target_link_libraries(${FLASHLOADER} PRIVATE
        hardware_structs
        hardware_sync
        hardware_flash
        hardware_watchdog
        hardware_resets
        hardware_xosc
        hardware_clocks
        hardware_pll
        hardware_dma
        pico_platform
        pico_standard_link
        pico_divider
        )

pico_add_uf2_output(${FLASHLOADER})
pico_set_program_name(${FLASHLOADER} ${FLASHLOADER})
target_compile_options(${FLASHLOADER} PRIVATE -Wall -Wextra -Wno-ignored-qualifiers -Os)

# Use a separate linker script for the flashloader to make sure it is built
# to run at the right location and cannot overflow into the applications's
# address space
set_linker_script(${FLASHLOADER} memmap_flashloader.ld)

set(FLASHLOADER_UF2 ${CMAKE_CURRENT_BINARY_DIR}/${FLASHLOADER}.uf2)

################################################################################
# Application (250ms blink rate)
set(APP250 app250)

add_executable(${APP250}
        app.c
        )

target_compile_options(${APP250} PRIVATE -Os)
target_compile_definitions(${APP250} PRIVATE LED_DELAY_MS=250)
target_link_libraries(${APP250} pico_stdlib hardware_watchdog hardware_flash)

pico_add_uf2_output(${APP250})
pico_add_hex_output(${APP250})

# Use a separate linker script for the application to make sure it is built
# to run at the right location (after the flashloader).
set_linker_script(${APP250} memmap_application.ld)

set(APP250_UF2 ${CMAKE_CURRENT_BINARY_DIR}/${APP250}.uf2)

################################################################################
# Application (800ms blink rate)
set(APP800 app800)

add_executable(${APP800}
        app.c
        )

target_compile_options(${APP800} PRIVATE -Os)
target_compile_definitions(${APP800} PRIVATE LED_DELAY_MS=800)
target_link_libraries(${APP800} pico_stdlib hardware_watchdog hardware_flash)

pico_add_uf2_output(${APP800})
pico_add_hex_output(${APP800})

# Use a separate linker script for the application to make sure it is built
# to run at the right location (after the flashloader).
set_linker_script(${APP800} memmap_application.ld)

################################################################################
# Combine the flashloader and application into one flashable UF2 image
set(COMPLETE_UF2 ${CMAKE_CURRENT_BINARY_DIR}/FLASH_ME.uf2)

find_package (Python3 REQUIRED COMPONENTS Interpreter)
add_custom_command(OUTPUT ${COMPLETE_UF2} DEPENDS ${FLASHLOADER} ${APP250}
        COMMENT "Building full UF2 image"
        COMMAND ${Python3_EXECUTABLE}
                ${CMAKE_CURRENT_SOURCE_DIR}/uf2tool.py
                -o ${COMPLETE_UF2} ${FLASHLOADER_UF2} ${APP250_UF2}
        )

add_custom_target(${PROJECT} ALL DEPENDS ${COMPLETE_UF2})

install(FILES ${COMPLETE_UF2} DESTINATION ${CMAKE_INSTALL_PREFIX} )
