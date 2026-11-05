#include "Particle.h"

#include "DebounceSwitchRK.h"

SYSTEM_MODE(AUTOMATIC);

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_TRACE);

const char *eventName = "cloudButtonTest";
bool sendEvent = false;

const pin_t buttonPin = D2;

void switchCallback(DebounceSwitchState *switchState, void *context) {
    // This function is called from a worker thread with a small (1K) stack.
    // You should avoid any large, lengthy operations here.
    Log.info("pin=%d state=%s", switchState->getPin(), switchState->getPressStateName());
    if (switchState->getPressState() == DebouncePressState::TAP) {
        sendEvent = true;
    }    
}

void setup()
{
    DebounceSwitch::getInstance()->setup();

    DebounceSwitch::getInstance()->addSwitch(buttonPin, DebounceSwitchStyle::PRESS_LOW_PULLUP, switchCallback);
}

void loop()
{
    if (Particle.connected()) {
        if (sendEvent) {
            sendEvent = false;

            bool bResult = Particle.publish(eventName);

            Log.info("published event %s, result=%d", eventName, bResult);
        }
    }
}
