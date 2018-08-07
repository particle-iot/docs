---
word: 2FA
title: Two-Factor Authentication
order: 4
columns: two
layout: guide.hbs
---

# Two-Factor Authentication

Two-factor authentication (also known as 2FA, multi-factor authentication, or MFA) adds security to your account because it requires two things:

- Something you know (your password)
- Something you have (your mobile phone)

If your password was stolen, it wouldn't be of any use without your phone. And the same if your phone is stolen.

## Setup

### Installing an Authenticator App

Particle two-factor authentication uses an [Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator) app on your mobile phone. You can use any compatible Authenticator app, but two we recommend include:

- Google Authenticator (for [iOS](https://itunes.apple.com/us/app/google-authenticator/id388497605) or [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2))
- Authy (for [iOS](https://itunes.apple.com/us/app/authy/id494168017) or [Android](https://play.google.com/store/apps/details?id=com.authy.authy))

You only need to install one of them.


### Enable two-factor authentication on your account

**TODO: How do you manually invoke this screen?**

![](/assets/images/2fa-enable.png)

### Scan the barcode

You only need to scan the barcode once. It associates your Particle account and your phone.

![](/assets/images/2fa-scan.png)

### Save your recovery codes

If you lose your phone or it's damaged, you can use recovery codes. You should save the list of recovery codes in a safe place. Each recovery code can only be used once.

![](/assets/images/2fa-recovery.png)

**TODO: More info on using recovery codes**

## Using Two-Factor Authentication

### From the web

When logging into sites like the [Particle Console](https://console.particle.io) or [Particle Build](https://build.particle.io) after entering your username and password, you'll be prompted for your Authenticator code.

![](/assets/images/2fa-enter.png)

Open the Authenticator app you installed earlier and a 6-digit authenticator code is displayed. Enter that code here. Each code is only valid for a short period of time.

### From the mobile apps

**TODO: This section**

### From the Particle Command Line Interface (CLI)

The [Particle CLI]() also allows two-factor authentication:

```text
$ particle login
? Please enter your email address user@company.com
? Please enter your password [hidden]
Use your authenticator app on your mobile device to get a login code.
Lost access to your phone? Visit https://login.particle.io/account-info
? Please enter a login code 058421
> Successfully completed login!
```

## Other Topics


### Lost Phone

If you lose or are otherwise unable to use your phone, you will need to use the recovery codes you received when you signed up for two-factor authentication.

**TODO: Where do you enter these?**

### Change Authenticator Device

**TODO: How do you do this?**

### Lost Recovery Codes

**TODO: How do you do this?**

### Generate New Recovery Codes

**TODO: How do you do this?**

### Shared Accounts

If you need to share an account among multiple users, we do not recommend enabling two-factor authentication as it would require a shared mobile device, as well.

### Disable Two-Factor Authentication

To disable two-factor authentication **TODO: how do you do this?**


