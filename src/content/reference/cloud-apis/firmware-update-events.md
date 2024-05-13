---
title: Firmware update events
columns: two
layout: commonTwo.hbs
description: Firmware update events
includeDefinitions: [api-helper, api-helper-events, api-helper-json]

---

# {{title}}

When you upgrade the product firmware on a device a number of events are generated in the product event stream. This document describes the meaning and purpose of these events.


```event-viewer
{"data":"{\"version\":\"3\"}","ttl":60,"published_at":"2024-05-13T11:07:09.602Z","coreid":"api","userid":"597771d1f92bae142dbb7559","version":0,"public":false,"productID":30301,"name":"particle/firmware/create"}
{"data":"auto-update","ttl":60,"published_at":"2024-05-13T11:08:14.260Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":2,"public":false,"productID":30301,"name":"spark/status"}
```



Another test


```event-viewer
{"data":"{\"device\":{\"network\":{\"cellular\":{\"radio_access_technology\":\"LTE\",\"operator\":\"AT&T Wireless Inc.\",\"cell_global_identity\":{\"mobile_country_code\":310,\"mobile_network_code\":\"410\",\"location_area_code\":3339,\"cell_id\":205884175}},\"signal\":{\"at\":\"LTE Cat-M1\",\"strength\":88.33,\"strength_units\":\"%\",\"strengthv\":-77,\"strengthv_units\":\"dBm\",\"strengthv_type\":\"RSRP\",\"quality\":45.83,\"quality_units\":\"%\",\"qualityv\":-11,\"qualityv_units\":\"dB\",\"qualityv_type\":\"RSRQ\"},\"connection\":{\"status\":\"connected\",\"error\":0,\"disconnects\":0,\"attempts\":1,\"disconnect_reason\":\"unknown\"}},\"cloud\":{\"connection\":{\"status\":\"connecting\",\"error\":-160,\"attempts\":2,\"disconnects\":0,\"disconnect_reason\":\"none\"},\"coap\":{\"transmit\":10,\"retransmit\":4,\"unack\":1,\"round_trip\":872},\"publish\":{\"rate_limited\":0}},\"power\":{\"battery\":{\"charge\":{\"err\":-210},\"state\":\"disconnected\"},\"source\":\"USB host\"},\"system\":{\"uptime\":99,\"memory\":{\"used\":73976,\"total\":167688}}},\"service\":{\"device\":{\"status\":\"ok\"},\"cloud\":{\"uptime\":2,\"publish\":{\"sent\":2}},\"coap\":{\"round_trip\":228}}}","ttl":60,"published_at":"2024-05-13T11:11:42.463Z","coreid":"e00fce68ece1d3d21a73dcc9","userid":"","version":3,"public":false,"productID":30301,"name":"spark/device/diagnostics/update"}
```