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
