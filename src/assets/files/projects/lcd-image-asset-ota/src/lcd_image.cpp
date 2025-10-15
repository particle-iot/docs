/*
 * Project lcd-image
 * Description:
 * Author:
 * Date:
 */

#include <Particle.h>
#include <Adafruit_ILI9341.h>

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

PRODUCT_VERSION(3);

SerialLogHandler dbg(LOG_LEVEL_NONE, {
  { "app", LOG_LEVEL_ALL }
});

#if PLATFORM_ID == PLATFORM_P2
const auto TFT_DC = S4;
const auto TFT_CS = S3;
#else
const auto TFT_DC = A4;
const auto TFT_CS = A5;
#endif

Adafruit_ILI9341 tft(TFT_CS, TFT_DC);

void setup() {
  tft.begin();

  // find the splash screen in the assets
  auto assets = System.assetsAvailable();
  for (auto& asset: assets) {
    if (asset.name() == "splash.img") {
      LOG(INFO, "Found splash.img");
      // draw the splash screen line by line
      for (int x = 0; x < ILI9341_TFTWIDTH; x++) {
        // each pixel is a 16 bit value, with the RGB values packed 5 bits for red, 6 bits for green, 5 bits for blue
        uint16_t line[ILI9341_TFTHEIGHT] = { 0 };
        char* buf = (char*) line;
        int read = asset.read(buf, sizeof(line));
        if (read < 0) {
          LOG(ERROR, "Error %d reading from splash.img", read);
        } else if (read != sizeof(line)) {
          LOG(ERROR, "Incomplete line read from splash.img");
        }

        // draw the line
        tft.drawRGBBitmap(ILI9341_TFTWIDTH - x - 1, 0, line, 1, ILI9341_TFTHEIGHT);
      }
      LOG(INFO, "Done drawing splash.img");
    }
  }
}

void loop() {

}