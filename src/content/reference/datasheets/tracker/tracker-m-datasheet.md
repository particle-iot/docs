---
title: Tracker M Datasheet
columns: two
layout: commonTwo.hbs
description: Tracker M Datasheet
---

# Tracker M Datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/tracker-m-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

**Pre-release draft 2022-10-21. Do not distribute!**

{{box op="start" cssClass="boxed warningBox"}}
This is an preliminary pre-release datasheet and the contents are subject to change. The Tracker M design has not been finalized so changes are likely.
{{box op="end"}}



## Expansion card connectors

### 8-pin expansion connector

| Pin   | Name | Description |
| :---: | :--- | :--- |
| 1     | GND  | Ground |
| 2     | VIN  | 6 to 90 VDC |
| 3     | CAN+ | CAN interface (+, P, or H) |
| 4     | CAN- | Can interface (-, N, or L) |
| 5     | FET  | Power control FET output |
| 6     | GNSS_WHEEL | |
| 7     | GNSS_DIR | |
| 8     | GND  | Ground |



### 3-pin battery connector

This connects to the LiPo battery pack and battery thermistor.



{{imageOverlay src="/assets/images/tracker-m-expansion1.svg" alt="Expansion card pinout" class="full-width"}}

{{imageOverlay src="/assets/images/tracker-m-expansion2.svg" alt="Expansion card pinout" class="full-width"}}


### GPIO

{{!-- BEGIN do not edit content below, it is automatically generated 58de1b4d-5c09-41bd-8d67-cef17d1ae475 --}}

| Pin Name | Description | SoM Pin | MCU |
| :--- | :--- | :--- | :--- |
| GPB0 | IOEX GPB0, CAN_VDD_EN | &nbsp; | &nbsp; |
| GPB1 | IOEX GPB1, CAN_STBY | &nbsp; | &nbsp; |
| GPB2 | IOEX GPB2, CAN_INT | &nbsp; | &nbsp; |
| GPB3 | IOEX GPB3, SENSOR_INT1 | &nbsp; | &nbsp; |
| P2_A0 / D11 | A0 Analog in, GPIO | &nbsp; | PB[1] |
| A1 / D12 | A1 Analog in, GPIO | &nbsp; | PB[2] |
| P2_A2 / D13 | A2 Analog in, PWM, GPIO | &nbsp; | PB[7] |
| P2_D6_SWDCLK | D6 GPIO, SWCLK | &nbsp; | PB[3] |
| P2_D7_SWDIO | D7 GPIO, SWDIO | &nbsp; | PA[27] |
| P2_RX/D9 / D9 | Serial1 RX (received data), GPIO | &nbsp; | PA[8] |
| P2_TX/D8 / D8 | Serial1 TX (transmitted data), GPIO | &nbsp; | PA[7] |
| P2_A5_FET_CONTROL / D14 | A5 Analog in, GPIO, PWM. | &nbsp; | PB[4] |
| P2_S2_SCK / D17 | S2 GPIO, SPI SCK | &nbsp; | PA[14] |
| P2_S1_SDI / D16 | S1 GPIO, PWM, SPI SDI/MISO, Serial3 RX. | &nbsp; | PA[13] |
| P2_S0_SDO / D15 | S0 GPIO, PWM, SPI SDO/MOSI, Serial3 TX. | &nbsp; | PA[12] |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Tracker M, pins D0 and D1 are used in I2C mode by the temperature sensor. Pins D0 and D1 cannot be used as GPIO.

### ADC

{{!-- BEGIN do not edit content below, it is automatically generated ad9f1e40-1d9e-4fc3-9789-34453572592c --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| P2_A0 / D11 | A0 Analog in, GPIO | ADC_4 | &nbsp; | PB[1] |
| A1 / D12 | A1 Analog in, GPIO | ADC_5 | &nbsp; | PB[2] |
| P2_A2 / D13 | A2 Analog in, PWM, GPIO | ADC_3 | &nbsp; | PB[7] |
| P2_A5_FET_CONTROL / D14 | A5 Analog in, GPIO, PWM. | ADC_0 | &nbsp; | PB[4] |


{{!-- END do not edit content above, it is automatically generated --}}



### SPI

{{!-- BEGIN do not edit content below, it is automatically generated 34aac488-6adf-4a08-b708-e27db809932b --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| P2_S2_SCK / D17 | S2 GPIO, SPI SCK | SPI (SCK) | &nbsp; | PA[14] |
| P2_S1_SDI / D16 | S1 GPIO, PWM, SPI SDI/MISO, Serial3 RX. | SPI (MISO) | &nbsp; | PA[13] |
| P2_S0_SDO / D15 | S0 GPIO, PWM, SPI SDO/MOSI, Serial3 TX. | SPI (MOSI) | &nbsp; | PA[12] |


{{!-- END do not edit content above, it is automatically generated --}}

- Any available GPIO can be used as a SPI CS/SS pin.

### I2C

{{!-- BEGIN do not edit content below, it is automatically generated b989915a-a028-4c9e-a421-22e513f03a2c --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| P2_D1_SCL | I2C SCL | Wire (SCL) | &nbsp; | PB[5] |
| P2_D0_SDA | I2C SDA | Wire (SDA) | &nbsp; | PB[6] |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Tracker M, pins D0 and D1 are used in I2C mode by the temperature sensor. Pins D0 and D1 cannot be used as GPIO.

### Serial (UART)

{{!-- BEGIN do not edit content below, it is automatically generated 95735a1e-8452-4055-b4fb-abc03c0aa4b8 --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| P2_RX/D9 / D9 | Serial1 RX (received data), GPIO | Serial1 (RX)  | &nbsp; | PA[8] |
| P2_TX/D8 / D8 | Serial1 TX (transmitted data), GPIO | Serial1 (TX) | &nbsp; | PA[7] |
| P2_S1_SDI / D16 | S1 GPIO, PWM, SPI SDI/MISO, Serial3 RX. | Serial3 (RX) | &nbsp; | PA[13] |
| P2_S0_SDO / D15 | S0 GPIO, PWM, SPI SDO/MOSI, Serial3 TX. | Serial3 (TX) | &nbsp; | PA[12] |


{{!-- END do not edit content above, it is automatically generated --}}



### PWM

{{!-- BEGIN do not edit content below, it is automatically generated 0d196639-9ee4-4bc5-b5d1-ad2f4c6f1b52 --}}

| Pin Name | Description | SoM Pin | MCU |
| :--- | :--- | :--- | :--- |
| P2_A2 / D13 | A2 Analog in, PWM, GPIO | &nbsp; | PB[7] |
| P2_A5_FET_CONTROL / D14 | A5 Analog in, GPIO, PWM. | &nbsp; | PB[4] |
| P2_S1_SDI / D16 | S1 GPIO, PWM, SPI SDI/MISO, Serial3 RX. | &nbsp; | PA[13] |
| P2_S0_SDO / D15 | S0 GPIO, PWM, SPI SDO/MOSI, Serial3 TX. | &nbsp; | PA[12] |


{{!-- END do not edit content above, it is automatically generated --}}

- If SPI is not used, the pins can be used for GPIO or Serial.
