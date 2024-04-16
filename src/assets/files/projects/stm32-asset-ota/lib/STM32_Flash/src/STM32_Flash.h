#include <Particle.h>

enum {
  STM32_RESET_NONINVERTED = 1,
  STM32_BOOT_NONINVERTED = 2
};

int flashStm32Binary(ApplicationAsset& asset, pin_t boot0Pin, pin_t resetPin, uint32_t options = 0);
