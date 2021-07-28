#include "Particle.h"

SYSTEM_THREAD(ENABLED);

SerialLogHandler logHandler;

void connectedCallback(const BlePeerDevice& peer, void* context);
void disconnectedCallback(const BlePeerDevice& peer, void* context);
void onPairingEvent(const BlePairingEvent& event, void* context);
void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context);


BleUuid serviceUuid("46dec950-efd2-44e3-abc3-bdfd08d63cfe");
BleUuid counterCharacteristicUuid("520be804-2cc6-455e-b449-558a4555687e");

// 
BleCharacteristic counterCharacteristic("counter", BleCharacteristicProperty::WRITE, counterCharacteristicUuid, serviceUuid, onDataReceived, NULL);


void setup() {
	waitFor(Serial.isConnected, 10000);

	BLE.on();

	BLE.onConnected(connectedCallback, NULL);
	BLE.onDisconnected(disconnectedCallback, NULL);

	BLE.setPairingIoCaps(BlePairingIoCaps::DISPLAY_ONLY);
	BLE.setPairingAlgorithm(BlePairingAlgorithm::LESC_ONLY);

	BLE.onPairingEvent(onPairingEvent);

    BLE.addCharacteristic(counterCharacteristic);

    BleAdvertisingData advData;
    advData.appendServiceUUID(serviceUuid);
    BLE.advertise(&advData);
}

void loop() {

}


void connectedCallback(const BlePeerDevice& peer, void* context) {
	Log.info("connected");

}

void disconnectedCallback(const BlePeerDevice& peer, void* context) {
	Log.info("disconnected");

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

	Log.info("dataReceived %d", *(const int *)data);
}



