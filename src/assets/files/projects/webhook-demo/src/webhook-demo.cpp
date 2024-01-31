#include "Particle.h"

SerialLogHandler logHandler;
SYSTEM_THREAD(ENABLED);

PRODUCT_VERSION(1);

const char *eventName = "WebhookDemo01";

const std::chrono::milliseconds publishInterval = 5min;
unsigned long lastPublishMillis = -publishInterval.count();
int hookSequence = 0;
bool buttonClicked = false;
int firmwareVersion = (int) __system_product_version;

void hookResponseHandler(const char *event, const char *data);
void clickHandler(system_event_t event, int param);
float readTemperatureC();
void publishSensorData();

void setup() 
{
    Particle.subscribe(System.deviceID() + "/hook-response/" + String(eventName), hookResponseHandler);

    // This variable is used to more easily identify which product firmware is running
    Particle.variable("WebhookDemo01", firmwareVersion);

    // Register a click handler for the MODE button
    System.on(button_click, clickHandler);
}

void loop() 
{
    if (hookSequence == 0 && Particle.connected())
    {
        // Wait until Particle.connected because the rand() is seeded from the cloud
        hookSequence = rand();
    }

    if (Particle.connected() && millis() - lastPublishMillis >= publishInterval.count()) {
        lastPublishMillis = millis();

        publishSensorData();
    }

    if (buttonClicked)
    {
        buttonClicked = false;
        if (Particle.connected()) {
            publishSensorData();
        }
    }
}


void hookResponseHandler(const char *event, const char *data)
{
    Log.info("hook response %s", data);
}

// MODE button click handler
void clickHandler(system_event_t event, int param)
{
    // int times = system_button_clicks(param);

    // This can be called from an interrupt context so you can only use the small
    // number of interrupt-safe functions here
    buttonClicked = true;
}

float readTemperatureC() 
{
    // This code doesn't actually read the temperature, it just returns a random number,
    // but you could easily put the code to read an actual sensor here.
    static float lastTemperatureC = -100;

    if (lastTemperatureC != -100) {
        lastTemperatureC += (float) ((rand() % 6) - 3);
    }
    else {
        lastTemperatureC = (float) (rand() % 40);
    }
    return lastTemperatureC;
}

void publishSensorData()
{
    char publishDataBuf[particle::protocol::MAX_EVENT_DATA_LENGTH + 1];

    JSONBufferWriter writer(publishDataBuf, sizeof(publishDataBuf) - 1);

    float temperatureC = readTemperatureC();

    writer.beginObject();
    writer.name("id").value(hookSequence++);
    writer.name("t").value(temperatureC);
#if HAL_PLATFORM_POWER_MANAGEMENT
    writer.name("powerSource").value(System.powerSource());
    writer.name("soc").value(System.batteryCharge());
#endif
    writer.endObject();
    writer.buffer()[std::min(writer.bufferSize(), writer.dataSize())] = 0;

    Particle.publish(eventName, publishDataBuf);
}
