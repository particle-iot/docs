#include "Particle.h"

#include "SN3218_RK.h"

SYSTEM_MODE(AUTOMATIC);
SYSTEM_THREAD(ENABLED);

SerialLogHandler logHandler(LOG_LEVEL_INFO);


typedef struct {
    const char *name;
    pin_t pin;
    bool isOutput;
} PinDefinition;

const PinDefinition pinDefinitions[] = {
    { "output1", A0,  true },
    { "output2", D5,  true },
    { "output3", A1,  true },
    { "relay1",  D4,  true },
    { "relay2",  D26, true },
    { "relay3",  D3,  true },
    // { "input1", IOEX_PB7, false},
    { "input2",  D21, false},
    { "input3",  D20, false}
};
const size_t pinDefinitionCount = sizeof(pinDefinitions) / sizeof(pinDefinitions[0]);

int functionHandler(String cmd);
String variableHandler();

SN3218_RK ledDriver;

void setup() {
    // Uncomment this to see early initialization messages
    // waitFor(Serial.isConnected, 10000); delay(2000);

    // LED driver setup
    ledDriver.begin();
    ledDriver.reset();
    ledDriver.wake();

    // Set all of the PMWs to 128 because they default to 0 which means the LED stays off
    // even if you turn it on
    for(uint8_t channel = 0; channel <= SN3218_RK::CHANNEL_LAST; channel++) {
        ledDriver.setPWM(channel, 128);
    }

    for(size_t ii = 0; ii < pinDefinitionCount; ii++) {
        const PinDefinition *pd = &pinDefinitions[ii];

        if (pd->isOutput) {
            pinMode(pd->pin, OUTPUT);
        }
    }

    Particle.function("output", functionHandler);
    Particle.variable("input", variableHandler);
}

void loop() {
}


int functionHandler(String cmd) {
    JSONValue outerObj = JSONValue::parseCopy(cmd);

    bool ledUpdated = false;

    JSONObjectIterator iter(outerObj);
    while(iter.next()) {
        const char *key = (const char *) iter.name();
        int value = iter.value().toInt();
        
        for(size_t ii = 0; ii < pinDefinitionCount; ii++) {
            const PinDefinition *pd = &pinDefinitions[ii];
            if (strcmp(key, pd->name) == 0) {
                digitalWrite(pd->pin, value);

                Log.info("output %s=%d", pd->name, value);
            }
        }        


        int ledNum = 0;
        if (sscanf(key, "pwm%d", &ledNum) == 1) {
            if (ledNum < 0 || ledNum >= 18) {
                ledNum = 0;
            }

            int valueInt = iter.value().toInt();
            if (valueInt < 0 || valueInt > 255) {
                valueInt = 0;
            }

            ledDriver.setPWM(ledNum, valueInt);
            Log.info("pwm %d=%d", ledNum, valueInt);
            ledUpdated = true;
        }

        if (sscanf(key, "led%d", &ledNum) == 1) {
            if (ledNum < 0 || ledNum >= 18) {
                ledNum = 0;
            }

            int valueInt = iter.value().toInt();
            if (valueInt) {
                ledDriver.ledOn(ledNum);
                Log.info("led %d on", ledNum);
            }
            else {
                ledDriver.ledOff(ledNum);
                Log.info("led %d off", ledNum);
            }
            ledUpdated = true;
        }
    }

    if (ledUpdated) {
        ledDriver.update();
    }

    return 0;
}

String variableHandler() {
    char buf[256];

    memset(buf, 0, sizeof(buf));
    JSONBufferWriter writer(buf, sizeof(buf) - 1);

    writer.beginObject();

    for(size_t ii = 0; ii < pinDefinitionCount; ii++) {
        const PinDefinition *pd = &pinDefinitions[ii];
        if (!pd->isOutput) {
            writer.name(pd->name).value(digitalRead(pd->pin));
        }
    }

    writer.endObject();

    Log.info("input %s", buf);

    return String(buf);
}
