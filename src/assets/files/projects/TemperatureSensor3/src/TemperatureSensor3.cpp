#include "Particle.h"

#include "sht3x-i2c.h"
#include "FileHelperRK.h"

PRODUCT_VERSION(8);

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SYSTEM_MODE(AUTOMATIC);

// Normally I use USB serial debug logging, but for debugging sleep mode issues, using UART serial
// (Serial1LogHandler) works better because you lose too many messages upon wake. It requires an 
// external USB to UART adapter, however.

// SerialLogHandler logHandler(LOG_LEVEL_TRACE); // // This allows for USB serial debug logs
Serial1LogHandler logHandler2(115200, LOG_LEVEL_TRACE); // This allows for UART serial debug logs at 115200 baud

Sht3xi2c sensor(Wire, 0x44);
bool sensorStarted = false;

// Event name to publish
const char *eventName = "temperatureSensorTest";

// Configuration data is stored in the flash file system. This includes the next check time.
const char *localConfigPath = "/usr/tempconfig.json";
const char *localConfigLastCheckKey = "lastCheck";
Variant localConfig;

// Various configuration parameters that cannot be configured using environment variables
const std::chrono::milliseconds publishTimeout = 120s; // How long to wait for publish to complete (safety check)
const std::chrono::seconds minimumSleepTime = 5min; // If sleep time is less than this long, don't actually sleep because it won't save power and may cause excessive reconnection
const std::chrono::seconds wakeAdvanceTime = 30s; // How much before check time to wake, to allow time to reconnect to cellular
const std::chrono::milliseconds firmwareUpdateWaitTime = 8s; // How long to wait for a firmware update notification after cloud connecting

// Environment variables
int temperaturePeriod = 15; // minutes, make 60 evenly divisible by this for best results
String temperatureSleepMode = "auto"; 

// This version of the code uses Variant and CloudEvent and will only work with Device OS 6.3.0 and later.
CloudEvent event;

bool firmwareUpdateInProgress = false;
unsigned long connectedMillis = 0;

// Forward declaration for finite state machine states
void statePublishWait();
void statePublishCompletionWait();
void stateCheckFirmwareUpdate();
void stateCheckSleep();

// The current finite state machine state, and a millis time value used in some states
std::function<void()> stateHandler = statePublishWait;
unsigned long stateMillis = 0;

// Other forward declarations
bool checkPower(Variant &obj);
bool checkSensor(Variant &obj);
bool i2cscan(TwoWire &wire);
void firmwareUpdateHandler(system_event_t event, int param);


void setup()
{
    // Uncomment the line below if debugging startup by USB serial debug
    // waitFor(Serial.isConnected, 8000); delay(2000);

    System.on(firmware_update, firmwareUpdateHandler);

    // Local configuration stored on the file system
    if (!FileHelperRK::readVariant(localConfigPath, localConfig)) {
        Log.info("localConfig %s", localConfig.toJSON().c_str());
    }
    else {
        Log.info("localConfig not set");
    }

    // TEMPERATURE_PERIOD (minutes)
    // Default: 15 (minutes)
    // How often to take temperature readings and publish
    // Make 60 evenly divisible by this for best results
    int intValue;
    if (System.getEnv("TEMPERATURE_PERIOD", intValue)) {
        if (intValue >= 1) {
            temperaturePeriod = intValue;
            Log.info("temperaturePeriod=%d (minutes)", temperaturePeriod);
        }
    }

    // TEMPERATURE_SLEEP_MODE
    // Default: "auto" 
    // "auto" - Best guess based on period
    // "battery" - Like auto, but only sleep when powered by battery
    // "never" - Never sleep 
    String stringValue;
    if (System.getEnv("TEMPERATURE_SLEEP_MODE", stringValue)) {
        temperatureSleepMode = stringValue;
        Log.info("temperatureSleepMode=%s", temperatureSleepMode.c_str());
    }
    
}

void loop()
{
    stateHandler();
}

