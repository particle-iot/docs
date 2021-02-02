#include "MyConfig.h"
#include "config_service.h"

MyConfig *MyConfig::_instance;


void MyConfig::init() {
    static ConfigObject mineDesc("mine", {
        ConfigInt("contrast", &contrast, 0, 255),
        ConfigFloat("tempLow", &tempLow, -100.0, 200.0),
        ConfigStringEnum(
            "fruit",
            {
                {"apple",  (int32_t) Fruits::APPLE},
                {"grape",  (int32_t) Fruits::GRAPE},
                {"orange", (int32_t) Fruits::ORANGE},
                {"pear",   (int32_t) Fruits::PEAR}
            },
            [this](int32_t &value, const void *context) {
                // Get fruit from class
                value = this->fruit;
                return 0;
            },
            [this](int32_t value, const void *context) {
                // Set fruit in class
                this->fruit = value;
                return 0;
            }
        ),
        ConfigString("message", 
            [this](const char * &value, const void *context) {
                // Get message from class
                value = message.c_str();
                return 0;
            },
            [this](const char * value, const void *context) {
                // Set message in class
                this->message = value;
                Log.info("set message to %s", value);
                return 0;
            }
        ),
        ConfigBool("thing", 
            [this](bool &value, const void *context) {
                // Get thing from class
                value = this->thing;
                return 0;
            },
            [this](bool value, const void *context) {
                // Set thing in class
                this->thing = value;
                Log.info("set thing to %s", value ? "true" : "false");
                return 0;
            }
        )
    });
    ConfigService::instance().registerModule(mineDesc);

    logSettings();
}

void MyConfig::loop() {

    static unsigned long lastLog = 0;
    if (millis() - lastLog >= 10000) {
        lastLog = millis();
        logSettings();
    }
}

void MyConfig::logSettings() {
    Log.info("contrast=%ld tempLow=%lf fruit=%ld message=%s thing=%s", 
        contrast, tempLow, fruit, message.c_str(), thing ? "true" : "false");
} 

// static 
MyConfig &MyConfig::instance() {
    if (!_instance) {
        _instance = new MyConfig();
    }
    return *_instance;
}

MyConfig::MyConfig() {
}

MyConfig::~MyConfig() {
}

