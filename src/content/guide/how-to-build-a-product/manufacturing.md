---
title: Manufacturing, programming, and testing
columns: two
template: guide.hbs
order: 8
---

# Manufacturing, Programming, and Testing

You've finished your hardware and software development. Your PCB is designed and tested, you've built your own web and mobile apps, and you've had a few beta customers successfully use products that you've built for them by hand. You've lined up a contract manufacturer (CM), and now you're ready to start manufacturing.

In most cases, manufacturing with Particle hardware is the same as manufacturing with any other electrical component. However there are some things to keep in mind when you program and test your products, and some opportunities to consider since your product is connected to the Internet.


### Purchasing Particle hardware at volume
You have two options when it comes to purchasing Particle hardware--purchasing from Particle, and purchasing directly from our module manufacturer. Let's run through the pros and cons of each:

- **Purchasing from Particle** means that you're buying either Photons or PØ/P1 modules through our [online store](http://store.particle.io), or purchasing larger volumes by contacting us at [sales@particle.io](mailto:sales@particle.io).  They'll be shipped to you from our warehouses in cut tape strips of ten (10) units, or as complete reels. There are several advantages to purchasing directly from Particle. In general, we try to keep hardware in stock so that we can provide quick lead times and prompt delivery timelines. We've already established relationships with our module manufacturer, so you can leverage our order volumes to get better pricing. Working with large silicon manufacturers can be difficult and slow, and we strive to be friendly, communicative, and easy to deal with. Additionally, when you buy hardware from Particle, it includes all the necessary firmware libraries and system firmware for connecting to the Particle Cloud by default, simplifying your manufacturing process.  This option is best for low to medium volume product deployments (<50K units).


- **Purchasing from our module manufacturer.** If your order volumes for the PØ or P1 are very large (50-100K), and you prefer to manage your own supply chain relationships, we encourage you to place an order directly to our module manufacturer. We are happy to provide all necessary introductions to get your purchase order submitted; please contact us at [sales@particle.io](mailto:sales@particle.io).


**Lead times**. Please keep in mind that, although we do our best to keep our hardware in ready supply, you should always plan on 8-12 weeks of lead time for delivery, especially if your order is very large. This is one of the most common mistakes that our customers make; if you're planning to use Particle hardware in production, reach out to us at [sales@particle.io](mailto:sales@particle.io) early in your development process so we can ensure your hardware is on order and in production well before you need it.

**Duties/Taxes**. As the end customer, you are responsible for any VAT charges or taxes associated with importing the modules to their final destination. If you are shipping into mainland China, our prices are reflective of FOB Hong Kong, and do not include import. Although we do not provide direct delivery to mainland China, we have plenty of experience that you can leverage; contact us at [sales@particle.io](mailto:sales@particle.io) if you have questions about importing raw materials, freight forwarders, import licenses, VAT rebates, or anything in between.

### Material import (China only)
If you are purchasing P0s, P1s, Photons, or Electrons for manufacturing in mainland China, you will need to consider China's VAT (value added tax) on electrical components.  This tax (typically 17-23%) applies to *all* electrical goods purchased from international distributors, and not just to Particle hardware.

*NOTE*: The industry standard for the fulfillment of electrical components is to support delivery to Hong Kong, but not to locations in mainland China. This is due to the wide variety of options available for importing materials, and the varying complexity and costs associated with those options. Particle abides by this industry standard and does not currently accept orders with final delivery to mainland China.

There are a number of ways to import goods into China for manufacturing--here's a quick overview of the two most popular options. Others exist, and it is highly recommended to ask your contract manufacturer which import method they prefer and support. Each of these methods will likely require the services of a freight forwarder to physically move the goods between Hong Kong and mainland China--your contract manufacturer probably has a preferred forwarder that you can leverage for this purpose.

**1. Pay the VAT**  
 - **Cost**: ~20% value of goods
 - **Complexity**: Low
 - **Reliability**: High
 - **Flexibility**: High

