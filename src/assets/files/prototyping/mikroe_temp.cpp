#include "Particle.h"

#include "SparkFunTMP102.h"


#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SerialLogHandler logHandler;

// M.2 SoM #1  D22
// M.2 SoM #2  D23
// Feather #1  A4
// Feather #2  D6
const pin_t INT_PIN = D22;

// Default is 0x48. If you move the 0-ohm resistor next to AD on the 
// Click board to the 1 position, is 0x49.
TMP102 tempSensor(0x48); 

std::chrono::milliseconds logTempPeriod = 10s;
unsigned long logTempLast = 0;

void setup() {
    // The temperature alarm output from the Click board uses
    // the INT pin, which varies depending on the socket and
    // shield, see table above.
    pinMode(INT_PIN, INPUT_PULLUP);

    // Initialize the I2C sensor
    tempSensor.begin();

    // This specifies how many faults must occur before the
    // alarm is triggered:
    // 0 = 1 fault (immediate)
    // 1 = 2 faults
    // 2 = 4 faults
    // 3 = 6 faults
    tempSensor.setFault(1);

    // 0 = active low 
    // 1 = active high
    tempSensor.setAlertPolarity(0);

    // 0 = comparator mode (indicates in alarm or not)
    // 1 = interrupt mode (triggers on crossing)
    tempSensor.setAlertMode(0);

    // Conversion rate
    // 0 = 0.25 Hz (4 seconds to convert)
    // 1 = 1 Hz
    // 2 = 4 Hz
    // 3 = 8 Hz
    tempSensor.setConversionRate(1);

    // 0 = 12-bit Temperature(-55C to +128C) 
    // 1 = 13-bit Temperature(-55C to +150C)
    tempSensor.setExtendedMode(0);

    // Temperature settings
    // Can also use setHighTempC, setLowTempC
    // There are two temperature to implement hysteresis
    tempSensor.setHighTempF(76.0);
    tempSensor.setLowTempF(74.0);

    // The sensor supports a low-current sleep mode, which this 
    // example does not use.
    tempSensor.wakeup();
}

void loop() {
    static bool alarmAlerted = false;
    if (digitalRead(INT_PIN) == LOW) {
        if (!alarmAlerted) {
            Log.info("temperature alarm triggered");
        }
        alarmAlerted = true;
    }
    else {
        if (alarmAlerted) {
            Log.info("temperature alarm cleared");
        }
        alarmAlerted = false;
    }


    if (millis() - logTempLast >= logTempPeriod.count()) {
        logTempLast = millis();

        float tempF = tempSensor.readTempF();
        Log.info("tempF=%.1f", tempF);
    }
}


