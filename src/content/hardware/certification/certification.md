---
title: Certification
layout: commonTwo.hbs
columns: two
description: Information about certifications (FCC, IC, CE, UL, etc.) for Particle devices.
---

# {{title}}

Connected devices typically require certifications that ensure they operate within the wireless transmission specifications determined by international regulatory bodies like the FCC and CE.

If you are looking for the actual certification document PDF files for Particle devices, see [certification documents](/hardware/certification/certification-documents/).

## RF certifications

Radio devices have a number of required certifications, depending on their use, frequency bands, and location.

### FCC (United States) - RF certifications

In the United States, FCC certifications for radio frequency devices are described in FCC Part 15. It's further divided into unintentional radiators (subpart B) and intentional radiators (subpart C), which are discussed below.

Additionally, these resources can be helpful:

- [Electronic Code of Federal Regulation for Telecommunications, Part 15: Radio Frequencies Devices](http://www.ecfr.gov/cgi-bin/text-idx?c=ecfr&SID=a9f9d244cc20be8b56099003689d6cc3&rgn=div5&view=text&node=47:1.0.1.1.16&idno=47)
- [Additional details about Part 15](https://www.fcc.gov/oet/ea/rfdevice)
- [Additional guidance on types of certification you may need](https://apps.fcc.gov/oetcf/kdb/forms/FTSSearchResultPage.cfm?id=44637&switch=P)

In the United States, all Particle devices are classified as Class B devices.

> Digital devices fall into two categories -- Class A and Class B. Class A digital devices are ones that are marketed exclusively for use in business, industrial and commercial environments. Class B digital devices are ones that are marketed for use anywhere, including residential environments.
<p class="attribution">[FCC Bulletin OET62](https://transition.fcc.gov/oet/info/documents/bulletins/oet62/oet62rev.pdf) (pdf)</p>

### CE (European Union) - RF certifications

In the European Union, RF certifications are often referred to as RED, Radio Equipment Directive 2014/53/EU. This is not a single certification, but
a collection of further certifications for specific types of devices and uses. 

## Unintentional radiator certification

**Almost all products will require unintentional radiator certification.** This assures that your combined assembly of any custom parts you've added plus the Particle device 
do not emit spurious electromagnetic radiation that would affect other electronic devices. 

Fortunately this is the least expensive and easiest certification. A certification house will operate your device and test for RF emissions. They will provide 
a document that you have passed the test. 

The exception is all-in-one gateway devices like the Tracker One and Monitor One that are used with no attached external components; since the completed assembly 
has already been certified as a end-device, you can utilize the Particle certification and do not need to repeat unintentional radiator testing.

### FCC (United States) - Unintentional radiator certification

FCC unintentional radiator certification is defined in FCC Part 15 Subpart B. 
Is a self-declared (by the certification house, not by you) and you don't need to file anything with the FCC,
however the FCC can request the test reports, which you must provide if requested.

This is often referred to as a sDoC, self-declaration of conformity. You don't get your own FCC ID for a sDoC; you use Particle's. 

Unintentional radiator testing can be as low as US$ 1000 and can take as little as a few weeks, though the cost and time can vary.

This operates similarly in Canada (ISED). 

### CE (European Union) - Unintentional radiator certification

The closest equivalent of FCC Part 15 subpart B testing in the European Union is IEC 62311:2019. 

> IEC 62311:2019 applies to electronic and electrical equipment for which no dedicated product standard or product family standard regarding human exposure to electromagnetic fields applies. It covers equipment with intentional or non-intentional radiators as well as a combination thereof.


## Intentional radiator certification

If you use the same antenna as was used for the Particle certification, or a sufficiently similar one (as described below), you can often avoid having to do 
intentional radiator certification. Whenever possible, you should try to avoid intentional radiator as it's significantly more expensive and complicated. 
You should expect it to cost US$ 20000 to $ 30000 and will typically take 4 to 8 weeks, but can take even longer.

The reason this certification is more expensive is that for cellular devices, it will test the output in every supported cellular band with your combination 
of Particle device and antenna. This requires a special test SIM and test firmware. 

For Wi-Fi devices this is done for every Wi-Fi band.

If you add additional radio modules, you product will also need to undergo intentional radiator testing. The exception is a module that is itself 
certified and not directly connected to the Particle device. For example, a product that includes a BLE sensor in addition to the Particle 
device does not require intentional radiator certification if it uses the standard Particle antennas.

### Equal or lesser gain test

We highly recommend using the standard Particle antenna for your device. This is listed in the [antenna guide](/hardware/certification/antenna/).

In the United States, you can substitute an antenna in some cases:

> Any antenna that is of the same type and of equal or less directional gain as an antenna that is
authorized with the intentional radiator may be marketed with, and used with, that intentional radiator.
No retesting of this system configuration is required. The marketing or use of a system configuration
that employs an antenna of a different type, or that operates at a higher gain, than the antenna
authorized with the intentional radiator is not permitted.
<p class="attribution">[FCC Title 47, Part 15, Section 15.204](https://www.law.cornell.edu/cfr/text/47/15.204)</p>

This is generally interpreted as equal or lesser gain in each frequency band that is supported, which can be significant because gain my vary between bands and a 
single higher-gain band may affect your ability to use a substitute antenna.

Additionally:

> (1) The antenna type, as used in this paragraph, refers to antennas that have similar in-band and out-of-band radiation patterns.

The process is similar in Canada and the European Union, but all of the uncertainty can be avoided by using the Particle certified antenna.

## Country-specific certifications

Some countries will allow common certifications like FCC (United States) or CE (European Union) to be used. For example, Australia and New Zealand.

Other countries require their own certification. Some examples include: Japan (JRL) and South Korea (KMC).

In the United Kingdom, CE (European Union) certification was previously allowed, but now a separate but similar UKCA certification is required. If you are planning to
sell your device in both the UK and Europe, you will need both certifications. Your certification house will typically complete both at the same time as they 
are similar.

Some countries require IMEI registration for cellular devices. In some cases, it can be done by end-users, and in others it must be done by the manufacturer.

## Cellular certifications

If you use the Particle SIM card, you generally do not need to worry about cellular certification as this is included.

If you are using a 3rd-party SIM card with devices that supports one, you may need to obtain cellular certification such as PTCRB in the United States and Canada, 
and GFC in Europe.

### PTCRB - Cellular certifications

#### Module certification - PTCRB

This is the PTCRB certification level for cellular modules. The PTCRB defines a module in the following way:

> Modules are finished WWAN radio devices that do not directly connect to a host via a standardized external interface such as USB, PCMCIA, Compact Flash, MMC, RS-232, or IEEE-1394. A module may or may not include an integral antenna system or SIM/USIM interface.

The cellular modules from u-blox or Quectel used on Particle devices provide this level of certification.

#### End Product certification - PTCRB

This is the PTCRB certification level for finished cellular products. End Products are defined as devices that meet all of the following attributes:

 - *Physical Interface* - If a physical control interface is required for the End Product, it shall utilize one of the following: USB, PCMCIA, Compact Flash, MMC, RS-232 (DE9), or IEEE-1394. No other physical control interfaces are acceptable.

 - *Power* - Obtains power from the standardized physical control interface or have a provisioned power source (i.e. dedicated battery, or a dedicated power source).
 - *UICC Interface* - Includes a fully self-contained USIM/SIM socket or embedded USIM/SIM
 - *Antenna* - Utilizes a self-contained antenna or provide an external antenna connector.
 - *Radio Access Technologies* - Covers at least one (1) comprehensive radio technology as specified by 3GPP for GERAN, UTRA, or E-UTRA devices

Particle devices that have PTCRB certification are end-products. Note, however, that EtherSIM devices are not PTCRB certified as it is not necessary for these devices.



## Safety certifications

### EN 62368-1

This is an international standard for equipment safety. It's used in the European Union, as well as in the United States by the UL.

Prior to 2020, the standard was EN 60950-1, but EN 62368-1 has completely replaced the earlier version.

All Particle devices currently sold in the European Union have EN 62368-1 certification.

### RF exposure limit certification

For general mobile devices, there are limits to the amount of RF exposure users of the device will incur.

In the United States, this is FCC Title 47, Chapter I, Subchapter A, Part 2, Subpart J, Radio frequency Radiation Exposure § 2.1091.

In the European Union, this is EN 62311.

Note that there is a separate certifications for wearable devices, and also for implanted medical devices. Particle devices are not
certified as either.

### UL (Underwriter's Laboratories)

UL (Underwriters Laboratories) is an American worldwide safety consulting and certification company. UL provides safety-related certification, validation, testing, inspection, auditing, advising, and training services to manufactures, retailers, policymakers, regulators, service companies, and consumers.

The majority of UL certifications, which can be found <a target="_blank" href="https://en.wikipedia.org/wiki/UL_(safety_organization)#UL_Standards">here</a>, are standards for electrical and electronic products that utilize high voltage AC electricity for power. UL certification is typically not required for low voltage or battery powered products. 

This is one of the reasons many small electronic devices use an external or wall-mount transformer. Since the high voltage is isolated to the external power supply, only it needs to be UL certified, and that would be done by the power supply manufacturer.


## RoHS

RoHS stands for the "Restriction of Hazardous Substances Directive" adopted by the European Union in 2003 and effective as of 2006. It restricts the import and distribution of electronic and electrical equipment with six hazardous materials within the EU. Those hazardous materials are listed below:

| Substance Name  | Allowable Limit |
| ------------- | ------------- |
| Lead (Pb)  | less than 1000ppm  |
| Mercury (Hg)  | less than 100ppm |
| Cadmium (Cd) | less than 100ppm |
| Hexavalent chromium (Cr6+) | less than 1000ppm |
| Polybrominated biphenyls (PBB) | less than 1000ppm |
| Polybrominated diphenyl ether (PBDE) | less than 1000ppm |

Even though it is not required in the United States, some consumers may prefer products that meet RoHS standards.

In some cases, your completed assembly may require RoHS certification. In some cases, your certification house will simply check the RoHS status of any components you use in your
design (printed circuit boards, components, connectors, etc.) to makes sure they are safe. In other cases, they will disassemble your product
and perform chemical tests on the components. 

RoHS is self-certified (by your certification house, not you), so you do not need to file this test with any authority, but it still may be required,
particularly in the EU.

All Particle devices have RoHS certification, even those that are not sold in the European Union.

## REACH

REACH is a European Union standard for chemicals used during the manufacture of your product. This will generally not be required, unless
you are manufacturing your device in Europe, or are importing a very, very large quantity of product.


## Bluetooth

If you do not change the BLE antenna, you generally do not need to do intentional radiator testing. 

For the P2 and Photon 2, replacing the Wi-Fi antenna with one that does not meet the equal or lesser gain test will require intentional radiator testing for both Wi-Fi and BLE because they share the same antenna.

In addition to the RF testing, Bluetooth devices must be Bluetooth SIG qualified. Particle devices with BLE have completed this certification.

Note, however, that if you include the Bluetooth-certified Particle device within your product you cannot use the Bluetooth logo on your product unless you re-qualify your product.

## NFC

Changing the NFC antenna may require intentional radiator certification.

All Particle devices that have NFC have intentional radiator certification the intended antenna. This is the optional Particle NFC antenna on all devices except the Tracker One, which has its own built-in antenna inside the sealed case.

## GNSS (GPS)

As GNSS (GPS) is a receive-only antenna, it does not need intentional radiator certification even if you change the antenna.
