#pragma once

#include "Particle.h"

class SetColor {
public:

    void function(const char *functionName) {
        Particle.function(functionName, &SetColor::setColorFunction, this);
    }

    void subscribe(const char *eventName) {
        Particle.subscribe(eventName, &SetColor::setColorSubscribe, this);
    }

    void loop() {
        if (colorSetTime != 0 && millis() - colorSetTime >= colorExpirationTime.count())
        {
            // Revert back to system color scheme
            RGB.control(false);
            colorSetTime = 0;
            Log.info("reverted to normal color scheme");
        }

    }

protected:

    int setColor(const char *cmd) {
        int result = -1;

        Log.info("setColor %s", cmd);

        int red, green, blue;
        if (sscanf(cmd, "%d,%d,%d", &red, &green, &blue) == 3)
        {
            // Override the status LED color temporarily
            RGB.control(true);
            RGB.color(red, green, blue);
            colorSetTime = millis();

            Log.info("red=%d green=%d blue=%d", red, green, blue);
            result = 0;
        }
        else {
            Log.info("not red,green,blue");
        }
        return result;
    }

    void setColorSubscribe(const char *eventName, const char *eventData) {
        setColor(eventData);
    }

    int setColorFunction(String cmd) {
        return setColor(cmd);
    }

    unsigned long colorSetTime = 0;
    std::chrono::milliseconds colorExpirationTime = 10s;

};