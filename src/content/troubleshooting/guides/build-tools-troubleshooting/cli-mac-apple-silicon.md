---
title: Particle CLI and Mac with Apple silicon
columns: two
layout: commonTwo.hbs
description: Particle CLI and Mac with Apple silicon
---

# {{title}}

There are potentially a few issues with using the Particle CLI on a computer with Apple silicon (M1, M2, M3, ...) that are especially pronounced if you have imported your settings and applications from an Intel-based Mac.

## Working scenarios

### New computer

If you have a new computer, did not import settings or data, and do a fresh install of Particle Workbench, it should install the Particle CLI and it should be usable out of the box.

### Rosetta Terminal

It is possible to use the Particle CLI imported from an Intel Mac as-is by using a [Rosetta Terminal](https://community.particle.io/t/apple-m1-support/59403/3).

## The problem

There are potentially two or more copies of the Particle CLI present on your computer:

- Workbench installs one in the .particle directory in your home directory. It also installs a copy of node.js (currently 16.20.0) which is used to run the CLI. This is independent of any version of node.js that you may have installed. This is important because the Particle CLI does not work on node 18 and later at this time.

- If you have installed the Particle CLI using the Mac installer script, it should have installed it in the same location.

- If you have installed the Particle CLI using `npm install -g particle-cli` it will install in the current version of node on your computer.

- Homebrew adds an additional level of complexity, which you also need to take into account, but it's still worthwhile to have installed.

When you upgrade your computer from Intel to Apple silicon, you get a horrible mix of Intel and Apple silicon binaries that causes all sorts of difficulties.


## Running a native Particle CLI

It is possible to use the Particle CLI natively with Apple silicon binaries, not using a Rosetta terminal, despite what the installer says. In doing so, however, if you are using Homebrew and/or node.js you will essentially need to break your entire installation and start over with all programs running natively as Apple silicon binaries. Whether you want to do this now is up to you, but long-term it's the best solution.

If you decide to perform this process, make sure you have a backup and set aside plenty of time to get everything working again.

### Homebrew

Uninstall your old copy of Homebrew. This is necessary! The list of directories at the end may vary depending on your install, but if the uninstall script recommends that you remove the directory, be sure to do so.

```
% /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
% rm -rf /opt/homebrew/etc/
% rm -rf /opt/homebrew/share/
% rm -rf /opt/homebrew/var/
```

Install homebrew again to install for Apple silicon. Make sure you never attempt to install homebrew with sudo as it will cause terrible issues later.

```
% /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

You may need to run the steps to update PATH. Quit and reopen Terminal after.

```
echo "eval $(/opt/homebrew/bin/brew shellenv)" >> ~/.zprofile
eval $(/opt/homebrew/bin/brew shellenv)
```

Run `brew doctor` and follow any cleanup instructions. It will likely require that you remove some binaries, possibly with sudo.


### Ruby

You will likely need a fresh install of ruby for certain dependencies. These steps are from [the fastest and easiest way to install Ruby on a Mac in 2023](https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/). The Particle CLI doesn't depend on ruby, but it's worth getting this fixed now.


```
% brew install chruby ruby-install
% ruby-install ruby
```

If you fail to do this, sooner or later you'll probably run into this message:

```
==> Pouring portable-ruby-2.6.10_1.el_capitan.bottle.tar.gz
Error: Failed to install ruby 2.6.10_1!
Error: Failed to upgrade Homebrew Portable Ruby!
```

### node.js

You also must uninstall your old version of node which has Intel binaries if you upgraded and imported from your old Intel Mac.

```
% brew uninstall --ignore-dependencies node 
% brew uninstall --force node 
% which node
```

Because the Particle CLI will be run in your native node.js using this technique, you will want a utility that allows switching of the node version easily. One such utility is nvm, which is used here, but if you prefer a different tool you can use that instead.

Install nvm:

```
% brew install nvm
```

Be sure to follow any instructions from the installer for adding setup to .zshrc and delete any old settings.

If you previously had nvm installed, delete any old versions that you have installed. Your versions will be different; just uninstall anything that `nvm list` returns.

```
% nvm list
% nvm uninstall 6.14.3 
% nvm uninstall 8.11.2 
% nvm uninstall 10.15.3 
% nvm uninstall 16.18.1
```

Install a fresh node 16 (currently v16.20.2). You must install node 16 for use with the Particle CLI! You cannot use 18 or later, but with nvm you can switch between versions easily.

```
% nvm install 16
% nvm alias default 16
% node --version
```

If you've added the nvm setup to .zshrc, you may also want to add it to .bashrc. The reason is that Workbench **Particle: Launch CLI** always launches bash even if your default terminal is zsh, and if you don't initialize nvm, things don't work quite right.

```
# NVM
export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```


### Particle CLI

You cannot use the Particle installer to install the Particle CLI natively for Apple silicon. You'll get a message like:


```
% bash <( curl -sL https://particle.io/install-cli )

PARTICLE CLI SETUP...

Apple M1 processor detected!
Particle CLI must be run under Rosetta
To enable Rosetta, see:
https://community.particle.io/t/apple-m1-support/59403/3
```

If you've followed the steps above to freshly install homebrew and node 16, you should be able to install it using:

```
npm install -g particle-cli
```

This installs it in the nvm-specific location, so if you switch node versions you'll need to install it again.

```
% which particle 
/Users/rickk/.nvm/versions/node/v16.20.2/bin/particle
```


### Particle Workbench

If you imported the install of Particle Workbench will need to reinstall to get native Apple silicon binaries. 

First, move the old .particle directory in your home directory out of the way temporarily. You can delete it later.

```
% cd ~
% mv .particle .particle-old
```

Then reinstall Workbench; instructions can be found in the [Workbench quickstart](/quickstart/workbench/). You will need to log in again using **Particle: Login**.

Note that local compiles will still require Rosetta because the gcc-arm compilers and other tools are only installed as Intel binaries. If you are prompted to install Rosetta you should do so to use local compile.


