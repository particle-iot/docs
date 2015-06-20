---
title: Manufacturing, programming, and testing
columns: 2
---

You've finished your hardware and software development. Your PCB is designed and tested; you've built your own web and mobile apps, and you've had a few beta customers successfully use products that you've built for them by hand. You've lined up a contract manufacturer (CM), and now you're ready to start manufacturing.

In most cases, manufacturing with Particle hardware is the same as manufacturing with any other hardware. However there are some things to keep in mind when you program and test your products, and some opportunities to consider since your product is connected to the internet.

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
