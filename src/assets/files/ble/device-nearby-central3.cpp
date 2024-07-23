#include "Particle.h"

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler(LOG_LEVEL_TRACE);

const size_t SCAN_RESULT_MAX = 30;

BleScanResult scanResults[SCAN_RESULT_MAX];
LEDStatus ledOverride(RGB_COLOR_WHITE, LED_PATTERN_SOLID, LED_SPEED_NORMAL, LED_PRIORITY_IMPORTANT);

void setup() {
	(void)logHandler; // Does nothing, just to eliminate the unused variable warning

	BLE.on();
}

void loop() {
	// Only scan for 500 milliseconds
	BLE.setScanTimeout(50);
	int count = BLE.scan(scanResults, SCAN_RESULT_MAX);

	uint32_t curColorCode;
	int curRssi = -999;

	for (int ii = 0; ii < count; ii++) {
		uint8_t buf[BLE_MAX_ADV_DATA_LEN];
		size_t len;

		// When getting a specific AD Type, the length returned does not include the length or AD Type so len will be one less
		// than what we put in the beacon code, because that includes the AD Type.
		len = scanResults[ii].advertisingData().get(BleAdvertisingDataType::MANUFACTURER_SPECIFIC_DATA, buf, BLE_MAX_ADV_DATA_LEN);
		if (len == 7) {
			// We have manufacturer-specific advertising data (0xff) and it's 7 bytes (without the AD type)

			// Byte: BLE_SIG_AD_TYPE_MANUFACTURER_SPECIFIC_DATA (0xff)
			// 16-bit: Company ID (0xffff)
			// Byte: Internal packet identifier (0x55)
			// 32-bit: Color code

			if (buf[0] == 0xff && buf[1] == 0xff && buf[2] == 0x55) {
				// Company ID and internal packet identifier match

				uint32_t colorCode;
				memcpy(&colorCode, &buf[3], 4);

				Log.info("colorCode: 0x%lx rssi=%d address=%02X:%02X:%02X:%02X:%02X:%02X ",
						colorCode, scanResults[ii].rssi(),
						scanResults[ii].address()[5], scanResults[ii].address()[4], scanResults[ii].address()[3],
						scanResults[ii].address()[2], scanResults[ii].address()[1], scanResults[ii].address()[0]);

				if (scanResults[ii].rssi() > curRssi) {
					// Show whatever device has the strongest signal
					curRssi = scanResults[ii].rssi();
					curColorCode = colorCode;
				}
			}
		}
	}
	if (curRssi != -999) {
		ledOverride.setColor(curColorCode);
		ledOverride.setActive(true);
	}
	else {
		ledOverride.setActive(false);
	}
}
