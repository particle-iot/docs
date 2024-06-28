---
title: M.2 SoM guide
columns: two
layout: commonTwo.hbs
description: M.2 SoM guide
---

# {{title}}



### Mechanical drawing

{{imageOverlay src="/assets/images/b-series/b-series-mechanical.png" alt="Mechanical Drawing"}}

Dimensions are in millimeters.

---

### Mating connector and land pattern

The mating connector is a an M.2 (NGFF) type 4, E key. Note that there are several different key configurations for the M.2, and type 4 is different than is commonly used on SSDs.

| Manufacturer | Model | Preference | Availability |
| :--- | :--- | :--- | :--- |
| TE Connectivity | [TE 2199230-4](https://www.te.com/usa-en/product-2199230-4.html) | Recommended | [DigiKey](https://www.digikey.com/product-detail/en/te-connectivity-amp-connectors/2199230-4/A115904CT-ND/4208916), [Mouser](https://www.mouser.com/ProductDetail/TE-Connectivity/2199230-4) | 
| LOTES CO., LTD. | APCI0108-P004A | Alternate | |


{{imageOverlay src="/assets/images/b-series/b-series-connector.png" alt="M.2 Connector" class="full-width"}}

The TE Connectivity page for the [TE 2199230-4](https://www.te.com/usa-en/product-2199230-4.html) includes downloads for:

- Product drawings
- CAD symbol and footprint (via SnapEDA)
- 3D models
- Application specifications 

The application specifications include:

- Solder paste specifications and reflow profile
- Insertion guidelines
- Storage specifications

---

### Screw assembly

The M.2 SoM requires a screw to hold the SoM in place because the M.2 connector does not have integrated locks and the SoM will pop up if not attached to the base board. The screw also provides better vibration resistance than locking clips.

- This is one style of standoff.

![Screw Assembly](/assets/images/b-series/new-standoff.png)

- An [alternative design](/hardware/b-series-som/som-first-board/#hold-down-screw) uses a [JAE SM3ZS067U410-NUT1-R1200](https://www.digikey.com/product-detail/en/jae-electronics/SM3ZS067U410-NUT1-R1200/670-2865-1-ND/5955849) standoff. It's reflow soldered to your base board and has a threaded hole for a M2*3 screw to hold down the SoM. This may be easier to obtain.
- The screw should be connected to the ground plane on your base board.

### Thumbscrew

For products in the field, a M2 or M2.5 screw is typically used to match the standoff that you have selected. 

For prototyping, such as with the [M.2 SoM breakout board](/reference/datasheets/m-series/m2-breakout-datasheet/), a thumbscrew can be used.

You can purchase a similar thumbscrew from these suppliers. The diameter will depend on the standoff you have used on your board, which is typically M2 or M2.5.

From Amazon:
- [M2.5 x 4mm thumb screw](https://www.amazon.com/dp/B0BK1K6G9R?ref=ppx_yo2ov_dt_b_product_details&th=1)
- [M2.0 x 4mm thumb screw](https://amzn.to/49Uz5gj)

From McMaster-Carr:
- [M2.5 x 4mm Stainless Steel Flared-Collar Knurled-Head Thumb Screw](https://www.mcmaster.com/catalog/99607A263)
- [M2.0 x 4mm Stainless Steel Flared-Collar Knurled-Head Thumb Screw](https://www.mcmaster.com/catalog/99607A256)


### Design considerations

We strongly recommend against placing components under the SOM board because there is not enough height.

{{imageOverlay src="/assets/images/b-series/b-series-keep-out.png" alt="Keep-Out Area"}}

You can have traces underneath the SoM, on all board layers.


### 3D models

3D models of SoM modules are available in the [hardware-libraries Github](https://github.com/particle-iot/hardware-libraries/) in the CAD folder, typically in formats including step, iges, stl, and f3d.

## Vibration sensitivity

To validate the proper operation of M.2 SoM devices in conditions with vibration, a test based on EIA-364-28E, Test Condition I, was employed.

The sine sweep frequency vibration test uses a vibration table with an amplitude of 1.5mm. The frequency of vibration sweeps from 10 Hz to 55 Hz, then returns to 10 Hz. Each cycle takes 6 minutes and is repeated 4 times.

Additionally the test is repeated with the boards in X, Y, and Z orientation:

![](/assets/images/b-series/vibration1.jpg)
![](/assets/images/b-series/vibration2.jpg)
![](/assets/images/b-series/vibration3.jpg)

This is an operational test. By using a combination of MCU-internal pull-up resistors and an external pull-down resistor, interruptions in the connectivity through the M.2 connector can be detected:

![](/assets/images/b-series/vibration5.jpg)

PWM is also tested.

![](/assets/images/b-series/vibration4.jpg)

GPIO are tested using a combination of internal pull-up and external pull-down with an interrupt on change. This allows any interruption in the connectivity through the M.2 socket to be detected through software.

The test also includes tests of the internal QSPI flash, and communication with the cellular modem module during the vibration test.

All tests completed successfully.


## M.2 SoM devices

The following are M.2 SoM device SKUs:

{{!-- BEGIN do not edit content below, it is automatically generated 9e1f59dd-fe76-4361-85a0-daaed2736a85 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | Deprecated |
| B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | Deprecated |
| B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | Deprecated |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NRND |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | GA |
| B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | In development |
| B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | In development |
| B523MEA | B-Series LTE CAT-1/3G/2G (Europe) [x1] | Deprecated |
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | NRND |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | GA |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | GA |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |


{{!-- END do not edit content above, it is automatically generated --}}
