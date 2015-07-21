---
title: Manufacturing, programming, and testing
columns: two
template: guide.hbs
order: 4
---

##Manufacturing, Programming, and Testing

You've finished your hardware and software development. Your PCB is designed and tested, you've built your own web and mobile apps, and you've had a few beta customers successfully use products that you've built for them by hand. You've lined up a contract manufacturer (CM), and now you're ready to start manufacturing.

In most cases, manufacturing with Particle hardware is the same as manufacturing with any other electrical component. However there are some things to keep in mind when you program and test your products, and some opportunities to consider since your product is connected to the Internet.


###1. Purchasing Particle hardware at volume
You have two options when it comes to purchasing Particle hardware--purchasing directly from us, and purchasing directly from our module manufacturer. Let's run through the pro's and con's of each:

- **Purchasing from Particle** means that you're buying either Photons or P0/P1 modules through our [online store](http://store.particle.io).  They'll be shipped to you from our warehouses in cut tape strips of ten (10) units, or as complete reels. There are several advantages to this. In general, we try to keep hardware in stock so that we can provide quick lead times and prompt delivery timelines. We've already established relationships with the module manufacturers, so you can leverage our order volumes to get better pricing. Working with large silicon manufacturers can be difficult and slow, and we'd like to think we are friendly and easy to deal with. The reason we sell hardware at all is that we want to make the experience as simple as possible.  This option is best for relatively low volumes (<20K units).


