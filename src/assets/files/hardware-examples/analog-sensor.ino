// The following line is optional, but recommended in most firmware.
// It allows your code to run before the cloud is connected.
SYSTEM_THREAD(ENABLED);

// This uses the USB serial port for debugging logs.
SerialLogHandler logHandler;

// This is where your LED is plugged in. The other side goes to a resistor
// connected to GND.
const pin_t LED_PIN = D6;

// This is where your photoresistor or phototransistor is plugged in.
const pin_t SENSOR_PIN = A0;

// Here we are declaring the integer variable analogvalue, which we will
// use later to store the value of the photoresistor or phototransistor.
int analogvalue;

int ledToggle(String command); // Forward declaration

void setup()
{
    // First, declare all of our pins. This lets our device know which ones
    // will be used for outputting voltage, and which ones will read
    // incoming voltage.
    pinMode(LED_PIN, OUTPUT); // Our LED pin is output (lighting up the LED)
    digitalWrite(LED_PIN, HIGH);

    // We are going to declare a Particle.variable() here so that we can
    // access the value of the photosensor from the cloud.
    Particle.variable("analogvalue", analogvalue);

    // We are also going to declare a Particle.function so that we can turn
    // the LED on and off from the cloud.
    Particle.function("led", ledToggle);
}

void loop()
{
    // Check to see what the value of the photoresistor or phototransistor is
    // and store it in the int variable analogvalue
    analogvalue = analogRead(SENSOR_PIN);

    // This prints the value to the USB debugging serial port (for optional
    // debugging purposes)
    Log.info("analogvalue=%d", analogvalue);

    // This delay is just to prevent overflowing the serial buffer, plus we
    // really don't need to read the sensor more than
    // 10 times per second (100 millisecond delay)
    delay(100ms);
}

// This function is called when the Particle.function is called
int ledToggle(String command)
{
    if (command.equals("on"))
    {
        digitalWrite(LED_PIN, HIGH);
        return 1;
    }
    else if (command.equals("off"))
    {
        digitalWrite(LED_PIN, LOW);
        return 0;
    }
    else
    {
        // Unknown option
        return -1;
    }
}
