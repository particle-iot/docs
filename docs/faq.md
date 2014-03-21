FAQ / Troubleshooting
=====================

Known Issues
===

## Flashing Cyan / WiFi Disconnect
* Status: In Progress
* Forum Thread: https://community.spark.io/t/bug-bounty-kill-the-cyan-flash-of-death/1322

With certain WiFi networks, the Spark Core will sometimes enter a state where the status LED will flash cyan. Flashing cyan means that the Spark Core can no longer communicate with the Spark Cloud server. If this happens, the Spark Core is programmed to try to reconnect. When the Core reconnects, the status LED will go back to 'Breathing Cyan'.

The Spark Core is equipped with a Texas Instruments (TI) CC3000 WiFi module to facilitate wireless networking. The CC3000 module has it's own closed-source firmware that was created by TI. Unfortunately, it was discovered that the firmware on the CC3000 module itself has an issue that can cause the module to stop responding. In this case, the Spark Core entered a permanent state of flashing cyan referred to as the 'Cyan Flash of Death' or CFOD. A reset was required to reconnect the Spark Core.

The good news is that the firmware on the CC3000 module can be updated and the Spark team has been working with TI in order to resolve the issue. Also, because of the great work by many community members and the Spark team, the Spark Core firmware has been modified to work around the issues with the CC3000. When the CC3000 fails, the Spark Core firmware will attempt to reset the CC3000 and reconnect to the Spark Cloud.

So far TI has supplied a couple of firmware patches to the Spark Team to test, but at this time, the issue doesn't seem to have been fully resolved. TI has been very helpful during this process and we're hopeful to have a fix soon. When the fix is ready and fully tested, we will provide instructions on how to update the CC3000 firmware.

## Stuck Flashing Blue
* Status: Trying to replicate
* Forum Thread: https://community.spark.io/t/status-led-flashing-blue/2915

## Inaccurate Analog Readings
* Status: Partially Resolved (Not yet available in the web IDE)
* Forum Thread: https://community.spark.io/t/odd-analog-readings/906
* Forum Thread: https://community.spark.io/t/odd-analog-readings-part-2/2718

## Serial1 UART Missing Received Data due to being polled
* Status: Resolved
* Forum Thread:

Serial UART Tx/Rx is now Interrupt Driven

## Long delays cause Core to drop off of the Cloud
* Status: Resolved
* Forum Thread: https://community.spark.io/t/known-issue-long-delays-or-blocking-code-kills-the-connection-to-the-cloud/950

Long delays now call the background tasks to keep the Cloud connected.

## Initializing peripherals in Class constructors causes the Core to hang
* Status: Resolved
* Forum Thread: https://community.spark.io/t/serial1-begin-in-class-constructor-hangs-core/3133

Constructors are called after the Core is initialized

## UDP and TCP ports close if not accessed
* Status: ???
* Forum Thread: https://community.spark.io/t/strange-udp-bug/2583/
* Comments: (From @Dave) - re-read that thread, apparently there was a fix for this I wasn't aware of?

