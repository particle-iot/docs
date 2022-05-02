---
title: SIM management
columns: two
layout: commonTwo.hbs
description: Managing your cellular SIMs from the Particle console
---

# {{title}}

SIM Management equips product creators with the functionality needed to operate at scale with
cellular-connected devices. This suite of tools is focused on reducing friction of
managing a fleet of Particle SIM cards at all stages of the SIM life cycle.

## Introduction

The SIMs view in the console is available for all cellular-based products, including those based on 
the E Series, Electron, B Series SoM, Boron, and Tracker. 
It appears as a SIM card icon in the Console side bar when
looking at your product. To access this view and start exploring, click on the SIM card icon ( <i
class="im-sim-vertical-detailed"></i> ).

Much like devices, SIM cards can be associated with a Particle
product instead of an individual developer account (sandbox). 

- Each account has a Free Tier Sandbox that can contain up to 100 devices, both cellular and Wi-Fi in any combination, for free.
- A product can be in the Free Tier Sandbox where the 100 device limit applies across both product and non-product devices in the account.
- A product can also be on the Growth or Enterprise Plan and be part of an organization, which is not limited by number of devices.
- A product can be prototyped in the Free Tier and then moved into a Growth or Enterprise plan later when scaled.

The SIMs page looks like this:

<img src="/assets/images/sims-for-products/sims-view.png"
class="full-width"/>

Here's a few things you will see on this page:
- A list of your product SIM cards, with details like its
ICCID, connection status, associated device info
- Some statistics about your fleet's aggregate data
usage
- Buttons to take action on your fleet, like importing
new SIMs into the product

## Importing SIM Cards

In many cases, you will not need to import SIM cards at all. For devices that include a built-in MFF2 SMD SIM
(E Series, B Series SoM, Boron, and Tracker), adding the Device ID to your product will automatically add the built-in
SIM card to your product with no additional steps required.

You can import SIM cards into your product a variety of different ways:

- Typing in ICCIDs
- Scanning ICCIDs using your webcam
- Uploading a file containing a list of ICCIDs

Regardless of the method you choose, **importing SIMs into a product also
triggers SIM activation**. This is a key benefit of managing SIM cards on
the product level: you are able to pre-activate large numbers of SIM cards
to ensure a smooth unboxing and setup experience for end-users of your
product.

![Import methods](/assets/images/sims-for-products/import-methods.png)
<p class="caption">You have methods to choose from when importing SIM
cards into your product</p>

Upon importing, SIM cards will be activated via Particle's
MVNO service. 

### Typing or scanning ICCIDs

For importing smaller numbers of SIM cards, it makes more sense to type
or scan ICCIDs to import into your product. You can find the
full ICCID number on the back of your Particle SIM carrier card, below the
bar code. Alternatively, the ICCID is also printed directly on the micro
SIM, if it has already been popped out of it's SIM carrier card.

<img src="/assets/images/sims-for-products/iccid-carrier-card.png"
class="small"/>
<p class="caption">You can find a Particle SIM's ICCID on the back of
its carrier card</p>

You also have the option to use your computer's webcam to scan a SIM
card's ICCID for product importing. Note that **scanning works best with a
webcam capable of 1080p resolution or higher**. As a result, many default
laptop scanners will not work well for scanning. If you don't have this
kind of webcam handy, we suggest typing ICCIDs or [importing via a
file](#importing-via-files).

![Scan ICCIDs](/assets/images/sims-for-products/scan-sim-cards.png)
<p class="caption">To scan, position the bar code inside the cyan box,
and ensure that it is in focus</p>

Regardless of if you are typing or scanning ICCIDs, SIM cards will queue
up for batch importing. When you have finished queueing up SIMs, click
"Continue" to proceed to selecting a home country for the data plan.

### Importing via files

For large numbers of SIM cards, it will be much easier to import and
activate using a file. If you have purchased a large number of Particle
SIM cards, you should have received a file containing a list of your
ICCIDs from Particle.

The Console's UI makes it easy to drag-and-drop a file containing ICCIDs
to use for importing. Your file must be a `.txt` and have one ICCID per
line. Any other data in the file will be ignored.


## Individual SIM actions

Although SIM management within a product provides fleet-wide control and
insight, it does not come at the expense of individual SIM control. In
the SIMs view, you can take the following actions on a SIM
card:

- **Deactivate SIM**: Stops this SIM from using data. The device will not be able to
connect to the cellular network or the Particle cloud and will be stuck in blinking 
green state if on.

- **Activate SIM**: A SIM that has previously been paused will have the 
Activate option instead of Deactivate. While activating a SIM card normally 
occurs within a minute, it could take up to 24 hours.

- **Release SIM**: Deactivates a SIM and removes it from the product. If the 
SIM is still in a device, the device will not be able to connect to the 
Particle cloud until the SIM is added to an account and activated.


### Data plans

For more information about the free and paid product plans for cellular products, see the 
[cellular data guide](/tutorials/cellular-connectivity/data/).

