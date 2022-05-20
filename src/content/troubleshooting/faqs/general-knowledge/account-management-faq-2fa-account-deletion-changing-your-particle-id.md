---
title: Account Management FAQ (2FA, Account Deletion, Changing Your Particle ID)
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## How should I set up 2FA for my Particle Account?

The most important thing you should do when you set up 2FA is to **save the ten one-time recovery passcodes that are provided** \-- but do _not_ rely on storing them on your mobile device. We recommend printing them out and keeping them in a secure location away from your computer.

Some authenticator mobile apps store account credentials on the mobile device itself (the [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en%5Fus) works this way). That means that **if you lose or replace your mobile device, you will no longer be able to log into your Particle account unless you have one of the one-time recovery passcodes mentioned above**. So if you know that you’re going to be replacing your mobile device, first disable 2FA on your Particle account, and then re-enable it using your new device.

Some other authenticator apps (e.g. [Authy](https://authy.com/features/) and 1Password) store credentials in their cloud, so they are not as problematic when a mobile device is replaced.

## What should I do if I'm locked out via 2FA?

If you have lost/replaced your mobile device and also do not have any of the one-time recovery passcodes at hand, you will have to submit a support request by contacting [support@particle.io](mailto:support@particle.io) **from your registered particle email address**. In order to to authenticate you (i.e. ensure that you are the actual account owner) please include as many of the following as you can in your support request: 

* Last four digits and expiry date of the credit card associated with the account (if you have one)
* Number and type of device(s) claimed to your account
* Name(s) of devices
* Name(s) of user firmware sketches stored in the Web IDE
* Any other data that will help us determine that you are in fact the account owner

## What is the proper process for deleting my account?

(_Note_ that if you merely wish to stop billing, see our “How To Suspend Billing Guide." There is no “penalty” for leaving an account open if billing is deactivated.)

First, log into your account at console.particle.io and perform the following:

* Remove the SIM(s) from both your account and any Products owned by the account. (**Release** them, don’t just Deactivate them.)
* Unclaim your Device(s) from both your account and any Products owned by the account. (Releasing a SIM does not remove the associated device from your account, and vice-versa)
* Delete all Integrations (Webhooks etc.) from your account and any Products owned by the account

Also, as necessary, be sure to back up any source files you have stored in the [Web IDE](https://build.particle.io/build/new).

Click on your email address in the top right and select the “Edit Account” option from the dropdown menu. You will be redirected to <https://login.particle.io/account-info?redirect=https://console.particle.io/devices>. Select the “delete account” option near the center-bottom of the page. You will be prompted to enter your password one more time to confirm deletion of your account.

 (_Note_ that this action is non-reversible, so be very sure that you really want the account deleted.)

## How can I change my Particle ID?

You may change the email address associated with your account at any time by going [here](https://login.particle.io/account-info?redirect=https://console.particle.io/devices) and typing in the new email address. You may also log into your account at console.particle.io and click on your email address in the top right and select the “Edit Account” option from the dropdown menu.

You will find your current email address in the main field at the top; edit the field to the new desired address and you will be prompted with your password again to allow changes.

You must then click on the update button to confirm changes to your account. You can only change your account email address to an email that does not already have a Particle account associated with it.
