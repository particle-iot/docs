---
title: Classroom setup
columns: two
layout: commonTwo.hbs
description: Classroom setup
---

# {{title}}

This page contains general guidelines for using Particle devices in a classroom environment.

## General guidelines

### Use a product

In most cases, we recommend using a product for your class. This provides a way to manage the devices.

- Add each user or team in the class to the product.
- Mark all devices added to the product as development devices.

#### One Particle device per person

If you have one Particle device per person:

- Each participant should create their own Particle login.
- The device should be claimed to their Particle account.
- The instructor should add them to the class product.

#### One Particle device per team

If you have a small team working together with a single device:

- Each team should create their own Particle login that will be shared by the team members.
- The device should be claimed to the team member Particle account.
- The instructor should add the team email to the class product.
- Even if the team account email is the email address of one of the participants, the Particle password is separate from their email password so it can be shared. Be sure to not enable multi-factor authentication on shared accounts.


#### Exception to using a product

If you have more than 100 student accounts per instructor, you will not be able to use a product. 

If you do not use a product and reuse the devices for use by a new class, it is very important that every student unclaim their device! If they fail to do this and the device is not part of a product it is difficult to disassociate the device from the former student's account.

### Device setup

Each user or team should use [setup.particle.io](https://setup.particle.io/) to set up their devices, for both Wi-Fi and cellular devices. 

When prompted, the users or teams should add their device to an existing product that is shared by the entire class. The instruction will provide this product ID (typically a 5-digit or 6-digit number).

If the device is a Wi-Fi device and the user or team member needs to set up multiple Wi-Fi networks, such as a home network, or a mobile hotspot, use the [Configure Wi-Fi tool](https://docs.particle.io/tools/developer-tools/configure-wi-fi/).


#### Wi-Fi limitations

- Only the Photon 1 and P1 support Enterprise Wi-Fi or EduRoam at this time, and only when using the Particle CLI. Other devices cannot connect to Enterprise Wi-Fi.
- No Particle Wi-Fi devices can connect to a Wi-Fi network with a captive portal where you need to agree to terms of service before accessing the Internet.

### Development environment

We strongly recommend using Particle Workbench based on Visual Studio Code as the development environment. The syntax highlighting and live detection of errors can greatly simplify C++ development for beginners, and many more features for advanced users.

Using [Visual Studio Code Live Share](https://code.visualstudio.com/learn/collaboration/live-share) is ideal for teams, and also for instructors and tutors to view and edit the code with the students.

On managed PCs where it's not possible to install VS Code, it is possible to use the Particle Web IDE, but not recommended.


### At the end of the class

If the students keep their Particle device, the instructor should remove the devices from the product. If they've created their Particle account with their school email they may want to unclaim the device as well and later create a new account with a personal address. This will also make it easier to give the device away later once they no longer have their school email.

If the devices are reused, the students should unclaim the devices. If they forget, the instruction can also unclaim the device from the product page in the Particle console. This is one of the reasons we recommend using a product. If the devices will be reused in the same product for the next class, there's no need to remove the device from the product.

When the new student uses setup.particle.io, Device OS and the user firmware will be set back the default.
