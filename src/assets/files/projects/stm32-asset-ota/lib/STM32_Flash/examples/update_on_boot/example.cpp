// Flash an STM32 when the version in Asset OTA is different than what is running on the device.

#include "Particle.h"
#include "STM32_Flash.h"

const auto BOOT_PIN = D0;
const auto RESET_PIN = D1;

SerialLogHandler dbg(LOG_LEVEL_ALL);

void updateStm32() {
  // TODO: get version of current firmware from the STM32
  String version = "?";
  for (auto& asset: System.assetsAvailable()) {
    if (asset.name().startsWith("stm32")) {
      if (asset.name() != version) {
        LOG(INFO, "Updating from version %s to %s", version, asset.name());
        flashStm32Binary(asset, BOOT_PIN, RESET_PIN);
      } else {
        LOG(INFO, "Version %s is up to date", version);
      }
      return;
    }
  }
  LOG(WARN, "No STM32 binary found in the assets");
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
  updateStm32();

  LOG(INFO, "Application starting");  
}

void loop() {

}
