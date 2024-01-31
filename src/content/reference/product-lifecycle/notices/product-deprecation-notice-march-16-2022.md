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

For the specific SKUs affected by this notice, see [Product lifecycle policy status](/reference/product-lifecycle/product-lifecycle-policy-status/).

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

Particle recommends that customers of impacted parts migrate to one of our “Supply Secure” SKUs, designated below

| Product family            | **Product SKU**                 | Supply Secure recommendation    |
| ------------------------- | ------------------------------- | ------------------------------- |
| Gen 2 Wi-Fi               | P0REEL, P1REEL                  | P2REEL                          |
|                           | PHNTRAYH, PHNTRAYNOH            | PHN2TRAY50                      |
| Gen 2 Cellular            | E310TRAY50, E313TY, E314TRAY50  | E404XTRAY50, B404XTY, B524MTY   |
|                           | E402TRAY50, E404TRAY50          | E404XTRAY50                     |
|                           | ELC314TY                        | BRN404XTRAY50, B404XTY, B524MTY |
|                           | ELC402TY, ELC404TY              | BRN404XTRAY50                   |
| Gen 3 Wi-Fi               | ARGNTRAY50                      | PHN2TRAY50                      |
| Gen 3 Cellular            | B402MTY, B404MTY                | B404XTRAY50                     |
|                           | B523MTY                         | B524MTY                         |
|                           | BRN314MTY                       | BRN404XTRAY50, B404XTY, B524MTY |
|                           | BRN402MTY, BRN404MTY            | BRN404XTRAY50                   |
| Gen 3 Tracker             | T402MTY                         | T404MTY                         |
|                           | T523MTY                         | T524MTY                         |
|                           | ONE402MTY                       | ONE404MTY                       |
|                           | ONE523MTY                       | ONE524MTY                       |

Originally, there were planned "X" Tracker devices T404XMTY, T524XMTY, ONE404XMTY, and ONE524XMTY, however the is now a sufficient supply of parts available that the existing 404 and 524 variations can be produced in quantity. The existing T404MTY, T524MTY, ONE404MTY, and ONE524MTY are now considered to be supply secure.

### 4\. Related documentation

1. [Supply Secure blog post](https://www.particle.io/blog/particle-supply-secure-hardware-portfolio/)
1. [Supply Secure FAQ](/reference/product-lifecycle/supply-secure-faq/) document
