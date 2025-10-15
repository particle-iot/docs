#include "Particle.h"

#include "Adafruit_GFX.h"    // Core graphics library
#include "Adafruit_ST7735.h" // Hardware-specific library for ST7735
#include "DebounceSwitchRK.h"

// #include "FreeSansBold24pt7b.h"

SYSTEM_MODE(AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

const pin_t TFT_CS = A6;
const pin_t TFT_RST = A5;
const pin_t TFT_DC = D22;

typedef struct
{
    pin_t pin;
    const char *name;
    uint16_t color;
} ButtonInfo;

ButtonInfo buttonInfo[] = 
{
    {D20, "KEY1", ST77XX_RED},
    {D21, "KEY2", ST77XX_GREEN},
    {D3, "KEY3", ST77XX_BLUE},
    {A1, "UP", ST77XX_MAGENTA},
    {D26, "DOWN", ST77XX_YELLOW},
    {A0, "LEFT", ST77XX_ORANGE},
    {D4, "PRESS", ST77XX_WHITE}
};

const size_t buttonCount = sizeof(buttonInfo) / sizeof(buttonInfo[0]);

Adafruit_ST7735 tft = Adafruit_ST7735(&SPI, TFT_CS, TFT_DC, TFT_RST);

void switchCallback(DebounceSwitchState *switchState, void *context);
void drawText(const char *msg, uint16_t color, uint8_t size);

void setup()
{
    tft.initR(INITR_GREENTAB);

    DebounceSwitch::getInstance()->setup();

    for (size_t ii = 0; ii < buttonCount; ii++)
    {
        ButtonInfo *thisButtonInfo = &buttonInfo[ii];

        DebounceSwitch::getInstance()->addSwitch(thisButtonInfo->pin, DebounceSwitchStyle::PRESS_LOW_PULLUP, switchCallback, thisButtonInfo);
    }

    drawText("Particle", ST77XX_CYAN, 2);
}

void loop()
{
}

void switchCallback(DebounceSwitchState *switchState, void *context)
{
    ButtonInfo *thisButtonInfo = (ButtonInfo *)context;

    if (switchState->getPressState() == DebouncePressState::TAP)
    {
        drawText(thisButtonInfo->name, thisButtonInfo->color, 3);
    }
}

void drawText(const char *msg, uint16_t color, uint8_t size)
{
    tft.fillScreen(ST77XX_BLACK);

    tft.setRotation(1);
    tft.setCursor(10, 10);
    tft.setTextSize(size);
    tft.setTextColor(color);
    tft.setTextWrap(true);
    tft.print(msg);
}
