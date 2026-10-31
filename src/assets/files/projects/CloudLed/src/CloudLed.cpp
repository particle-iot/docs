#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This allows for USB serial debug logs
SerialLogHandler logHandler(LOG_LEVEL_INFO);

unsigned long colorSetTime = 0;
std::chrono::milliseconds colorExpirationTime = 10s;
String startupColor;
bool startupColorShown = false;

// Forward declarations (functions used before they're implemented)
int setColor(String cmd);

void setup()
{
    Particle.function("setColor", setColor);

#if HAL_PLATFORM_ENV
    // On platform and Device OS version that support environment variables, allow a startup color to be defined
    String value;
    if (System.getEnv("STARTUP_COLOR", startupColor)) {
        Log.info("STARTUP_COLOR=%s", startupColor.c_str());
    }
#endif // HAL_PLATFORM_ENV

}

void loop()
{
    if (colorSetTime != 0 && millis() - colorSetTime >= colorExpirationTime.count())
    {
        // Revert back to system color scheme
        RGB.control(false);
        colorSetTime = 0;
        Log.info("reverted to normal color scheme");
    }

    if (Particle.connected() && !startupColorShown && startupColor.length()) {
        // There is a startup color and it has not been shown yet so show it now
        startupColorShown = true;
        setColor(startupColor);
    }
}

int setColor(String cmd)
{
    int result = 0;

    Log.info("setColor %s", cmd.c_str());

    int red, green, blue;
    if (sscanf(cmd, "%d,%d,%d", &red, &green, &blue) == 3)
    {
        // Override the status LED color temporarily
        RGB.control(true);
        RGB.color(red, green, blue);
        colorSetTime = millis();

        Log.info("red=%d green=%d blue=%d", red, green, blue);
        result = 1;
    }
    else {
        Log.info("not red,green,blue");
    }
    return result;
}
