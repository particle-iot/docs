# STM32_Flash

A Particle library to flash an STM32 microcontroller using [Asset OTA](https://docs.particle.io/reference/asset-ota/asset-ota/).

## Usage

1. In your Particle project, create an `assets` directory.
1. Put your STM32 binary in `.bin` format in the `assets` directory.
1. Add the line `assetOtaDir=assets` to your `project.properties`.
1. Connect the RESET, BOOT0, USART TX and RX pins from the STM32 to the Particle device.
1. Add the `STM32_Flash` library to your application.
1. From your application, call `flashStm32Binary` to perform the flash process.

```
#include "STM32_Flash.h"

const auto BOOT_PIN = D0;
const auto RESET_PIN = D1;
void flash() {
  for (auto& asset: System.assetsAvailable()) {
    if (asset.name().startsWith("stm32")) {
      flashStm32Binary(asset, BOOT_PIN, RESET_PIN);
    }
  }
}
```

## Hardware setup

The Particle device needs to be able to drive the STM32 pins RESET and BOOT0. Set up a transistor between the Particle device and each pins as shown in the image. You can use any digital output pin (D0 and D1 are just an example). The BOOT1 pin must to be held low. It can be hardwired to ground.

![Pin connections](pins.png)

This inverts the signal between the Particle device and the pin and is the default software configuration for the library. In case you use a non-inverting buffer, pass additional options to the library.

```
flashStm32Binary(asset, BOOT_PIN, RESET_PIN, STM32_RESET_NONINVERTED | STM32_BOOT_NONINVERTED);
```

Connect the STM32 TX pin to the Particle Serial1 RX pin, and the STM32 RX pin to the Particle Serial1 TX pin.

See [AN2606 STM32 microcontroller system memory boot mode](https://www.st.com/resource/en/application_note/an2606-stm32-microcontroller-system-memory-boot-mode-stmicroelectronics.pdf) to confirm which USART can be used to flash your STM32 device in bootloader mode.

## Documentation

```
int flashStm32Binary(ApplicationAsset& asset, pin_t boot0Pin, pin_t resetPin, uint32_t options = 0);
```

Call `flashStm32Binary` to start flashing the asset to the STM32 device. It will turn on the BOOT0 pin, reset the device and communicate over USART using the [protocol described in AN3155](https://www.st.com/resource/en/application_note/an3155-usart-protocol-used-in-the-stm32-bootloader-stmicroelectronics.pdf). Returns 0 on success, and a [system error code](https://docs.particle.io/reference/device-os/firmware/#system-errors) on error (most likely -160 for timeout).

Timeout failures are likely due to wrong pin connections so the STM32 doesn't switch to bootloader mode.

You can flash the device when a new asset is received (triggered by `System.onAssetOta`) or on demand (useful if you have a way to get the version of the firmware running on the STM32).

See the [examples](examples) folder for more details.

## License

Copyright (c) 2024, Particle Industries, Inc.

Released under the MIT license
