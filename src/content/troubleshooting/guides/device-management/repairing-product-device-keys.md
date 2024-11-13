---
title: Repairing product device keys
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

## Keys background

Each Particle devices has two pairs of keys that are used to do authentication with the cloud. They use RSA public key cryptography, which requires a matched set of public and private keys. These not only are used to establish an encrypted session, they also assure that the other side is who they say it is.

In the case of the Particle cloud connection, once side is the device and the other side are the cloud servers. The device has a private key, which never leaves the device. It's not saved anywhere during manufacturing, either. The cloud does have its matching public key, however. The reverse is true as well: the cloud has its own private key, which is kept a secret, and every device has a copy of its public key.

About RSA key pairs: Having the public key by itself does you no good, because there's no way to get back the private key. If you encode something with the private key, it can only be decoded with the public key. And if you encode something with the public key, it can only be decoded with the private key.

The first phase of the handshake is encoded with the device private key and the cloud public key. It can only be decoded by the cloud because it has access to both the device public key and the cloud private key.

A rogue cloud server impersonating the cloud wouldn't have the necessary keys. Likewise a rogue device impersonating your device wouldn't have your private key, which is why this is secure.

## "Bad" keys

There are two different scenarios what can cause a device authentication failure:

An incorrect server public key will cause authentication to fail. This is corrected by \`particle keys server\`. It should also fix itself with Device OS 0.7.0 or later, in some cases.

The other scenario is "bad" device private keys. In reality, they are just fine. If the keys are corrupted or otherwise not valid, a new set of keys is automatically generated on the device. However, when a new device private key is generated its public key changes as well. This means the copy of the device public key in the cloud no longer matches and authentication fails.

When you repair the keys, you can either generate an entirely new pair of keys and update the cloud. Or you can just upload the current public key to the cloud, so the keys are in a matching pair again.

Another option is to use the technique in [DeviceKeyHelperRK](https://github.com/rickkas7/DeviceKeyHelperRK) to save a copy of the key pair in a different location so the original can be restored, instead of re-generating new keys, if erased. This allows the existing device private key stored in the cloud to continue to work.

#### Why doesn't the cloud just accept a new key?

That would allow any device to impersonate an existing device by claiming it has regenerated its keys and requires a keys update. That wouldn't be secure.

#### Why can't the device upload a new key itself?

In order to update the public keys in the cloud using the CLI, it does so by having you log into your account, and encrypting the data using TLS/SSL. Devices have neither your account login token, nor direct support for TLS/SSL, so they can't do this themselves.

Devices don't have your login token by design, so you can't steal it off a device and log into the account, even if you have physical access to the device.

#### How do keys go bad?

The most common reason is an issue on Gen 2 devices where some flash sectors can get erased. This can happen in some uncommon brownout or intermittent power situations. When this happens to a configuration sector, the keys will be regenerated, but are then out of sync. (When it happens to the bootloader sector, you get a dim blue D7 LED at boot and no working status LED or buttons.)

On Gen 3 devices, if the SPI flash or Little FS file system becomes corrupted or reformatted, the device keys can be lost and then regenerated (but out of sync with the cloud).

## Repairing keys

### Repair - development devices

```
particle keys server  
particle keys doctor
```

The most common way to repair the keys is using these two CLI commands. The caveat is that the CLI must be logged into the account that the device is claimed to. This is the normal situation for development devices, as they're typically your device, and you are logged into your own account.

### Repair - product devices claimed to a single account

This technique is used for the common case of product devices claimed to a single account, typically the product owner account.

On the customer's computer, they'll need to be logged in with any account. They could create a new account for this.

#### On customer's computer  

```
particle keys save device.der
```

This creates two files, device.der and device.pub.pem. The device.pub.pem could be emailed to you, the product owner or team member.

Then the product owner or team member sends the key to the cloud, since they have an access token that allows the upload.

#### On product owner or team member's computer  

```
particle keys send --product_id 1234 1d0034000fffffffffff3933 device.pub.pem
```

- Replace 1234 with your product ID  
- Replace 1d0034000fffffffffff3933 with the device ID

Note: A team member must have Developer or Administrator privileges to upload keys (does not work for View-only or Support).

### Repair - unclaimed devices

The steps for an unclaimed product device are the same as for devices claimed to a single account. The product owner or team member should be able to update the keys for unclaimed product devices using this technique.

### Repair - two-legged customer devices

Two-legged customer product devices are much trickier. You cannot just update the keys as the product owner or team member. You must unclaim the device, send keys, create a customer impersonation token, claim the device back to the customer.

On the customer's computer, they'll need to be logged in with any account. They could create a new account for this.

#### On customer's computer  

```
particle keys save device.der
```

This creates two files, device.der and device.pub.pem. The device.pub.pem could be emailed to you, the product owner or team member.

Team member or product owner unclaims the device from the console. Also remember the device ID and two-legged customer account email, you'll need them again later.

#### On product owner or team member's computer  

```
particle keys send --product_id 1234 1d0034000fffffffffff3933 device.pub.pem
```

- Replace 1234 with your product ID  
- Replace 1d0034000fffffffffff3933 with the device ID

You'll need a product oAuth token, two-legged (server) type. Presumably you already have at least one of these if you have customer accounts.

```
curl -X POST https://api.particle.io/oauth/token -u "test2-1236:b316a0cef80ba7ffffffffffffffff1ab910e1f" -d grant_type=client_credentials -d scope=customer=customer5@mycompany.com
```

* Replace test2-1236 with the OAuth client ID (two-legged server type)  
* Replace b316a0cef80ba7ffffffffffffffff1ab910e1f with the oAuth client secret  
* Replace customer5@mycompany.com with the customer email.   
* Note the weird scope=customer= syntax, that really is correct.

This will return an access\_token for the customer. Let's say it was f8a4d380cb6ffffffffffffffffffaf5e496ddf0c0.

The device should be able to come online now that the keys have been updated. Now claim the device. 

```
curl https://api.particle.io/v1/devices -d id=1d0034000fffffffffff3933 -H "Authorization: Bearer f8a4d380cb6ffffffffffffffffffaf5e496ddf0c0"
```

- Replace 1d0034000fffffffffff3933 with the device ID  
- Replace f8a4d380cb6ffffffffffffffffffaf5e496ddf0c0 with the customer impersonation token. This associates the claiming with both a customer account and a product.
