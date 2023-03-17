---
title: Sim Activation Troubleshooting
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

Here are the issues addressed in this article:

* I am unable to Activate or Deactivate my SIM. All I see is a spinning wheel, with no action, as if the page times out.
* I recently imported my Particle device into a Product. While it comes online, I don't see my SIM Card anywhere.
* Other activation failures

## The SIM activation/deactivation process

SIM Activations/Deactivations are multi-step processes involving communications between Particle and several telephony partners in charge of SIM management. When an Activation/Deactivation request comes in via our API, we direct it to hit a partner endpoint and await a success response. 

However, from time to time, this response exceeds the timeout window - occasionally even by orders of magnitude (eg. 24 hours!). This is because the Activation or Deactivation request is currently enqueued for execution by our telephony partner. In some instances, on high-traffic days, this can lead to delays. When this happens, the Console places a SIM in the "updating" state.

Some things to note:

1. Activation/Deactivation requests **almost always** go through to our MVNO partners the first time you hit "Activate" or "Deactivate", they just might be waiting in a queue.
2. This process may take up to 24 hours in certain cases. If an Activation/Deactivation request does not report a success immediately, try again in a few hours.
3. If you are working with a Product SIM, please manually attempt to re-import the SIM after your first attempt. If this fails, please wait up to 24 hours and try again.
4. Finally, do check for reported latency on <http://status.particle.io>.

If it’s been longer than 24 hours and you still are unable to Activate or Deactivate your SIM, please go ahead and open a support ticket ([https://particle.io/support)](https://particle.io/support) referencing your SIM’s ICCID. 

You can find your SIM's ICCID (the identifier for your SIM Card)in two ways. If your device has come online in the past and is visible in the Console, merely click on the Device in question to check the ICCID number. If the device has never come online, you can find this information by either checking the packaging for your Particle SIM and/or (especially in the case of embedded SIM devices), following the instructions [here.](/troubleshooting/guides/device-management/finding-your-device-id/)

## Other activation failures

When importing a SIM, activation can also fail due to a permissions issue because the SIM is currently owned by a different product or user.

- If the SIM was previously used in a developer account, the device must be unclaimed and the SIM card released from ownership in order for the new owner to set up the device.
- If the SIM was previously used in a product, the SIM card must be released from the product.

There is no check to make sure the SIM is associated with the same product as the device, doing so is a good practice because it can be difficult to locate the SIM if it is owned by a different product.
 