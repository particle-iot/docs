---
title: Product deprecation notice - March 16, 2022
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## Product deprecation notification

**Topic:** Hardware product deprecations

**Author:** Will Hart

**Date:** March 16, 2022

### 1\. Affected product versions

The following enterprise (bulk) hardware SKUs are impacted by this product deprecation notice:

* Gen 2 Wi-Fi  
   * P0 Wi-Fi Module (P0REEL)  
   * P1 Wi-Fi Module (P1REEL)  
   * Photon with Headers (PHNTRAYH)  
   * Photon without Headers (PHNTRAYNOH)
* Gen 2 Cellular  
   * E Series 2G/3G (E310TRAY50, E313TY, E314TRAY50)  
   * E Series LTE CAT M1 (E402TRAY50 and E404TRAY50)  
   * Electron 2G/3G (ELC314TY)  
   * Electron LTE M1 (ELC402TY and ELC404TY)
* Gen 3 Wi-Fi  
   * Argon (ARGNTRAY50)
* Gen 3 Cellular  
   * B Series LTE CAT M1 (B402MTY and B404MTY)  
   * B Series LTE CAT 1 (B523MTY)  
   * Boron 2G/3G (BRN314MTY)  
   * Boron LTE M1 (BRN402MTY and B404MTY)
* Gen 3 Tracker  
   * Tracker SoM LTE M1 (T402MTY and T404MTY)  
   * Tracker SoM LTE CAT 1 (T523MTY and T524MTY)  
   * Tracker One LTE M1 (ONE402MTY and ONE404MTY)  
   * Tracker One LTE CAT 1 (ONE523MTY and ONE524MTY)

### 2\. Reason for discontinuation

These products are being discontinued due to lack of availability of critical components driven by the ongoing global silicon shortage. Key components driving lack of product availability include (list not exhaustive):

* Radios  
   * **u-blox SARA-U201**, used on all 2G/3G products  
   * **u-blox SARA-R410,** used on all LTE M1-ready cellular products  
   * **Quectel BG96,** used on all LTE M1-ready tracker products  
   * **USI BM-09/14**, used on the Photon, P0, and P1
* Critical ICs  
   * **STM32F205**, used on all Gen 2 products  
   * **Torex XC9258A33CER-G,** used on all Argon and Boron products

Some of these parts have been EOL’ed by the manufacturer with no plans to resume production following the end of the silicon shortage. For others, supply is not expected to recover until 2023 or later, effectively ending Particle’s ability to continue to manufacture and sell affected products to customers. Newly announced products in our “Supply Secure” portfolio offer lowest-effort migration options with significantly improved supply chain reliability and longevity with better performance and functionality.

### 3\. Customer impact and recommended action

Particle recommends that customers of impacted parts migrate to one of our “Supply Secure” SKUs, designated below.

| Product family            | **Product SKU**                 | Supply Secure recommendation  |
| ------------------------- | ------------------------------- | ----------------------------- |
| Gen 2 Wi-Fi               | P0REEL, P1REEL                  | P2REEL                        |
| |  PHNTRAYH, PHNTRAYNOH   | PHN2TRAY50                      |                               |
| Gen 2 Cellular            | E310TRAY50, E313TY, E314TRAY50  | E404XTRAY50, B404XTY, B524MTY |
| |  E402TRAY50, E404TRAY50 | E404XTRAY50                     |                               |
| |  ELC314TY               | BRN404XTRAY50, B404XTY, B524MTY |                               |
| |  ELC402TY, ELC404TY     | BRN404XTRAY50                   |                               |
| Gen 3 Wi-Fi               | ARGNTRAY50                      | PHN2TRAY50                    |
| Gen 3 Cellular            | B402MTY, B404MTY                | B404XTRAY50                   |
| |  B523MTY                | B524MTY                         |                               |
| |  BRN314MTY              | BRN404XTRAY50, B404XTY, B524MTY |                               |
| |  BRN402MTY, BRN404MTY   | BRN404XTRAY50                   |                               |
| Gen 3 Tracker             | T402MTY, T404MTY                | T404XTY                       |
| |  T523MTY, T524MTY       | T524XTY                         |                               |
| |  ONE402MTY, ONE404MTY   | ONE404TY                        |                               |
| |  ONE523MTY, ONE524MTY   | ONE524TY                        |                               |

### 4\. Schedule

Particle will be offering a Last “Request to Buy” for all deprecated SKUs.

**Note** Due to the extreme constraints of the silicon shortage, Particle cannot guarantee that all Requests to Buy will be accepted and allocated with inventory.

| **Event**               | Date          | **Details**                                                                                                                                                    |
| ----------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Last request to buy** | June 30, 2022 | Particle will accept orders through our wholesale store and through direct POs from enterprise customers through June 30, 2022.                                |
| **Orders confirmed by** | July 31, 2022 | Particle will confirm inventory allocations for all orders for deprecated products submitted before the Last “Request to Buy” date by or before July 31, 2022. |
| **Last ship date**      | June 30, 2023 | All submitted orders must designate a requested delivery date on or before June 30, 2023.                                                                      |

### 5\. More information

If you have questions about any of the information presented in this product deprecation notification, please contact your designated AE/CSM, or contact our customer support team by submitting a ticket via [support.particle.io](http://support.particle.io)

### 6\. Related documentation

1. [Supply Secure blog post](https://www.particle.io/blog/particle-supply-secure-hardware-portfolio/)
1. [Supply Secure FAQ](/reference/product-lifecycle/supply-secure-faq/) document
