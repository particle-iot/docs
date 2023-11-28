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

#include "Particle.h"
#include "eeprom_helper.h"

int writeEepromBytes(TwoWire& wire, uint8_t device, uint16_t address, const uint8_t* data, size_t length) {
  uint8_t regAddress[2] {};
  regAddress[0] = (uint8_t)(address >> 8);
  regAddress[1] = (uint8_t)address;

  wire.lock();
  SCOPE_GUARD({wire.unlock();});

  wire.beginTransmission(device);
  wire.write(regAddress, sizeof(regAddress));
  while (0 != length) {
    size_t chunk = min(length, I2C_BUFFER_LENGTH);
    auto ret = wire.write(data, chunk);
    if (ret != chunk) {
      wire.endTransmission();
      return SYSTEM_ERROR_INTERNAL;
    }
    data += chunk;
    length -= chunk;
  }
  return wire.endTransmission();
}

int readEepromBytes(TwoWire& wire, uint8_t device, uint16_t address, uint8_t* data, int length) {
  uint8_t regAddress[2] {};
  regAddress[0] = (uint8_t)(address >> 8);
  regAddress[1] = (uint8_t)address;

  wire.lock();
  SCOPE_GUARD({wire.unlock();});

  wire.beginTransmission(device);
  wire.write((uint8_t*)&regAddress, sizeof(regAddress));
  CHECK_TRUE(wire.endTransmission(false) == 0, SYSTEM_ERROR_INTERNAL);

  while (0 < length) {
    auto chunk = std::min<int>(length, I2C_BUFFER_LENGTH);
    length -= chunk;
    auto readLength = (int)wire.requestFrom(device, chunk);
    if (readLength != chunk) {
        wire.endTransmission();
        return SYSTEM_ERROR_INTERNAL;
    }

    while (wire.available() && chunk--) {
        *data++ = wire.read();
    }
  }

  wire.endTransmission();
  return SYSTEM_ERROR_NONE;
}
