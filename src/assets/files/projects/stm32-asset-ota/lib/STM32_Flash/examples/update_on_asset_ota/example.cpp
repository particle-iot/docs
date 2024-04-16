// Flash an STM32 when a new firmware is received using Asset OTA

#include "Particle.h"
#include "STM32_Flash.h"

const auto BOOT_PIN = D0;
const auto RESET_PIN = D1;

void handleAssets(spark::Vector<ApplicationAsset> assets);
void initStm32();
STARTUP(System.onAssetOta(handleAssets));

SerialLogHandler dbg(LOG_LEVEL_ALL);

void handleAssets(spark::Vector<ApplicationAsset> assets) {
  initStm32();
  bool flashed = false;
  for (auto& asset: assets) {
    if (asset.name() == "blink.bin") {
      // Flash the STM32 binary
      LOG(INFO, "Flashing STM32 from asset");
      flashStm32Binary(asset, BOOT_PIN, RESET_PIN);
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
  // put STM32 in normal running mode
  pinMode(BOOT_PIN, OUTPUT);
  pinMode(RESET_PIN, OUTPUT);
  digitalWrite(BOOT_PIN, HIGH);
  digitalWrite(RESET_PIN, LOW);
}

void setup() {
  initStm32();
  LOG(INFO, "Application starting");  
}

void loop() {

}
