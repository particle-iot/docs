// This example shows how to have an Electron, E Series, or Boron gracefully power down under
// battery power when the power supply is disconnected then automatically power up when restored.
// This can be useful in automotive applications or devices powered by a switch in mains
// power applications.

// Documentation: https://docs.particle.io/datasheets/app-notes/an002-device-powerdown/
// License: Apache (free for use in open or closed-source projects)

#include "Particle.h"

// You must use SEMI_AUTOMATIC or MANUAL mode so the battery is properly reconnected on
// power-up. If you use AUTOMATIC, you may be unable to connect to the cloud, especially
// on a 2G/3G device without the battery.
SYSTEM_MODE(SEMI_AUTOMATIC);

// This example works with threading enabled or disabled
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// Optional: show log messages on USB serial console
SerialLogHandler logHandler;

// How often to check power in milliseconds. Since this requires accessing the PMIC, it's
// best to not check on every loop.
const unsigned long POWER_CHECK_INTERVAL_MS = 5000;
unsigned long lastPowerCheck = 0;

// This code can only be used on the Electron, E Series, or Boron that have the bq24195 PMIC.
// If you get a compile error on the next line, make sure you're targeting a compatible device.
PMIC pmic;


void setup() {
	// The device has booted, reconnect the battery.
	pmic.enableBATFET();

	// Now that the battery is connected, connect to the cloud.
	Particle.connect();
}

void loop() {

	if (millis() - lastPowerCheck >= POWER_CHECK_INTERVAL_MS) {
		lastPowerCheck = millis();

		if (!pmic.isPowerGood()) {
			Log.info("No longer being externally powered");

			// Disconnect from the cloud and power down the modem.
			Particle.disconnect();
			Cellular.off();
			delay(10000);

			Log.info("About to power down");

			// Disabling the BATFET disconnects the battery from the PMIC. Since there
			// is no longer external power, this will turn off the device.
			pmic.disableBATFET();

			// This line should not be reached. When power is applied again, the device
			// will cold boot starting with setup().

			// However, there is a potential for power to be re-applied while we were in
			// the process of shutting down so if we're still running, enable the BATFET
			// again and reconnect to the cloud. Wait a bit before doing this so the
			// device has time to actually power off.
			delay(2000);

			Log.info("Power was re-applied while shutting down");
			pmic.enableBATFET();
			Cellular.on();
			Particle.connect();
		}
	}
}
