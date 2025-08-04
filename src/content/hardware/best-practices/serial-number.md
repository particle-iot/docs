---
title: Serial number management
columns: two
layout: commonTwo.hbs
description: Serial number management
---

# {{title}}

There are several unique identifiers present on Particle devices. The most commonly used are the Device ID and Serial number.

## Device identifiers

{{!-- BEGIN shared-blurb 081deb40-1be8-4f4a-b8c8-ad363590befe --}}

### Device ID

Every Particle device has a unique 24-character hexadecimal identifier known as the Device ID. This never changes for each device, and is the recommended method of uniquely identifying a device.

In device firmware, use `System.deviceID()` to return a `String` object that contains the Device ID. This is always 24 characters, and the hex letter a-f are always lowercase.

In a webhook, `\{{{PARTICLE_DEVICE_ID}}}` is the Device ID of the source of the event.

Most Particle cloud API calls that directly reference a device use the Device ID as the default method of identifying a device. For example, to [get device information](/reference/cloud-apis/api/#get-device-information):

```
GET /v1/devices/:deviceId
```

### Serial number

All recent Particle devices have a serial number. This is printed on a sticker attached to the device, and is generally also on a sticker on the outside of the box. 

The serial number is useful for onboarding a new device, but we do not recommend using the serial number as a unique identifier in your database. The reason is that the API to look up a device by its serial number is rate limited for security reasons. To avoid using this API, you need to list all devices in your product, which is not particularly efficient either.

To get the serial number from user firmware:

```cpp
char serial[HAL_DEVICE_SERIAL_NUMBER_SIZE + 1] = {0};
int ret = hal_get_device_serial_number(serial, HAL_DEVICE_SERIAL_NUMBER_SIZE, nullptr);
if (ret == SYSTEM_ERROR_NONE) {
  // Success
}
```

`HAL_DEVICE_SERIAL_NUMBER_SIZE` is currently 15. Note that `serial` is not null terminated by `hal_get_device_serial_number` but is by the example code by making the buffer 1 byte larger and zero initializing it.

The serial number is available by the Particle cloud API [get device information](/reference/cloud-apis/api/#get-device-information) in the `serial_number` field. 

### Data matrix sticker

The serial number sticker contains a data matrix code (like a QR code). This encodes the following:

- Serial number
- A space character
- The mobile secret

For devices without BLE capabilities (Gen 2 devices), the data matrix only contains the serial number.

Note that older Photon, P1, Electron, and E-Series modules do not have a serial number sticker. Older Electron an E-Series with a "u-blox" sticker have the IMEI encoded in a 2D barcode. P0 modules (including the Photon) have an USI manufacturing code which is not easily mapped to any Particle identifier.

{{!-- END shared-blurb --}}

## Determining the device SKU

The main reason to use the serial number is to find the SKU associated with a device. For some types of devices, such as the Boron, there are several different SKUs that all have the same platform ID. The serial number is the best way to differentiate between these devices.

Each SKU has a unique prefix, which is often "P" followed by a 3-digit number in recent devices, or some other alphanumeric combination for older devices. This prefix can be used for runtime detection of the SKU on-device, if desired.

Note that in the tables below, some kits, such as the Argon Air Quality Monitor Kit (ARG-AQKT) have a serial number prefix for the outer box, but the Argon itself inside the box will not have this prefix; it will just be a generic Argon.

Some older devices do not have the serial number stored on the device (E260, for example).

### SKU to Prefix

{{!-- BEGIN do not edit content below, it is automatically generated b0fce313-6098-47bc-b2f7-c700210b1cc6 --}}

| SKU | Description | Lifecycle | Prefix |
| :--- | :--- | :--- | :--- |
| ARG-AQKT | Argon Air Quality Monitor Kit [x1] | Deprecated | P011 |
| ARG-LDKT | Argon Leak Detection Kit [x1] | Deprecated | P013 |
| ARG-STRTKT | Argon Starter Kit [x1] | Deprecated | P010 |
| ARGN-H | Argon [x1] | Deprecated | ARNH |
| ARGNKIT | Argon, Starter Kit  [x1] | Deprecated | ARNK |
| ARGNTRAY50 | Argon, Tray [x50] | Deprecated | ARNT |
| ASSET2GV2 | Asset Tracker 2G | Deprecated | A35K |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Deprecated | A26K |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | Deprecated | A27K |
| B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | Deprecated | P006 |
| B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | Deprecated | P007 |
| B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | Deprecated | P033 |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NRND | P033 |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | GA | P042 |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | GA | P042 |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | GA | P069 |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | GA | P069 |
| B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | Deprecated | P056 |
| B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | Deprecated | P056 |
| B523MEA | B-Series LTE CAT-1/3G/2G (Europe) [x1] | Deprecated | P019 |
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | NRND | P020 |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | GA | P034 |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | GA | P034 |
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Deprecated | B31K |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Deprecated | B31T |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Deprecated | P027 |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Deprecated | P027 |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | Deprecated | B40H |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | Deprecated | P012 |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | Deprecated | B40K |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NRND | B40T |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | Deprecated | P028 |
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Deprecated | P028 |
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Deprecated | P028 |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | Deprecated | P044 |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | GA | P044 |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | GA | P044 |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Deprecated | E26K |
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Deprecated | E26T |
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | Deprecated | E27K |
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | NRND | E27T |
| E310KIT | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | NRND | E31K |
| E310MOD1 | E-Series 2G/3G (Global - E310), [x1] | Deprecated | E31M |
| E310TRAY50 | E-Series 2G/3G (Global - E310), Tray [x50] | Deprecated | E31T |
| E313EA | E-Series 2G/3G (Global - E313), [x1] | Deprecated | P005 |
| E313TRAY50 | E-Series 2G/3G (Global - E313), Tray [x50] | End of life | P005 |
| E314KIT | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | NRND | P029 |
| E314MOD1 | E-Series 2G/3G (Global - E314), [x1] | Deprecated | P029 |
| E314TRAY50 | E-Series 2G/3G (Global - E314), Tray [x50] | NRND | P029 |
| E350KIT | Electron 2G Kit (Global) | Deprecated | E35K |
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Deprecated | E35T |
| E402KIT | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NRND | E40K |
| E402MOD1 | E-Series LTE CAT-M1 (NorAm), [x1] | Deprecated | E40M |
| E402TRAY50 | E-Series LTE CAT-M1 (NorAm), Tray [x50] | NRND | E40T |
| E404KIT | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | NRND | P030 |
| E404MOD1 | E-Series LTE-M (NorAm, EtherSIM), [x1] | NRND | P030 |
| E404TRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Deprecated | P030 |
| E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | GA | P052 |
| ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | NRND | P035 |
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | Deprecated | E4DK |
| ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | Deprecated | E4DT |
| ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Deprecated | P036 |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | GA | P054 |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | GA | P054 |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA | P055 |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA | P055 |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development | P068 |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development | P055 |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | GA | P031 |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | In development | P031 |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | GA | P031 |
| MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | GA | P054 |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | GA | P054 |
| MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | GA | P055 |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | GA | P055 |
| MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | In development | P054 |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development | P054 |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | Deprecated | P024 |
| ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | Deprecated | P024 |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | GA | P031 |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | GA | P031 |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | GA | P025 |
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | GA | P025 |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA | P032 |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | GA | P032 |
| P0MOD10 | P0 Wi-Fi Module, Cut tape [x10] | Deprecated | P0MD |
| P1MOD10 | P1 Wi-Fi Module, Cut tape [x10] | Deprecated | P1MD |
| P2MOD10 | P2 Wi-Fi Module, Cut tape [x10] | GA | P046 |
| P2REEL | P2 Wi-Fi Module, Reel [x600] | GA | P046 |
| PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | Deprecated | P051 |
| PHN2KIT | Photon 2, Kit [x1] | GA | P051 |
| PHN2MEA | Photon 2 [x1] | GA | P051 |
| PHN2MTY | Photon 2, Tray [x50] | GA | P051 |
| PHNTRAYH | Photon with Headers, Tray [x50] | Deprecated | PHHT |
| PHNTRAYNOH | Photon without Headers, Tray [x50] | Deprecated | PHNT |
| PHOTONH | Photon with Headers, [x1] | Deprecated | PHHM |
| PHOTONKIT | Photon with Headers Starter Kit, [x1] | Deprecated | PHHK |
| PHOTONNOH | Photon without Headers, Dev board Kit [x1] | Deprecated | PHNM |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Deprecated | S26K |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | Deprecated | S27K |
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | Deprecated | P024 |
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | Deprecated | P024 |
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NRND | P024 |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | GA | P031 |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | GA | P031 |
| T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | GA | P031 |
| T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | Deprecated | P025 |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | NRND | P025 |
| T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | Deprecated | P025 |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA | P032 |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | GA | P032 |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA | P032 |
| XENNTRAY50 | Xenon [x50] | End of life | XENT |


{{!-- END do not edit content above, it is automatically generated --}}

### Prefix to SKU


{{!-- BEGIN do not edit content below, it is automatically generated 682e93c3-adcd-4d72-b183-813ee5164dc4 --}}

| Prefix | SKU | Description | Lifecycle |
| :--- | :--- | :--- | :--- |
| A26K | ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Deprecated |
| A27K | ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | Deprecated |
| A35K | ASSET2GV2 | Asset Tracker 2G | Deprecated |
| ARNH | ARGN-H | Argon [x1] | Deprecated |
| ARNK | ARGNKIT | Argon, Starter Kit  [x1] | Deprecated |
| ARNT | ARGNTRAY50 | Argon, Tray [x50] | Deprecated |
| B31K | BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Deprecated |
| B31T | BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Deprecated |
| B40H | BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | Deprecated |
| B40K | BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | Deprecated |
| B40T | BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NRND |
| E26K | E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Deprecated |
| E26T | E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Deprecated |
| E27K | E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | Deprecated |
| E27T | E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | NRND |
| E31K | E310KIT | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | NRND |
| E31M | E310MOD1 | E-Series 2G/3G (Global - E310), [x1] | Deprecated |
| E31T | E310TRAY50 | E-Series 2G/3G (Global - E310), Tray [x50] | Deprecated |
| E35K | E350KIT | Electron 2G Kit (Global) | Deprecated |
| E35T | E350TRAY50 | Electron 2G (Global), Tray [x50] | Deprecated |
| E40K | E402KIT | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NRND |
| E40M | E402MOD1 | E-Series LTE CAT-M1 (NorAm), [x1] | Deprecated |
| E40T | E402TRAY50 | E-Series LTE CAT-M1 (NorAm), Tray [x50] | NRND |
| E4DK | ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | Deprecated |
| E4DT | ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | Deprecated |
| P005 | E313EA | E-Series 2G/3G (Global - E313), [x1] | Deprecated |
| P005 | E313TRAY50 | E-Series 2G/3G (Global - E313), Tray [x50] | End of life |
| P006 | B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | Deprecated |
| P007 | B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | Deprecated |
| P010 | ARG-STRTKT | Argon Starter Kit [x1] | Deprecated |
| P011 | ARG-AQKT | Argon Air Quality Monitor Kit [x1] | Deprecated |
| P012 | BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | Deprecated |
| P013 | ARG-LDKT | Argon Leak Detection Kit [x1] | Deprecated |
| P019 | B523MEA | B-Series LTE CAT-1/3G/2G (Europe) [x1] | Deprecated |
| P020 | B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | NRND |
| P024 | ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | Deprecated |
| P024 | ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | Deprecated |
| P024 | T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | Deprecated |
| P024 | T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | Deprecated |
| P024 | T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NRND |
| P025 | ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | GA |
| P025 | ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | GA |
| P025 | T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | Deprecated |
| P025 | T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | NRND |
| P025 | T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | Deprecated |
| P027 | BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Deprecated |
| P027 | BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Deprecated |
| P028 | BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | Deprecated |
| P028 | BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Deprecated |
| P028 | BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Deprecated |
| P029 | E314KIT | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | NRND |
| P029 | E314MOD1 | E-Series 2G/3G (Global - E314), [x1] | Deprecated |
| P029 | E314TRAY50 | E-Series 2G/3G (Global - E314), Tray [x50] | NRND |
| P030 | E404KIT | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | NRND |
| P030 | E404MOD1 | E-Series LTE-M (NorAm, EtherSIM), [x1] | NRND |
| P030 | E404TRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Deprecated |
| P031 | MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | GA |
| P031 | MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | In development |
| P031 | MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | GA |
| P031 | ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | GA |
| P031 | ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | GA |
| P031 | T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | GA |
| P031 | T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | GA |
| P031 | T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | GA |
| P032 | ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| P032 | ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | GA |
| P032 | T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| P032 | T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | GA |
| P032 | T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| P033 | B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | Deprecated |
| P033 | B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NRND |
| P034 | B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | GA |
| P034 | B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| P035 | ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | NRND |
| P036 | ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Deprecated |
| P042 | B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | GA |
| P042 | B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | GA |
| P044 | BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | Deprecated |
| P044 | BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | GA |
| P044 | BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | GA |
| P046 | P2MOD10 | P2 Wi-Fi Module, Cut tape [x10] | GA |
| P046 | P2REEL | P2 Wi-Fi Module, Reel [x600] | GA |
| P051 | PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | Deprecated |
| P051 | PHN2KIT | Photon 2, Kit [x1] | GA |
| P051 | PHN2MEA | Photon 2 [x1] | GA |
| P051 | PHN2MTY | Photon 2, Tray [x50] | GA |
| P052 | E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | GA |
| P054 | M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | GA |
| P054 | M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | GA |
| P054 | MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | GA |
| P054 | MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | GA |
| P054 | MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | In development |
| P054 | MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| P055 | M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| P055 | M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| P055 | M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| P055 | MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | GA |
| P055 | MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | GA |
| P056 | B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | Deprecated |
| P056 | B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | Deprecated |
| P068 | M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| P069 | B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | GA |
| P069 | B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | GA |
| P0MD | P0MOD10 | P0 Wi-Fi Module, Cut tape [x10] | Deprecated |
| P1MD | P1MOD10 | P1 Wi-Fi Module, Cut tape [x10] | Deprecated |
| PHHK | PHOTONKIT | Photon with Headers Starter Kit, [x1] | Deprecated |
| PHHM | PHOTONH | Photon with Headers, [x1] | Deprecated |
| PHHT | PHNTRAYH | Photon with Headers, Tray [x50] | Deprecated |
| PHNM | PHOTONNOH | Photon without Headers, Dev board Kit [x1] | Deprecated |
| PHNT | PHNTRAYNOH | Photon without Headers, Tray [x50] | Deprecated |
| S26K | SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Deprecated |
| S27K | SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | Deprecated |
| XENT | XENNTRAY50 | Xenon [x50] | End of life |


{{!-- END do not edit content above, it is automatically generated --}}
