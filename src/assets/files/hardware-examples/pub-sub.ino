
// -------------------------------------------------------------
// Publish and Subscribe with photoresistors or phototransistors
/* -------------------------------------------------------------

This example requires two Particle devices claimed to the same account.
Each of you should flash the code to your device.
Breaking the beam on one device will turn on the D7 LED on the second device.
But how does this magic work? Through the miracle of publish and subscribe.
We are going to Particle.publish an event to the cloud.

------------------------------------------*/

int led = D6;
int boardLed = D7;
int photosensor = A0;

int intactValue;
int brokenValue;
int beamThreshold;

bool beamBroken = false;

void myHandler(const char *event, const char *data); // forward declaration

// We start with the setup function.

void setup()
{
	// This part is mostly the same:
	pinMode(led, OUTPUT);	   // Our LED pin is output (lighting up the LED)
	pinMode(boardLed, OUTPUT); // Our on-board LED is output as well

	// Here we are going to subscribe to "beamStatus" events
	Particle.subscribe("beamStatus", myHandler);
	// Subscribe will listen for the event beamStatus and, when it finds it, will run the function myHandler()

	// Since everyone sets up their LEDs differently, we are also going to start by calibrating our photosensor.
	// This one is going to require some input from the user!

	// Calibrate:
	// First, the D7 LED will go on to tell you to put your hand in front of the beam.
	digitalWrite(boardLed, HIGH);
	delay(2000);

	// Then, the D7 LED will go off and the LED will turn on.
	digitalWrite(boardLed, LOW);
	digitalWrite(led, HIGH);
	delay(500);

	// Now we'll take some readings...
	int off_1 = analogRead(photosensor); // read photosensor
	delay(200);							 // wait 200 milliseconds
	int off_2 = analogRead(photosensor); // read photosensor
	delay(1000);						 // wait 1 second

	// Now flash to let us know that you've taken the readings...
	digitalWrite(boardLed, HIGH);
	delay(100);
	digitalWrite(boardLed, LOW);
	delay(100);
	digitalWrite(boardLed, HIGH);
	delay(100);
	digitalWrite(boardLed, LOW);
	delay(100);

	// Now the D7 LED will go on to tell you to remove your hand...
	digitalWrite(boardLed, HIGH);
	delay(2000);

	// The D7 LED will turn off...
	digitalWrite(boardLed, LOW);

	// ...And we will take two more readings.
	int on_1 = analogRead(photosensor); // read photosensor
	delay(200);							// wait 200 milliseconds
	int on_2 = analogRead(photosensor); // read photosensor
	delay(300);							// wait 300 milliseconds

	// Now flash the D7 LED on and off three times to let us know that we're ready to go!
	digitalWrite(boardLed, HIGH);
	delay(100);
	digitalWrite(boardLed, LOW);
	delay(100);
	digitalWrite(boardLed, HIGH);
	delay(100);
	digitalWrite(boardLed, LOW);
	delay(100);
	digitalWrite(boardLed, HIGH);
	delay(100);
	digitalWrite(boardLed, LOW);

	intactValue = (on_1 + on_2) / 2;
	brokenValue = (off_1 + off_2) / 2;
	beamThreshold = (intactValue + brokenValue) / 2;
}

void loop()
{
	// This loop sends a publish when the beam is broken.
	if (analogRead(photosensor) > beamThreshold)
	{
		if (beamBroken == true)
		{
			Particle.publish("beamStatus", "intact");
			// publish this event

			// Set the flag to reflect the current status of the beam.
			beamBroken = false;
		}
	}

	else
	{
		if (beamBroken == false)
		{
			// Same deal as before...
			Particle.publish("your_unique_event_name", "broken", PUBLIC);
			beamBroken = true;
		}
	}
}

// Now for the myHandler function, which is called when the cloud tells us that an event is published.
void myHandler(const char *event, const char *data)
{
	/* Particle.subscribe handlers are void functions, which means they don't return anything.
	  They take two variables-- the name of your event, and any data that goes along with your event.
	  In this case, the event will be "beamStatus" and the data will be "intact" or "broken"

	  Since the input here is a char, we can't do
		 data=="intact"
		or
		 data=="broken"

	  chars just don't play that way. Instead we're going to strcmp(), which compares two chars.
	  If they are the same, strcmp will return 0.
	 */

	if (strcmp(data, "intact") == 0)
	{
		// if the beam is intact, then turn your board LED off
		digitalWrite(boardLed, LOW);
	}
	else if (strcmp(data, "broken") == 0)
	{
		// if the beam is broken, turn your board LED on
		digitalWrite(boardLed, HIGH);
	}
	else
	{
		// if the data is something else, don't do anything.
		// Really the data shouldn't be anything but those two listed above.
	}
}
