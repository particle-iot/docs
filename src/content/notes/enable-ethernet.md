Ethernet must be enabled. This is done using System.enableFeature(FEATURE_ETHERNET_DETECTION); typically from code. The reason is that probing for the Ethernet controller will use SPI and the GPIO pins above, which would adversely affect code that does not use Ethernet but does use those pins for other purposes.

```cpp
#include "Particle.h"

SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {

	// System.disableFeature(FEATURE_ETHERNET_DETECTION);
	System.enableFeature(FEATURE_ETHERNET_DETECTION);

	pinMode(D7, OUTPUT);
	digitalWrite(D7, HIGH);
}

void loop() {
}

```

- Save this code to a file, for example: enable-ethernet.cpp.

- Compile it using the Particle CLI, Particle Workbench, or Web IDE. For the CLI:

```
particle compile argon enable-ethernet.cpp --saveTo firmware.bin
```

- Connect the device to your computer using USB.

- Put the device in DFU mode (blinking yellow):

```
particle usb dfu
```

- Flash the code to your device:

```
particle flash --local firmware.bin
```

- Once the device reboots, the blue D7 LED should come on.

- Put the device in DFU mode (blinking yellow):

```
particle usb dfu
```

- Flash Tinker back to your device:

```
particle flash --local tinker
```

- The FEATURE_ETHERNET_DETECTION flag only needs to be enabled once. It's stored in configuration flash and will survive reset, power down, user firmware flashing, and Device OS upgrades.
