# Shield Shield

Sometimes life can be a little difficult in the land of electronics when two systems talk a different voltage language. How do you make them talk to each other without making one of them _burnout_? The Shield Shield is the answer. This shield performs all the necessary voltage translation and provides an Arduino-like footprint to make it easier for you to plug in your existing Arduino shields or talk to other 5V hardware.

![](https://github.com/spark/photon-shields-docs/blob/master/shield-shield/shield-shield.png)

**Specifications (v3.x.x):**
 - Operating voltage: 7 to 15V DC
 - Current consumption: standalone 7mA at 9V DC
 - Voltage translator with auto direction detect: TXB0108PWR
 - Dedicated MOSFET based voltage translator on I2C lines
 - Separate unidirectional quad buffer for driving heavy loads: 74ACT125
 - Diode protection on ADC pins
 - Dimensions: 3.4" x 2.1"
 - Weight: 28 gms

![](https://github.com/spark/photon-shields-docs/blob/master/shield-shield/shield-shield-dimensions.png)

**Operation:**   

We use Texas Instruments TXB0108PWR to do the voltage translation in between the Particle's device's 3.3V to a 5V logic. Unlike other IO pins, the analog pins are rated at only a max of 3.3V and **NOT** 5.0V. Please remember NOT to exceed this voltage at anytime. The shield has an on-board voltage regulator and can be powered from 7V to 15V DC source. You could also power it via the USB plug on the Spark Core alone but the current would be limited to 500mA.

The new version of the Shield Shield (v3.x.x) uses dedicated MOSFET based voltage translation on the I2C lines. We also decided to add a prototyping area in empty space in the middle of the shield.

![](https://github.com/spark/photon-shields-docs/blob/master/shield-shield/shield-shield-description.png)

**Note:** One drawback of using the TXB0108PWR as a voltage translator is that it is only capable of driving loads at short distances. Long length wires will introduce excessive capacitive loading and cause the auto direction detection to fail. To overcome this drawback, the shield shield also has an optional on-board 74ABT125 buffer that is capable of driving heavier loads in *one* direction. A user can jumper wire to whichever IO pin they would like to be translated to 5V.

//Circuit Diagram  
//Product Photo with description

**Pin Mapping**

![](https://github.com/spark/photon-shields-docs/blob/master/shield-shield/shield-shield-pinmapping.png)

|Shield  | Photon | Peripherals             |
|--------|--------|-------------------------|
|0       | RX     |     Serial1 RX,PWM      |
|1       | TX     |     Serial1 TX,PWM      |
|2       | A2     |     SPI1_SS             |
|3       | WKP    |     PWM,ADC             |
|4       | D6     |                         |
|5       | D0     |     SDA,PWM             |
|6       | D1     |     SCL,PWM,CAN_TX      |
|7       | D7     |                         |
|8       | A5     |     SPI1_MOSI,PWM       |
|9       | A4     |     SPI1_MISO,PWM       |
|10      | D5     |     SPI3_SS             |
|11      | D2     |     SPI3_MOSI,PWM,CAN_RX|
|12      | D3     |     SPI3_MISO,PWM       |
|13      | D4     |     SPI3_SCK            |
|A0      | A0     |     ADC**               |
|A1      | A1     |     ADC**               |
|A2      | DAC1   |     DAC,ADC**           |
|A3      | DAC2   |     SPI1_SCL,DAC,ADC**  |
|A4      | D0     |     SDA,PWM*            |
|A5      | D1     |     SCL,PWM*,CAN_TX     |

*Note: These pins can also function as 3.3V PWM outputs or 3.3V Servo outputs.  
** Note: ADC inputs are 3.3V max.

**IMPORTANT:** The Shield Shield does not map the Particle device's pins to like-numbered pins on the Arduino. In other words, D0 on the Particle device is not the same as D0 on the Arduino. Please review the pin mapping table to the right and plan accordingly.

**Usage:**

Link to the Shield Shield Library and example connections for I2C, SPI, ADC, and Neopixel.

