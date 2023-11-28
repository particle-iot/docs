/*
 * Copyright (c) 2023 Particle Industries, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#pragma once

#include "Particle.h"

struct ExpansionEeprom1 {
    uint16_t    size;           ///< Size of entire ExpansionEeprom
                                ///< structure. LSB, MSB
    uint8_t     revision;       ///< Revision number of this hardware
                                ///< starting from 1
    char        sku[29];        ///< SKU name with null termination
    uint8_t     serial[16];     ///< 128-bit serial number MSB->LSB
    uint8_t     reserved[16];   ///< Page boundary filler
} __attribute__((packed));

using ExpansionEeprom = ExpansionEeprom1;

/**
 * @brief Write one or more bytes to a given EEPROM address.
 *
 * @param wire The two wire interface instance to communicate over
 * @param device The device address
 * @param address The memory address within the EEPROM to write
 * @param data Data buffer with values to write
 * @param length Length of data in bytes
 * @return int Returns SYSTEM_ERROR_NONE on success; otherwise, there was a failure.
 */
int writeEepromBytes(TwoWire& wire, uint8_t device, uint16_t address, const uint8_t* data, size_t length);

/**
 * @brief Read one or more bytes from a given EEPROM address.
 *
 * @param wire The two wire interface instance to communicate over
 * @param device The device address
 * @param address The memory address within the EEPROM to read
 * @param data Data buffer with values read from EEPROM
 * @param length Length of data in bytes
 * @return int Returns SYSTEM_ERROR_NONE on success; otherwise, there was a failure.
 */
int readEepromBytes(TwoWire& wire, uint8_t device, uint16_t address, uint8_t* data, int length);

/**
 * @brief Checks if EEPROM contents appear to be valid.
 *
 * @param eeprom Instance of EEPROM data to evaluate
 * @return true The EEPROM data is likely valid
 * @return false The EERPOM data is not valid
 */
static inline bool isEeepromValid(const ExpansionEeprom& eeprom, size_t maxSize = 8192) {
  if ((0x0000 != eeprom.size) && (0xffff != eeprom.size) &&
      ((uint16_t)sizeof(ExpansionEeprom) >= eeprom.size) && (maxSize >= eeprom.size) &&
      (0x00 != eeprom.revision) && (0xff != eeprom.revision)) {
        return true;
  }

  return false;
}
