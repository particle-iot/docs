#include "Particle.h"


SYSTEM_THREAD(ENABLED);

SerialLogHandler logHandler;

void onPairingEvent(const BlePairingEvent& event, void* context);
void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context);
void scanResultCallback(const BleScanResult *scanResult, void *context);
void stateConnect();
void stateRun();


BleUuid serviceUuid("46dec950-efd2-44e3-abc3-bdfd08d63cfe");
BleUuid counterCharacteristicUuid("520be804-2cc6-455e-b449-558a4555687e");

BlePeerDevice peer;
BleCharacteristic counterCharacteristic;

enum class State {
	SCAN,
	CONNECT,
	RUN,
	WAIT
};
State state = State::SCAN;
unsigned long stateTime;
BleAddress serverAddr;
int counter = 0;

void setup() {
	waitFor(Serial.isConnected, 10000);

	BLE.on();

#if SYSTEM_VERSION == SYSTEM_VERSION_v310
	// This is required with 3.1.0 only
	BLE.setScanPhy(BlePhy::BLE_PHYS_AUTO);
#endif
	BLE.setPairingIoCaps(BlePairingIoCaps::DISPLAY_YESNO);
	BLE.setPairingAlgorithm(BlePairingAlgorithm::LESC_ONLY);

	BLE.onPairingEvent(onPairingEvent);

}

void loop() {
	switch(state) {
		case State::SCAN:
			state = State::WAIT;
			BLE.scan(scanResultCallback, NULL);
			break;
			
		case State::CONNECT:
			stateConnect();
			break;

		case State::RUN:
			stateRun();
			break;

		case State::WAIT:
			if (millis() - stateTime >= 5000) {
				state = State::SCAN;
			}
			break;
	}

}


void scanResultCallback(const BleScanResult *scanResult, void *context) {

	BleUuid foundServiceUuid;
	size_t svcCount = scanResult->advertisingData().serviceUUID(&foundServiceUuid, 1);
	if (svcCount == 0 || !(foundServiceUuid == serviceUuid)) {
		Log.info("ignoring %02X:%02X:%02X:%02X:%02X:%02X, not our service",
				scanResult->address()[5], scanResult->address()[4], scanResult->address()[3],
				scanResult->address()[2], scanResult->address()[1], scanResult->address()[0]);
		return;
	}

	Log.info("found server %02X:%02X:%02X:%02X:%02X:%02X",
			scanResult->address()[5], scanResult->address()[4], scanResult->address()[3],
			scanResult->address()[2], scanResult->address()[1], scanResult->address()[0]);

	serverAddr = scanResult->address();
	state = State::CONNECT;

	// We always stop scanning after the first lock device is found
	BLE.stopScanning();
}

void onPairingEvent(const BlePairingEvent& event, void* context) {
	if (event.type == BlePairingEventType::REQUEST_RECEIVED) {
		Log.info("onPairingEvent REQUEST_RECEIVED");
	}
	else
	if (event.type == BlePairingEventType::PASSKEY_DISPLAY) {
		char passKeyStr[BLE_PAIRING_PASSKEY_LEN + 1];
		memcpy(passKeyStr, event.payload.passkey, BLE_PAIRING_PASSKEY_LEN);
		passKeyStr[BLE_PAIRING_PASSKEY_LEN] = 0;

		Log.info("onPairingEvent PASSKEY_DISPLAY %s", passKeyStr);
	}
	else
	if (event.type == BlePairingEventType::STATUS_UPDATED) {
		Log.info("onPairingEvent STATUS_UPDATED status=%d lesc=%d bonded=%d", 
			event.payload.status.status,
			(int)event.payload.status.lesc,
			(int)event.payload.status.bonded);
	}
	else
	if (event.type == BlePairingEventType::NUMERIC_COMPARISON) {
		Log.info("onPairingEvent NUMERIC_COMPARISON");
	}
}


void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
	Log.info("dataReceived");
}

void stateConnect() {
	Log.info("about to connect");

	peer = BLE.connect(serverAddr);
	if (!peer.connected()) {
		Log.info("failed to connect, retrying");
		state = State::WAIT;
		stateTime = millis();
		return;
	}
	Log.info("Connected, starting pairing...");

	peer.getCharacteristicByUUID(counterCharacteristic, counterCharacteristicUuid);
	
	BLE.startPairing(peer);

	state = State::RUN;
	stateTime = millis();
}

void stateRun() {
	if (!peer.connected()) {
		// Server disconnected
		state = State::WAIT;
		stateTime = millis();
		return;
	}
	if (BLE.isPairing(peer)) {
		// Still in process of doing LESC secure pairing
		return;
	}
	if (millis() - stateTime < 2000) {
		return;
	}
	stateTime = millis();

    counterCharacteristic.setValue((const uint8_t *)&counter, sizeof(counter));
	Log.info("sent counter=%d", counter);
	counter++;
}


