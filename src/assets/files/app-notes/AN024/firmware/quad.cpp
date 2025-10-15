#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"
#include "M8RelayRK.h"


#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(TRACKER_PRODUCT_ID);
#endif
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_TRACE },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

M8Relay relays;

int relayFunction(String extra);

void setup()
{
    Tracker::instance().init();

	Particle.function("relay", relayFunction);
	relays.begin();

    Particle.connect();
}

void loop()
{
     Tracker::instance().loop();
}


int relayFunction(String param) {
	int res = -1;

	int relayNum, value;
	if (sscanf(param.c_str(), "%d,%d", &relayNum, &value) == 2) {
		bool bResult = relays.relayOnOff((uint16_t)relayNum, (bool) value);
		Log.info("relayNum=%d value=%d bResult=%d", relayNum, value, (int) bResult);
		if (bResult) {
			res = 0;
		}
	}

	return res;
}
