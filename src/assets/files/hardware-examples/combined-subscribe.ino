// ---------------------------------------------------
// Parsing publishes that contain multiple data points
/* ---------------------------------------------------

Subscribing the the example above, this example will listen for data from
the "L" event, split it up, and put it into the subscribeData array.

------------------------------------------*/

// Create an array with 5 locations to store values from the subscribe
int subscribeData[5];

void setup()
{

    Particle.subscribe("L", myHandler);

    // Note that this will subscribe to all events beginning with the name "L"
    // for devices claimed to the same account.
}

void loop()
{
    // nothing here...
}

void myHandler(const char *event, const char *data)
{
    if (data)
    {
        char input[64];
        strcpy(input, data);
        char *p;
        p = strtok(input, ",");
        subscribeData[0] = atoi(p);
        p = strtok(NULL, ",");
        subscribeData[1] = atoi(p);
        p = strtok(NULL, ",");
        subscribeData[2] = atoi(p);
        p = strtok(NULL, ",");
        subscribeData[3] = atoi(p);
        p = strtok(NULL, ",");
        subscribeData[4] = atoi(p);
        Serial.print("Got data: ");
        Serial.print(subscribeData[0]);
        Serial.print(",");
        Serial.print(subscribeData[1]);
        Serial.print(",");
        Serial.print(subscribeData[2]);
        Serial.print(",");
        Serial.print(subscribeData[3]);
        Serial.print(",");
        Serial.println(subscribeData[4]);
    }
}
