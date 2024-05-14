---
title: Firmware update events
columns: two
layout: commonTwo.hbs
description: Firmware update events
includeDefinitions: [api-helper,api-helper-events,api-helper-extras,api-helper-projects, zip]
---

# {{title}}

When you upgrade the product firmware on a device a number of events are generated in the product event stream. This document describes the meaning and purpose of these events.

For this example, the device (e00fce68ece1d3d21a73dcc9, "boron4") is part of the product 30301 ("tempmon-boron").

## Manual flashing

In this series of events (oldest first), the device is manually flashed OTA with version 1 of the product firmware. The product firmware targets the same version of Device OS as is on the device (4.0.1), so a Device OS upgrade is not necessary.

### spark/flash/status

The `spark/flash/status` is generated when the flash is started (`started `) and when it's complete (`success `). Note that success only means that the device was online and was able to start the flashing process.

```event-viewer
{"data":"started ","ttl":60,"published_at":"2024-05-13T10:55:02.520Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":0,"public":false,"productID":30301,"name":"spark/flash/status"}
{"data":"success ","ttl":60,"published_at":"2024-05-13T10:55:05.251Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":0,"public":false,"productID":30301,"name":"spark/flash/status"}
```

### spark/status

The `offline` event occurs when the device reboots after getting the firmware download and `online` occurs after the device comes online. Note that in some cases, the device resets before the offline event goes out, in which case the offline and online events will occur at the same timestamp, as is the case here.

Also note the `version` field in the event JSON goes from 0 (no product firmware) to 1 (the version we just flashed).

```event-viewer
{"data":"offline","ttl":60,"published_at":"2024-05-13T10:55:12.885Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":0,"public":false,"productID":30301,"name":"spark/status"}
{"data":"online","ttl":60,"published_at":"2024-05-13T10:55:12.898Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":1,"public":false,"productID":30301,"name":"spark/status"}
```

### app-hash

