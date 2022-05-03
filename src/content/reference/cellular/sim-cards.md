---
title: Particle SIM cards
layout: commonTwo.hbs
columns: two
description: Particle SIM cards
---

Most Particle cellular devices have a built-in MFF2 SMD SIM and do not need a 4FF plastic nano SIM card. These devices do not need an additional SIM card.

| Device | Model | Nano SIM Card | MFF2 SMD SIM | 
| --- | :--- | :---: | :---: | 
| Boron 2G/3G | BRN314 BRN310 | &check; | &check; |
| Boron LTE  | BRN404 BRN402 | &check; | &check; |
| B Series B402 SoM (Cat M1) | B404 B402 | &nbsp; | &check; |
| B Series B523 SoM (Cat 1) | B524 B523 | &nbsp; | &check; |
| Tracker SoM (LTE Cat M1) | T404 T402 | &nbsp; | &check; |
| Tracker SoM (LTE Cat 1 and 2G/3G) | T524 T523 | &nbsp; | &check; |
| Electron LTE (Cat M1) | ELC404 ELC402 | &nbsp; | &check; |
| E Series 2G/3G | E314 E310 | &nbsp; | &check; |
| E Series LTE (Cat M1) | E404 E402 | &nbsp; | &check; |

The exceptions are:

- Electron U260, U270, G350
- Original Boron 2G/3G BRN310 where you want additional EtherSIM carriers provided beyond the original built-in SIM


## SIMBLANKV2

The SKU SIMBLANKV2 is an EtherSIM 4FF plastic SIM card and is intended for use in the following SKUs to add additional EtherSIM carriers to these devices.

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | NRND-US | BRN314TRAY50|
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | NRND | BRN314KIT|
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | G350 | NRND | ELC314TY|
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | U260 | Discontinued | ELC314TY|
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | U270 | Discontinued | ELC314TY|

The EtherSIM works in these Boron SKUs, however, the SKUs are not recommended for use outside of North America, and thus the benefits of using the EtherSIM would be minimal on these devices:

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | BRN404|
| BRN402KIT | Boron LTE CAT-M1 (NorAm) Starter Kit, [x1] | NORAM | R410 | NRND | BRN404KIT|
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | BRN404TRAY50|


As a general rule, tray quantity devices do not include a SIM card, however this SKU does include the SIMBLANKV2 and you do **not** need to order it separately:

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Global | U201 | GA | |


### Using SIMBLANKV2 in a Boron 2G/3G or Boron LTE

It is technically possible to use an EtherSIM 4FF plastic SIM card in a Boron 2G/3G (BRN310) or a Boron LTE (BRN402) with the older (non-EtherSIM) MFF2 SMD SIM card. This could allow additional carriers in some cases, but is not recommended at fleet scale for the following reasons:

- In the United States, Canada, and Mexico the Boron 2G/3G (BRN310) is not recommended due to the impending 3G shutdown. The EtherSIM will not extend the lifetime of this device.
- In the United States, the EtherSIM does not officially add any carriers to the BRN402. The reason is that T-Mobile officially only supports LTE Cat NB1, which is different and not supported by Particle devices. However, many areas of the United States have unofficial T-Mobile LTE Cat M1 service, not advertised by T-Mobile. Using an EtherSIM in a BRN402 will add T-Mobile support which is not available on the built-in SIM on the BRN402. The EtherSIM does not add support for Verizon!
- Note that EtherSIM support requires Device OS 2.0.0 or later, so if you are using an earlier version, you will also need to upgrade Device OS.

If you are interested in using an EtherSIM 4FF plastic SIM card in a Boron, please note:

- You will need to use the [`setActiveSim()`](/cards/firmware/cellular/setactivesim/) call to enable the external SIM card.
- The setting is persistent across reset, user firmware upgrades, and Device OS upgrades.
- If you set the SIM back to `INTERNAL_SIM` you must remove the physical SIM card on the BRN402 as just changing the setting in software is not sufficient and you will be unable to connect to cellular in this configuration.
- It may be necessary to reset the cellular modem after changing the SIM card setting.
- It is not practical to auto-detect the SIM card at startup as it could add a minute or longer to the startup time to switch the SIM card, reset the cellular modem, and wait for various timeouts.
- If you are using a product, one option is to flash code to set the SIM by USB when you are at the device to insert the SIM card. If the device then connects to cellular, then the cloud will flash back the product firmware automatically then reboot again.


#### Available countries and carriers

A list of available countries and carriers can be found in the [carrier list](/tutorials/cellular-connectivity/cellular-carriers/?tab=ByDevice&device=Electron%20ELC314%202G%2F3G%20Global%20EtherSIM&region=All).



#### Ordering information

| SKU  | Description |
| :--- | :--- |
| SIMBLANKV2 | Particle SIM Card, [x1] |
| SIMBLANKV2_50 | Particle SIM Card, Tray [x50] |


## SIMTELE

The SKU **SIMTELE** is the original 4FF plastic SIM card included with the Electron. It was intended for use with the following devices.

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | G350 | NRND | ELC314TY|
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | U260 | Discontinued | ELC314TY|
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | U270 | Discontinued | ELC314TY|

Note: These Electron SKUs for LTE Cat M1 do not have a plastic 4FF SIM card holder and are not compatible with SIMTELE.

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| ELC404TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | GA | |
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | ELC404EA|
| ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | ELC404TY|

#### Available countries and carriers

A list of available countries and carriers can be found in the carrier list and depends on the device:

- [E260](/tutorials/cellular-connectivity/cellular-carriers/?tab=ByDevice&device=Electron%20U260%202G%2F3G%20Americas%2FAus&region=All)
- [E270](/tutorials/cellular-connectivity/cellular-carriers/?tab=ByDevice&device=Electron%20U270%202G%2F3G%20EMEA&region=All)


#### Ordering information

| SKU  | Description |
| :--- | :--- |
| SIMTELE |	SIM Card, [x1] |
| SIMBLANK50 | SIM Card, Tray [x50] |