The simplest method is to pay the VAT in full.  This will add roughly 20% to the cost of your raw materials, but will ensure reliable and expedient transport of your components.  There is paperwork that has to be completed, but it is relatively simple, and your contract manufacturer or freight forwarder should be familiar with this process. This is the most expensive option, but allows for the most flexibility with respect to your BOM and manufacturing timelines, as the paperwork is resubmitted each time you bring goods into the country, and no prior arrangements have to be made.

**2. File for an import license**
  - **Cost**: ~$5,000 single time fee, small fixed fee per import/export event
  - **Complexity**: High
  - **Reliability**: High
  - **Flexibility**: Low

The best way to eliminate the additional burden of the VAT is to file for an import license for your product. Here's how it works--you (more likely your contract manufacturer) submit an application to the government that includes a final version of your BOM and samples of your product. You can then be granted a license to import goods for the manufacturing of the product without the necessity of paying the 20% VAT.  Here's the key--*all of the materials used in the manufacturing of that product must first be imported into China under the license, and then exported out of China under the same license*.  It's all an exercise in accounting--the government wants to see that all of the goods that were brought into the country were converted into finished goods using the "recipe" (BOM) you provided to them in advance, which guarantees that excess materials aren't being sold into local markets.  Even the parts that are manufactured domestically within mainland China have to first be *exported* to Hong Kong so they can be *reimported*, used in manufacturing, and then *re-exported* out of the country. Import licenses take about 3-6 weeks to receive, and can be very slightly modified (adding cross parts) but not drastically changed (adding new packaging elements or electrical components) without resubmission. They have a ~$5,000 price tag, so they have a negative ROI for small batch runs or product designs that are likely to change.

**3. Reimbursement**
  - **Cost**: 1-5% value of goods
  - **Complexity**: High
  - **Reliability**: Medium
  - **Flexibility**: High

The third and final option, which we have found to be less common than the other two, is to work with a manufacturer that is able to participate in VAT reimbursement. Reimbursement works a lot like an import license, but the accounting is done in retrospect instead of in advance. In this scenario, your contract manufacturer would pay the full VAT, and file for reimbursement of the tax once they can demonstrate that the goods they imported were used in manufacturing and then exported as finished goods. Reimbursement of the VAT can take anywhere from 3-6 months, though, so it would be typical for a manufacturer to charge interest on the capital that was leveraged to pay the VAT up front. This might be anything from an additional 1-5% on top of the value of the goods being imported, depending on the manufacturer. Not all manufacturers are able or will be interested in this kind of importing because it adds significant burden and risk to their sourcing and purchasing processes.  



### Testing
Before you can begin manufacturing, you need to consider how your product is going to be tested on the manufacturing line. The firmware that runs the functional evaluation of your PCB is called "test firmware". If you're using a Photon, PØ, or P1, there is a very basic set of test routines built into the default firmware that you are free to use, however they may not provide sufficient test coverage for your product.

A good functional evaluation has many parts, but includes robust, targeted testing of the power supply, microcontroller, critical ICs, and user-exposed peripherals. Specifically, if you are building a product with Particle hardware, you should carefully consider testing the following:

**1. Serial communication**. Although exposing the serial communication lines to your Photon/PØ/P1 is not a strict requirement of products build with Particle hardware, it's highly encouraged and makes gathering test results from your product during testing much simpler.

Exposing serial for debugging allows you to interact with Particle's basic test firmware to do useful things like:
 - Ask your device to reboot
 - Ask your device to perform a factory reset
 - Ask your device to connect to a known Wi-Fi network
 - Ask your device to scan for available networks
 - Ask your device to report its connection strength
 - Ask your device to clear all stored Wi-Fi credentials
 - Ask your device it's unique hardware identifier

These are all useful functions during manufacturing, so we highly encourage exposing serial debugging for your product.

**2. RGB LED**. In general, RGB LEDs are extremely moisture-sensitive components that are prone to failure and must undergo 100% inspection. You can accomplish a functional test of your LED in a few different ways:

- *Visual test*. Create a step in your test firmware that sets your product's RGB LED to white. This requires full use of the red, green, and blue parts of the RGB LED.  If any of these individual LEDs are non-functional, the LED will display an incorrect color, and can be separated for rework. This is a very easy check to implement into test firmware, but relies on the operators' discretion, which is less reliable than a quantitative optical characterization.

- *Optical characterization*. Use an optical sensor positioned over the RGB on your PCB to detect the color characteristics of your product's LED. The advantages of this technique are that it allows you to quantify the brightness of your LED by wavelength, and identify partially defective units (dim, flickering) more easily than if you were relying on the test fixture operator's eyesight and discretion alone.

**3. Wi-Fi Connectivity.** If you're building a product with Particle hardware inside, you're device probably connects to the Internet. It's important to make sure that the Wi-Fi module on your PCB is working correctly and that your antenna and RF system is functional. There are several different approaches you can take to testing your device's wireless capabilities:

- *Connecting to the Particle Cloud*.  The most foolproof test is to configure your device to connect to the Particle Cloud on the manufacturing line. This requires that you have a wired Internet connection and router on the to which the device can connect. Depending on the contract manufacturer that you are working with, a live Internet connection may or may not be available on the line. This will require that you clear the device credentials on your product after the test.

- *Connecting to a Local Network*. If Wi-Fi isn't available on the manufacturing line, electricity probably still is. Power up a router with a known SSID and password and configure your Photon to connect to it. If your product can request and receive an IP address, you can be confident that your radio and antenna configuration are functionally operational.

- *Scan for Wi-Fi Networks*. A more quantitative test of your product's RF performance is to scan for networks and measure their signal strength. This requires that you set up a router with a known SSID at a specified distance and orientation from your testing station in order to ensure accurate benchmarking and consistent test results. Scanning for networks is a lightweight, quick test that still requires that your product both send and receive wireless packets, so it tests both key wireless functions of your product. Additionally, measuring signal strength allows you to create a quantifiable criteria for evaluating the wireless performance of your device.

**4. Happy Path Batch Testing**. Regardless of the checks you build into the test firmware, you should make sure that you are doing functional batch testing of your product before final shipment. It's a good idea to take a handful of units from the "passed" bin every day and use the same tools available to the customer to configure your product onto the Internet and Particle Cloud. Test the basic function and use cases of the product. This will help you identify issues and potential pitfalls that might otherwise fall through the cracks of your functional tests and prevent a user from successfully configuring your product.

*COMING SOON!*
 - Particle Test Firmware for simple functional evaluations
 - Detailed documentation for interacting with Particle's default test suite
 - Resources and references for test jig fabrication


### Programming the device
Now that your product has successfully completed functional testing, you need to think about how the default firmware for your product is going to be programmed onto the device.