void statePublishWait() 
{
    if (!Particle.connected()) {
        // Not cloud connected, try again later
        connectedMillis = 0;
        return;
    }

    if (connectedMillis == 0) {
        connectedMillis = millis();
    }

    if (!Time.isValid()) {
        // No valid time, wait before publishing
        return;
    }

    // Check time
    bool checkNow = false;
    
    if (!localConfig.has(localConfigLastCheckKey) || localConfig.get(localConfigLastCheckKey).toInt() > Time.now()) {
        // If there is no lastCheck time, set it to the current time rounded down to the temperaturePeriod
        int lastCheck = (int) Time.now();
        lastCheck -= Time.second();
        lastCheck -= (Time.minute() % temperaturePeriod) * 60;  
        localConfig.set(localConfigLastCheckKey, Variant(lastCheck));
    }

    int lastCheck = localConfig.get(localConfigLastCheckKey).toInt();
    int nextCheck = lastCheck + temperaturePeriod * 60;

    if (nextCheck <= Time.now()) {
        checkNow = true;
        Log.info("checking now lastCheck %d %s, nextCheck %d %s, temperaturePeriod %d", lastCheck, Time.timeStr(lastCheck).c_str(), nextCheck, Time.timeStr(nextCheck).c_str(), temperaturePeriod);

        // Handle the case where we skipped checks
        while(nextCheck <= Time.now()) {
            nextCheck += temperaturePeriod * 60;
        }        

        lastCheck = nextCheck - temperaturePeriod * 60;
        Log.info("lastCheck updated to %d %s", lastCheck, Time.timeStr(lastCheck).c_str());

        localConfig.set(localConfigLastCheckKey, Variant(lastCheck));
        FileHelperRK::storeVariant(localConfigPath, localConfig);
    }

    if (checkNow) { 
        Variant obj;
        event.clear();

        // Add power information to event on devices with a PMIC
        (void) checkPower(obj);

        // Add the sensor values
        (void) checkSensor(obj);

        // Optional: Also include the next check time in the event
        obj.set(localConfigLastCheckKey, Variant(localConfig.get(localConfigLastCheckKey).toInt()));
        obj.set("temperaturePeriod", Variant(temperaturePeriod));

        event.name(eventName);
        event.data(obj);

        Particle.publish(event);
        Log.info("published %s", obj.toJSON().c_str());

        stateHandler = statePublishCompletionWait;
        stateMillis = millis();
    }
    else {
        stateHandler = stateCheckFirmwareUpdate;
    }

}

void statePublishCompletionWait() {
    if (event.isSent()) {
        Log.info("publish succeeded");
        event.clear();
        stateHandler = stateCheckFirmwareUpdate;
    }
    else 
    if (!event.isOk()) {
        Log.info("publish failed error=%d", event.error());
        // It might be reasonable to retry publishing here instead
        stateHandler = stateCheckFirmwareUpdate;
    }
    else
    if (millis() - stateMillis >= publishTimeout.count()) {
        // Timeout
        Log.info("publish timeout");
        event.cancel();
        // It might be reasonable to retry publishing here instead
        stateHandler = stateCheckFirmwareUpdate;
    }

    // Wait for completion
}

void stateCheckFirmwareUpdate() {
    // Wait for firmware updates if necessary

    if (millis() - connectedMillis < firmwareUpdateWaitTime.count()) {
        // Firmware notifications can take a short period of time to arrive
        return;
    }

    if (firmwareUpdateInProgress) {
        // Update is in progress, wait
        return;
    }

    // Done waiting, check to see if we can sleep
    stateHandler = stateCheckSleep;
}

void stateCheckSleep() {
    static bool showLog = true;

    int lastCheck = localConfig.get(localConfigLastCheckKey).toInt();

    int nextCheck = lastCheck + temperaturePeriod * 60;

    int secondsToNextWake = nextCheck - Time.now() - wakeAdvanceTime.count();

    if (temperatureSleepMode == "never") {
        // Never attempt to sleep
        if (showLog) {
            Log.info("never mode, staying awake, secondsToNextWake=%d", secondsToNextWake);
            showLog = false;
        }
        secondsToNextWake = 0;
    }
    else {
        // "auto" or "battery"

#if HAL_PLATFORM_POWER_MANAGEMENT
        if (temperatureSleepMode == "battery" && System.powerSource() != POWER_SOURCE_BATTERY) 
        {
            // In battery mode, if not powered by battery, stay awake            
            secondsToNextWake = 0;
            if (showLog) {
                Log.info("battery mode but externally powered, staying awake, secondsToNextWake=%d", secondsToNextWake);
                showLog = false;
            }
        }
        else 
#endif // HAL_PLATFORM_POWER_MANAGEMENT
        {
            // auto mode
            // or 
            // battery mode and powered by a battery
            
            // sleep based on time
            if (secondsToNextWake >= minimumSleepTime.count()) {
                // Longer than minimum sleep time, use secondsToNextWake                
            }
            else {
                // Next wake is too close, just stay awake
                if (showLog) {
                    Log.info("time to wake too short, staying awake, secondsToNextWake=%d", secondsToNextWake);
                    showLog = false;
                }
                secondsToNextWake = 0;
            }
        }
    }

    if (secondsToNextWake > 0) {
        connectedMillis = 0;
        showLog = true;

        Log.info("going to sleep for %d seconds, wake at %s", secondsToNextWake, 
            Time.timeStr(Time.now() + secondsToNextWake).c_str());
        SystemSleepConfiguration config;

        config.mode(SystemSleepMode::ULTRA_LOW_POWER)
            .duration(secondsToNextWake * 1000);

        System.sleep(config);

        // With STOP and ULP sleep, execution continues after the sleep call on wake
        // (also on error)
    }

    
    // Stay awake (don't log here because this state is executed continuously when not sleeping)
    stateHandler = statePublishWait;
}


