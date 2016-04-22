---
title: Certification
columns: two
template: guide.hbs
order: 9
---

# Certification

## Overview

Connected devices nearly always require certifications that ensure they operate within the wireless transmission specifications determined by international regulatory bodies like the FCC and CE. This part of the guide will provide you with more information on how to leverage Particle's existing certifications to reduce the cost, complexity, and time associated with demonstrating regulatory compliance with your end product.

### Table of Contents
 - [FCC](https://docs.particle.io/guide/how-to-build-a-product/certification/#fcc-img-class-inline-header-image-src-assets-images-logo-fcc-png-) - United States
 - [IC](https://docs.particle.io/guide/how-to-build-a-product/certification/#ic-img-class-inline-header-image-src-assets-images-logo-ic-png-) - Canada
 - [CE](https://docs.particle.io/guide/how-to-build-a-product/certification/#ce-img-class-inline-header-image-src-assets-images-logo-ce-png-) - Europe
 - [TELEC](https://docs.particle.io/guide/how-to-build-a-product/certification/#telec-img-class-inline-header-image-src-assets-images-logo-telec-png-) - Japan
 - [RoHS](https://docs.particle.io/guide/how-to-build-a-product/certification/#rohs-img-class-inline-header-image-src-assets-images-logo-rohs-png-) - Europe
 - [UL](https://docs.particle.io/guide/how-to-build-a-product/certification/#ul-img-class-inline-header-image-src-assets-images-logo-ul-png-) - World
 - [Cellular Certifications](https://docs.particle.io/guide/how-to-build-a-product/certification/#cellular-certifications) - World
 - [Battery Certifications](https://docs.particle.io/guide/how-to-build-a-product/certification/#battery-certifications) - World


Here is a graphical representation of the current state of certification across Particle's hardware portfolio:

![particle certifications table](/assets/images/particle-certifications-160210.png)
<p class="caption">It's important to understand which certifications apply to your end product. <a target="_blank" href="/assets/images/particle-certifications-160210.png">Click here</a> for a full size image. Updated 2/10/16.</p>


## FCC <img class="inline-header-image" src="/assets/images/logo-fcc.png"/>
### Description
 - **Website**: [http://www.fcc.gov](http://www.fcc.gov)
 - **Wikipedia**: [https://en.wikipedia.org/wiki/FCC_Declaration_of_Conformity](https://en.wikipedia.org/wiki/FCC_Declaration_of_Conformity)
 - **Domain**: United States

The FCC (Federal Communications Commission) is an independent agency of the U.S. government that is in charge of regulating interstate and international communications. The FCC marking is required on electronic products manufactured or sold in the United States that certifies that the electromagnetic interference from the device is under limits approved by the FCC.

### Integration

The Photon as well as the P0/P1 Modules are covered under certifications from the FCC. Certified radio modules comply with the "Intentional Radiator" portion (Part 15c) of FCC certification.

 - The **Photon** is certified as a single-modular transmitter that carries a modular grant. Modular certified radio modules are allowed for integration into multiple host end products by the FCC.

 - The **P0 Module**, which is on the Photon, does not itself have an antenna and thus does not have a discrete certification from the FCC. However, it is certified for integration into a host product under the RF reference of the Photon as a design guideline.

 - The **P1 Module** is also certified as a single-modular transmitter that carries a modular grant, and is certified for integration into multiple host end products by the FCC.

Any host product incorporating the Photon/P0 or P1 modules does not require additional testing or authorization for the Wi-Fi transmitter as long as:
- An antenna of the same type **and** equal or lesser gain to the antenna used for certification is used on the product.  
- Any restrictions found in the grants are followed in the OEM's end product integration of Particle hardware.

The Photon/P0 and P1 modules were certified with antennas of the following gain:
- **Photon/P0 Module**: Chip antenna (1.3dBi), external antenna (2.15dBi)
- **P1 Module**: External antenna (2.5dBi)

### Customer Responsibilities
Even though we've certified the Photon and P0/P1 Modules, as a product creator you're still responsible for meeting test requirements determined by the class of your product as described by the FCC. In general, there are two types of products--**Class A** and **Class B**:
- **Class A**: Digital device for use in commercial, industrial, or business environments.
- **Class B**: Digital device for use in residential environment not withstanding use in commercial, business, and industrial environments. Examples of such devices include, but are not limited to, personal computers, calculators, and similar electronic devices that are marketed for use by the general public.

Particle's certifications will help you decrease the time and cost associated with certification by allowing you to reuse our FCC ID as the FCC ID for your end product for Part 15c of your product's wireless certification. The remaining sections, for which all integrators and product creators are still responsible, are described below:


#### FCC Part 15 Certification
- **PART A: General Provisions and Definitions**  
  In this section, you will classify your device according to the definitions set out by the FCC. Included in this section are definitions for things like "intentional radiators", "kits", "test equipment", and "digital devices".

- **PART B: Unintentional Radiators**  
  This section covers devices whose purpose is not to produce radio waves, but which do anyway, including computers, voltage regulators, and oscillators/crystals.  It's likely that your end product contains unintentional radiators.  Part B allows for self-classication, which means that you don't have to get expensive test reports to demonstrate unintentional radiators in your product.

- **PART C: Intentional Radiators**  
  This section covers devices whose purpose is to produce coherent radio waves. The Photon/P0/P1 modules are intentional radiators.  This is the most difficult part of FCC certification, and is where you can reuse Particle's hardware certifications to significantly simplify the application process. For instance, a from-scratch certification might cost $10-30K and take 4-8 weeks, while a verification of conformity might only cost $1-5K and take 2 weeks.

- **ADDITIONAL TESTING: Determined by device classification**  
  You'll also be responsible for any additional testing requirements defined by the FCC for your product. You can learn more about additional required testing for your product by visiting the FCC website, linked below.

**MORE INFO** -
[Electronic Code of Federal Regulation for Telecommunications, Part 15: Radio Frequencies Devices](http://www.ecfr.gov/cgi-bin/text-idx?c=ecfr&SID=a9f9d244cc20be8b56099003689d6cc3&rgn=div5&view=text&node=47:1.0.1.1.16&idno=47)

### Documentation

#### Photon/P0
- FCC ID: [2AEMI-PHOTON](https://apps.fcc.gov/oetcf/eas/reports/ViewExhibitReport.cfm?mode=Exhibits&RequestTimeout=500&calledFromFrame=N&application_id=o2hW1PEmrUZn19QwwX8hCA%3D%3D&fcc_id=2AEMI-PHOTON)
- [Certificate of Conformity](/assets/pdfs/p0-fcc-certificate.pdf)
- [Test Reports](/assets/pdfs/p0-fcc-ic-test-reports.zip)
- [Test Firmware and Instructions](/assets/files/P0_P1_FCC_Firmware.zip)

#### P1 Module
- FCC ID: [COFWMNBM11](https://apps.fcc.gov/oetcf/eas/reports/ViewExhibitReport.cfm?mode=Exhibits&RequestTimeout=500&calledFromFrame=N&application_id=ug625xSKTLocEEah0xLMFw%3D%3D&fcc_id=COFWMNBM11)  
- [Test Reports](https://apps.fcc.gov/oetcf/eas/reports/ViewExhibitReport.cfm?mode=Exhibits&RequestTimeout=500&calledFromFrame=N&application_id=ug625xSKTLocEEah0xLMFw%3D%3D&fcc_id=COFWMNBM11)
- [Test Firmware and Instructions](/assets/files/P0_P1_FCC_Firmware.zip)

#### Electron U260
- FCC ID: [XPYSARAU260](https://apps.fcc.gov/oetcf/eas/reports/ViewExhibitReport.cfm?mode=Exhibits&RequestTimeout=500&calledFromFrame=N&application_id=o2hW1PEmrUZn19QwwX8hCA%3D%3D&fcc_id=XPYSARAU260)
- [Certificate of Conformity - U260](/assets/pdfs/electron/fcc-u260-certificate.pdf)
- [Test Reports - U260](/assets/pdfs/electron/fcc-u260-test-report.pdf)

#### Electron G350
- FCC ID: [XPYSARAG350](https://apps.fcc.gov/oetcf/eas/reports/ViewExhibitReport.cfm?mode=Exhibits&RequestTimeout=500&calledFromFrame=N&application_id=o2hW1PEmrUZn19QwwX8hCA%3D%3D&fcc_id=XPYSARAG350)
- [Certificate of Conformity - G350](/assets/pdfs/electron/fcc-g350-certificate.pdf)
- [Test Reports - G350](/assets/pdfs/electron/fcc-g350-test-report.pdf)

## IC <img class="inline-header-image" src="/assets/images/logo-ic.png"/>

### Description
 - **Website**: [http://www.ic.gc.ca/Intro.html](http://www.ic.gc.ca/Intro.html)
 - **Wikipedia**: [http://en.wikipedia.org/wiki/Industry_Canada](http://en.wikipedia.org/wiki/Industry_Canada)
 - **Domain**: Canada

 IC (Industry Canada) is a department of the Government of Canada that, among many other things, issues Technical Acceptance Certificates (TACs) for Category I radio and broadcasting equipment.

### Integration

The Photon/P0 and P1 Modules are IC certified as single-modular transmitters. Just like with FCC Certification, any host product incorporating the Photon/P0 or P1 modules does not require additional testing or authorization for the Wi-Fi transmitter by IC as long as:
- An antenna of the same type **and** equal or lesser gain to the antenna used for certification is used on the product.  
- Any restrictions found in the grants are followed in the OEM's end product integration of Particle hardware.

### Customer Responsibilities

Industry Canada follows the same testing and rules as the FCC in regards to certified modules in authorized equipment.

### Documentation
For certificates of conformity, search [here](https://sms-sgs.ic.gc.ca/search/radioEquipmentPortal) under "Radio Equipment List (REL) > Certification Number" using IC ID for each Particle device, respectively.

#### Photon/P0
- IC ID: **20127-PHOTON**.
- [Certificate of Conformity](/assets/pdfs/p0-ic-certificate.pdf)
- [Test Report](/assets/pdfs/p0-fcc-ic-test-reports.zip)

#### P1 Module
- IC ID: **10293A-WMNB11**.
- [Certificate of Conformity](/assets/pdfs/p1-ic-certificate.pdf)
- [Test Report](/assets/pdfs/p1-ic-test-report.pdf)

#### Electron U260
- IC ID: **8595A-SARAU260**.
- [Test Report](/assets/pdfs/electron/ic-u260-test-report.pdf)

#### Electron G350
- IC ID: **8595A-SARAG350**.
- [Test Report](/assets/pdfs/electron/ic-g350-test-report.pdf)

## CE <img class="inline-header-image" src="/assets/images/logo-ce.png"/>

### Description
 - **Website**: [http://ec.europa.eu/growth/single-market/ce-marking/index_en.htm](http://ec.europa.eu/growth/single-market/ce-marking/index_en.htm)
 - **Wikipedia**: [http://en.wikipedia.org/wiki/CE_marking](http://en.wikipedia.org/wiki/CE_marking)
 - **Domain**: Europe

The CE mark is a mandatory conformity marking for certain products sold within the European Economic Area (EEA). It is analogous in that sense to the FCC marking used on devices sold within in the United States.

### Integration
Both the Photon/P0 and P1 are certified and carry the CE marking. Section 1.3.1 of the [Guide to the R&TTE Directive 1999/5/EC](http://ec.europa.eu/growth/sectors/electrical-engineering/rtte-directive/) states the following regarding the attachment of antennas to a module that already has documentation of conformance:

_"Manufacturers who place on the market products without an antenna or with an antenna that is intended to allow replacement have a responsibility to provide information on the general types and/or characteristics of antennas that may be used with their equipment in order that the overall radio equipment remains compliant. The guidance of the transmitter manufacturer has to be followed when they are installed."_

For the Photon/P0 and P1 Modules, these integration instructions are the same as for the FCC/IC--so long as you're integrating the modules without modifying the RF design or implementing an antenna with gain greater than that used in certification, your equipment will likely remain compliant.

The Photon/P0 and P1 Modules are certified with ETSI radio tests which can be accepted by a number of countries for radio compliance.

### Customer Responsibilities
If a product has adhered to the integration guidelines and has minimal risk, it can be self-certified where manufacturers complete a Declaration of Conformity and affix the CE marking to their own product.

#### Please note that Particle is not responsible in any way for issues arising from inappropriately self-certified products and devices using Particle hardware. EMC testing obligations may still be required as determined by the specific end product requirements.


- The end product will still need to be filed in each country for certification using the FCC/ETSI radio reports.
- 40+ countries recognize and accept radio test reports compliant to ETSI standards as part of the filing process, but note that some countries do not recognize modular approval.
- In most cases, it is possible to leverage Particle's ETSI reports, and thus testing does not need to be repeated.

### Documentation

#### Photon/P0
- [Certificate of Conformity](/assets/pdfs/p0-ce-certificate.pdf)
- [Test Reports](/assets/pdfs/p0-ce-test-reports.zip)

#### P1 Module
- [Certificate of Conformity](/assets/pdfs/p1-ce-certificate.pdf)

#### Electron U270
- [Certificate of Conformity](/assets/pdfs/electron/ce-u270-certificate.pdf)
- [Test Reports](/assets/pdfs/electron/ce-u270-test-reports.zip)

#### Electron G350
- [Certificate of Conformity](/assets/pdfs/electron/ce-g350-certificate.pdf)
- [Test Reports](/assets/pdfs/electron/ce-g350-test-reports.zip)


## TELEC <img class="inline-header-image" src="/assets/images/logo-telec.png"/>

### Description
 - **Website**: [http://www.telec.or.jp/eng/](http://www.telec.or.jp/eng/)
 - **Documentation**: [http://www.tele.soumu.go.jp/e/index.htm](http://www.tele.soumu.go.jp/e/index.htm)
 - **Domain**: Japan

Particle has completed TELEC certification to achieve compliance with Japanese Radio Law. If you are seeking to distribute your product in Japan, please [contact Particle](mailto:will@particle.io) for more information about compiling TELEC-compliant firmware.

### Documentation

#### Photon/P0
- [Certificate of Conformity](/assets/pdfs/p0-telec-certificate.pdf)
- [Test Report](/assets/pdfs/p0-telec-test-report.pdf)

## RoHS <img class="inline-header-image" src="/assets/images/logo-rohs.png"/>

### Description
- **Website**: [http://ec.europa.eu/environment/waste/rohs_eee/index_en.htm](http://ec.europa.eu/environment/waste/rohs_eee/index_en.htm)
- **Wikipedia**: [https://en.wikipedia.org/wiki/Restriction_of_Hazardous_Substances_Directive](https://en.wikipedia.org/wiki/Restriction_of_Hazardous_Substances_Directive)
- **Domain**: Europe

RoHS stands for the "Restriction of Hazardous Substances Directive" adopted by the European Union in 2003 and effective as of 2006. It restricts the import and distribution of electronic and electrical equipment with six hazardous materials within the EU. Those hazardous materials are listed below:

| Substance Name  | Allowable Limit |
| ------------- | ------------- |
| Lead (Pb)  | less than 1000ppm  |
| Mercury (Hg)  | less than 100ppm |
| Cadmium (Cd) | less than 100ppm |
| Hexavalent chromium (Cr6+) | less than 1000ppm |
| Polybrominated biphenyls (PBB) | less than 1000ppm |
| Polybrominated diphenyl ether (PBDE) | less than 1000ppm |

There are also a short list of [exemptions](https://en.wikipedia.org/wiki/Restriction_of_Hazardous_Substances_Directive#Restriction_exemptions) to RoHS regulation that are worthy of note.

RoHS compliance is self-declared and there is no certification body that governs compliance, unlike the FCC. Particle has submitted its hardware to RoHS compliance testing and the test reports are available below.

### Documentation

#### Photon/P0

- [Test Reports](/assets/pdfs/p0-rohs-test-reports.zip)

## UL <img class="inline-header-image" src="/assets/images/logo-ul.png"/>

### Description
 - **Website**: [http://ul.com/](http://ul.com/)
 - **Wikipedia**: <a target="_blank" href="https://en.wikipedia.org/wiki/UL_(safety_organization)#UL_Standards">https://en.wikipedia.org/wiki/UL_(safety_organization)#UL_Standards</a>
 - **Domain**: Worldwide

UL (Underwriters Laboritories) is an American worldwide safety consulting and certification company. UL provides safety-related certification, validation, testing, inspection, auditing, advising, and training services to manufactures, retailers, policymakers, regulators, service companies, and consumers.

### Integration
The large majority of UL certifications, which can be found <a target="_blank" href="https://en.wikipedia.org/wiki/UL_(safety_organization)#UL_Standards">here</a>, are standards for electrical and electronic products that utilize high voltage AC electricity for power. UL certification is typically not required for low voltage or battery powered products.

### Customer Responsibilities
UL certification and safety standards are not applicable to Particle hardware, but may be applicable to the host end product in which they are integrated. It is the product creator's responsibility to ensure compliance with all UL safety standards and to obtain end product certification if required.

## Cellular Certifications

More information coming soon.

### PTCRB

### GCF

### Carrier Certifications

## Battery Certifications

The 2,000mAh lithium-polymer (Li-Po) battery included with the Electron and other Particle accessories is compliant with all international safety and transportation standards. Test reports below.

**Model Number**: LP103450  
**Ratings**: 3.7V DC, 2000mAh, 7.4Wh  
**Manufacturer**: PKCELL (Shenzhen, China)  
**Test Reports**:
- [IEC62133](/assets/pdfs/electron/battery/IEC62133.pdf)
- [UN Section 38.3](/assets/pdfs/electron/battery/UN-section-38.3-report.pdf)
- [MSDS Test Report](/assets/pdfs/electron/battery/msds-report.pdf)
- [1.2m Drop Test](/assets/pdfs/electron/battery/1.2m-drop-test.pdf)
- [Air Freight Transport](/assets/pdfs/electron/battery/air-freight-transport.pdf)
- [Sea Freight Transport](/assets/pdfs/electron/battery/sea-freight-transport.pdf)

## What's next?

Now that we've covered product certifications, click through to our last page for some closing comments on building products with the Particle platform:

[Further Considerations >](../further-considerations)
