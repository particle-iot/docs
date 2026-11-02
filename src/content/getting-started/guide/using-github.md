---
title: Using Github
columns: two
layout: commonTwo.hbs
description: Using Github for Particle development
---

# {{title}}

{{section-nav}}

Github is a place to store code. It can be used for private projects, sharing code privately between team members, and open source programs. It's the primary way Particle open source code is distributed, and is well-integrated with VSCode, making it ideal for use in Particle Workbench.

It maintains a historical record of changes you have made to your code, and provides a secure, off-computer backup. 

It is also free for many individual users, with generous limits on how much code you can store.

{{content-nav}}

## Creating an account

If you do not already have an account, you can create one at [https://github.com/](https://github.com/). It's only requires a valid email address to sign up.

## Github code storage and sharing

Github is ideal for storing your code and sharing, and there are too many features to list here. A few terms you will encounter:

- **clone** is what you do to make a copy of a repository on your computer so you can build it
- **fork** makes a copy of repository in your own repository so you can make modifications without affecting the original
- **pull** merges changes made in the original into your local version
- **push** copies your local modifications to the server for safe keeping

## For libraries

The community libraries available using **Particle: Install library** are often stored in Github.

Many libraries are published with Apache 2.0, BSD, or MIT open source licenses which not only allow you to use them in closed source firmware, but also make modifications, if desired. 

This is particularly useful with Github, because the concept of a **fork** allows you to make a copy of a library, make changes, and later merge updates from the original library. In some cases, you may want to contribute changes back to the original library.

You can find more information about libraries in [firmware libraries](/getting-started/device-os/firmware-libraries/).

## For blueprints

Particle has a collection of reference firmware for various purposes at [blueprints.particle.io](https://blueprints.particle.io/).

{{imageOverlay src="/assets/images/getting-started-guide/blueprints.png" class="no-darken"}}

Each of these designs includes instructions and firmware in a Github repository that you can clone or fork, allowing you to customize if for your own use.


{{section-nav}}

