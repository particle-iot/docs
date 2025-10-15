/*
 * Project stm32_ota
 * Description: This is a demo project for OTA update on an STM32 microcontroller connected
 * to a P2 via UART, BOOT0 and RESET pins
 * 
 * Author: Julien Vanier
 * Date: June 2023
 */

#include <Particle.h>
#include "STM32_Flash.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

PRODUCT_VERSION(2);

SerialLogHandler dbg(LOG_LEVEL_NONE, {
  { "app", LOG_LEVEL_ALL }
});


// Hardware configuration
const auto BOOT0_PIN = MOSI;
const auto BOOT1_PIN = MISO;
const auto RESET_PIN = SCK;

void initStm32();

// Tell Device OS to call handleAssets() when new firmware assets are available
// In this case, the asset is the STM32 binary. It will be flashed before the main program starts

void handleAssets(spark::Vector<ApplicationAsset> assets);
STARTUP(System.onAssetOta(handleAssets));

void handleAssets(spark::Vector<ApplicationAsset> assets) {
  initStm32();
  delay(1000);
  bool flashed = false;
  for (auto& asset: assets) {
    if (asset.name() == "blink.bin") {
      // Flash the STM32 binary
      LOG(INFO, "Flashing STM32 from asset");
      flashStm32Binary(asset, BOOT0_PIN, RESET_PIN, STM32_RESET_NONINVERTED | STM32_BOOT_NONINVERTED);
      flashed = true;
    } else {
      LOG(WARN, "Unknown asset %s", asset.name().c_str());
    }
  }

  if (!flashed) {
    LOG(WARN, "No STM32 binary found in the assets");
  }
  System.assetsHandled(true);
}

void initStm32() {
  pinMode(BOOT0_PIN, OUTPUT);
  pinMode(BOOT1_PIN, OUTPUT);
  pinMode(RESET_PIN, OUTPUT);

  // Set BOOT0 and BOOT1 to 0 and RESET to 1
  digitalWrite(BOOT0_PIN, LOW);
  digitalWrite(BOOT1_PIN, LOW);
  digitalWrite(RESET_PIN, HIGH);
}

void setup() {
  initStm32();

  Serial.begin();
  delay(1000);
  LOG(INFO, "Application starting");

  // redo assets handling on next boot for demo purposes
  System.assetsHandled(false);
}

void loop() {
  // nothing to do here
}
