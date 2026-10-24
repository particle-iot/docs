**LTE Cat 1**

LTE Cat 1 is the same technology used for 4G/LTE mobile phone data, and is the most commonly deployed technology in
most of the world.

**LTE Cat 1 bis**

LTE Cat 1 bis is a simplified version of LTE Cat 1 intended for IoT applications. It uses a single antenna, is intended
for low-power devices, and the simplifications make the radio less expensive. It's fully compatible with LTE Cat 1, however,
and does not require any tower-side changes, making it available anywhere LTE Cat 1 (4G) is available. It also has the
same maximum data rate as LTE Cat 1.

The Particle devices with LTE Cat 1 bis cellular modems do not support 2G/3G fallback.

**LTE Cat M1**

LTE Cat M1 is subset of 4G/LTE intended for low-power and low-cost IoT devices. It's widely deployed in the United States,
Canada, and Mexico (NorAm). There is limited coverage in Europe, though it is available in the United Kingdom and Australia
on a subset of the available carriers.

If you are deploying a low-power device in the United States, this can be a good choice, however the difference in power
consumption between LTE Cat M1 and LTE Cat 1 bis is not very large.

Additional large-scale deployments of LTE Cat M1 in other countries are less likely with the adoption of LTE Cat 1 bis instead.

**2G/3G**

The older 2G and 3G technologies are being phased out ("sunset") around the world. The shutdown is already complete in the United States,
Australia, and Japan, and will occur soon in Canada.

Additionally, 3G requires more power than 4G/LTE. 2G requires even more than 3G.

The phase-out or sunset of 2G and 3G varies by country in carrier.

In most of Europe, 3G has been or will be phased out first, leaving 2G services.

In many other areas, 2G was or will be phased out first, leaving 3G.

Particle devices with cellular modems with only 2G and 3G have already been deprecated. The [LTE Cat 1](#lte-cat-1)
devices above can also 2G/3G fallback.

For additional information, see the [2G/3G sunset](/reference/discontinued/cellular/2g-3g-sunset/) page.

**5G***

Only the Tachyon device supports 5G.

For IoT use-cases, 5G generally unnecessary as 4G/LTE data rates are sufficient, and no carriers have a plan to sunset
4G/LTE at this time.

**LTE higher Cat**

The Tachyon supports up to LTE Cat 14, which is much faster than LTE Cat 1. Not all towers support the highest Cat speeds,
but all are backward compatible to LTE Cat 1.

This is different than LTE Cat M1 or LTE Cat NB1 which requires specific support for those technologies by the carrier.

**LTE Cat NB1**

LTE Cat NB1 is a variation intended for IoT devices, however the data rate is so low that it does not support the ability 
to do OTA flashing of firmware, and is not supported on any Particle devices.

It's more common in Europe, but still not widely deployed and large-scale deployments are unlikely with the adoption of
LTE Cat 1 bis instead.

**NTN**

Non-Terrestrial Network (NTN) is a 3GPP standard to allow devices to connect to satellites instead of earth-based cellular towers. It is based on narrowband cellular standards to allow for relatively straightforward inclusion in devices like the Particle M635e M-SoM, which implements it using the Quectel BG95-S5 cellular and NTN modem.

Using a non-terrestrial network allows devices to communicate in locations that do not have cellular infrastructure. 

Even though NTN devices are based on cellular standards, there are differences that require specialized hardware and software.

- NTN networks use different, dedicated bands:
  - n255: L-Band, 1.6 GHz
  - n256: S-Band, 2.0 GHz
- Regulatory and certification differences
- Data rate limitations
