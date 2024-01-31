---
title: Monitor One Developer Edition User Manual
columns: two
layout: commonTwo.hbs
description: Monitor One Developer Edition User Manual
---

# Monitor One Developer Edition User Manual

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/monitor-one-developer-edition-manual.pdf"}}
{{/unless}} {{!-- pdf-generation --}}


## In the box

### Cables

There are two cables in the box. The M12 8-pin in connector is used for power, and includes a barrel connector adapter.

![M12 8-pin](/assets/images/monitor-one/m12-8.jpeg)

There is also an M12 4-pin connector for expansion. The I/O card uses this connector for the relay and the 0-10V opto-isolated digital input.

![M12 4-pin](/assets/images/monitor-one/m12-4.jpeg)

### Power supply

The small rectangular box contains a power supply. 

The DC output is 24 V DC at 1A (24W). The connector is a 5.5x2.1mm barrel plug, center positive.


## Monitor One external features

![External features](/assets/images/monitor-one/post-corner-labeled.png)


| Label | Feature |
| :---: | :--- |
|  1 | System RGB LED |
|  2 | GNSS antenna (internal) |
|  3 | Cellular antenna (internal) |
|  4 | External connectors (on bottom) |
|  5 | Magnetic, bolt-down, or strap-down mounting bracket |
|  6 | User RGB LEDs (2) |
|  7 | User button (externally accessible) |
|  8 | Wi-Fi geolocation antenna (internal) |

### Connectors

![Bottom Connectors](/assets/images/monitor-one/bottom-connectors-labeled.png)


The bottom plate of the Monitor One can be customized with different connectors for your application.

| Label | Feature |
| :---: | :--- |
|  1 | Cellular antenna (SMA) |
|  2 | M12 connector (8-pin) |
|  3 | M12 connector (4-pin) |
|  4 | GNSS antenna (SMA) |
|  5 | Mounting plate attachment screw |

The Monitor One only uses the internal cellular and GNSS antennas. The cellular (1) and GNSS (4) antenna connectors are not connected internally and are not certified for use.


### I/O expansion M12 8-pin to flying leads

The Monitor One includes a M12 8-pin male to flying leads cable, 1500&plusmn;20mm (about 60 inches or 5 feet). This is used to power the Monitor One, and also use the 4-20mA, 0-10V analog in, CAN bus, and RS485 (Modbus) interfaces.

![M12 Cable Connector](/assets/images/monitor-one/m12-cable.png)

<p class="attribution">Looking at the pins on the end of the connector on the cable</p>

| Conn P1 (M12)| Color | Function | GPIO |
| :---: | :---: | :--- | :--- | :---: |
| 1 | White | CAN_P | |
| 2 | Red | VIN (6-30 VDC) | |
| 3 | Green | 4-20mA input | A7 |
| 4 | Yellow | 0-10V input | A6 |
| 5 | Gray | RS485_B (N) | |
| 6 | Pink | RS485_A (P) | |
| 7 | Blue | CAN_N | |
| 8 | Black | Ground | |

![M12 8-pin flying leads](/assets/images/monitor-one/m12-8-flying.png)


### I/O expansion M12 4-pin to flying leads

The Monitor One includes a M12 4-pin male to flying leads cable, 1500&plusmn;20mm (about 60 inches or 5 feet). You do not need to connect this cable initially.

![M12 8-pin flying leads](/assets/images/monitor-one/m12-4-flying.png)


| Conn P1 (M12)| Color | Function | GPIO |
| :---: | :---: | :--- | :--- | :---: |
| 1 | Red | 12-24V slow-signal input | A5 |
| 2 | Green | Relay COM | |
| 3 | Black | Ground | |
| 4 | Blue | Relay (NO) | NFC_PIN2 |

## Powering the Monitor One

The Monitor One Developer Edition includes a 24V 1A (24W) power adapter (1). Your power adapter may be slightly different.

Locate the M12 8-pin cable (2). There are two cables, a 4-pin and an 8-pin, and the 8-pin is used for power.

The cable includes a barrel connector adapter (3). Connect the 5.5x2.1mm barrel jack on the power adapter to the barrel connector adapter.

Connect the M12 8-pin connector to the Monitor One (4). The 8-pin connector is on the left with the label facing up, closest to the cellular SMA connector. Some threads may be exposed even when the connector is fully seated; this is normal and does not affect the IP67 waterproof rating.

![Powering](/assets/images/monitor-one/with-power-labeled.png)

| Label | Feature |
| :---: | :--- |
|  1 | Power supply |
|  2 | M12 8-pin to flying leads cable |
|  3 | Barrel connector adapter |
|  4 | M12 8-pin connection to Monitor One |


## Setting up the device

