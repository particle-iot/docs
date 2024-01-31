---
title: Doorbell SMS
columns: two
layout: commonTwo.hbs
description: Doorbell SMS
---

# {{title}}

![Doorbell SMS](/assets/images/edge-kit/doorbell.jpeg)

The doorbell detector works by training a model to detect the sound of your doorbell. The Photon 2 runs a classifier to detect this sound and when detected, publishes as Particle event, which triggers a Webhook, which goes to a Twilio service to generate a SMS message. 

The sound processing is done entirely on-device and no ambient audio is uploaded to the Internet and cannot be saved locally. 


## Wiring the microphone

You will need the following hardware, included in the [Edge ML Kit](/reference/datasheets/accessories/edge-ml-kit/)

- PDM digital microphone
- Photon 2 (included with the Edge ML Kit)

{{imageOverlay src="/assets/images/edge-kit/mic-1.jpeg" alt="PDM Microphone" }}

The connections on the breakout are:

| Breakout | Color | Connect To | Details |
| :---: | :--- | :---: | :--- |
| 3V | Red | 3V3 | 3.3V power |
| GND | Black | GND | Ground |
| SEL | | NC | Typically leave unconnected, left/right select |
| CLK | Blue | A0 | PDM Clock |
| DAT | Green | A1 | PDM Data |

{{imageOverlay src="/assets/images/edge-kit/mic-3.jpeg" alt="PDM Microphone Assembled" }}


## Twilio Setup

This method could easily be updated to work with other SMS providers, however you may need to change authentication methods and the keys where the data is stored.