bool checkPower(Variant &obj) 
{
    String s;

    // These calls are only available on devices with a bq24195 PMIC
    // Power and battery information will be omitted for P2, Photon 2, P2, and Argon
#if HAL_PLATFORM_POWER_MANAGEMENT

    switch(System.powerSource()) {
        case POWER_SOURCE_VIN:
            s = "VIN";
            break;

        case POWER_SOURCE_USB_HOST:
            s = "USB Host";
            break;

        case POWER_SOURCE_USB_ADAPTER:
            s = "USB Adapter";
            break;

        case POWER_SOURCE_BATTERY:
            s = "Battery";
            break;

        case POWER_SOURCE_UNKNOWN:
        default:
            s = "Unknown";
            break;
    }
    obj.set("power", Variant(s));

    switch(System.batteryState()) {
        case BATTERY_STATE_NOT_CHARGING:
            s = "Not Charging";
            break;

        case BATTERY_STATE_CHARGING:
            s = "Charging";
            break;
            
        case BATTERY_STATE_CHARGED:
            s = "Charged";
            break;

        case BATTERY_STATE_DISCHARGING:
            s = "Discharging";
            break;

        case BATTERY_STATE_FAULT:
            s = "Fault";
            break;

        case BATTERY_STATE_UNKNOWN:
        default:
            s = "Unknown";
            break;
    }
    obj.set("battery", Variant(s));

    obj.set("soc", Variant(System.batteryCharge()));
#endif // HAL_PLATFORM_POWER_MANAGEMENT
    
    return true;
}


bool checkSensor(Variant &obj) 
{
    double temp, humid;

    if (!sensorStarted) {
        sensor.begin(CLOCK_SPEED_400KHZ);

        sensorStarted = true;
    }

    for(int tries = 1; tries <= 3; tries++) {
        // Using single_shot mode allows the sensor to go into low-power mode after reading the value
        int err = sensor.single_shot(&temp, &humid, SHT31_ACCURACY_MEDIUM);
        if (err == 0)
        {
            // Log.info("temp=%.2lf hum=%.2lf", temp, humid);

            obj.set("temp", Variant(temp));
            obj.set("humid", Variant(humid));

            return true;
        }

        Log.info("failed to get reading try=%d result=%d", tries, err);
        delay(1000);
    }

    sensorStarted = false;
    i2cscan(Wire);

    return false;
}

// This is for debugging only
bool i2cscan(TwoWire &wire) {
    bool bFound = false;

	Log.info("Scanning I2C bus...");

	int numDevices = 0;

	// Address 0x79 to 0x7f are reserved, don't scan them
	for(byte address = 1; address < 0x78; address++) {
		wire.beginTransmission(address);
		byte error = wire.endTransmission();

		if (error == 0) {
			const char *deviceName = NULL;

			switch(address) {
                case 0x44:
                    deviceName = "SHT3x temperature sensor (default address)";
                    break;

                case 0x45:
                    deviceName = "SHT3x temperature sensor (alternate address)";
                    break;

                case 0x48:
                    deviceName = "TMP112A temperature sensor";
                    break;

                case 0x76:
                    deviceName = "BME280 temperature and humidity sensor";
                    break;
			}
			if (deviceName != NULL) {
				Log.info("%s found at address 0x%02x", deviceName, address);
                bFound = true;
			}
			else {
				Log.info("Unknown I2C device found at address 0x%02x", address);
			}

			numDevices++;
		}
		else if (error == 4) {
			Log.info("Unknown I2C error at address 0x%2x", address);
		}
	}

	Log.info("%d I2C devices found", numDevices);

    return bFound;
}

void firmwareUpdateHandler(system_event_t ev, int param) {
    switch(param) {
        case firmware_update_begin:
            firmwareUpdateInProgress = true;
            break;

        case firmware_update_complete:
        case (int)firmware_update_failed:
            firmwareUpdateInProgress = false;
            break;
    }
}