- **Purchasing from our module manufacturer.** If your order volumes for the P0 or P1 are very large (20-100K), and you prefer to manage your own supply chain relationships, we encourage you to place an order directly to the module manufacturer. A company named [USI](http://www.usish.com/english/default.php) in Taiwan manufacturers the P0 and P1, and we'd be happy to provide all necessary introductions to get your purchase order submitted.


**Lead times**. Please keep in mind that, although we do our best to keep our hardware in ready supply, you should always plan on 8-12 weeks of lead time for delivery, especially if your order is very large. This is one of the most common mistakes that our customers make--if you're planning to use Particle hardware in production, reach out to us at [sales@particle.io](mailto:sales@particle.io) early in your development process so we can ensure your hardware is on order and in production well before you need it.

**Duties/Taxes**. Please keep in mind that, as the end customer, you are responsible for any VAT charges or  taxes associated with importing the modules. If you are shipping into mainland China, our prices are reflective of FOB Hong Kong, and do not include import. Although we do not provide direct delivery to mainland China, we have plenty of experience that you can leverage--contact us at [sales@particle.io](mailto:sales@particle.io) if you have questions about importing raw materials, freight forwarders, import licenses, VAT rebates, or anything in between.

###2. Testing
Before you can begin manufacturing, you need to consider how your product is going to be tested on the manufacturing line. The firmware that runs the functional evaluation of your PCB is called "test firmware". If you're using a Photon, P0, or P1, there is a very basic set of test firmware built into the default firmware, however it may not be sufficient for your product.

A good functional evaluation has many parts, but includes robust, targeted testing of the power supply, microcontroller, critical ICs, and user-exposed peripherals. Specifically, if you are building a product with Particle hardware, you should carefully consider the following:

**1. Serial communication**. Although it's not strictly required when building a product with Particle, exposing the serial communication lines to your Photon/P0/P1 makes gathering test results from your product during testing much simpler.

Exposing serial for debugging allows you to interact with Particle's basic test firmware to do useful things like:
 - Ask your device to reboot
 - Ask your device to perform a factory reset
 - Ask your device to connect to a known Wi-Fi network
 - Ask your device to scan for available networks
 - Ask your device to report its connection strength
 - Ask your device to clear all stored Wi-Fi credentials
 - Ask your device it's unique hardware identifier

These are all useful functions during manufacturing, so we highly encourage exposing serial debugging for your product.

**2. RGB LED**. In general, RGB LEDs are extremely moisture-sensitive components that are prone to failure and must undergo 100% inspection. You can accomplish a functional test in a few different ways:

- *Visual test*. Create a step in test firmware for the Photon or P0/P1 module in your device that sets the RGB LED to white. This requires full use of the red, green, and blue LEDs in the RGB part.  If any of these individual LEDs are non-functional, the LED will display an incorrect color, and can be separated for rework. This is a very easy check to implement, but relies on the operators' discretion, which is less reliable than a quantitative, measured test.

- *Optical characterization*. Use an optical sensor positioned over the RGB LED on your PCB to detect the color characteristics of the device. The advantages of this technique are that it allows you to quantify the brightness of your LED by wavelength, and identify partially defective units (dim, flickering) more easily than if you were relying on the test fixture operator's eyesight and discretion alone.

**3. Wi-Fi Connectivity.** Since you're building with Particle, you're device probably connects to the Internet. It's important to make sure that the Wi-Fi module on your PCB is working correctly and that your antenna is functional. There are several different approaches you can take to testing your device's wireless capabilities:

- *Connecting to the Particle Cloud*.  The most bulletproof test is to configure your device to connect to the Particle Cloud on the manufacturing line. This requires that you have a wired Internet connection and router on the line. Depending on the contract manufacturer that you are working with, this may or may not be possible. The advantage of this method is that it also ensures that the keys on your device are valid, and that your customer will

- *Connecting to a Router*. If Wi-Fi isn't available on the manufacturing line, electricity probably still is. Power up a router with a known SSID and password and configure your Photon to connect to it's local network. If the device can request and receive an IP address, you can be confident that your radio and antenna configuration are operational.

- *Scan for Wi-Fi Networks*. A more quantifiable Wi-Fi test is to scan for networks and measure their signal strength. This requires that you set up a router with a known SSID and PW at a known distance and orientation from your testing stations. Scanning for networks also requires that your product send and receive wireless packets, so it tests both functions of your product. Additionally, measuring signal strength allows you to create a quantifiable criteria for evaluating the wireless performance of your device.

**4. Happy Path Batch Testing**. Regardless of the checks you build into the test firmware, you should make sure that you are doing user-driven functional batch testing of your product before final shipment. It's a good idea to take a handful of units from the "passed" bin every day and use the same tools available to the customer to configure your product onto the Internet and Particle Cloud. Test the basic function and use cases of the product. This will help you identify issues and use cases that might otherwise fall through the cracks of your functional tests and prevent a user from successfully configuring your product.

**Coming soon!**
 - Particle Test Firmware for simple functional evaluations
 - Resources and references for test jig fabrication


###3. Programming the device
Now that your product has successfully completed functional testing, you need to think about how the default firmware for your product is going to be programmed onto the device. All Particle hardware comes off the manufacturing line loaded with [Tinker](http://docs.particle.io/photon/tinker/), firmware designed for use with Particle's mobile app of the same name.  The Tinker app makes it easy to start playing and experimenting with your Particle device without writing any code. It's great for early development, but isn't suitable for a standalone product.  

If you're building a product on the Particle platform, you'll need to flash firmware to your device that makes your Internet connected coffee-maker a coffee-maker and not a Photon. There are two basic strategies for flashing firmware to your product--both are outlined below.

**Option 1: Flash code on the manufacturing line**.  The traditional solution to getting firmware onto your device is to flash new code to the microcontroller on the manufacturing line. In a typical testing scenario, you might insert your PCB into a test fixture, flash test code to the device which runs a suite of functional evaluations on your product (described above), and then, when the product has passed functional testing, program it with the default factory firmware that you want to greet your customer with upon startup.  If your product is designed to work both with and without an Internet connection, it's imperative that you flash code on the manufacturing so it can still function in offline mode.  If you have a significant number of peripherals or sensors that require specialized testing outside of the default test suite on Particle hardware, you should make accommodations to program your PCB on the line.  This can be accomplished using a STLink v2 Programmer or a Particle Programmer Shield connected to the exposed JTAG pins/pads on your PCB.

  - *Advantages*: Flexible, robust, product is functional out-of-the-box, required for products with sensors and additional peripherals
  - *Disadvantages*: Slower testing process (adds ~20s per flash event per test), requires more complicated testing fixture

**Option 2: Flash code over-the-air during initial setup**.  The second option is to leave the default Tinker firmware on the device until the end-customer configures your product onto Wi-Fi for the first time.  If your device is relatively simple but requires an Internet connection to function, we can tag your devices in our database so that, when they connect to the Particle Cloud for the first time, they automatically download the most recent version of your product firmware. In the previous coffee-maker example, your product would think it was a Photon after it was provided for the first time, and would only be capable of making coffee after it was configured onto Wi-Fi and was re-programmed to do so.  Now, this  isn't the right strategy for a coffee-maker, but might make sense for a button that your customer can press to re-order garbage bags from Amazon. A garbage bag orderer-er doesn't need to function until after it's connected to the Internet, and doesn't have complicated sensors and peripherals that require specialized functional that lie outside of the default Particle test suite. For these kinds of simple, specialized products, programming over-the-air is a powerful and effective strategy for determining the end behavior of your product.

  - *Advantages*: Fast and simple--minimizes resources spent on test fixture development and optimization
  - *Disadvantages*: Product is non-functional until configured onto Wi-Fi, not suitable for products that require more comprehensive testing

Have questions about which programming strategy is right for your product?  Ask us!  We're always happy to provide our two cents.

###4. Provisioning your device
If you've decided that you want to purchase your wireless hardware direct from our module manufacturer, there are some additional steps that are required in order for your product to connect to the Particle Cloud.  Let's talk about what's required for a device to open up a socket with our Cloud:

 - **Licensing fee.** If you buy Particle hardware, the licensing fee for accessing the Cloud is built into the cost of the hardware. If you're buying hardware directly from our module manufacturer, the cost will *not* include this fee, and your devices will be unable to access the Cloud until you do so.  Generally, it's a one-time cost of ~$2 per device.  To get detailed pricing for large volume product deployments, please contact [sales@particle.io](mailto:sales@particle.io).


 - **Device ID.** In order for a device to connect to the Particle Cloud, it's unique hardware identifier must be recorded in our database--this helps us keep the Cloud safe and keep out strangers who don't belong there. If you purchase hardware directly from Particle, we've already captured this data and can automate the device ID insertion and tagging process behind the scenes.  If you purchase from our module manufacturer directly, though, you'll have to be very diligent about collecting and reporting these identifiers to us during manufacturing so that we recognize your product when it attempts to open up a socket to our Cloud. If a customer attempts to setup a device without a recognized device ID, the Cloud will reject the connection.


 - **Particle System Firmware.** Buying hardware directly from Particle means it will come pre-programmed with a bootloader, our system firmware (like an embedded OS for your device), and Tinker, our default user app.  If you purchase from our module manufacturer, the hardware will be blank and require that you flash it using your product's exposed JTAG pins/pads in order to function properly.

 **Coming soon!**
 -


###7. Device tracking and serialization
  - Format
  - Setup codes

###Open questions
- [ ] If we sell reels of hardware to people, do they register them to their organization or us?
- [ ] If they don't buy hardware from us, how do they provision their devices?  What are the requirements for us to let something connect to our cloud?
- [ ] What documentation or resources do we need provide to people in order to help them through certification? Just paperwork? Test firmwares?
- [ ] Do they need to record or send us anything if we're the ones providing the modules?
- [ ] Do they need to record or send us anything if they're buying Particle modules from someone else?
- [ ] Do they need to record or send us anything if they're buying generic modules from someone else?
- [ ] What is the official standard we want to communicate for uniquely identifying products on the Particle platform?
- [ ] Is recording the setup code relevant to people who are going to rewrite over our Tinker firmware on the assembly line? Should we construct a mandatory "PRODUCT NAME_SETUP CODE" format for SoftAP on our platform?

###Things we need to build:
- [ ] Open source firmware for serialization / setup code?
- [ ] Manufacturing API for provisioning?

---

### Purchasing modules at scale

TODO

(Basic story: contact sales@particle.io to place an order and submit a purchase order (PO))

### Programming/test jig

TODO

(Basic story: you'll need to consider how your device will be programmed/tested on the manufacturing line. Perhaps we could open source and link to our test hardware/software?)

### Programming during manufacturing vs. over the air

TODO

(Basic story: Highlight the tradeoffs; programming on the line is recommended)

### Testing on the manufacturing line

TODO

(Basic story: be sure to test your product's functionality, as well as all necessary component connections and the RF performance of the device. Also capture the device ID off the device if at all possible. Can we provide our test firmware application and instructions for using it?)

### Tracking and serializing your devices

TODO

(Basic story: Connected devices provide the opportunity to compare customer behavior across distribution channels *if* you track your hardware properly. Consider adding a unique serial number for each device and tracking the mapping between these serial numbers and the device IDs. Let's also provide instructions for how to extract the device ID and the 4-6 digit hash that's in the setup mode)
