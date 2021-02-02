#pragma once

#include "Particle.h"

class MyConfig {
public:
    enum class Fruits : int32_t {
        APPLE = 0,
        GRAPE,
        ORANGE,
        PEAR
    };

    void init();
    void loop();

    void logSettings();

    int32_t getContrast() const { return contrast; };
    double getTempLow() const { return tempLow; };
    Fruits getFruit() const { return (Fruits)fruit; };
    const char *getMessage() const { return message; };
    bool getThing() const { return thing; };

    static MyConfig &instance();

protected:
    MyConfig();
    virtual ~MyConfig();

    int32_t contrast = 12;
    double tempLow = 0.0;
    int32_t fruit = (int32_t) Fruits::APPLE;
    String message;
    bool thing = false;

    static MyConfig *_instance;
};
