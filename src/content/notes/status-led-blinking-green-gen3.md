If your device is blinking green, it is trying to connect to Wi-Fi.

If you are unable to get past blinking green, here are a few known working situations that the device is not compatible with:

- If you are using a corporate or school network that uses WPA2 Enterprise, you cannot use the Argon. If you require both a username and a password, or see a mention of 802.1(x), or RADIUS you're using WPA2 Enterprise.

- If you are using a network that takes you to a web page where you need to either sign in or agree to terms and service when you first connect, using the device directly will be difficult or impossible. This is the case in some hotels and public Wi-Fi networks and is often referred to as Captive Portal.

- If your Wi-Fi network uses 5 GHz only, instead of the more common 2.4 GHz, the device cannot be used. The Wi-Fi radio is only compatible with 2.4 GHz networks.

And the less common situations:

- If you get fast blinking green, especially in classroom and hack-a-thon type situations, it is possible that your network has run out of DHCP IP addresses.

- If your Wi-Fi network does not support DHCP, and only uses static IP addresses, it not possible to use the Argon.

- If the Wi-Fi network restricts access to known device Ethernet MAC addresses, you'll need to determine the MAC address and give it to the network administrator. Put the device in listening mode (blinking dark blue) by holding down the {{system-button}} button, then use the Particle CLI command `particle serial mac`.

