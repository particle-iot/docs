// We define MY_LED to be the LED that we want to blink. 
//
// In this tutorial, we're using the blue D7 LED (next to D7 on the Photon 
// and Electron, and next to the USB connector on the Argon and Boron).
const pin_t MY_LED = D7;

// The following line is optional, but recommended in most firmware. 
// It allows your code to run before the cloud is connected.
SYSTEM_THREAD(ENABLED);

// This function is called when the Particle.function is called
int ledToggle(String command) {
	if (command.equals("on")) {
        digitalWrite(MY_LED, HIGH);
        return 1;
    }
    else if (command.equals("off")) {
        digitalWrite(MY_LED, LOW);
        return 0;
    }
    else {
		// Unknown option
        return -1;
    }
}

// The setup() method is called once when the device boots.
void setup() {
	// In order to set a pin, you must tell Device OS that the 
    // pin is an OUTPUT pin.
	// This is often done from setup() since you only need to 
    // do it once.
	pinMode(MY_LED, OUTPUT);

	// This registers a function call. When the function "led" 
    // is called from the cloud, the ledToggle() function above
    // will be called.
	Particle.function("led", ledToggle);
}

void loop() {
}

