// This isn't always required, but it's a good habit to get into and it
// never hurts.
#include "Particle.h"

// The following line is optional, but recommended in most firmware. It
// allows your code to run before the cloud is connected.
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This uses the USB serial port for debugging logs.
SerialLogHandler logHandler;

// The sensor (or a potentiometer for demonstration purposes is connected
// to this analog input pin
const pin_t SENSOR_PIN = A0;

// To reduce jitter we take the average of 50 analog readings, done 1000 times
// per second, and take the mean.
const size_t NUM_SAMPLES_TO_AVERAGE = 50;
int16_t samples[NUM_SAMPLES_TO_AVERAGE];
size_t sampleIndex = 0;

const int MIN_DELTA_TO_PUBLISH = 5;
const std::chrono::milliseconds MIN_PUBLISH_PERIOD = 1s;
unsigned long lastPublish;
unsigned long lastLog;
int lastValue = 0;

const char *EVENT_NAME = "sensorValueEvent";

void setup()
{
}

void loop()
{
    samples[sampleIndex++ % NUM_SAMPLES_TO_AVERAGE] = (int16_t)analogRead(SENSOR_PIN);
    if (sampleIndex >= NUM_SAMPLES_TO_AVERAGE)
    {
        // Sum the recent samples to calculate the mean
        int sum = 0;
        for (size_t ii = sampleIndex - NUM_SAMPLES_TO_AVERAGE; ii < sampleIndex; ii++)
        {
            sum += (int)samples[ii % NUM_SAMPLES_TO_AVERAGE];
        }
        int mean = (sum / NUM_SAMPLES_TO_AVERAGE);

        // Check if it's time to publish and the value changed by more than
        int delta = abs(mean - lastValue);
        if (delta > MIN_DELTA_TO_PUBLISH &&
            millis() - lastPublish >= MIN_PUBLISH_PERIOD.count() &&
            Particle.connected())
        {
            //
            lastPublish = millis();
            lastValue = mean;
            Particle.publish(EVENT_NAME, String(mean));
            Log.info("published %d", mean);
        }

        if (millis() - lastLog > 1000)
        {
            lastLog = millis();
            Log.info("  mean=%d lastPublish=%d", mean, lastValue);
        }
    }
}