All Particle hardware comes off the manufacturing line loaded with [Tinker](http://docs.particle.io/photon/tinker/), application firmware designed for use with Particle's mobile app of the same name.  The Tinker app makes it easy to start playing and experimenting with your Particle device without writing any code. It's great for early development, but isn't suitable for a standalone product.  

If you're building a product on the Particle platform, you'll need to flash application firmware to your device that makes your Internet connected coffee-maker a coffee-maker and not a Photon. There are two basic strategies for flashing firmware to your product--both are outlined below.

**Option 1: Flash code on the manufacturing line**.  The traditional solution to getting firmware onto your device is to flash new code to the microcontroller on the manufacturing line. In a typical testing scenario, you might insert your PCB into a test fixture, flash test code to the device which runs a suite of functional evaluations on your product (described above), and then, when the product has passed functional testing, program it with the default factory firmware that you want to greet your customer with upon startup.  If your product is designed to work both with and without an Internet connection, it's imperative that you flash your firmware application on the manufacturing so it can still function in offline mode.  If you have a significant number of peripherals or sensors that require specialized testing outside of the default test suite on Particle hardware, you should similarly make accommodations to program your PCB on the line.  This can be accomplished using a STLink v2 Programmer or a Particle Programmer Shield connected to the exposed JTAG pins/pads on your PCB.

  - *Advantages*: Flexible, robust, product is functional out-of-the-box, required for products with sensors and additional peripherals
  - *Disadvantages*: Slower testing process (adds ~20s per flash event per test), requires more complicated testing hardware and software

**Option 2: Flash code over-the-air during initial setup**.  The second option is to leave the default Tinker firmware on the device until the end-customer configures your product onto Wi-Fi for the first time.  If your device is relatively simple but requires an Internet connection to function, you can flag your devices in the [Dashboard](https://dashboard.particle.io) so that when they connect to the Particle Cloud for the first time, they automatically download the most recent version of your product's application firmware. In the previous coffee-maker example, your product would think it was a Photon up until the moment it was configured by a customer for the first time, and would only be capable of making coffee after it was setup onto Wi-Fi and was re-programmed to do so.  Now, this clearly isn't the right strategy for a coffee-maker that still has to function if Wi-Fi is down, but might make sense for a button that your customer can press to re-order garbage bags from Amazon. A garbage bag orderer-er doesn't need to "work" until after it's connected to the Internet, and doesn't have complicated sensors and peripherals that require specialized functional that tests. For these kinds of simple, specialized products, programming over-the-air is a powerful and effective strategy for determining the end behavior of your product.

  - *Advantages*: Fast and simple; minimizes resources spent on test fixture development and optimization
  - *Disadvantages*: Product is non-functional until configured onto Wi-Fi; not suitable for products that require more comprehensive testing

Have questions about which programming strategy is right for your product?  Ask us!  We're always happy to provide our two cents.

*COMING SOON!*
 - Detailed instruction for flashing over JTAG and DFU using Particle's bootloader


### Provisioning your device
If you've decided that you want to purchase your wireless hardware direct from our module manufacturer, there are some additional steps you'll need to complete in order for your product to successfully connect to the Particle Cloud.  

 - **Licensing fee.** If you buy Particle hardware directly from us, the licensing fee for accessing the Cloud is built into the cost of the hardware. If you're buying hardware directly from our module manufacturer, their quoted cost will *not* include this licensing fee, and your devices will be unable to access the Cloud until you pay it.  Generally, it's a one-time cost of ~$2 per device.  To get detailed pricing, please contact [sales@particle.io](mailto:sales@particle.io).


 - **Device ID.** In order for a device to connect to the Particle Cloud, it's unique hardware identifier must be registered with our database--this helps us keep the Cloud safe and protect your devices from users and devices that don't belong there. If you purchase hardware directly from Particle, we've already captured this data and can automate the device ID insertion and tagging process behind the scenes.  If you purchase from our module manufacturer directly, though, you'll have to be very diligent about collecting and reporting these identifiers to us during manufacturing so that we recognize your product when it attempts to open up a socket to our Cloud. If an end-user or customer attempts to setup a device without a recognized device ID, the Cloud will reject the connection. Note that this is a significant risk that requires significant attention during the manufacturing process.


 - **Particle System Firmware.** Buying hardware directly from Particle means it will come pre-programmed with a bootloader, our system firmware (an embedded OS for your device), and Tinker, our default user app.  If you purchase directly from our module manufacturer, the hardware will be blank and require that you flash it using your product's exposed JTAG pins/pads in order to function properly. At a minimum, you'll need to flash our system firmware to the device so that it has the information it needs to communicate with our Cloud during initial configuration and setup.

*COMING SOON!*
 - Instructions and resources for flashing Particle system firmware to your device on the manufacturing line


### Device tracking and serialization -  *Coming soon!*
Connected devices provide the opportunity to compare customer behavior across distribution channels *if* you track your hardware properly. Consider adding a unique serial number for each device and tracking the mapping between these serial numbers and the device IDs.

  - Recording device IDs for customer support and record-keeping
  - Creating setup identifiers for your device
  - Creating trackable barcodes
  - UUIDs on the Particle platform


### What's next?

Now that you've finished manufacturing, you're ready to ship! Let's talk about:

[Certification >](../certification).
