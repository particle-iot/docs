---
word: Hackathon
title: Hackathon
template: guide.hbs
columns: two
devices: [ photon, core ]
order: 10
---


# Hackathoning with Particle

If you're at a hackathon, you'll want to get started with Particle, and fast! Here's some quick tips to get you up and running ASAP.

{{#if photon}}

We'll go over how to set up your Photon, then go into some other tools you should install and features you should be aware of to get the most out of your hackathoning.


## Setup

### Making an Account

The first step, if you don't already have one, is to [make an account](http://build.particle.io/login). If you are the only one working on the firmware for this project, you can make an account with your personal email and a personal password. If you are working on a team and multiple people need to access the device, it may be a good idea to claim the device with a shared team email and password.

### Claiming and Connecting

Once you have your account, it is time to claim your Photon to your account and get started coding. You'll be doing this with your iOS or Android device. Before you get started, examine the packaging that your Photon, Photon Kit, or Internet Button came in. You'll see a barcode like the one below. The barcode has a four-digit code (outlined in blue below) in the third part of the alphanumeric sequence.

![Photon Barcode]({{assets}}/images/photon-barcode.jpg)

In this case, you can see that four-digit code is `GG9J`.

During your smartphone setup, this code will appear after the word `Photon` in your Photon's Wi-Fi network:

![Photon Wi-Fi]({{assets}}/images/photon-wifi-ios.jpg)

In this iOS screenshot, you can see two Photons online. If you see this while you're setting up your PHoton, it just means you need to pick the Photon with your correct barcode (in this case, either `JPXH` or `X929`).

Continue to set up your Photon [with your smartphone](/guide/getting-started/start/photon/#prerequisites-for-setup). Follow the instruction on the Particle app to get your Photon online and claim it to the account you set up earlier.

{{/if}}

{{#if core}}

#### If you're at a conference or a hackathon and using a Core, _DO NOT_ set up your Core using your phone!
It gets very chaotic with everyone's Photons broadcasting networks, or everyone's Cores asking to be claimed at once. We'll show you how to maximize your hackathoning in the sections below.


## Setup

Here are instrutions on setting up some tools that will help you hack around with Particle in the limited time you have.

### Installing the CLI

First, get the [Particle CLI](/guide/tools-and-features/cli). Unless someone has already set it up for you, you're going to need it to connect your device.

If you already have node.js, you can download the CLI by opening a terminal window and typing:


`npm install -g particle-cli`


Otherwise, follow the instructions on how to [connect over USB](/guide/getting-started/connect/photon/) **BUT BEFORE YOU DO THAT** please read on!


### Claiming your Device

**If your devices have been pre-connected...**

If someone from Particle came to your workshop or hackathon, there's a chance they already pre-programmed all your devices to connect to the local wifi. In that case, someone has probably written your device ID in or on the box for your Core or Photon. If this has happened, go to [this step](/guide/getting-started/hackathon/#particle-dev) to download Particle Dev and claim the core to your account.


**If devices have not been pre-connected...**

When the CLI prompts you to log in or sign up, make sure you choose your login carefully. If you're working on a team, the team will need to have access to this account, so it would help if you made a password you could share with them. You can always change the password and access token later at [build.particle.io](http://build.particle.io) if you want the account to be yours only later.

Now that you've read that, go ahead and [connect over USB](/guide/getting-started/connect). When that's all done, you can go on to the next section.

{{/if}}

### Particle Dev

Although the [online IDE](http://build.particle.io) will allow you to flash code to your devices, we also suggest getting [Particle Dev](/guide/tools-and-features/dev), the local IDE, for hackathons. It has a nice interface for monitoring Spark.variables and running Spark.functions without the CLI, which means you can develop faster.

Download Particle Dev [here](https://www.particle.io/dev).

Particle Dev has a lot of wonderful features. Namely, you can monitor cloud variables, cloud functions, and serial output from your devices via the Devices part of the menu bar. More on that in the [next section](/guide/getting-started/hackathon/#now-do-stuff-).

{{#if core}}
**My device was pre-connected. Can I claim it now?**

If someone gave you your device ID and pre-connected your device to the local WiFi, now is a good time to claim your device.

Go to the Particle menu in the Particle Dev environment and select `Claim device...`

Enter your device ID and press enter. The device should claim to your account.

If this does not work, double-check your entry to make sure that it is correct.

If you're 100% sure you did it right but it's still not working, send us an email at hello@particle.io and go ahead and try it with the [CLI tools](/guide/getting-started/connect).
{{/if}}

### GitHub

If you plan to share code and develop with other team members, we recommend that you get a [GitHub account](http://github.com). It's great for code sharing and will help you take advantage of your dev time.

Here's a [basic guide on how to git](http://rogerdudler.github.io/git-guide/) for complete newcomers.

You can develop code, test it on your device, and push it to your repo. You and other team members can work on different features of your project on separate branches, develop and test separately, and merge features back into the master branch when they are finished.

**Particle Dev does not play well with folder hierarchies.** If you are including libraries in your repo, keep them in the same folder as the `.ino` file you plan to compile!

### Mobile

Building a mobile app to hook up with a Particle device? Check out our guide on [building mobile apps](/guide/how-to-build-a-product/mobile-app).

You can also read the reference for [iOS](/reference/ios) and [Android](/reference/android) SDKs, and check out the [mobile section of the community](http://community.particle.io/c/mobile) to ask for help and give feedback!

### Connecting to Other Services

If you want to hook up different platforms quickly and without much code, try using [our IFTTT integration](/guide/tools-and-features/ifttt/). It's a simple way to connect your Particle device to email, text message, phone location, Twitter, Facebook, and more.

If you're looking to hit an API not listed in IFTTT and you have a little more experience with coding, try [webhooks](/guide/tools-and-features/webhooks) instead.


## Now Do Stuff!

### View Functions
Open up Particle Dev and go to the Particle menu. Select your device with `Select device`. Then select `Show cloud functions`.

A menu will appear on the lower half of the screen. It should have four functions: digitalwrite, digitalread, analogwrite, and analogread. These are the Tinker functions that are defaulted to your device before you flash your own code. Check out the [Tinker docs](/guide/getting-started/tinker) for more info. You should be able to send commands to your device by identifying the pin and, for `write` functions, any necessary info. For example:

- `D7,HIGH` for digitalwrite
- `D7` for digitalread
- `A0,100` for analogwrite
- `A0` for analogread

Try it out!

### View Variables

In addition to the `Show cloud function` ability, there are other elements of Particle Dev that you may find helpful:

If you go to the Particle menu you will also see `Show cloud variables`. This will allow you to see any variables you register with [Spark.variable](/reference/firmware/#spark-variable-).

You can also monitor any [serial output](/reference/firmware/#serial) with the `Show serial monitor` command. Make sure the proper device is selected through `Particle` > `Select device` when you do this.

### Flash Your Own Code

Although Tinker can be really useful in early stages, we're sure you'll want to put your real code on your device at some point.

For maximum sharability, make a [repo on github](https://help.github.com/articles/create-a-repo/) for your shared code. Hook up to this repo by using `git clone` on the clone URL. Open Particle Dev and navigate to the repo you just cloned. Make sure you have a single folder that will hold all of your .ino files and libraries-- the current version of Particle Dev gets confused when libraries are placed in subdirectories.

Note that now that you are in a GitHub repo, you can use some of the functions in Particle Dev that play nicely with git. Access these in the `Packages` menu:

![Particle Dev Github Packages]({{assets}}/images/dev-packages-github.png)

Now you can compile and flash your first `.ino` file from Particle Dev. You are welcome to take any of [these examples](/guide/getting-started/examples/) as a first try and flash it to your device by clicking the lightning bolt in the upper right corner. The examples explain how Variable, Function, Publish, and Subscribe are used, but documentation on coding these cloud-exposed elements is available [here](/reference/firmware/#cloud-functions). Check out [Tips and Tricks](/guide/getting-started/hackathon/#tips-and-tricks) for some of the subtleties of coding these functions.


### Pass Strings

In the [quintessential example](/reference/firmware/#spark-function-) for Spark Function, we are calling a brewCoffee function with the argument "coffee". This is nice if we have an array of choices we want to identify with strings, but what if we want to pass `int` data to our `Spark.function`?

If you want to use `int` data from a `String`, you can create a `char` array to hold the `String` command, then use `atoi` to change this into an `int` value. Check out this example for setting the brightness of an LED.

```
void setup() {
    Spark.function("brightness", setBrightness);
}

int setBrightness(String command) {
    if (command) {
        char inputStr[64];
        command.toCharArray(inputStr,64);
        int value = atoi(inputStr);
        analogWrite(led,value);
        return value;
    }
    else {
        return 0;
    }
}
```

Sometimes you want to send multiple values through a `Spark.function`. If you want to do that, use `strtok`. Here's an example of a `Spark.function` you could use to set the color of an RGB LED.


```
void setup() {
    Spark.function("color", setColor);
}

int setColor(String command) {
    if (command) {
        char inputStr[64];
        command.toCharArray(inputStr,64);
        char *p = strtok(inputStr,",");
        int red = atoi(p);
        p = strtok(NULL,",");
        int grn = atoi(p);
        p = strtok(NULL,",");
        int blu = atoi(p);
        p = strtok(NULL,",");
        b.allLedsOn(red,grn,blu);
        return 1;
    }
    else {
        return 0;
    }
}
```

### Add Libraries

If you want to add a library, you can search in the Libraries tab of [Particle Build](http://build.particle.io). To include this in a dev app, download a fork of the library to be included in your app. You can get to the repo by clicking the GitHub icon next to the library's name:

![Libraries in Build]({{assets}}/images/build-library-github.png)

Note that some libraries may not yet be updated for the Photon.


### Other Resources

Happy hacking! If you get stuck, try out:

- [These docs](http://docs.particle.io), specifically the ones referring to the kit you have ([standard examples](/guide/getting-started/examples) or [Internet Button docs](/guide/getting-started/button))
- [The Particle Community](http://community.particle.io)
- [The Particle Support Page](http://support.particle.io)

Best of luck!
