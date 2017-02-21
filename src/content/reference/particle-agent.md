---
word: Agent
title: Particle Agent (Raspberry Pi)
template: reference.hbs
columns: three
order: 9
---

# Particle Agent

![Agent architecture](/assets/images/particle-agent-architecture.png)

The Particle Agent is the program that runs the Particle firmware
executable running on Raspberry Pi.

It has 3 executables, `particle-agent`, `particle-agent-service` and
the firmware.

The firmware is your user program compiled as a Linux executable. It
connects to the Particle cloud and interacts with the hardware pins.

The Agent runs a background service (daemon) that runs your firmware as
a separate process. When the firmware exits or crashes, the Agent
service runs the firmware again. The service starts at boot so after you
run `setup` your firmware will start when the Raspberry Pi boots.

The Agent is flexible enough to support running multiple firmware in the
future, but for now supports only 1 firmware.

To start and stop the firmware you use the `particle-agent` command.
[All commands are documented below.](#agent-commands)

For more details on the implementation of the Particle Agent, see the
GitHub repository at <https://github.com/spark/particle-agent>.


## Install

The Particle Agent is distributed as a Debian software package called
`particle-agent`. It's made to run on Raspbian, the Linux distribution
customized for the Raspberry Pi.

To install the package run this command in a
terminal on your Raspberry Pi.

```
bash <( curl -sL https://particle.io/install-pi )
```

After installing the package, the install script runs the setup command.
To run it again do `sudo particle-agent setup`.

When setup finishes, the Agent will start the [Tinker
firmware](https://docs.particle.io/guide/getting-started/tinker/).
Tinker will connect to the Particle cloud and allow you to toggle pins
using the Particle Mobile App.

The settings like user email and Particle token are stored in
`/var/lib/particle/settings.json`

The device-specific files are in `/var/lib/particle/devices/<deviceid>`
where `deviceid` is a 24 character string.

The package releases are also available on the [GitHub releases page](https://github.com/spark/particle-agent/releases).

## Uninstall

To remove the package and its dependencies run these
commands:
```
sudo apt-get remove particle-agent
sudo apt-get autoremove
```

To remove all settings as well, run:
```
sudo rm -rf /var/lib/particle
```

## Troubleshooting

If your firmware crashes 5 times in a row within 30 seconds the Agent
will go to "safe mode" which means it will revert the firmware to the
default Tinker firmware. This will let the Raspberry Pi reconnect
to the cloud allowing you to reflash new firmware.

If your Raspberry Pi still doesn't show as online in the Particle tools,
the first step is run the setup command again.  This will reinstall
the default firmware Tinker and reconnect to the cloud.

```
sudo particle-agent setup
```

The next step would be to reinstall the Agent by
[running the install command again](#install). 

If the device still does not show up online, follow the [uninstall
steps](#uninstall) then follow the [install steps](#install).

## Agent commands

You'll mostly interact with the Particle firmware running on the
Raspberry Pi through other tools like the [Web IDE](https://docs.particle.io/guide/getting-started/build), the [Console](https://docs.particle.io/guide/tools-and-features/console/) or the [Command Line Interface (CLI)](https://docs.particle.io/guide/tools-and-features/cli).

### Setup and connect to the Cloud

```
sudo particle-agent setup
```

Add the Raspberry Pi to your Particle account, create keys for the
secure connection to the Particle Cloud and start the Agent running Tinker.

Use this command as a "factory reset" in case your firmware doesn't
connect to the cloud anymore.

### Start the firmware

```
sudo particle-agent start
```

Starts the `particle-agent` service which in turn runs the
firmware.

### Stop the firmware

```
sudo particle-agent stop
```

Stops the `particle-agent` service which sends a signal to the
firmware process to stop. If the firmware doesn't stop after 3 seconds a
second signal is sent to force quit the firmware.

### Restart the firmware

```
sudo particle-agent restart
```

Runs `stop` followed by `start`.

_This is equivalent to pressing the reset button on a Photon._

### See firmware status

```
sudo particle-agent status
```

Shows if the Agent service and the firmware process are running.

If the `status` command doesn't show a line with `firmware.bin` it means
the firmware is not running. Try running `sudo particle-agent logs` to
get an idea why the firmware is not running. Run `sudo particle-agent
setup` to get back to a known good state with Tinker running.

### Show system and cloud connection logs

```
sudo particle-agent logs
```

Show the last 50 lines of logs and display more logs as they
are generated. You'll be able to see when the firmware restarts after an
Over-the-Air update in these logs.

The log file is in `/var/log/particle-agent.log`

Run `sudo particle-agent help logs` for more options to print logs.

### Access virtual Serial port

```
sudo particle-agent serial
```

Shows the output of the virtual serial port in the running firmware
(`Serial.println` lines).

Characters typed here will be read by `Serial.read` in the running
firmware.

## Implementation of the Agent

