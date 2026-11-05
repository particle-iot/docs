#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_TRACE);

const char *eventName = "cloudButtonTest";
bool sendEvent = false;

void buttonHandler(system_event_t event, int param);


void setup()
{
    System.on(button_final_click, buttonHandler);
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

void buttonHandler(system_event_t event, int param) {
	int times = system_button_clicks(param);

	if (times == 3) {
        sendEvent = true;
    }
}