- [Sign up for a trial Twilio account](https://www.twilio.com/try-twilio) if you don't already have an account set up.

- Follow the instructions to [Buy a number](https://www.twilio.com/docs/sms/quickstart/node). Make sure it has SMS enabled!

![Buy Number](/assets/images/edge-kit/buy-number.jpg)

- In the [Twilio Dashboard](https://www.twilio.com/console) (1), note the **Account SID** (2) and **Auth Token** (3). You'll need these to create the webhook.

![Twilio Dashboard](/assets/images/edge-kit/dashboard.png)


### Webhook Setup

- Open the [Particle Console](https://console.particle.io) and select the **Integrations** tab.

- Create a new **Webhook** integration.

![Basic configuration](/assets/images/edge-kit/webhook-1.png)

- Select an **Event Name**. The default configured in the library is **SendSmsEvent** (case-sensitive!) but you can change it and use the `withEventName()` method to reconfigure the library. They must match and follow event naming rules (1 - 64 ASCII characters; only use letters, numbers, underscores, dashes and slashes. Spaces and special characters should not be used). Also note that the event name is a prefix, so any event name beginning with that string will trigger the webhook.

- Enter the **URL**. Make sure you subtitute your Account SID for `$TWILIO_ACCOUNT_SID`! 

```
https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json
```

- **Request Type: POST** is the default and the correct value.

- **Request Format: Web Form** is the default and the correct value.

- **Device: Any** is the default. You could also restrict the webhook to a specific device so only that device could send SMS messages.

- Open the **Advanced Settings**.

![Advanced Settings](/assets/images/edge-kit/webhook-2.png)

- In **Form Fields** select **Custom**.

  - Enter **From** (case-sensitive) and the SMS phone number you want to send from. This must be a Twilio Programmable Messaging phone number, not your actual phone number! Also note that it must be begin with `+` then country code, so it will begin with `+1` in the United States.
  - Enter **To** and `{{{t}}}` (case-sensitive). The triple curly brackets are required. If you are only going to ever send to your own phone, you could enter your phone number here instead of `{{{t}}}` but make sure it begins with a `+`.
  - Enter **Body** and `{{{b}}}` (case-sensitive). 

- **Query Parameters** should remain empty.

- In **HTTP Basic Auth** enter:

  - In **Username** enter your Account SID. Note that your Account SID goes in two places: the URL and the Username!

  - In **Password** enter your account Auth Token.

- In **HTTP Headers** the default **Content-Type** of `application/x-www-form-urlencoded` is correct.

- Save the Webhook.


## Build the software

This tutorial is a complete example, using a pre-trained model from [Edge Impulse](https://www.edgeimpulse.com/).

- Download the [zip file containing the full source](/assets/files/edge-ml/Doorbell_Chimes_inferencing.zip)
- Extract the contents of the zip file
- Open Particle Workbench. From the Command Palette (Ctrl-Shift-P on Windows and Linux, Cmd-Shift-P on Mac).
- If not logged in to your Particle account, **Particle: Login** as this is necessary to install libraries.
- **Particle: Import Project**. Select the `project.properties` file in the zip file you just extracted.
- Use **Particle: Configure Project For Device** and select **deviceOS@5.3.2** and **P2**. The P2 option is also used for the Photon 2. Device OS 5.3.2 or later is required.
- Update src/main.cpp to set the phone number to send to and the message to send.

```cpp
Log.info("Got doorbell chimes, sending SMS!");
lastPublish = millis();
SmsMessage mesg;
mesg.withRecipient("+12125551212")
    .withMessage("Doorbell!");
SmsWebhook::instance().queueSms(mesg);
```

- Connect your Photon 2 to your computer with a USB cable.
- Use **Particle: Clean application (local)** to make sure there are no remnants from a previous build.
- Use **Particle: Cloud compile** or **Particle: Cloud Flash**, **Particle: Flash Application (local)**, **Particle: Compile Application (local)**.

If you are building locally and you get a `region `SRAM' overflowed by 4 bytes` error, using the cloud compiler or Docker compile will solve this occasional problem.


## Building using Docker

Particularly on Windows, you can significantly speed up builds by using Docker. Also, if you get the error `Argument list too long` on Windows, using Docker can work around this issue. For more information, see also [building using a buildpack](/firmware/best-practices/firmware-build-options/#using-buildpack).

- Download and install [Docker Desktop](https://www.docker.com/). 
- Docker Desktop does not automatically start when you log in, but does need to be running to do Docker builds.
- The first time you install it will take longer to download the buildpack, but subsequent builds will reuse it and be much faster.
- From the Command Palette (Ctrl-Shift-P) select **Particle: Launch CLI**.
- You use the `docker run` command to start a new container and run the build in it.

| Command Fragment | Description |
| :--- | :--- |
| `docker run` | Create a run a container |
| `--name=`*name* | Name of the container (optional) |
| `-v `*local_path*`:/input` | Path to the source directory, must be an absolute path |
| `-v `*output_path*`:/output` | Path to the output directory, must be an absolute path |
| `-e PLATFORM_ID=`*numeric_platform_id* | The numeric platform ID you are building for |
| *image_name* | The name of the image file |

For example, if my source directory is `C:\Users\rickk\Desktop\Doorbell_Chimes_inferencing`:

```html
docker run --name=edge-compile -v C:\Users\rickk\Desktop\Doorbell_Chimes_inferencing:/input -v C:\Users\rickk\Desktop\Doorbell_Chimes_inferencing:/output -e PLATFORM_ID=32 particle/buildpack-particle-firmware:5.4.1-p2
```

- The `--name` is optional, however it makes it easier to keep track of your containers
- Note that `-v` takes the local path, which must be an absolute path, and either `:/input` or `:/output`, which can be the same path
- You need to include `PLATFORM_ID` with the numeric platform ID (32 for P2 and Photon 2)
- You can use a different version of Device OS instead of `5.4.1` if desired
- `-p2` is used for both P2 and Photon 2

When the build is complete, you'll find your firmware binary in the output directory as `firmware.bin`.

- You can now delete the container artifacts:

```
docker rm edge-compile
```


## Learn more

- You can find additional projects on the [Edge Impulse ML projects page](https://www.edgeimpulse.com/projects/all?search=particle).
- Learn how to create your own projects in the [Edge Impulse documentation](https://docs.edgeimpulse.com/docs).




