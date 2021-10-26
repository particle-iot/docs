#include "Particle.h"

SYSTEM_THREAD(ENABLED);

SerialLogHandler logHandler;

void connectedCallback(const BlePeerDevice& peer, void* context);
void disconnectedCallback(const BlePeerDevice& peer, void* context);

BleUuid serviceUuid("afe7acc5-33a9-478f-bbe1-8944aa08e884");

void setup() {
	BLE.on();

	BLE.onConnected(connectedCallback, NULL);
	BLE.onDisconnected(disconnectedCallback, NULL);

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
