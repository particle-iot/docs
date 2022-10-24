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
| P2_A1 / D12 | A1 Analog in, GPIO | &nbsp; | PB[2] |
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
| P2_A1 / D12 | A1 Analog in, GPIO | ADC_5 | &nbsp; | PB[2] |
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


### Full expansion pin listing

{{!-- BEGIN do not edit content below, it is automatically generated 8a89ce75-a226-4cba-8662-72930b0cac76 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| Left 1 | GPB0 | IOEX GPB0, CAN_VDD_EN | &nbsp; |
| Left 2 | GPB1 | IOEX GPB1, CAN_STBY | &nbsp; |
| Left 3 | GPB2 | IOEX GPB2, CAN_INT | &nbsp; |
| Left 4 | GPB3 | IOEX GPB3, SENSOR_INT1 | &nbsp; |
| Left 5 | GND | Ground. | &nbsp; |
| Left 10 | GND | Ground. | &nbsp; |
| Left 11 | P2_A0 / D11 | A0 Analog in, GPIO | PB[1] |
| Left 12 | P2_A1 / D12 | A1 Analog in, GPIO | PB[2] |
| Left 13 | P2_A2 / D13 | A2 Analog in, PWM, GPIO | PB[7] |
| Left 14 | GND | Ground. | &nbsp; |
| Left 15 | P2_RGB_G | RGB LED Green | PB[23] |
| Left 16 | P2_RGB_B | RGB LED Blue | PB[22] |
| Left 17 | P2_RGB_R | RGB LED Red | PA[30] |
| Left 18 | GND | Ground. | &nbsp; |
| Left 19 | P2_RESET | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | CHIP_EN |
| Left 20 | P2_MODE | MODE button. Pin number constant is BTN. Pull low when button is pressed. | PA[4] |
| Left 21 | P2_D6_SWDCLK | D6 GPIO, SWCLK | PB[3] |
| Left 22 | P2_D7_SWDIO | D7 GPIO, SWDIO | PA[27] |
| Left 23 | GND | Ground. | &nbsp; |
| Left 24 | NC | Leave unconnected | &nbsp; |
| Left 25 | P2_USB_P | MCU USB Data+ | PA[26] |
| Left 26 | P2_USB_N | MCU USB Data- | PA[25] |
| Left 27 | P2_USB_VBUS | &nbsp; | &nbsp; |
| Left 28 | GND | Ground. | &nbsp; |
| Left 29 | P2_RX/D9 / D9 | Serial1 RX (received data), GPIO | PA[8] |
| Left 30 | P2_TX/D8 / D8 | Serial1 TX (transmitted data), GPIO | PA[7] |
| Left 31 | P2_VBAT_MEAS | Battery voltage measurement (optional). | &nbsp; |
| Left 32 | CELL_USB_BOOT | &nbsp; | &nbsp; |
| Left 33 | CELL_VBUS | &nbsp; | &nbsp; |
| Left 34 | CELL_USB_N | &nbsp; | &nbsp; |
| Left 35 | CELL_USB_P | &nbsp; | &nbsp; |
| Left 36 | GND | Ground. | &nbsp; |
| Left 37 | GNSS_TXD | &nbsp; | &nbsp; |
| Left 38 | GNSS_RXD | &nbsp; | &nbsp; |
| Left 39 | GNSS_DIR | &nbsp; | &nbsp; |
| Left 40 | GNSS_WHEELTICK | &nbsp; | &nbsp; |
| Left 41 | +2V8 | 2.8V power | &nbsp; |
| Left 42 | GND | Ground. | &nbsp; |
| Left 43 | +1V8 | 1.8V power | &nbsp; |
| Left 44 | GND | Ground. | &nbsp; |
| Left 45 | Y7 | IMU Y7 | &nbsp; |
| Left 46 | Y6 | IMU Y6 | &nbsp; |
| Left 47 | Y5 | IMU Y5 | &nbsp; |
| Left 48 | Y4 | IMU Y4 | &nbsp; |
| Left 49 | Y3 | IMU Y3 | &nbsp; |
| Left 50 | NC | Leave unconnected | &nbsp; |
| Left 51 | NC | Leave unconnected | &nbsp; |
| Left 52 | GND | Ground. | &nbsp; |
| Left 53 | P2_A5_FET_CONTROL / D14 | A5 Analog in, GPIO, PWM. | PB[4] |
| Left 54 | GND | Ground. | &nbsp; |
| Left 55 | P2_D1_SCL | I2C SCL | PB[5] |
| Left 56 | P2_D0_SDA | I2C SDA | PB[6] |
| Left 57 | GND | Ground. | &nbsp; |
| Left 58 | P2_S2_SCK / D17 | S2 GPIO, SPI SCK | PA[14] |
| Left 59 | P2_S1_SDI / D16 | S1 GPIO, PWM, SPI SDI/MISO, Serial3 RX. | PA[13] |
| Left 60 | P2_S0_SDO / D15 | S0 GPIO, PWM, SPI SDO/MOSI, Serial3 TX. | PA[12] |
| Right 1 | VIN | &nbsp; | &nbsp; |
| Right 2 | VIN | &nbsp; | &nbsp; |
| Right 3 | VIN | &nbsp; | &nbsp; |
| Right 8 | GND | Ground. | &nbsp; |
| Right 9 | GND | Ground. | &nbsp; |
| Right 10 | GND | Ground. | &nbsp; |
| Right 11 | LI+ | &nbsp; | &nbsp; |
| Right 12 | LI+ | &nbsp; | &nbsp; |
| Right 13 | LI+ | &nbsp; | &nbsp; |
| Right 14 | GND | Ground. | &nbsp; |
| Right 15 | GND | Ground. | &nbsp; |
| Right 16 | GND | Ground. | &nbsp; |
| Right 17 | TS | PMIC TS (temperature sensor) pin | &nbsp; |
| Right 18 | 3V3 | &nbsp; | &nbsp; |
| Right 19 | 3V3 | &nbsp; | &nbsp; |
| Right 20 | GND | Ground. | &nbsp; |
| Right 21 | GND | Ground. | &nbsp; |
| Right 22 | PMID | PMIC PMID power output | &nbsp; |
| Right 23 | PMID | PMIC PMID power output | &nbsp; |
| Right 24 | GND | Ground. | &nbsp; |
| Right 25 | GND | Ground. | &nbsp; |
| Right 26 | 5V | &nbsp; | &nbsp; |
| Right 27 | 5V | &nbsp; | &nbsp; |
| Right 28 | GND | Ground. | &nbsp; |
| Right 29 | GND | Ground. | &nbsp; |
| Right 30 | VCC | 3.7V cellular modem supply | &nbsp; |
| Right 31 | GND | Ground. | &nbsp; |
| Right 32 | GND | Ground. | &nbsp; |
| Right 33 | GND | Ground. | &nbsp; |
| Right 34 | 5V | &nbsp; | &nbsp; |
| Right 35 | 5V | &nbsp; | &nbsp; |
| Right 36 | GND | Ground. | &nbsp; |
| Right 37 | GND | Ground. | &nbsp; |
| Right 38 | PMID | PMIC PMID power output | &nbsp; |
| Right 39 | PMID | PMIC PMID power output | &nbsp; |
| Right 40 | GND | Ground. | &nbsp; |
| Right 41 | GND | Ground. | &nbsp; |
| Right 42 | 3V3 | &nbsp; | &nbsp; |
| Right 43 | 3V3 | &nbsp; | &nbsp; |
| Right 44 | GND | Ground. | &nbsp; |
| Right 45 | GND | Ground. | &nbsp; |
| Right 46 | GND | Ground. | &nbsp; |
| Right 47 | GND | Ground. | &nbsp; |
| Right 48 | LI+ | &nbsp; | &nbsp; |
| Right 49 | LI+ | &nbsp; | &nbsp; |
| Right 50 | LI+ | &nbsp; | &nbsp; |
| Right 51 | GND | Ground. | &nbsp; |
| Right 52 | GND | Ground. | &nbsp; |
| Right 53 | GND | Ground. | &nbsp; |
| Right 58 | VIN | &nbsp; | &nbsp; |
| Right 59 | VIN | &nbsp; | &nbsp; |
| Right 60 | VIN | &nbsp; | &nbsp; |
| 10 | GND | Ground. | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}