To set up the device and associate it with your Particle account, visit [setup.particle.io](https://setup.particle.io/). The Monitor One is setup as as Tracker device, as both contain the Tracker SoM module.

At setup.particle.io, you will be given a choice between setting up a device by USB or setting up a Monitor One.

![Select Monitor One](/assets/images/monitor-one/setup-select-monitor-one.png)

You will then be asked for the serial number. It is available under the mounting plate as pictured.

![Enter serial number](/assets/images/monitor-one/setup-enter-serial.png)

It is also available on the bottom of the box. The serial number begins with "P" and a 3-digit number. It's currently P031 or P032 but this could change.

![Serial number sticker](/assets/images/monitor-one/box-serial-number.png)

Just follow the instructions in the setup application to complete setup.


---

## Certification


### FCC interference statement

This device complies with part 15 of the FCC Rules. Operation is subject to the following two conditions: (1) This device may not cause harmful interference, and (2) this device must accept any interference received, including interference that may cause undesired operation.

This device complies with Part 15, Part 15.247 of the FCC Rules. The FCC ID for this device is 2AEMI-MONEHDK.

This device must not be co-located or operating in conjunction with any other antenna or transmitter. This equipment has been tested and found to comply with the limits for a Class B digital device, pursuant to part 15 of the FCC Rules. These limits are designed to provide reasonable protection against harmful interference in a residential installation. 

This equipment generates, uses and can radiate radio frequency energy and, if not installed and used in accordance with the instructions, may cause harmful interference to radio communications. However, there is no guarantee that interference will not occur in a particular installation. If this equipment does cause harmful interference to radio or television reception, which can be determined by turning the equipment off and on, the user is encouraged to try to correct the interference by one or more of the following measures:

- Reorient or relocate the receiving antenna.
- Increase the separation between the equipment and receiver.
- Connect the equipment into an outlet on a circuit different from that to which the receiver is connected.
- Consult the dealer or an experienced radio/TV technician for help.

To comply with FCC’s RF radiation exposure limits for general population/uncontrolled exposure, this device must be installed to provide a separation distance of at least 20cm from all persons.

WARNING: Any changes or modifications to this unit not expressly approved by the party responsible for compliance could void the user’s authority to operate the equipment.

This device must not be collocated or operating in conjunction with any other antenna or transmitter.

### ISED interference statement

ISED: 20127-MONEHDK

This device complies with Industry Canada license-exempt RSS standard(s). Operation is subject to the following two conditions:

- this device may not cause interference.
- this device must accept any interference, including interference that may cause undesired operation of the device.

Le présent appareil est conforme aux CNR d'Industrie Canada applicables aux appareils radio exempts de licence. L'exploitation est autorisée aux deux conditions suivantes:

- l'appareil ne doit pas produire de brouillage, et
- l'utilisateur de l'appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d'en compromettre le fonctionnement.

This Class B digital apparatus complies with Canadian ICES-003.

Cet appareil numérique de la classe B est conforme à la norme NMB-003 du Canada.

This device and its antenna(s) must not be co-located or operating in conjunction with any other antenna or transmitter, except tested built-in radios.

Cet appareil et son antenne ne doivent pas être situés ou fonctionner en conjonction avec une autre antenne ou un autre émetteur, exception faites des radios intégrées qui ont été testées.
 
This equipment complies with IC radiation exposure limits set forth for an uncontrolled environment. This equipment should be installed and operated with minimum distance 20cm between the radiator & your body.

Cet équipement est conforme aux limites d'exposition aux rayonnements IC établies pour un environnement non contrôlé. Cet équipement doit être installé et utilisé avec un minimum de 20 cm de distance entre la source de rayonnement et votre corps.

### EU declaration of conformity

We, Particle Industries, Inc., declare under our sole responsibility that the product, MON524E01C01KIT, to which this
declaration relates, is in conformity with RED Directive 2014/53/EU and (EU) 2015/863 RoHS Directive 2011/65/EU (Recast).

The full text of the EU declaration of conformity is available at the following Internet address [https://www.particle.io/](https://www.particle.io/).

**Radiation Exposure Statement:** This equipment complies with radiation exposure limits set forth for an uncontrolled environment.

The operating frequency bands and the maximum transmitted power limit are listed below:

- BLE 2402-2480MHz, 10dBm
- Wi-Fi 2.4GHz band 2412-2484MHz, 21.5dBm
- LTE B1 B3 B7 B8 B20 B28 704.5-959.3MHz 1710.7-2687.5 MHz, 25dBm
- WCDMA 882.4-957.6 MHz 1922.6-2167.4 MHz, 25dBm

### United Kingdom

UKCA Conformity:

Radio Equipment Regulations 2017 (S.I. 2017/1206)

## Product handling

### ESD precautions

The Monitor One contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an module without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the module. ESD precautions should be implemented on the application board where the B series is mounted. Failure to observe these precautions can result in severe damage to the module!

### Battery warning

**CAUTION**

RISK OF EXPLOSION IF BATTERY IS REPLACED BY AN INCORRECT TYPE.
DISPOSE OF USED BATTERIES ACCORDING TO THE INSTRUCTIONS.

### Disposal

![WEEE](/assets/images/weee.png)

This device must be treated as Waste Electrical & Electronic Equipment (WEEE) when disposed of.

Any WEEE marked waste products must not be mixed with general household waste, but kept separate for the treatment, recovery and recycling of the materials used. For proper treatment, recovery and recycling; please take all WEEE marked waste to your Local Authority Civic waste site, where it will be accepted free of charge. If all consumers dispose of Waste Electrical & Electronic Equipment correctly, they will be helping to save valuable resources and preventing any potential negative effects upon human health and the environment of any hazardous materials that the waste may contain.


## Revision history

| Date | Author | Comments |
|:-----|:-------|:---------|
| 2023-10-18 | RK | Initial version |
| 2023-11-14 | RK | Renamed RS485 pins A and B instead of P and N |
