When the device is connecting to the cloud it will first blink cyan. Once the device has made contact with the Particle cloud it will fast blink cyan until the process is complete.

While connecting to the Cloud, the RGB LED will be blinking cyan followed by:

- 1 orange blink: Decryption error.
- 2 orange blinks: Could not reach the internet.
- 3 orange blinks: Connected to the internet, but could not reach the Particle Device Cloud. This sometimes is seen as yellow or red and indicates bad server keys.
- 1 magenta blink: Authentication error.
- 1 red blink: Generic handshake error. The device could have the wrong keys or has just encountered a generic error in the handshake process.


Most keys related issues can be resolved using the [Particle CLI](/getting-started/developer-tools/cli/).

Put the device into Listening mode (blinking blue) by holding down {{system-button}} until it blinks blue. Then issue the CLI command:

```
particle identify
```

Save the Device ID; you’ll need it later.

Then put the device in DFU mode by holding down both the {{reset-button}} and {{system-button}} buttons, releasing {{reset-button}} and continuing to hold down {{system-button}} until it blinks yellow and issue the commands below, in order.

```
particle keys server
particle keys doctor YOUR_DEVICE_ID
```
