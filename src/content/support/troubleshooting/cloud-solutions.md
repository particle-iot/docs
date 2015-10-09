---
title: Cloud Solutions
template: support.hbs
columns: two
devices: [ photon, core ]
order: 4
---

Cloud Solutions
===

### Building a Local Cloud for Devices

This will guide you through on how to Setup the Local cloud and use it with Particle-cli after a successful installation.

Before you proceed, make sure you fired up ``particle-server`` [link to particle-server](https://github.com/spark/spark-server) successfully at least once. We will need the server public keys generated on 1st run later.

**NOTE:** This will point the Particle-CLI to the local cloud and you will not be able to use features available on the Particle cloud.

**1. We will now create a new server profile on Particle-cli using the command:**

``particle config profile_name apiUrl "http://DOMAIN_OR_IP"``

For the local cloud, the port number 8080 needs to be added behind: http&#58;//domain_or_ip:8080

This will create a new profile to point to your server and switching back to the Particle cloud is simply ``particle config`` spark and other profiles would be ``particle config profile_name``.

**2. We will now point over to the local cloud using ``particle config profile_name``**

**3. Run ``particle setup`` (on a separate CMD prompt from the one running the server)**

This will create an account on the local cloud.

Perform <kbd>``CTRL``</kbd>``+``<kbd>``C``</kbd> once you logon with Particle-cli asking you to send Wifi-credentials etc...

**4. On Command-line, ``cd`` to particle-server**

**5. Place your {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} in DFU mode [flashing yellow]**

**6. Change server keys to local cloud key + IP Address**

particle keys server default_key.pub.pem IP_ADDRESS

**7. Go to {{#if photon}}photon{{/if}}{{#if core}}core{{/if}}_key directory to place {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} public key inside**

``cd {{#if photon}}photon{{/if}}{{#if core}}core{{/if}}_keys``
place {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} in DFU-mode
particle keys save INPUT_{{#if photon}}PHOTON{{/if}}{{#if core}}CORE{{/if}}_ID_HERE
NOTE: make sure you use the {{#if photon}}PHOTON{{/if}} {{#if core}}CORE{{/if}} ID when saving the keys!

Reset the {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} manually by hitting the RST button

**8. Check for connection**

- Make sure particle-server is running
- open a separate CMD (if you closed it earlier)
- cd to particle-server
- run node main.js
- watch the cmd for connections by the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}}

You can restart the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} and see if there's any activity when the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} attempts to reach breathing cyan

Example activity from CMD output:

	Connection from: 192.168.1.159, connId: 1
	on ready { coreID: '48ff6a065067555008342387',
				ip: '192.168.1.159',
				product_id: 65535,
				firmware_version: 65535,
				cache_key: undefined }
	Core online!


### Cloud Switching (Local vs Particle)

**1. You will need to flash the respective cloud Public Key to the core which you are connecting to.

- Place your {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} in DFU-mode (flashing yellow)
- On the command line (to switch to Particle Cloud):

	``particle keys server cloud_public.der``

	The Particle cloud public key file is here: [https://s3.amazonaws.com/spark-website/cloud_public.der](https://s3.amazonaws.com/spark-website/cloud_public.der)

	For local Cloud: ``particle keys server your_local_cloud_public_key.der IP-ADDRESS``
- Reset your {{#if photon}}photon{{/if}}{{#if core}}core{{/if}}

**2.Changing of profile back to the default particle cloud on the Particle-cli must be performed using:

``particle config identify``

Example Output:

	KENMBP:~ kennethlimcp$ particle config identify
	Current profile: local
	Using API: http://192.168.1.68

This will ensure that you are pointing to your own cloud!

*Thanks to [Kenneth Lim](http://community.particle.io/users/kennethlimcp/activity) for writing this local cloud solution.*
