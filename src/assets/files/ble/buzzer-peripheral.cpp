#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler;

uint32_t myColor = 0xff0000;

const uint16_t STATUS_RED = A0;
const uint16_t STATUS_GREEN = A1;
const uint16_t STATUS_BLUE = A2;
const uint16_t SWITCH_PIN = D6;
const uint16_t SWITCH_LED_PIN = D5;

BleUuid serviceUuid("09b17c16-3498-4c02-beb6-3d5792528181");
BleUuid buttonCharacteristicUuid("fe0a8cd7-9f69-45c7-b7a1-3ecb0c9e97c7");

BleCharacteristic buttonCharacteristic("b", BleCharacteristicProperty::NOTIFY, buttonCharacteristicUuid, serviceUuid);

volatile bool buttonPressed = false;

void setStatusLed(uint32_t color);
void interruptHandler();

void setup() {
	pinMode(STATUS_RED, OUTPUT);
	pinMode(STATUS_GREEN, OUTPUT);
	pinMode(STATUS_BLUE, OUTPUT);
	setStatusLed(0x000000);

	pinMode(SWITCH_LED_PIN, OUTPUT);

	pinMode(SWITCH_PIN, INPUT_PULLUP);
	attachInterrupt(SWITCH_PIN, interruptHandler, FALLING);

	BLE.on();

    BLE.addCharacteristic(buttonCharacteristic);

    BleAdvertisingData data;
    data.appendServiceUUID(serviceUuid);
    BLE.advertise(&data);
}

void loop() {
    if (BLE.connected()) {
		if (buttonPressed) {
			// Button was pressed, turn on LED button
			digitalWrite(SWITCH_LED_PIN, 1);

			buttonPressed = false;

			// Transmit color to central to indicate button pressed
			buttonCharacteristic.setValue((uint8_t *)&myColor, sizeof(myColor));
		}

		// Lock out delay/debounce
		delay(1000);
		digitalWrite(SWITCH_LED_PIN, 0);

		// Set status to light green
    	setStatusLed(0x004000);
    }
    else {
    	// Not connected to central - set status to light red
    	setStatusLed(0x400000);
    }
}

void setStatusLed(uint32_t color) {
	// The SwitchDemo board uses a common anode LED, so values are 0 = on full, 255 = off
	analogWrite(STATUS_RED, 255 - ((color >> 16) & 0xff));
	analogWrite(STATUS_GREEN, 255 - ((color >> 8) & 0xff));
	analogWrite(STATUS_BLUE, 255 - (color & 0xff));
}

void interruptHandler() {
	buttonPressed = true;
}