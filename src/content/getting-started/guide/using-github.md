---
title: Using Github
columns: two
layout: commonTwo.hbs
description: Using Github for Particle development
guide-custom-images: default
---

# {{title}}

{{section-nav}}

Github is a place to store code. It can be used for private projects, sharing code privately between team members, and open source projects. It's the primary way Particle open source code is distributed, and is well-integrated with VSCode, making it ideal for use in Particle Workbench.

It maintains a historical record of changes you have made to your code, and provides a secure, off-computer backup. 

It is also free for many individual users, with generous limits on how much code you can store.

{{content-nav}}

## Creating an account

If you do not already have an account, you can create one at [https://github.com/](https://github.com/). It only requires a valid email address to sign up.

## Github code storage and sharing

Github is ideal for storing your code and sharing, and there are too many features to list here. A few terms you will encounter:

- **clone** is what you do to make a copy of a repository on your computer so you can build it
- **fork** makes a copy of a repository in your own repository so you can make modifications without affecting the original
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

Each of these designs includes instructions and firmware in a Github repository that you can clone or fork, allowing you to customize it for your own use.

## Github in Workbench

{{!-- BEGIN shared-blurb 689a692c-8568-4383-9d3f-eb340e12c0dc --}}
The Github extension in Workbench makes it easy to use Github. It is typically automatically installed and ready to use.

Open the command palette (Ctrl + Shift + P or Command + Shift + P). Start typing "git" to see a list of commands available.

{{imageOverlay src="/assets/images/getting-started-guide/git-01.png" class="no-darken"}}

If you want to make a clone of a repository you can use **Git: Clone (Recursive)**. You can use the non-recursive option as well for most repositories, but some like tracker-edge and device-os require it, and it doesn't hurt to use it all of the time. Recursive also clones submodules, which you could also do using `git submodule init recursive` from the command line, but the built-in version is usually easier.

{{imageOverlay src="/assets/images/getting-started-guide/git-02.png" class="no-darken"}}

If you haven't signed in yet, sigh in with your Github credentials.

{{imageOverlay src="/assets/images/getting-started-guide/git-03.png" class="no-darken"}}
{{imageOverlay src="/assets/images/getting-started-guide/git-04.png" class="no-darken"}}

{{!-- END shared-blurb --}}

You will be prompted for where to clone from, select **Clone from Github**.

{{imageOverlay src="/assets/images/getting-started-guide/git-12.png" class="no-darken"}}

Enter the repository, such as **particle-iot/tracker-edge**.

{{imageOverlay src="/assets/images/getting-started-guide/git-05.png" class="no-darken"}}

When the clone is complete you are prompted for where to open it. You should only select **Open** (replaces current window) or **Open in New Window**. Using the Add to Workspace option will create a multi-root workspace, with multiple projects, which does not work well with the Particle extension.

{{imageOverlay src="/assets/images/getting-started-guide/git-06.png" class="no-darken"}}


## CI/CD - Github actions

There is good support for continuous integration and continuous deployment (CI/CD) of fleet firmware using [Github actions](/firmware/best-practices/github-actions/). 

{{section-nav}}

