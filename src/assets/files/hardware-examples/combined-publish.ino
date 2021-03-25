// --------------------------------------------
// Combining many data points into one Publish
/* --------------------------------------------

This short bit of code samples an analog sensor connected to A0
every 10 minutes (600,000 milliseconds) and publishes 5 readings
at a time to the cloud. Combining what could be several publishes
into a single publish message saves lots of data, and this example
can easily be modified to send more data points at once, change the
sampling rate, or read a different sensor.

------------------------------------------*/

// Create an array with 5 locations to store values in
int light[5];

// The variable we'll use to keep track of where we are in the array
int i = 0;

// This is where we'll store the last time a measurement was taken
long lastMeasurement = 0;

void setup()
{
}

void loop()
{

    /* This statement is incredibly useful.
    millis() tells us what the current time is in milliseconds
    lastMeasurement will be when we recorded last; it starts out as 0 because we've never measured
    If the difference in milliseconds between the current time and the last time we've measured
    is more than 600,000 milliseconds (ten minutes) then... do all the things!
    */
    if (millis() - lastMeasurement > 600000)
    {
        // Measure the value on the photoresistor, and put it into the array
        light[i] = analogRead(A0);

        // Keep track of when last measurement was taken
        lastMeasurement = millis();

        // If we've taken 5 measurements (0-4, inclusive) then we should send that data
        if (i == 4)
        {
            /* We're using a short event name "T" to reduce data transmitted
            String::format will create a single string for us out of many data points
            Each %d means to put an integer there. %s is used for strings.
            To learn more, read https://en.wikipedia.org/wiki/Printf_format_string
            Since this will only happen every 5 measurements, we can assume these publishes will be 50 minutes apart*/
            Particle.publish("L", String::format("%d,%d,%d,%d,%d", light[0], light[1], light[2], light[3], light[4]));
            // Reset index to beginning
            i = 0;
        }
        else
        {
            // If it wasn't the 5th measurement, increase the index by 1
            i++;
        }
    }
}
