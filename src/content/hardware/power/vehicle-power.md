---
title: Vehicle power
layout: commonTwo.hbs
columns: two
---
# {{title}}

While the Electron, E Series, and Boron have power supply inputs that will accept 12V, it's best to avoid connecting the VIN power input directly to a vehicle electrical system. There may be voltage spikes that exceed the absolute maximum limits of the device and cause damage.

There are many possible designs, but we like the [OpenXC Platform](http://openxcplatform.com/) designs. These were created by Ford and open-sourced specifically for using micro-controllers in vehicles. 

The design includes a 5V output which can be used across all devices, including the Photon, P1, Argon, and Xenon as well as the Boron, E Series, and Electron.

This shows the unregulated 12V (top), 5V regulated (middle), and 3V3 from a Boron (bottom):

![Smoothed Power](/assets/images/app-notes/AN006/smoothing.png)

You can download the files associated with this app note [as a zip file](/assets/files/app-notes/AN006.zip).



## Design 1

This design is almost exactly the OpenXC power supply design. It's built in an Adafruit Feather form-factor because it's useful for prototyping new designs and you can easily swap between cellular (Boron) and Wi-Fi (Argon). The design is easily extracted to make it part of your base board for an E Series or B Series SoM as well. Design 3 is an alternative way to lay out this design.

### Schematic 1

This is the standard design schematic:

![Schematic 1](/assets/images/app-notes/AN006/schematic1.png)

Of interest:

- A SZ1SMB16CAT3G TVS diode protects against large voltage transients.
- A RS1JFP is the reverse voltage protection diode.
- This version uses a LM340 linear regulator. It's rated for 1.2A. 
- There are a number of capacitors to smooth out the power.
- Input components are rated for 35V.

This power supply can be used for:

- Any Wi-Fi based device.
- Any LTE cellular device (E Series LTE, Boron LTE, B402 SoM).
- Any cellular device that also includes a Li-Po battery backup. 

In other words, 2G/3G cellular devices need to have a Li-Po battery when use with the 1.2A power supply. Design 2 has a higher current rating and can be used without the Li-Po battery.


### BOM 1

| Quantity | Part | Description | Example | Cost |
| :---: | :--- | :--- | :--- | ---: |
| 2 | C1, C2 | Cap Ceramic 0.47 uF 35V 0603 | [TDK CGA3E1X7R1V474K080AC](https://www.digikey.com/product-detail/en/tdk-corporation/CGA3E1X7R1V474K080AC/445-6928-1-ND/2672946) | $0.26 |
| 3 | C3, C4, C8 | Cap Ceramic 0.1 uF 35V 0603 | [Taiyo Yuden GMK105BJ104KV-F](https://www.digikey.com/product-detail/en/taiyo-yuden/GMK105BJ104KV-F/587-1994-1-ND/1646656) | $0.12|
| 1 | C5 | Cap Alum 270 uF 35V | [Panasonic EEE-FK1V271SP](https://www.digikey.com/product-detail/en/panasonic-electronic-components/EEE-FK1V271SP/P18962CT-ND/5805069) | $0.84 |
| 1 | C6 | Cap Alum 150 uF 10V | [Panasonic EEE-FK1A151P](https://www.digikey.com/product-detail/en/panasonic-electronic-components/EEE-FK1A151P/PCE3773CT-ND/766149) | $0.51 |
| 1 | C7 | Cap Ceramic 0.022 uF 50V 0603 | [Kemet C0603C223K5RACTU](https://www.digikey.com/product-detail/en/kemet/C0603C223K5RACTU/399-1280-1-ND/416056) | $0.10 |  
| 1 | D1 | TVS Diode 26V Clamp 23.1A | [Littelfuse SZ1SMB16CAT3G](https://www.digikey.com/product-detail/en/littelfuse-inc/SZ1SMB16CAT3G/F11547CT-ND/9326875) | $0.97 | 
| 1 | D2 | Diode 1.2A | [ON Semiconductor RS1JFP](https://www.digikey.com/product-detail/en/on-semiconductor/RS1JFP/RS1JFPCT-ND/5722970) | $0.44 |
| 1 | U2 | Linear regulator 5V 1A TO263-3 | [Texas Instruments LM340SX-5.0/NOPB](https://www.digikey.com/products/en?keywords=LM340SX-5.0%2FNOPBCT-ND) | $1.58 |
| 1 | J2 | Term Block 2 Pos 3.5mm | [On Shore OSTTE020161M](https://www.digikey.com/products/en?keywords=ED2635-ND) | $0.67 |
| | | Male header pins 0.1" | [Sullins PRPC040SAAN-RC](https://www.digikey.com/product-detail/en/PRPC040SAAN-RC/S1011EC-40-ND/2775214) | |

### Board 1

![Board 1](/assets/images/app-notes/AN006/board1.png)

![Photo 1](/assets/images/app-notes/AN006/design1.jpg)

## Design 2


### Schematic 2

![Schematic 2](/assets/images/app-notes/AN006/schematic2.png)

This version uses a Semtech TS30042 2A switching regulator. This is more efficient, and has sufficient power for any Particle device with or without a Li-Po battery. 

If you are hand-assembling boards, the regulator in Design 1 is much easier to solder. The pads on the TS30042 are quite small and are blind on the bottom, making it harder to align.

### BOM 2

| Quantity | Part | Description | Example | Cost |
| :---: | :--- | :--- | :--- | ---: |
| 2 | C1, C2 | Cap Ceramic 0.47 uF 35V 0603 | [TDK CGA3E1X7R1V474K080AC](https://www.digikey.com/product-detail/en/tdk-corporation/CGA3E1X7R1V474K080AC/445-6928-1-ND/2672946) | $0.26 |
| 1 | C3 | Cap Ceramic 0.1 uF 35V 0603 | [Taiyo Yuden GMK105BJ104KV-F](https://www.digikey.com/product-detail/en/taiyo-yuden/GMK105BJ104KV-F/587-1994-1-ND/1646656) | $0.12|
| 1 | C4 | Cap Ceramic 10 uF 35V 0805 | [Murata GRM21BC8YA106ME11L](https://www.digikey.com/product-detail/en/murata-electronics/GRM21BC8YA106ME11L/490-10505-1-ND/5026433) | $0.43 |
| 1 | C5 | Cap Alum 270 uF 35V | [Panasonic EEE-FK1V271SP](https://www.digikey.com/product-detail/en/panasonic-electronic-components/EEE-FK1V271SP/P18962CT-ND/5805069) | $0.84 |
| 1 | C6 | Cap Ceramic 0.022 uF 50V 0603 | [Kemet C0603C223K5RACTU](https://www.digikey.com/product-detail/en/kemet/C0603C223K5RACTU/399-1280-1-ND/416056) | $0.10 |  
| 2 | C7, C7 | Cap Ceramic 22 uF 6.3V 0805 | [Murata GRM219R61A226MEA0D](https://www.digikey.com/product-detail/en/murata-electronics-north-america/GRM219R61A226MEA0D/490-9951-1-ND/5026414) | $0.42 |
| 1 | D1 | TVS Diode 26V Clamp 23.1A | [Littelfuse SZ1SMB16CAT3G](https://www.digikey.com/product-detail/en/littelfuse-inc/SZ1SMB16CAT3G/F11547CT-ND/9326875) | $0.97 | 
| 1 | D2 | Diode 2A | [ON Semiconductor NRVHP220SFT3G](https://www.digikey.com/product-detail/en/on-semiconductor/NRVHP220SFT3G/NRVHP220SFT3GOSCT-ND/9087440) | $0.43 |
| 1 | L1 | Inductor 4.7 uH 3A | [Wurth 744774047](https://www.digikey.com/product-detail/en/wurth-electronics-inc/744774047/732-1266-1-ND/1639327) | $1.78 | 
| 1 | U1 | Switching regulator 5V 2A | [Semtech TS30042-M050QFNR](https://www.digikey.com/product-detail/en/semtech-corporation/TS30042-M050QFNR/TS30042-M050QFNRCT-ND/6605537) | $1.64 |
| 1 | J2 | Term Block 2 Pos 3.5mm | [On Shore OSTTE020161M](https://www.digikey.com/products/en?keywords=ED2635-ND) | $0.67 |
| | | Male header pins 0.1" | [Sullins PRPC040SAAN-RC](https://www.digikey.com/product-detail/en/PRPC040SAAN-RC/S1011EC-40-ND/2775214) | |


### Board 2

![Board 2](/assets/images/app-notes/AN006/board2.png)

![Photo 2](/assets/images/app-notes/AN006/design2.jpg)


## Design 3

This is design 1 (LM340 linear regulator), but with the components shifted around. It's a Feather Doubler that includes a power supply on the base board. You might use this with a Boron and an Adafruit Ultimate GPS, for example.

It also uses through-hole capacitors. There's really no advantage to doing it that way, but it is an option.

### Schematic 3

![Schematic 3](/assets/images/app-notes/AN006/schematic3.png)


### BOM 3


| Quantity | Part | Description | Example | Cost |
| :---: | :--- | :--- | :--- | ---: |
| 2 | C4, C5 | Cap Ceramic 0.47 uF 35V 0603 | [TDK CGA3E1X7R1V474K080AC](https://www.digikey.com/product-detail/en/tdk-corporation/CGA3E1X7R1V474K080AC/445-6928-1-ND/2672946) | $0.26 |
| 3 | C6, C7, C10 | Cap Ceramic 0.1 uF 35V 0603 | [Taiyo Yuden GMK105BJ104KV-F](https://www.digikey.com/product-detail/en/taiyo-yuden/GMK105BJ104KV-F/587-1994-1-ND/1646656) | $0.12|
| 1 | C8 | Cap Alum 270 uF 25V | [Wurth 860080474011](https://www.digikey.com/product-detail/en/wurth-electronics-inc/860080474011/732-9027-1-ND/57289709) | $0.36 |
| 1 | C9 | Cap Ceramic 0.022 uF 50V 0603 | [Kemet C0603C223K5RACTU](https://www.digikey.com/product-detail/en/kemet/C0603C223K5RACTU/399-1280-1-ND/416056) | $0.10 |  
| 1 | C11 | Cap Alum 150 uF 25V | [Wurth 860020473010](https://www.digikey.com/product-detail/en/wurth-electronics-inc/860020473010/732-8827-1-ND/5728772) | $0.16 |
| 1 | D1 | TVS Diode 26V Clamp 23.1A | [Littelfuse SZ1SMB16CAT3G](https://www.digikey.com/product-detail/en/littelfuse-inc/SZ1SMB16CAT3G/F11547CT-ND/9326875) | $0.97 | 
| 1 | D2 | Diode 1.2A | [ON Semiconductor RS1JFP](https://www.digikey.com/product-detail/en/on-semiconductor/RS1JFP/RS1JFPCT-ND/5722970) | $0.44 |
| 1 | U2 | Linear regulator 5V 1A TO263-3 | [Texas Instruments LM340SX-5.0/NOPB](https://www.digikey.com/products/en?keywords=LM340SX-5.0%2FNOPBCT-ND) | $1.58 |
| 1 | J2 | Term Block 2 Pos 3.5MM | [On Shore OSTTE020161M](https://www.digikey.com/products/en?keywords=ED2635-ND) | $0.67 |
| 2 | | Header 12 pos 0.1" | [Sullins PPTC121LFBN-RC](https://www.digikey.com/product-detail/en/sullins-connector-solutions/PPTC121LFBN-RC/S6100-ND/807231) | $0.78 |
| 2 | | Header 16 pos 0.1" | [Sullins PPTC161LFBN-RC](https://www.digikey.com/product-detail/en/sullins-connector-solutions/PPTC161LFBN-RC/S7014-ND/810154) | $0.98 |



### Board 3

![Board 3](/assets/images/app-notes/AN006/board3.png)

![Photo 3](/assets/images/app-notes/AN006/design3.jpg)

![Photo 3 with GPS](/assets/images/app-notes/AN006/design3-gps.jpg)






