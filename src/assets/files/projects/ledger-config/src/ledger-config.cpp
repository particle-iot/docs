#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);
SYSTEM_THREAD(ENABLED);

SerialLogHandler logHandler(LOG_LEVEL_INFO);

Ledger sensors;            // Device to cloud
Ledger defaultConfig;      // Cloud to device, product defaults
Ledger deviceConfig;       // Cloud to device, device-specific overrides

// How often to check our imaginary temperature and humidity sensor
const std::chrono::milliseconds sensorCheckPeriod = 60s;
unsigned long sensorCheckLast = 0;

// Forward declarations
void readSensor(double &temp, double &hum);
void syncCallback(Ledger ledger);
bool getValue(const char *group, const char *key, Variant &value);
void checkLimits(Variant &data);
void alertUser(const char *msg);


void setup() {
    // The next line is for debugging and waits for USB serial debug to connect for 10 seconds so you can see more early log messages
    waitFor(Serial.isConnected, 10000);

    // Start ledger synchronization
    defaultConfig = Particle.ledger("test-config-defaults");
    defaultConfig.onSync(syncCallback);

    deviceConfig = Particle.ledger("test-config-device");
    deviceConfig.onSync(syncCallback);

    sensors = Particle.ledger("sensors");
}

void loop() {
    if (Particle.connected()) {
        if (sensorCheckLast == 0 || millis() - sensorCheckLast >= sensorCheckPeriod.count()) {
            sensorCheckLast = millis();
            
            double temp, hum;
            readSensor(temp, hum);

            // Save the value to the ledger
            Variant data;
            data.set("temp", temp);
            data.set("hum", hum);
            if (Time.isValid()) {
                data.set("time", Time.format(TIME_FORMAT_ISO8601_FULL)); // Time.format returns a String
            }

            // Check min and max, and add alarn key if needed
            checkLimits(data);

            // Save in ledger and output to serial debug log
            sensors.set(data);
            Log.info("set ledger %s", data.toJSON().c_str());
        }
    }
}

// This is just a helper function to making fake random values
static void randomValue(double min, double max, double &value) {
    double delta = (double)((rand() % 100) - 50) / 10.0;
    value += delta;
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
}

void readSensor(double &temp, double &hum) {
    static double lastTemp = (double)(rand() % 50);
    static double lastHum = (double)(rand() % 50) + 10.0;

    // In a real application, you'd read the sensor here, but we just return random-ish values here

    // temp (temperature in degrees C), between 0 and 50
    randomValue(0, 50, lastTemp);    
    temp = lastTemp;

    // hum (humidity % RH), between 10 and 90
    randomValue(10, 90, lastHum);    
    hum = lastHum;
}


void syncCallback(Ledger ledger) {
    // In this example, we're not using the syncCallback, but this is where you'd put code
    Log.info("syncCallback called");
}

// This helper function gets a configuration value, first from the product defaults, then
// it checks for a device-specific override
bool getValue(const char *group, const char *key, Variant &value) {
    bool hasKey = false;

    LedgerData defaultData = defaultConfig.get();
    if (defaultData.has(group)) {
        if (defaultData[group].has(key)) {
            value = defaultData[group].get(key);
            hasKey = true;
        }
    }
    LedgerData deviceData = deviceConfig.get();
    if (deviceData.has(group)) {
        if (defaultData[group].has(key)) {
            value = deviceData[group].get(key);
            hasKey = true;
        }        
    }

    return hasKey;    
}

void alertUser(const char *msg) {
    if (Particle.connected()) {
        // Uncomment the following line to enable push notification alerts
        // Particle.publish("push-notification", msg);
    }
    Log.info("alertUser %s", msg);
}

void checkLimits(Variant &data) {
    const char *groups[2] = {
        "temp",
        "hum"
    };

    for(const char *group : groups) {
        // group will be "temp" or "hum"

        // The group name also corresponds to the key in data
        double value = data.get(group).toDouble();

        // Log.info("checking group %s value=%lf", group, value);

        Variant minVariant, maxVariant;

        getValue(group, "min", minVariant);
        getValue(group, "max", maxVariant);
        if (!minVariant.isNull() && !maxVariant.isNull()) {
            // min and max exist in the configuration
            double min = minVariant.toDouble();
            double max = maxVariant.toDouble();
            
            if (min < max) {
                if (value < min || value > max) {
                    Log.info("%s value=%lf not in bounds, min=%lf max=%lf", group, value, min, max);

                    // If the alarm key (array) does not exist, add it here, then append a string key
                    // to the array indicating the groups that are in alarm. 
                    // Example:
                    // value=19.800000 not in bounds, min=20.000000 max=30.000000
                    // value=37.800000 in bounds, min=10.000000 max=80.000000
                    // Generates this JSON:
                    // {"alarm":["temp"],"hum":37.8,"temp":19.8,"time":"2024-01-17T13:52:51Z"}                
                    data["alarm"].append(group);

                    // 
                    String msg = String::format("%s %lf not in range %lf to %lf %s", group, value, min, max, System.deviceID().c_str());
                    alertUser(msg);
                }
                else {
                    Log.info("%s value=%lf in bounds, min=%lf max=%lf", group, value, min, max);
                }     
            }
            else {
                    Log.info("%s value=%lf invalid configuration min=%lf max=%lf", group, value, min, max);
            }

        }   
    }
}

