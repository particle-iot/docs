#include "BleLogging.h"


// This demo works better with system thread enabled, otherwise the BLE log handler is not
// initialized until you've already connected to the cloud, which is not as useful.
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This sets up the BLE log handler. The <4096> template parameter sets the size of the buffer to hold log data
// The other parameters are like SerialLogHandler. You can set the log level (optional) to things like
// LOG_LEVEL_ALL, LOG_LEVEL_TRACE, LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, etc.. You can also pass a log filter here.
BleLogging<4096> bleLogHandler(LOG_LEVEL_TRACE);

// Optionally you can also enable USB serial log handling (or other log handlers, as desired).
SerialLogHandler serialLogHandler(LOG_LEVEL_TRACE);

// This is just so the demo prints a message every second so the log updates frequently
const unsigned long LOG_INTERVAL = 1000; // milliseconds
unsigned long lastLog = 0;
size_t counter = 0;


void setup() {
	BLE.on();

	// You must add this to your setup() to initialize the library
	bleLogHandler.setup();
}

void loop() {
	// You must add this to your loop to process BLE requests and data
	bleLogHandler.loop();


	if (millis() - lastLog >= LOG_INTERVAL) {
		lastLog = millis();

		// This is just so the demo prints a message every second so the log updates frequently
		Log.info("counter=%u", counter++);
	}
}