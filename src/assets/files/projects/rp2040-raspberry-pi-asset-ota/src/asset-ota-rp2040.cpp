/*
 * Project stm32_ota
 * Description: This is a demo project for OTA update on an STM32 microcontroller connected
 * to a P2 via UART, BOOT0 and RESET pins
 * 
 * Author: Julien Vanier
 * Date: June 2023
 */

#include <Particle.h>
#include "pico-flashloader.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

PRODUCT_VERSION(2);

SerialLogHandler dbg(LOG_LEVEL_NONE, {
  { "app", LOG_LEVEL_ALL },
//   { "app.RP2040", LOG_LEVEL_INFO },
});


// Hardware configuration
const auto RP2040_RX = RX;
const auto RP2040_TX = TX;

void initRP2040();

// Tell Device OS to call handleAssets() when new firmware assets are available
// In this case, the asset is the STM32 binary. It will be flashed before the main program starts

void handleAssets(spark::Vector<ApplicationAsset> assets);
STARTUP(System.onAssetsOta(handleAssets));

void handleAssets(spark::Vector<ApplicationAsset> assets) {
  initRP2040();
  delay(1000);
  bool flashed = false;

  for (auto& asset: assets) {
    if (asset.name() == "app.hex") {
      // Flash the RP2040 binary
      Log.info("Flashing RP2040 from asset");
      flashRP2040Binary(asset);
      flashed = true;
    } else {
      Log.warn("Unknown asset %s", asset.name().c_str());
    }
  }

  if (!flashed) {
    Log.warn("No RP2040 binary found in the assets");
  }
  System.assetsHandled(true);
}

void initRP2040() {
    // Nothing for now
    // TODO: add reset pin
}

void setup() {
    initRP2040();
    Serial.begin();
    delay(1000);
    Log.info("Application starting");

    // Request LED flash rate from RP2040
    Serial2.begin(115200);
    Serial2.write("$RATE\n");

    // Try to read back a response with a timeout
    char rateStr[16];
    unsigned int idx = 0;
    time_t start = millis();
    while (millis() - start < 1000) {
        if (Serial2.available()) {
            char c = Serial2.read();
            if (c != '\n') {
                rateStr[idx++] = c;
            } else {
                rateStr[idx] = 0;
                break;
            }
        }
    }
    Log.info("Received %u bytes", idx);
    
    if (strlen(rateStr) > 0) {
        Log.info("RP2040 LED rate = %s", rateStr);
    } else {
        Log.info("RP2040 no response");
    }
}

void loop() {
  // nothing to do here
}