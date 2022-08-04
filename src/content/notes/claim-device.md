In most cases, you will want to claim devices to your account. This step allows you to flash code over-the-air (OTA), and perform other operations from the cloud securely.

In order to claim a device, it must be online and breathing cyan. If it's still in listening mode, tap the RESET button on the device.

Use the `particle device add` command and specify the Device ID (24-character hex) that you got in a previous step. 

```
particle device add 1f00300016473532ffffffff
```

You may also want to name your device now.

```
particle device rename 1f00300016473532ffffffff "boron-1"
```

