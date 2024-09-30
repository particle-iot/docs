---
title: RS485 (Modbus) and CAN hat
layout: commonTwo.hbs
columns: two
includeDefinitions: [api-helper,api-helper-cloud,api-helper-projects,zip]
---

# {{title}}

There are a number of widely available RS485 (Modbus) and CAN hats available. 

Testing was done with Waveshare RS485 CAN HAT for Raspberry Pi 5/4B/3B+/3B/2B/B+/Zero/Zero W/WH/Zero 2W, Long-Distance Communication via RS485/CAN Function Onboard CAN Controller MCP2515 via SPI Interface Transceiver SIT65HVD230DR (from [Amazon](https://www.amazon.com/gp/product/B07VMB1ZKH/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1), [Waveshare](https://www.waveshare.com/rs485-can-hat.htm)) however it should be compatible with most similar devices with the MCP2515 or MCP25625 CAN controller.

![](/assets/images/muon-hats/rs485-can-hat/hat.png)

This board uses the SIT65HVD230DR CAN transceiver and the SP3485 RS485 transceiver, but the driver software does not depend on the transceiver so you can use generally use boards with any transceiver chips. 

The pinout is straightforward and described in more detail below.

![](/assets/images/muon-hats/rs485-can-hat/pinout.png)



This page is divided into two parts because you will generally use RS485 or CAN, but not both, but you could use both if desired

## RS485 (Modbus)

On this board, the RS485 pins are labeled A and B; this is typical for most RS485 implementations. As RS485 is differential, there is no ground connection.

The RX and TX lines are mapped to the expansion connection RX and TX pins, which are `Serial1` on the Muon.

This particular board has auto-direction sensing for the RS485 interface, which is recommended. It is possible to configure this board to
use manual direction control using Raspberry Pi GPIO, but this requires soldering. It is mapped to expansion pin 7, GPIO4 (GPCKL0).

### Modbus example project

This is a simple example project that reads a Modbus temperature and humidity sensor.

{{> project-browser project="modbus-hat" default-file="src/modbus-hat.cpp" height="500" flash="false"}}

![](/assets/images/muon-hats/rs485-can-hat/modbus-test.jpeg)


## CAN 

On this board, the CAN pins are labeled H and L; this is typical for most CAN bus implementations. As CAN bus is differential, there is no ground connection.

The CAN controller chip connects by SPI (SCK, MOSI, and MISO). It uses expansion connector pin 24, GPIO8 (CE0), which maps to Muon pin A6.

It can optionally use an interrupt output, connected to expansion connector pin 22 (GPIO25). This maps to Muon pin D22. 

This board comes with a 12 MHz crystal. You will need to note the frequency of the crystal (generally stamped on the metal can) on your board and configure the software appropriately. 8 MHz, 16 MHz, and 20 MHz are also common.

The [can-mcp25x](https://github.com/particle-iot/can-mcp25x) library used for CAN is also used on the Tracker SoM, Tracker One, and Monitor One.

### CAN example project

This is a simple example project that reads the engine RPM from OBD-II via CAN. 

{{> project-browser project="can-hat" default-file="src/can-hat.cpp" height="500" flash="false"}}

Viewing the USB serial debug log should yield something like:

```
0000234192 [app] INFO: engineRPM 0
0000236192 [app] INFO: engineRPM 1500
0000238192 [app] INFO: engineRPM 1500
0000240192 [app] INFO: engineRPM 2508
0000242192 [app] INFO: engineRPM 2504
```

![](/assets/images/muon-hats/rs485-can-hat/can-test.jpeg)

