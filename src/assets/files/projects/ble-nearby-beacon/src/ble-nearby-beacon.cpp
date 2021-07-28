#include "Particle.h"

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler(LOG_LEVEL_TRACE);

const uint32_t myColor = 0xff0000;
// 0xff0000 = red
// 0x00ff00 = green
// 0x0000ff = blue

void setAdvertisingData();

void setup() {
	(void)logHandler; // Does nothing, just to eliminate the unused variable warning

	BLE.on();

	setAdvertisingData();
}

void loop() {

}

void setAdvertisingData() {
	uint8_t buf[BLE_MAX_ADV_DATA_LEN];

	size_t offset = 0;

	// Manufacturer-specific data
	// 16-bit: Company ID (0xffff)
	// Byte: Internal packet identifier (0x55)
	// 32-bit: Color code

	// Company ID (0xffff internal use/testing)
	buf[offset++] = 0xff;
	buf[offset++] = 0xff;

	// Internal packet type. This is arbitrary, but provides an extra
	// check to make sure the data is my data, since we use the 0xffff company
	// code.
	buf[offset++] = 0x55;

	// Our specific data, color code
	memcpy(&buf[offset], &myColor, 4);
	offset += 4;

	BleAdvertisingData advData;
	advData.appendCustomData(buf, offset);

	// Advertise every 100 milliseconds. Unit is 0.625 millisecond intervals.
	BLE.setAdvertisingInterval(160);

	// Continuously advertise
	BLE.advertise(&advData);
}
