#include "Particle.h"
SYSTEM_MODE(SEMI_AUTOMATIC);
SerialLogHandler logHandler(LOG_LEVEL_TRACE);

// For product firmware, set the version here:
// PRODUCT_VERSION(1)

STARTUP(System.enableFeature(FEATURE_DISABLE_LISTENING_MODE));

const char* serviceUuid = "6E400021-B5A3-F393-E0A9-E50E24DCCA9E";
const char* rxUuid = "6E400022-B5A3-F393-E0A9-E50E24DCCA9E";
const char* txUuid = "6E400023-B5A3-F393-E0A9-E50E24DCCA9E";
const char* versionUuid = "6E400024-B5A3-F393-E0A9-E50E24DCCA9E";

void ble_prov_mode_handler(system_event_t evt, int param) {
    if (param == ble_prov_mode_connected) {
        Log.info("BLE Event detected: ble_prov_mode_connected");
    }
    if (param == ble_prov_mode_disconnected) {
        Log.info("BLE Event detected: ble_prov_mode_disconnected");
    }
    if (param == ble_prov_mode_handshake_failed) {
        Log.info("BLE Event detected: ble_prov_mode_handshake_failed");
    }
    if (param == ble_prov_mode_handshake_done) {
        Log.info("BLE Event detected: ble_prov_mode_handshake_done");
    }
}

void nw_creds_handler(system_event_t evt, int param) {
    if (param == network_credentials_added) {
        Log.info("BLE Event detected: network_credentials_added");
        Particle.connect();
    }
}

void setup() {
    // ---------System Events---------
    System.on(ble_prov_mode, ble_prov_mode_handler);
    System.on(network_credentials, nw_creds_handler);
    
    // ---------Control request filter---------
    // System.setControlRequestFilter(SystemControlRequestAclAction::ACCEPT, {
    //     {CTRL_REQUEST_DFU_MODE, SystemControlRequestAclAction::DENY},
    //     {CTRL_REQUEST_RESET, SystemControlRequestAclAction::DENY}
    // });
    System.setControlRequestFilter(SystemControlRequestAclAction::ACCEPT);

    // ---------Provisioning Service and Characteristic UUIDs---------
    // Provisioning UUIDs must be set before initialising BLE for the first time
    // Even better to call in STARTUP()
    BLE.setProvisioningSvcUuid(serviceUuid);
    BLE.setProvisioningTxUuid(txUuid);
    BLE.setProvisioningRxUuid(rxUuid);
    BLE.setProvisioningVerUuid(versionUuid);
     
    // ---------Custom mobile secret---------
    // Uncomment the following three lines to test setting up custom mobile secret
    char arr[HAL_DEVICE_SECRET_SIZE] = {};
    memcpy(arr, "AAAAAAAAAAAAAAA", HAL_DEVICE_SECRET_SIZE);
    hal_set_device_secret(arr, sizeof(arr), nullptr);
    // To clear device secret and use default, run -> hal_clear_device_secret(nullptr); 

    // ---------Setup device name ("setup code") ---------
    // If not set, this is the last 6 characters of the serial number
    BLE.setDeviceName("aabbcc"); 

    // ---------Set company ID---------
    // BLE.setProvisioningCompanyId(0x1234);

    // ---------BLE provisioning mode---------
    BLE.provisioningMode(true);
    Log.trace("BLE prov mode status: %d", BLE.getProvisioningStatus());

    // To exit provisioning mode -> BLE.provisioningMode(false);
    // However you do not need to exit provisioning mode like you do listening mode;
    // you can leave it always running so users can reconfigure their Wi-Fi at any
    // time without switching device modes.
    

    // Optional: If there are credentials, attempt to connect immediately
    if (WiFi.hasCredentials()) {
        Particle.connect();
    }
}

void loop() {
}
