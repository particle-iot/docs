---
title: Hackathon
template: docs.hbs
columns: two
---

Hackathoning with Particle
====

If you're at a hackathon, you'll want to get started with Particle, and fast! Here's some quick tips to get you up and running ASAP.

####If you're at a conference or a hackathon, _DO NOT_ set up your Particle device using your phone!
It gets very chaotic with everyone's Photons broadcasting networks, or everyone's Cores asking to be claimed at once. We'll show you how to maximize your hackathoning in the sections below.


Setup
====

Here are instrutions on setting up some tools that will help you hack around with Particle in the limited time you have.

### Installing the CLI

First, get the [Particle CLI](../cli). Unless someone has already set it up for you, you're going to need it to connect your device.

If you already have node.js, you can download the CLI by opening a terminal window and typing:


`npm install -g particle-cli`


Otherwise, follow the instructions on how to [connect over USB](../connect/#connecting-your-device-connect-over-usb) **BUT BEFORE YOU DO THAT** please read on!


### Claiming your Device

**If your devices have been pre-connected...**

If someone from Particle came to your workshop or hackathon, there's a chance they already pre-programmed all your devices to connect to the local wifi. In that case, someone has probably written your device ID in or on the box for your Core or Photon. If this has happened, go to [this step](../hackathon/#setup-particle-dev) to download Particle Dev and claim the core to your account.


**If devices have not been pre-connected...**

When the CLI prompts you to log in or sign up, make sure you choose your login carefully. If you're working on a team, the team will need to have access to this account, so it would help if you made a password you could share with them. You can always change the password and access token later at [build.particle.io](http://build.particle.io) if you want the account to be yours only later.

Now that you've read that, go ahead and [connect over USB](../connect/#connecting-your-device-connect-over-usb). When that's all done, you can go on to the next section.


### Particle Dev

Although the [online IDE](http://build.particle.io) will allow you to flash code to your devices, we also suggest getting Particle Dev, the local IDE, for hackathons. It has a nice interface for monitoring Spark.variables and running Spark.functions without the CLI, which means you can develop faster.

Download Particle Dev [here](https://www.particle.io/dev).

Particle Dev has a lot of wonderful features. Namely, you can monitor cloud variables, cloud functions, and serial output from your devices via the Devices part of the menu bar. More on that in the [next section](../hackathon/#now-do-stuff).

**My device was pre-connected. Can I claim it now?**

If someone gave you your device ID and pre-connected your device to the local WiFi, now is a good time to claim your device.

Go to the Particle menu in the Particle Dev environment and select `Claim device...`

Enter your device ID and press enter. The device should claim to your account.

If this does not work, double-check your entry to make sure that it is correct.

If you're 100% sure you did it right but it's still not working, send us an email at hello@particle.io and go ahead and try it with the [CLI tools](../connect/#connecting-your-device-connect-over-usb).


### Github

If you don't have one already, get a [github account](http://github.com). It's great for code sharing and will help you maximize your dev time.

Here's a [basic guide on how to git](http://rogerdudler.github.io/git-guide/) for complete newcomers.


### Mobile

Building a mobile app to hook up with a Particle device? Check out our [Mobile SDK](../mobile/).

It's still in beta right now, so hop on the [mobile section of the community](http://community.particle.io/c/mobile) for to ask for help and give feedback!



Now Do Stuff!
===

### Tinkering Around
Open up Particle Dev and go to the Particle menu. Select your device with `Select device`. Then select `Show cloud functions`.

A menu will appear on the lower half of the screen. It should have four functions: digitalwrite, digitalread, analogwrite, and analogread. These are the Tinker functions that are defaulted to your device before you flash your own code. Check out the [Tinker docs](../tinker) for more info. You should be able to send commands to your device by identifying the pin and, for write functions, any necessary info. For example:

- `D7,HIGH` for digitalwrite
- `D7` for digitalread
- `A0,100` for analogwrite
- `A0` for analogread

Try it out!

### Other Awesome Particle Dev Functions

In addition to the `Show cloud function` ability, there are other elements of Particle Dev that you may find helpful:

If you go to the Particle menu you will also see `Show cloud variables`. This will allow you to see any variables you register with [Spark.variable](../firmware/#spark-variable).

You can also monitor any [serial output](../firmware/#communication-serial) with the `Show serial monitor` command. Make sure the proper device is selected through `Particle` > `Select device` when you do this.


### Flashing Your Own Code

Although Tinker can be really useful in early stages, I'm sure you'll want to put your real code on your device at some point.

For maximum sharability, make a [repo on github](https://help.github.com/articles/create-a-repo/) for your shared code. Hook up to this repo by using `git clone` on the clone URL. Open Particle Dev and navigate to the repo you just cloned. Make sure you have a single folder that will hold all of your .ino files and libraries-- the current version of Particle Dev gets confused when libraries are placed in subdirectories.

_Note that now that you are in a github repo, you can use some of the functions in Particle Dev's `Packages` menu, which play nicely with git._

Now you can compile and flash your first `.ino` file from Particle Dev. You are welcome to take any of [these examples](../examples/) as a first try and flash it to your device by clicking the lightning bolt in the upper right corner. The examples explain how Variable, Function, Publish, and Subscribe are used, but documentation on coding these cloud-exposed elements is available [here](../firmware/#cloud-functions). Check out [Tips and Tricks](../hackathon/#tips-and-tricks) for some of the subtleties of coding these functions.


Tips and Tricks
====

### Strings in Spark.Function

In the [quintessential example](../firmware/#spark-function) for Spark Function, we are calling a brewCoffee function with the argument "coffee". This is nice if we have an array of choices we want to identify with strings, but what if we want to pass `int` data to our `Spark.function`?

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


### Other Resources

Happy hacking! If you get stuck, try out:

- [These docs](http://docs.particle.io)
- [The Particle Community](http://community.particle.io)
- [The Particle Support Page](http://support.particle.io)

Best of luck!
