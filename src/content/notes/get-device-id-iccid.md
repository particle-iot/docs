Using the Particle CLI, get the device ID and ICCID of your device using the command:

```
particle identify
```

- The Device ID is a 24-character hexadecimal number (0-9, a-f).
- The ICCID in an 18 to 22 digit number (0-9). It identifies the SIM card in your device.
- You will need the Device ID and ICCID in later steps.
- The device must be in listening mode (blinking dark blue) for the command to work.

For example:

```
$ particle identify
Your device id is e00fce68333a0b7effffffff
Your IMEI is 356726103999999
Your ICCID is 89014103271529999999
Your system firmware version is 2.3.0
```

