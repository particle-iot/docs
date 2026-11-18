---
title: Certification
columns: two
layout: commonTwo.hbs
description: Certification of your product
guide-custom-images: default
---

# {{title}}

{{section-nav}}

{{content-nav}}

## Kinds of certification

There are numerous possible certifications and this list is not exhaustive.

### Unintentional radiator

{{!-- BEGIN shared-blurb 713d110e-fc34-4409-b87b-0ad799c24123 --}}
This is a certification that your completed device does not emit extraneous radiation that would affect other devices. This is almost always required, but is the least expensive and easiest test to complete. In the United States, this is FCC 47 CFR Part 15 Subpart B. A test lab performs the measurements and you sign a Suppliers Declaration of Conformity (SDoC).
{{!-- END shared-blurb 713d110e-fc34-4409-b87b-0ad799c24123 --}}

All-in-one gateway like the Tracker One that does not connect to an external hardware may be able to use Particle's certification and not require additional certification.

### Intentional radiator

{{!-- BEGIN shared-blurb f473a08e-d4a3-47b7-8df7-67fa405e1783 --}}
This test is more involved and requires testing the power output in each band the transmitters are capable of using. In the United States, this is FCC 47 CRF Part 15, Subpart C. If you use a similar antenna to the one Particle used during its tests, you may be able to avoid having to perform this certification again.
{{!-- END shared-blurb f473a08e-d4a3-47b7-8df7-67fa405e1783 --}}

### PTCRB

{{!-- BEGIN shared-blurb 7b0af859-0129-436f-929e-c8832ce3ee2a --}}
[PTCRB](https://www.ptcrb.com/) is a certification for cellular devices in the United States. If you use a similar antenna to the one Particle used during its tests, you may be able to avoid having to perform this certification again. 
{{!-- END shared-blurb 7b0af859-0129-436f-929e-c8832ce3ee2a --}}

### BLE (Bluetooth LE)

If you are not using BLE, you can typically skip joining the Bluetooth SIG or obtaining BLE certification. If you are using BLE for Wi-Fi configuration only using the existing Particle Wi-Fi provisioning mode, you may be able to avoid additional certification, as long as you do not include the Bluetooth logo on your product, advertising materials, etc.. 


### Country-specific certification

There may be certification requirement that are country-specific, in addition to unintentional radiator testing. This mostly applies to cellular devices, but there could be other country-specific requirements.

### Industry-specific certifications

There may be industry-specific certifications. For example, if you are building a fire alarm in the United States, there are UL requirements.

If your device uses high voltages (typically over 90 volts), other than from a certified wall transformer, there may be additional requirements.

Human-worn devices and medical devices have strict requirements. Particle devices are generally not intended to be used this way; see
[Terms of Service](https://www.particle.io/legal/terms-of-service/) for more information.


## Cellular antennas

{{box op="start" cssClass="boxed warningBox"}}
Particle devices are certified for use only with the designated antennas specified below. The use of alternative antennas with our modules could necessitate a recertification process. To fully understand the potential consequences of using a non-certified antenna, Particle strongly advises seeking consultation with a qualified RF expert.
{{box op="end"}}

For additional information, see [Antenna guide](/hardware/certification/antenna/).

{{section-nav}}
