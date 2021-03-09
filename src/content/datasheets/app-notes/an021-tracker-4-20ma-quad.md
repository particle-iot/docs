---
title: AN021 Tracker 4-20mA Sensor Quad
layout: datasheet.hbs
columns: two
order: 121
---
# AN021 Tracker 4-20mA Sensor Quad

You can download the files associated with this app note [as a zip file](/assets/files/app-notes/AN021.zip).

This application note includes hardware and software for connecting up to four 4-20mA sensors to the Tracker One using the M8 connector.

The quad port design requires an external 12V power supply, but this power supply can also power the Tracker One. It includes a boost converter to 24VDC for the 4-20mA current loop and separate current limiters for each current loop. It uses an external I2C ADC connected to the M8 connector.

There is also a simple [single current loop design](https://github.com/particle-iot/app-notes/tree/master/AN020-Tracker-4-20mA) that can be powered off the built-in LiPo battery.

![Quad](/assets/images/app-notes/AN021/quad.jpg)

- 24V boost converter (from external 12V supply)
- 30 mA current limiter per sensor loop
- TVS protection
- I2C Quad ADC (ADS1015)
- 3.3V power supply for the ADC (from CAN_5V)

Author: Rick

## Connecting

The M8 (8mm) 8-pin connector on the Tracker One is standard, however it's not common. Some other connectors like M12 are more common, however, the 12mm connector would have required a taller enclosure to fit the larger connector. To simplify designs, Particle will provide a M8 female-to-wires cable, similar to this. This is for illustration only and the design may vary in the future.

![M8 cable](/assets/images/app-notes/AN021/m8-cable.jpg)

The common use case will be to include a cable gland in your expansion enclosure, pass the wires through the gland, and terminate them on your custom expansion board.

You'd typically connect those wires to your custom expansion board using one of several methods:

- Terminate with pins in a PHR-8 to mate with a B8B-PH on your expansion board
- Terminate with screw terminals on your board
- Terminate by soldering the wires to your board

This example can be used three different ways: 

- It can use the same B8B-PH connector that is inside the Tracker One on the Tracker Carrier board. This connector is inexpensive and can be attached directly to the Tracker One Carrier Board.

- Or you can populate a 8x0.1" screw terminal header. This is good for connecting to the M8 to flying leads.

- Or you can populate 0.1" male header pins, which are handy for use with male-to-female Dupont wires for connecting directly to the Tracker SoM evaluation board.


## Hardware - Quad


### Schematic - Quad

![Quad Schematic](/assets/images/app-notes/AN021/quad-schematic-1.png)

Unlike the previous design, this one requires a 3.3V power supply for the I2C ADC. The I2C and Serial ports as well as GPIO and ADC on the nRF52 are limited to 3.3V. An XCL224 regulator is included. It's small, relatively inexpensive, and only requires 4.7uF and 10 uF capacitors. It does not require an inductor, saving cost and space.

The ADC is a ADC1015, a quad I2C ADC. In order to support 4 channels it's used in single-ended mode. 

4-20mA generally requires 24VDC. We generate this from the CAN_5V supply using a AP3012 boost converter. This inexpensive chip only requires input and output capacitor, a Schottky diode, an inductor, and two resistors for a voltage divider to control the output voltage. Though the other design uses a MIC2288, that chip can't handle a 12V input. The other design could be easily modified to use the AP3012 if desired, even the voltage divider resistors are identical.

![Quad Schematic](/assets/images/app-notes/AN021/quad-schematic-2.png)

The sensing circuit is identical to the single, but there are 4 of them.

The sense resistor is connected low-side, to ground, so it can be measured with a single-ended ADC. 

This design uses a 10 ohm sense resistor, since the ADS1015 has programmable gain control. The ADS 1015 is run in PGA16 mode (+/- 0.256V). 

| Current | ADC Value | Description   |
| ------: | --------: | :------------ |
| 0 mA    | 0         | Open Circuit  |
| 4 mA    | 318       | Minimum Value |
| 20 mA   | 1602      | Maximum Value |
| 30 mA   | 2048      | Short circuit |


Originally, I used a 100 ohm resistor is used so the maximum current of 30 mA will have a voltage of 3.0V across the sense resistor, within the capabilities of the ADC but using 10 ohm uses more of the usable range of the ADC. For the 100 ohm sense resistor, the ADS 1015 is run in PGA1 mode (+/-4.096V). This means 3.3V is approximately 1652.

| Current | Voltage | ADC Value | Description   |
| ------: | ------: | --------: | :------------ |
| 0 mA    |  0.0 V  | 0         | Open Circuit  |
| 4 mA    |  0.4 V  | 199       | Minimum Value |
| 20 mA   |  2.0 V  | 1004      | Maximum Value |
| 30 mA   |  3.0 V  | 1506      | Short circuit |


### Board Layout - Quad

![Quad Board](/assets/images/app-notes/AN021/quad-board.png)

### BoM (Bill of Materials) - Quad

| Quantity | Part | Description | Example | Cost |
| :---: | :--- | :--- | :--- | ---: |
| 1 | C1 | CAP CER 4.7UF 6.3V X5R 0603 | [Murata GRM188R60J475KE19J](https://www.digikey.com/product-detail/en/murata-electronics-north-america/GRM188R60J475KE19J/490-6407-1-ND/3845604) | |
| 1 | C2 | CAP CER 10UF 16V X5R 0805 | [Murata GRM21BR61C106KE15L](https://www.digikey.com/product-detail/en/murata-electronics-north-america/GRM21BR61C106KE15L/490-3886-1-ND/965928) | |
| 2 | C5, C6 | CAP CER 1UF 25V X7R 0603| [Samsung CL10B105KA8NNNC](https://www.digikey.com/product-detail/en/samsung-electro-mechanics-america-inc/CL10B105KA8NNNC/1276-1184-1-ND/3889270) | |
| 4 | D1 - D4 | TVS DIODE 26V 42.1V DO214AC | [Littelfuse SMAJ26A](https://www.digikey.com/product-detail/en/littelfuse-inc/SMAJ26A/SMAJ26ALFCT-ND/762502) | $0.36 |
| 1 | D6 | DIODE SCHOTTKY 40V 1A POWERMITE | [ON Semiconductor MBRM140T3G](https://www.digikey.com/product-detail/en/on-semiconductor/MBRM140T3G/MBRM140T3GOSCT-ND/917997) | $0.36 |
| 1 | J4 | TERM BLK 2POS SIDE ENT 3.5MM | [On Shore OSTTE020161M](https://www.digikey.com/products/en?keywords=ED2635-ND) | $0.67 | 
| 1 | L1 | FIXED IND 10UH 1A 276 MOHM SMD | [Bourns SRN3015-100M](https://www.digikey.com/product-detail/en/bourns-inc/SRN3015-100M/SRN3015-100MCT-ND/2756149) | $0.46 |
| 4 | R1 - R4 | RES SMD 10 OHM 1% 1/10W 0603 | [Panasonic ERJ-3EKF10R0V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3EKF10R0V/P10-0HCT-ND/198100) | |
| 3 | R5, R6, R7 | RES SMD 10K OHM 5% 1/4W 0603 | [Panasonic ERJ-PA3J103V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-PA3J103V/P10KBZCT-ND/5036237) | | 
| 1 | R9 | RES SMD 18.2K OHM 0.1% 1/5W 0603 | [Panasonic ERJ-PB3B1822V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-PB3B1822V/P20114CT-ND/6214369) | $0.25 | 
| 1 | R10 | RES SMD 1K OHM 0.5% 1/5W 0603 | [Panasonic ERJ-PB3D1001V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-PB3D1001V/P20283CT-ND/6214538) |  | 
| 4 | U1 - U4| IC CURR LOOP PROT 4-20MA 6TDFN | [Maxim MAX14626ETT+T](https://www.digikey.com/product-detail/en/maxim-integrated/MAX14626ETT-T/MAX14626ETT-TCT-ND/4245424) | $1.32 |
| 1 | U5 | XCL224 3.3V regulator | [Torex XCL224A333D2-G](https://www.digikey.com/product-detail/en/torex-semiconductor-ltd/XCL224A333D2-G/893-1419-1-ND/8256121) |$ 2.43| 
| 1 | U6 | IC ADC 4-ch 12-bit I2C 10-VSSOP | [TI ADS1015IDGSR](https://www.digikey.com/product-detail/en/texas-instruments/ADS1015IDGSR/296-41185-1-ND/5222640) | $2.68 |

Choose one of:

| Quantity | Part | Description | Example | Cost | 
| :---: | :--- | :--- | :--- | ---: | 
| 1 | J3 | Conn SMD 8 position 2.00mm | [JST B8B-PH-SM4-TB(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/B8B-PH-SM4-TB-LF-SN/455-1740-1-ND/926837) | $1.00 |
|   | J7 | Male Header Pins (8x0.1") | [Sullins PRPC040SAAN-RC](https://www.digikey.com/product-detail/en/PRPC040SAAN-RC/S1011EC-40-ND/2775214) | |
| 1 | J7 | Screw Terminal Block 8x0.1" PTH | [On Shore OSTVN08A150](https://www.digikey.com/product-detail/en/on-shore-technology-inc/OSTVN08A150/ED10566-ND/1588868) | $2.36 | 

The part shown in the picture above is the detachable screw terminal header. This is handy because you can detach the adapter board without having to unscrew all 8 screw terminal connectors, however it is more expensive. Another alternative is to use a standard screw terminal header, the second option. You only need one or the other.

| Quantity | Part | Description | Example | Cost |
| :---: | :--- | :--- | :--- | ---: |
|  |  | Option 1: | | |
| 1 | J3 | TERM BLOCK HDR 8POS 90DEG 3.81MM | [On Shore OSTOQ083251](https://www.digikey.com/product-detail/en/on-shore-technology-inc/OSTOQ083251/ED2814-ND/1588131) | $1.35 |
| 1 |    | TERM BLOCK PLUG 8POS STR 3.81MM  | [On Shore OSTTJ0831530](https://www.digikey.com/product-detail/en/on-shore-technology-inc/OSTTJ0831530/ED2881-ND/1588456) | $3.29 |
|  |  | Option 2: |  | |
| 1 | J3 | TERM BLK 8P SIDE ENT 3.81MM PCB| [Amphenol YO0821500000G](https://www.digikey.com/product-detail/en/amphenol-anytek/YO0821500000G/609-3924-ND/2261361) | $1.79 |


By the way, this [inexpensive tool from Amazon](https://www.amazon.com/dp/B07L491RLM/ref=sspa_dk_detail_4) ($27.99) is very handy for testing 4 - 20mA. It's powered by USB and you dial in the exact number of mA you want to draw.

## Firmware

### Getting the Tracker Edge Firmware

The Tracker Edge firmware can be downloaded from Github:

[https://github.com/particle-iot/tracker-edge](https://github.com/particle-iot/tracker-edge)

You will probably want to use the command line as there are additional commands you need to run after cloning the source:

```bash
git clone https://github.com/particle-iot/tracker-edge 
cd tracker-edge
git submodule update --init --recursive
```

- Open Particle Workbench.
- From the command palette, **Particle: Import Project**.
- Run **Particle: Configure Workspace for Device**, select version 1.5.4-rc.1, 2.0.0-rc.3, or later, Tracker, and your device.
- Run **Particle: Flash application (local)**.

Make sure you've used the [**Mark As Development Device**](https://docs.particle.io/tutorials/product-tools/development-devices/) option for your Tracker device in your Tracker product. If you don't mark the device as a development device it will be flashed with the default or locked product firmware version immediately after connecting to the cloud, overwriting the application you just flashed.


### Add the libraries - Quad


From the command palette in Workbench, **Particle: Install Library** then enter **Sensor_4_20mA_RK**. Repeat for **SparkFun_ADS1015_Arduino_Library**. 

If you prefer to edit project.properties directly, add these:

```
dependencies.Sensor_4_20mA_RK=0.0.2
dependencies.SparkFun_ADS1015_Arduino_Library=2.3.0
```

### The Source - Quad

```cpp

#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

#include "Sparkfun_ADS1015_Arduino_Library.h"
#include "Sensor_4_20mA_RK.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

PRODUCT_ID(TRACKER_PRODUCT_ID);
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

const size_t NUM_SENSOR_CONFIG = 2;
SensorConfig sensorConfig[NUM_SENSOR_CONFIG] = {
    { 100, "sen1" },
    { 101, "sen2", 0, 100, false }
};
Sensor_4_20mA sensor;

void locationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration


void setup()
{
    // Uncomment to make it easier to see the serial logs at startup
    waitFor(Serial.isConnected, 15000);
    delay(1000);

    Tracker::instance().init();

    // Callback to add temperature information to the location publish
    Tracker::instance().location.regLocGenCallback(locationGenerationCallback);

    // If using the M8 connector, turn on the CAN_5V power
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);
    delay(500);

    Wire3.begin();

    sensor
        .withADS1015(100, ADS1015_CONFIG_PGA_16, 318, 1602, ADS1015_ADDRESS_GND, Wire3)
        .withConfig(sensorConfig, NUM_SENSOR_CONFIG)
        .init();

    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();

    static unsigned long lastReport = 0;
    if (millis() - lastReport >= 2000) {
        lastReport = millis();

        for(size_t ii = 0; ii < NUM_SENSOR_CONFIG; ii++) {
            SensorValue value = sensor.readPinValue(sensorConfig[ii].virtualPin);

            Log.info("%s: value=%.3f mA=%.3f adcValue=%d", sensorConfig[ii].name, value.value, value.mA, value.adcValue);
        }
    }
}


void locationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    sensor.writeJSON(writer);
}

```




## Digging In - Quad

```cpp
const size_t NUM_SENSOR_CONFIG = 2;
SensorConfig sensorConfig[NUM_SENSOR_CONFIG] = {
    { 100, "sen1" },
    { 101, "sen2", 0, 100, false }
};

Sensor_4_20mA sensor;
```

This configures two sensors on the ADS1015 I2C ADC.

Virtual sensor pin 100 (an arbitrarily defined number) saves the data to the key "sen1" in location publishes. The value will be in mA.

Virtual sensor pin 101 (the second port) is connected to a 0-100°C 4-20mA RTD temperature sensor I got [from Amazon](https://www.amazon.com/uxcell-Temperature-Sensor-Transmitter-4-20mA/dp/B07PPTPYCB/ref=sr_1_34).

The next parameters are the range of the sensor (0 to 100). The false parameter indicates that the lower bound is the value for 0 mA, not 4 mA.

| Last Parameter | Meaning |
| :--- | :--- |
| false | Lower value is value for 0 mA |
| true  | Lower value is the value for 4 mA (default) |

More information about the configuration object can be found in the [4-20mA library Github](https://github.com/rickkas7/Sensor_4_20mA_RK).

```cpp
sensor
    .withADS1015(100, ADS1015_CONFIG_PGA_16, 318, 1602, ADS1015_ADDRESS_GND, Wire3)
    .withConfig(sensorConfig, NUM_SENSOR_CONFIG)
    .init();
```

The parameters to `withADS1015()` are:

- Since the ADC1015 ADCs don't have pin numbers (in the analogRead() sense), we assign them virtual pin numbers, which typically start at 100. They don't need to be contiguous. Each ADS1015 has 4 ADCs, so it always uses 4 virtual pins, even if you don't use all 4 ADCs. An 8-channel ADC would use 8. The value 100 is the virtual pin number to start with for that ADC. This must match the config structure, above.

- `ADS1015_CONFIG_PGA_16` is the gain setting for the ADC for a 10 ohm sense resistor. 

- 318 is the ADC value for 4 mA (`adcValue4mA`) when using a 10 ohm sense resistor. See table below.

- 1602 is the ADC value for 20 mA (`adcValue20mA`).

| Parameter | 10 ohm | 100 ohm |
| :--- | :--- | :--- |
| `gain` | `ADS1015_CONFIG_PGA_16` | `ADS1015_CONFIG_PGA_1` |
| `adcValue4mA` | 318 | 199 |
| `adcValue20mA` | 1602 | 1004 |


```cpp
void locationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    sensor.writeJSON(writer);
}
```

This adds the keys defined in the `SensorConfig` to the location publishes.

## Revision History

### 0.0.2 (2020-08-11)

- Changed the sense resistor from 100 ohm to 10 ohm, since the ADS1015 has built-in gain control
