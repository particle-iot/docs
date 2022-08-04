On Gen 3 devices (Argon, Boron, B Series SoM, and Tracker) running Device OS 3.x or earlier, it is necessary to mark setup done. This can be done using the Particle CLI:

```
particle usb setup-done
```

- The device should be in a normal operating mode to use this command. It cannot be used in DFU mode (blinking yellow).
- If you do not mark setup done, the device will boot into listening mode (blinking dark blue).
- Starting with Device OS 4.x, this step is no longer necessary.
