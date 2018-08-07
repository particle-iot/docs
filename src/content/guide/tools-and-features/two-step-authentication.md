---
word: 2FA
title: Two-Step Authentication
order: 4
columns: two
layout: guide.hbs
---

# Two-step Authentication

Two-step authentication (also known as two-factor, 2FA, multi-factor authentication, or MFA) adds security to your account because it requires two things:

- Something you know (your password)
- Something you have (your mobile phone)

If your password was stolen, it wouldn't be of any use without your phone. And the same if your phone is stolen.

## Setup

### Installing an Authenticator App

Particle two-step authentication uses an [Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator) app on your mobile phone. You can use any compatible Authenticator app, but two we recommend are:

- Google Authenticator (for [iOS](https://itunes.apple.com/us/app/google-authenticator/id388497605) or [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2))
- Authy (for [iOS](https://itunes.apple.com/us/app/authy/id494168017) or [Android](https://play.google.com/store/apps/details?id=com.authy.authy))

You only need to install one of them.


### Enable Two-step authentication on your account

You will be asked if you want to enable two-step authentication when you log in:

![](/assets/images/2fa-enable.png)

If you decline, and decide you want to enable it later, go to [the enrollment page](https://login.particle.io/mfa-enroll).

### Scan the barcode

You only need to scan the barcode once. It associates your Particle account and your phone.

![](/assets/images/2fa-scan.png)

### Save your recovery codes

If you lose your phone or it's damaged, you can use recovery codes. You should save the list of recovery codes in a safe place. Each recovery code can only be used once.

![](/assets/images/2fa-recovery.png)

You will be given the option to either download a file containing recovery codes, print a physical copy of the recovery codes, or copy them to your clipboard during the two-step authentication enrollment.

## Using Two-step Authentication

### From the web

When logging into sites like the [Particle Console](https://console.particle.io) or [Web IDE](https://build.particle.io) after entering your username and password, you'll be prompted for your login code.

![](/assets/images/2fa-enter.png)

Open the Authenticator mobile app you installed earlier. A 6-digit login code is displayed that you enter into this page. Each code is only valid for a short period of time.

### From the mobile apps

Two-step authentication is also supported from the iOS and Android Particle mobile apps.

### From the Particle Command Line Interface (CLI)

The [Particle CLI]() also allows two-step authentication:

```text
$ particle login
? Please enter your email address user@company.com
? Please enter your password [hidden]
Use your authenticator app on your mobile device to get a login code.
Lost access to your phone? Visit https://login.particle.io/account-info
? Please enter a login code 058421
> Successfully completed login!
```

### From the Particle Cloud API

- You can use the [Javascript API](https://github.com/particle-iot/particle-api-js/blob/master/docs/api.md#sendotp) to log in using two-step authentication and manage settings.

## Other Topics


### Lost phone

If you lose or are otherwise unable to use your phone, you will need to use the recovery codes you received when you signed up for two-step authentication.

- After using a recovery code, we recommend disabling two-step authentication if you have permanently lost access to your mobile phone.

- You will _only_ be able to enter a recovery code when using [login.particle.io](https://login.particle.io) (not in any other interface like the CLI or mobile apps).


### Lost recovery codes

- If you lose your recovery codes (but still have your phone) you can find the remaining recovery codes in your [account info page](https://login.particle.io/account-info).

- You will lose access to your account permanently if you lose both your phone and recovery codes. We cannot disable two-step authentication from support for security reasons.

### Shared accounts

If you need to share an account among multiple users, we do not recommend enabling two-step authentication as it would require a shared mobile device, as well.

### Disable two-step authentication

You can disable two-step authentication using the [account info page](https://login.particle.io/account-info).

### Change to a different mobile device

To change the mobile device you use for generating login codes, simply disable two-step authentication from the [account info page](https://login.particle.io/account-info) and then enable it again. You will be able to scan the code on your new device.

It's not possible to authenticate with two different mobile devices for a single account.