The `spark/device/app-hash" specifies the unique app hash for the firmware on the device. You can use this to determine if the correct firmware is actually running on the device.

```event-viewer
{"data":"09ad0870ed14795cbd3fc86c1d7cf67e0e77614484c5955ad00e2d7c30b64142","ttl":60,"published_at":"2024-05-13T10:55:13.738Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":1,"public":false,"productID":30301,"name":"spark/device/app-hash"}
```

### last_reset

The `spark/device/last_reset` event indicates the reason why the device last rebooted.

```event-viewer
{"data":"update","ttl":60,"published_at":"2024-05-13T10:55:13.747Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":1,"public":false,"productID":30301,"name":"spark/device/last_reset"}
```

{{!-- BEGIN shared-blurb ececa6c1-db6d-4658-b47f-74b82f32af27 --}}
The event data will be the reason for the most recent reset:

| Data | Description |
| :--- | :--- |
| `unknown` | `RESET_REASON_UNKNOWN` |
| `pin_reset` | `RESET_REASON_PIN_RESET` |
| `power_management` | `RESET_REASON_POWER_MANAGEMENT` |
| `power_down` | `RESET_REASON_POWER_DOWN` |
| `power_brownout` | `RESET_REASON_POWER_BROWNOUT` |
| `watchdog` | `RESET_REASON_WATCHDOG` |
| `update` | `RESET_REASON_UPDATE` (firmware update) |
| `update_error` | `RESET_REASON_UPDATE_ERROR` |
| `update_timeout` | `RESET_REASON_UPDATE_TIMEOUT` |
| `factory_reset` | `RESET_REASON_FACTORY_RESET` |
| `safe_mode` | `RESET_REASON_SAFE_MODE` |
| `dfu_mode` | `RESET_REASON_DFU_MODE` |
| `panic` | `RESET_REASON_PANIC` |
| `user` | `RESET_REASON_USER` |
| `config_update` | `RESET_REASON_CONFIG_UPDATE` |

- If the reset reason is not one of these known codes, the numeric value is included.
- Not all hardware platforms can generate all reset reasons.

If the reason is `RESET_REASON_PANIC`, then a comma and either a known panic code a number will be present:

| Data | Description |
| :--- | :--- |
| `hard_fault` | `HardFault` (1) |
| `2` | `NMIFault` (2) |
| `memory_fault` | `MemManage` (3) |
| `bus_fault` | `BusFault` (4) |
| `usage_fault` | `UsageFault` (5) |
| `6` | `InvalidLenth` (6) |
| `7` | `Exit` (7) |
| `out_of_heap` | `OutOfHeap` (8) |
| `9` | `SPIOverRun` (9) |
| `assert_failed` | `AssertionFailure` (10) |
| `10` | `AssertionFailure` (10) |
| `11` | `InvalidCase` (11) |
| `12` | `PureVirtualCall` (12) |
| `stack_overflow` | `StackOverflow` (13) |
| 14 | `HeapError` (14) |

For example: `panic, hard_fault`.
{{!-- END shared-blurb --}}

### particle/device/updates

There are multiple events for particle/device/updates that control Intelligent OTA firmware updates. As is the case for all spark and particle events, these do not count against your data operations limit.

```event-viewer
{"data":"false","ttl":60,"published_at":"2024-05-13T10:55:13.748Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":1,"public":false,"productID":30301,"name":"particle/device/updates/forced"}
{"data":"false","ttl":60,"published_at":"2024-05-13T10:55:14.759Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":1,"public":false,"productID":30301,"name":"particle/device/updates/pending"}
{"data":"true","ttl":60,"published_at":"2024-05-13T10:55:18.930Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":1,"public":false,"productID":30301,"name":"particle/device/updates/enabled"}
```

### Our event

The firmware below generates an event with an imaginary temperature value (`t`). It also includes the product firmware version in the `v` key.

```event-viewer
{"data":"{\"t\":19,\"v\":1}","ttl":60,"published_at":"2024-05-13T10:55:40.306Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"597771d1f92bae142dbb7559","version":1,"public":false,"productID":30301,"name":"tempmon"}
```

## Firmware events

When firmware is uploaded to a product, the `particle/firmware/create` is generated. The event data is JSON and the `version` key indicates the version that was uploaded.

```event-viewer
{"data":"{\"version\":\"1\"}","ttl":60,"published_at":"2024-05-13T10:57:39.552Z","coreid":"api","userid":"597771d1f92bae142dbb7559","version":0,"public":false,"productID":30301,"name":"particle/firmware/create"}
```

The `particle/firmware/release` event is generated when new product firmware is released.

```event-viewer
{"data":"{\"immediate\":true,\"version\":1}","ttl":60,"published_at":"2024-05-13T11:01:33.714Z","coreid":"api","userid":"597771d1f92bae142dbb7559","version":0,"public":false,"productID":30301,"name":"particle/firmware/release"}
```

## Upgrade to version 2

Here's a full set of events for upgrading to version 2 OTA, using lock and flash. Version 2 also targets Device OS 4.0.1, so no Device OS upgrade is required.

```event-viewer
{"data":"auto-update","ttl":60,"published_at":"2024-05-13T11:03:42.408Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":1,"public":false,"productID":30301,"name":"spark/status"}
{"data":"started ","ttl":60,"published_at":"2024-05-13T11:03:42.413Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":1,"public":false,"productID":30301,"name":"spark/flash/status"}
{"data":"success ","ttl":60,"published_at":"2024-05-13T11:03:45.727Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":1,"public":false,"productID":30301,"name":"spark/flash/status"}
{"data":"offline","ttl":60,"published_at":"2024-05-13T11:03:53.584Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":1,"public":false,"productID":30301,"name":"spark/status"}
{"data":"online","ttl":60,"published_at":"2024-05-13T11:03:53.602Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"spark/status"}
{"data":"update","ttl":60,"published_at":"2024-05-13T11:03:54.228Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"spark/device/last_reset"}
{"data":"false","ttl":60,"published_at":"2024-05-13T11:03:54.229Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"particle/device/updates/forced"}
{"data":"a8c95d636c15e590f4a00735b9d518e754d6bd8d41ec4e596d9da800e25b2d52","ttl":60,"published_at":"2024-05-13T11:03:54.231Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"spark/device/app-hash"}
{"data":"false","ttl":60,"published_at":"2024-05-13T11:03:55.242Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"particle/device/updates/pending"}
{"data":"true","ttl":60,"published_at":"2024-05-13T11:04:07.498Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"particle/device/updates/enabled"}
{"data":"{\"t\":21,\"v\":2}","ttl":60,"published_at":"2024-05-13T11:04:18.064Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"tempmon"}
```

If you're monitoring the USB serial logs from the device, you'll see something like this:

```
0000516469 [comm.ota] INFO: Received UpdateStart request
0000516469 [comm.ota] INFO: File size: 9965
0000516469 [comm.ota] INFO: Chunk size: 512
0000516469 [comm.ota] INFO: File checksum:
9070e0eaea9d8476ae6bbcdabaa5fe2f9adad8c017e62bee7804d9416e5df68f
0000516471 [comm.ota] INFO: Starting firmware update
0000516589 [comm.ota] INFO: Start offset: 0
0000516589 [comm.ota] INFO: Chunk count: 20
0000518889 [comm.ota] INFO: Received UpdateFinish request
0000518889 [comm.ota] INFO: Validating firmware update
0000519136 [comm.ota] INFO: Update time: 2666
0000519137 [comm.ota] INFO: Transfer time: 1859
0000519137 [comm.ota] INFO: Processing time: 465
0000519137 [comm.ota] INFO: Chunks received: 20
0000519138 [comm.ota] INFO: Chunk ACKs sent: 11
0000519139 [comm.ota] INFO: Duplicate chunks: 0
0000519139 [comm.ota] INFO: Out-of-order chunks: 0
0000519139 [comm.ota] INFO: Applying firmware update
```

## Upgrade to version 3

In this example, a minor upgrade to Device OS is required from 4.0.1 to 4.0.2. Note that the events are nearly identical to the previous example because the firmware can be updated using Combined OTA, with both Device OS and the firmware update in a single transfer. This can only be done:

- On Gen 3 (or later) devices running Device OS 3.1.0 or later before upgrading.
- Only Device OS is upgraded (not a bootloader, soft device, NCP, etc).


```event-viewer
{"data":"{\"version\":\"3\"}","ttl":60,"published_at":"2024-05-13T11:07:09.602Z","coreid":"api","userid":"597771d1f92bae142dbb7559","version":0,"public":false,"productID":30301,"name":"particle/firmware/create"}
{"data":"auto-update","ttl":60,"published_at":"2024-05-13T11:08:14.260Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"spark/status"}
{"data":"started ","ttl":60,"published_at":"2024-05-13T11:08:14.324Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"spark/flash/status"}
{"data":"success ","ttl":60,"published_at":"2024-05-13T11:09:38.067Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"spark/flash/status"}
{"data":"offline","ttl":60,"published_at":"2024-05-13T11:11:40.205Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"spark/status"}
{"data":"online","ttl":60,"published_at":"2024-05-13T11:11:40.227Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":3,"public":false,"productID":30301,"name":"spark/status"}
{"data":"update","ttl":60,"published_at":"2024-05-13T11:11:40.863Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":3,"public":false,"productID":30301,"name":"spark/device/last_reset"}
{"data":"true","ttl":60,"published_at":"2024-05-13T11:11:40.865Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":3,"public":false,"productID":30301,"name":"particle/device/updates/enabled"}
{"data":"false","ttl":60,"published_at":"2024-05-13T11:11:40.866Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":3,"public":false,"productID":30301,"name":"particle/device/updates/forced"}
{"data":"b2571e11ce3a472cff1ae575ae5f63c86f11aaf6e80c0aa7191bf2323d4b37f1","ttl":60,"published_at":"2024-05-13T11:11:40.875Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":3,"public":false,"productID":30301,"name":"spark/device/app-hash"}
{"data":"false","ttl":60,"published_at":"2024-05-13T11:11:41.887Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":3,"public":false,"productID":30301,"name":"particle/device/updates/pending"}
```

If you're monitoring the USB serial logs from the device, you'll notice that the update is significantly larger (373462 vs. 9965 bytes) because of the combined update.

```
0000020402 [system] INFO: Cloud connected
0000030403 [app] INFO: {"t":21,"v":2}
0000268495 [comm.ota] INFO: Received UpdateStart request
0000268496 [comm.ota] INFO: File size: 373462
0000268496 [comm.ota] INFO: Chunk size: 512
0000268497 [comm.ota] INFO: File checksum:
3c8dc3d39c2306bade5cdacb7a239a89d82fab7ea9b147c1a2509053e3b0d072
0000268498 [comm.ota] INFO: Starting firmware update
0000270823 [comm.ota] INFO: Start offset: 0
0000270823 [comm.ota] INFO: Chunk count: 730
0000330403 [app] INFO: {"t":21,"v":2}
0000345720 [comm.ota] INFO: Received UpdateFinish request
0000345721 [comm.ota] INFO: Validating firmware update
0000350861 [comm.ota] INFO: Update time: 82366
0000350862 [comm.ota] INFO: Transfer time: 72934
0000350862 [comm.ota] INFO: Processing time: 10215
0000350863 [comm.ota] INFO: Chunks received: 1105
0000350863 [comm.ota] INFO: Chunk ACKs sent: 885
0000350864 [comm.ota] INFO: Duplicate chunks: 375
0000350865 [comm.ota] INFO: Out-of-order chunks: 31
0000350865 [comm.ota] INFO: Applying firmware update
```

### spark/device/diagnostics/update

This event is for device diagnostics.

```event-viewer
{"data":"{\"device\":{\"network\":{\"cellular\":{\"radio_access_technology\":\"LTE\",\"operator\":\"AT&T Wireless Inc.\",\"cell_global_identity\":{\"mobile_country_code\":310,\"mobile_network_code\":\"410\",\"location_area_code\":3339,\"cell_id\":205999999}},\"signal\":{\"at\":\"LTE Cat-M1\",\"strength\":88.33,\"strength_units\":\"%\",\"strengthv\":-77,\"strengthv_units\":\"dBm\",\"strengthv_type\":\"RSRP\",\"quality\":45.83,\"quality_units\":\"%\",\"qualityv\":-11,\"qualityv_units\":\"dB\",\"qualityv_type\":\"RSRQ\"},\"connection\":{\"status\":\"connected\",\"error\":0,\"disconnects\":0,\"attempts\":1,\"disconnect_reason\":\"unknown\"}},\"cloud\":{\"connection\":{\"status\":\"connecting\",\"error\":-160,\"attempts\":2,\"disconnects\":0,\"disconnect_reason\":\"none\"},\"coap\":{\"transmit\":10,\"retransmit\":4,\"unack\":1,\"round_trip\":872},\"publish\":{\"rate_limited\":0}},\"power\":{\"battery\":{\"charge\":{\"err\":-210},\"state\":\"disconnected\"},\"source\":\"USB host\"},\"system\":{\"uptime\":99,\"memory\":{\"used\":73976,\"total\":167688}}},\"service\":{\"device\":{\"status\":\"ok\"},\"cloud\":{\"uptime\":2,\"publish\":{\"sent\":2}},\"coap\":{\"round_trip\":228}}}","ttl":60,"published_at":"2024-05-13T11:11:42.463Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":3,"public":false,"productID":30301,"name":"spark/device/diagnostics/update"}
```

## Upgrade to version 4

This firmware update requires a full upgrade to Device OS, going from 4.0.2 to 4.2.0.

From the USB logs, you can see that the file size is small, because it cannot be flashed as a combined OTA update.

```
0000118712 [comm.ota] INFO: Received UpdateStart request
0000118714 [comm.ota] INFO: File size: 9965
0000118714 [comm.ota] INFO: Chunk size: 512
0000118714 [comm.ota] INFO: File checksum:
2072d3e096451ed793314ab763345351d5ead29240d177c633802c15452172cd
0000118716 [comm.ota] INFO: Starting firmware update
0000118836 [comm.ota] INFO: Start offset: 0
0000118836 [comm.ota] INFO: Chunk count: 20
0000121087 [comm.ota] INFO: Received UpdateFinish request
0000121087 [comm.ota] INFO: Validating firmware update
0000121298 [comm.ota] INFO: Update time: 2586
0000121298 [comm.ota] INFO: Transfer time: 1781
0000121300 [comm.ota] INFO: Processing time: 425
0000121300 [comm.ota] INFO: Chunks received: 20
0000121300 [comm.ota] INFO: Chunk ACKs sent: 11
0000121302 [comm.ota] INFO: Duplicate chunks: 0
0000121302 [comm.ota] INFO: Out-of-order chunks: 0
0000121302 [comm.ota] INFO: Applying firmware update
```

### spark/status events (v4)

The process starts out the same as before, with `spark/status` events.

```event-viewer
{"data":"offline","ttl":60,"published_at":"2024-05-13T16:16:48.213Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":3,"public":false,"productID":30301,"name":"spark/status"}
{"data":"online","ttl":60,"published_at":"2024-05-13T16:16:48.237Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":0,"public":false,"productID":30301,"name":"spark/status"}
```

### spark/status/safe-mode (v4)

The difference is that the log next contains a `spark/status/safe-mode` event. This indicates that the user firmware that was just flashed requires a Device OS update. Once the device connects to the cloud (blinking green, blinking cyan, fast blinking cyan) it will go into breathing magenta, however that phase is often so short that you will only see the next step, blinking magenta (red and blue at the same time).

```event-viewer
{"data":"{\"p\":13,\"imei\":\"352753094038575\",\"iccid\":\"89014103271226581328\",\"cellfw\":\"L0.0.00.00.05.06,A.02.00\",\"m\":[{\"s\":49152,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"b\",\"n\":\"0\",\"v\":1101,\"d\":[]},{\"s\":671744,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"s\",\"n\":\"1\",\"v\":4006,\"d\":[{\"f\":\"b\",\"n\":\"0\",\"v\":1101},{\"f\":\"a\",\"n\":\"0\",\"v\":202}]},{\"s\":262144,\"l\":\"m\",\"vc\":30,\"vv\":26,\"u\":\"a67c3ce8a8abab5d75adbfd2a9a533df1a82179347c6fc0a2bc390e145a15ba3\",\"f\":\"u\",\"n\":\"2\",\"v\":6,\"d\":[{\"f\":\"s\",\"n\":\"1\",\"v\":4200}]},{\"s\":192512,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"a\",\"n\":\"0\",\"v\":202,\"d\":[]}]}","ttl":60,"published_at":"2024-05-13T16:16:50.064Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":0,"public":false,"productID":30301,"name":"spark/status/safe-mode"}
```

From the decoded safe-mode event, you can see:

- The upgraded user firmware requires a Device OS update to 4.2.0.
- `p` is the platform ID (Boron, in this case)
- `imei` and `iccid` identify the device that is in safe mode (for cellular devices)
- `cellfw` is the cellular modem firmware version number (if available)

You can paste the event data into the [Device Inspect Tool](/tools/developer-tools/device-inspect/) to decode your own events.


### Device OS update 1 (v4)

At first glance, this might look the same as the previous one, but you can see the bootloader was upgraded from 1001 to 1200. The cloud did this because it knows that Device OS 4200 (4.2.0) requires this bootloader.

```event-viewer
{"data":"online","ttl":60,"published_at":"2024-05-13T16:18:11.770Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":0,"public":false,"productID":30301,"name":"spark/status"}
{"data":"{\"p\":13,\"imei\":\"352753094038575\",\"iccid\":\"89014103271226581328\",\"cellfw\":\"L0.0.00.00.05.06,A.02.00\",\"m\":[{\"s\":49152,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"b\",\"n\":\"0\",\"v\":1200,\"d\":[]},{\"s\":671744,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"s\",\"n\":\"1\",\"v\":4006,\"d\":[{\"f\":\"b\",\"n\":\"0\",\"v\":1101},{\"f\":\"a\",\"n\":\"0\",\"v\":202}]},{\"s\":262144,\"l\":\"m\",\"vc\":30,\"vv\":26,\"u\":\"a67c3ce8a8abab5d75adbfd2a9a533df1a82179347c6fc0a2bc390e145a15ba3\",\"f\":\"u\",\"n\":\"2\",\"v\":6,\"d\":[{\"f\":\"s\",\"n\":\"1\",\"v\":4200}]},{\"s\":192512,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"a\",\"n\":\"0\",\"v\":202,\"d\":[]}]}","ttl":60,"published_at":"2024-05-13T16:18:12.137Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":0,"public":false,"productID":30301,"name":"spark/status/safe-mode"}
```

### Device OS update 2 (v4)

This is the final reboot before the device boots with the new firmware and Device OS.

```event-viewer
{"data":"online","ttl":60,"published_at":"2024-05-13T16:18:11.770Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":0,"public":false,"productID":30301,"name":"spark/status"}
{"data":"{\"p\":13,\"imei\":\"352753094038575\",\"iccid\":\"89014103271226581328\",\"cellfw\":\"L0.0.00.00.05.06,A.02.00\",\"m\":[{\"s\":49152,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"b\",\"n\":\"0\",\"v\":1200,\"d\":[]},{\"s\":671744,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"s\",\"n\":\"1\",\"v\":4006,\"d\":[{\"f\":\"b\",\"n\":\"0\",\"v\":1101},{\"f\":\"a\",\"n\":\"0\",\"v\":202}]},{\"s\":262144,\"l\":\"m\",\"vc\":30,\"vv\":26,\"u\":\"a67c3ce8a8abab5d75adbfd2a9a533df1a82179347c6fc0a2bc390e145a15ba3\",\"f\":\"u\",\"n\":\"2\",\"v\":6,\"d\":[{\"f\":\"s\",\"n\":\"1\",\"v\":4200}]},{\"s\":192512,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"a\",\"n\":\"0\",\"v\":202,\"d\":[]}]}","ttl":60,"published_at":"2024-05-13T16:18:12.137Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":0,"public":false,"productID":30301,"name":"spark/status/safe-mode"}
```

### Upgrade complete (v4)

This time there is no safe mode event since all dependencies are valid and you can see that firmware v4 is running.

```event-viewer
{"data":"success ","ttl":60,"published_at":"2024-05-13T16:19:07.015Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":0,"public":false,"productID":30301,"name":"spark/flash/status"}
{"data":"offline","ttl":60,"published_at":"2024-05-13T16:19:32.227Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":0,"public":false,"productID":30301,"name":"spark/status"}
{"data":"online","ttl":60,"published_at":"2024-05-13T16:19:32.239Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":4,"public":false,"productID":30301,"name":"spark/status"}
{"data":"update","ttl":60,"published_at":"2024-05-13T16:19:32.920Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":4,"public":false,"productID":30301,"name":"spark/device/last_reset"}
{"data":"true","ttl":60,"published_at":"2024-05-13T16:19:32.929Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":4,"public":false,"productID":30301,"name":"particle/device/updates/enabled"}
{"data":"false","ttl":60,"published_at":"2024-05-13T16:19:32.931Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":4,"public":false,"productID":30301,"name":"particle/device/updates/forced"}
{"data":"false","ttl":60,"published_at":"2024-05-13T16:19:33.939Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":4,"public":false,"productID":30301,"name":"particle/device/updates/pending"}
{"data":"{\"t\":20,\"v\":4}","ttl":60,"published_at":"2024-05-13T16:19:49.168Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":4,"public":false,"productID":30301,"name":"tempmon"}
```

## Test firmware

You are unlikely to need this firmware, but the examples in this page were generated with this firmware.

{{> project-browser project="firmware-update-events" default-file="src/tempmon.cpp" height="400" flash="false"}}
