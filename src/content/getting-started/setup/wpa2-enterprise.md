---
title: WPA2 Enterprise Wi-Fi Setup
columns: two
layout: commonTwo.hbs
description: WPA2 Enterprise Wi-Fi Setup
---

# {{title}}

You can use the P2, Photon 2, P1, and Photon on a WPA2 Enterprise Wi-Fi network. This type of network is common in university and corporate networks. If you see a reference to RADIUS, 802.1(x), need to enter both a username and password, or have a certificate or key file, you probably have a WPA2 Enterprise network. The Argon cannot be used on WPA2 Enterprise.

Most home networks use WPA2 Personal and have a simpler setup that only requires a SSID (network name) and a password and do not require these steps.

This is also different than situations where you enter a password (sometimes a username or email address as well) into a web page to get onto the network. That's referred to as a captive portal and is common in hotel and other public Wi-Fi networks. Captive portals are not supported.

## Install the Particle CLI

You should install the Particle Command Line Interface using the Particle CLI Installer for Windows, Mac, or Linux if you have not already done so.

It's the easiest way to upgrade the Particle Device OS on your device and set up WPA2 Enterprise.

It is not currently possible to do a WPA2 Enterprise setup using the Particle mobile apps or a web-based setup.


## Configure your device

Connect the device to your computer using USB and put the device in listening mode (blinking dark blue) by holding down the SETUP (or MODE) button until the main status LED blinks dark blue, about 3 seconds, if not already blinking blue.

In a Command Prompt or Terminal window, enter the command:

```
particle serial identify
```

This will print out the Device ID of your device, which you may need later.

Then enter the command:

```
particle serial wifi
```

Select the SSID of the network you want to log into. You can either scan for it or manually enter it. You can either scan for the security type and cipher or manually select it as well.

Then you'll need to select the EAP Type. This option only appears if you are using a WPA Enterprise or WPA2 Enterprise network.

```
EAP Type 0=PEAP/MSCHAPv2, 1=EAP-TLS:
```

## PEAP/MSCHAPv2 LOGIN / PASSWORD based setup

If your enterprise network uses PEAP/MSCHAPv2 and does not provide any certificates or keys, only a username and password, follow these instructions:

```
EAP Type 0=PEAP/MSCHAPv2, 1=EAP-TLS: 0 <ENTER>
Username: YOUR_USERNAME <ENTER>
Password: YOUR_PASSWORD <ENTER>
Outer identity (optional): <ENTER>
Root CA in PEM format (optional): <ENTER>
```

On some networks, such as the default setting in Windows NPS, the Outer identity is required to be the same as your Username. If you are unable to connect with the Outer identity blank, try setting it to your Username.

This is the easiest setup method to gain a connection, however it is not secure. Whenever possible use certificates to ensure maximum security.

## PEAP/MSCHAPv2 LOGIN / PASSWORD with Root CA

If your enterprise network uses PEAP/MSCHAPv2 and has a Root CA (certificate authority) certificate, follow these instructions:

```
EAP Type 0=PEAP/MSCHAPv2, 1=EAP-TLS: 0 <ENTER>
Username: YOUR_USERNAME <ENTER>
Password: YOUR_PASSWORD <ENTER>
Outer identity (optional): <ENTER>
Root CA in PEM format (optional): <copy/paste in file ca.crt> 
-----BEGIN CERTIFICATE-----
MIIFlDCCA3ygAwIBAgIJAI01a4ML65mlMA0GCSqGSIb3DQEBCwUAMFcxCzAJBgNV
...
-----END CERTIFICATE-----
```

This is the setting you'd typically used for eduroam.

```
EAP-TLS with Client Certificate, Client Key and Root CA
EAP Type 0=PEAP/MSCHAPv2, 1=EAP-TLS: 1 <ENTER>
Client certificate in PEM format: <copy/paste in file client1.crt>
-----BEGIN CERTIFICATE-----
MIIE3DCCAsSgAwIBAgICEAEwDQYJKoZIhvcNAQELBQAwVzELMAkGA1UEBhMCVVMx
...
-----END CERTIFICATE-----

Private key in PEM format: <copy/paste in file client1.key>
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAy42H10w6nntp+Ti7Ts/czel8Gw4mz8Mh3N0R/sapRNLyznom
...
-----END RSA PRIVATE KEY-----

Outer identity (optional): <ENTER>
Root CA in PEM format (optional): <copy/paste in file ca.crt>
-----BEGIN CERTIFICATE-----
MIIFlDCCA3ygAwIBAgIJAI01a4ML65mlMA0GCSqGSIb3DQEBCwUAMFcxCzAJBgNV
...
-----END CERTIFICATE-----
```

## Output

After entering the keys in one of the above methods, the following should be displayed:

```
Thanks! Wait while I save those credentials...

Awesome. Now we'll connect!

If you see a pulsing cyan light, your device
has connected to the Cloud and is ready to go!

If your LED flashes red or you encounter any other problems,
visit https://www.particle.io/support to debug.

Particle <3 you!
```

## Claim your device

If this is the first time you've used your Photon, you will need to claim it. If you've already set up your Photon using a non-enterprise network, you should skip this step.

The normal sequence on the status LED is: white, blinking green, blinking cyan (light blue), fast blinking cyan, and finally breathing cyan.

You can only claim your device when it's breathing cyan. If it's not breathing cyan, troubleshoot that first before trying to claim.

In a Command Prompt or Terminal window enter the command:

```
particle device add YOUR_DEVICE_ID
```

Replace YOUR_DEVICE_ID with the Device ID you got earlier from particle serial identify.

The device ID uniquely identifies your Particle device to the Particle cloud. It consists of 24 hexadecimal characters, and looks like this: 1e0032123447343149111039.

For example:

```
particle device add 1e0032123447343149111039
```

## Troubleshooting

To troubleshoot, use the [Cloud Debug](/troubleshooting/connectivity/cloud-debug/) firmware. 

You can also find helpful advice in [this community forum post](https://community.particle.io/t/setting-up-photon-p1-on-wpa-enterprise-0-7-0/34167).

Some common errors include:

- 1006 NOT_AUTHENTICATED
- 1007 NOT_KEYED
- 1024 NETWORK_NOT_FOUND
- 1025 INVALID_JOIN_STATUS

The full list of errors is [here](https://github.com/particle-iot/device-os/blob/release/v2.x/hal/src/photon/wiced/WWD/include/wwd_constants.h#L463).