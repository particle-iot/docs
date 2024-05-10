---
word: Particle CLI & Device Cloud
title: CLI & Device Cloud Lab
columns: two
layout: commonTwo.hbs
---

# Lab 3: Using the Particle CLI & Exploring the Device Cloud API

{{box op="start" cssClass="boxed warningBox"}}
This page is no longer maintained and is provided for historical reference only
{{box op="end"}}

| **Project Goal**            | Use the Particle CLI & Device Cloud API to work with devices.                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn**       | How to use the Particle CLI; Calling the Device CLoud API via cURL |
| **Tools you’ll need**       | A Particle Argon, and the Grove Starter Kit for Particle Mesh, a Particle Debugger, the Particle CLI.                                                                                                            |
| **Time needed to complete** | 20 minutes                                                                                                                                                                |

In this session, we'll take a look at the Particle CLI and Device Cloud API. If you get stuck at any point during this session, [click here for the completed, working source](https://go.particle.io/shared_apps/5d40aec2279e1e000b9ad57b).

## The Particle CLI
1.  If you haven't already, [install the Particle CLI](/guide/tools-and-features/cli/photon/). Open a terminal window and type the following command:
```bash
bash <( curl -sL https://binaries.particle.io/particle-cli/installer/install-cli)
```
<br /><br />
2.  Type `particle login` and enter your Particle account email and password when prompted.
![](/assets/images/workshops/particle-101/04/particlelogin.gif)
<br /><br />
3.  Once you're logged in, type `particle list` to see your list of online devices.
![](/assets/images/workshops/particle-101/04/particlelist.gif)
<br /><br />
4.  The device you've been using for this workshop has two variables and one function. Get the value of the `temp` variable with the command `particle get temp`.
![](/assets/images/workshops/particle-101/04/temp.gif)
<br /><br />
5.  You can also call one of the two functions to light up the yellow or blue LED button. Type the command `particle call <your-device-name> toggleLed` in the terminal. Run the same command again to turn the light off.

## The Particle device cloud API

Behind the scenes, every interface that Particle provides to work with devices, from the Console, to mobile apps, SDKs, and the CLI, they all talk through a RESTful Device Cloud API. You can even call yourself, directly.

{{box op="start" cssClass="boxed warningBox"}}
**Tip:** Make sure you have cURL on your machine<br />
The next few steps assume you have cURL installed on your machine. If you don't have this command-line utility on your machine, you can download and install it [here](https://curl.haxx.se/download.html) or use a GUI-based tool like [Postman](https://www.getpostman.com/).
{{box op="end"}}


1.  First, you'll need to obtain an access token. You can create one using [the Particle CLI](/reference/developer-tools/cli/#particle-token-create).

<br /><br />
2.  With your token and Device ID in hand, type the following cURL command into a terminal window, replacing the text below in `< >` with your information.
```bash
curl https://api.particle.io/v1/devices?access_token=<your token>
```
By default, the response will generate a wall of text in your terminal. If you have Python 2.6+ installed on your machine, you can pipe the output to the `json.tool` and get pretty-printed JSON.
```bash
curl https://api.particle.io/v1/devices\?access_token\=<your token>
| python -m json.tool
```
![](/assets/images/workshops/particle-101/04/curllist.gif)
<br /><br />
3.  For this next command, you need the Device ID of the Photon attached to your badge. You can find that in the console or via the `particle list` CLI command.
<br /><br />
4.  Let's call the `toggleLed` function using the Device Cloud API. Type the following, again replacing the text below in `< >` with your information.
```bash
curl https://api.particle.io/v1/devices/<device id>/toggleLed \
     -d access_token=<your token>
```
![](/assets/images/workshops/particle-101/04/curlcall.gif)

You've now explored a number of ways that you can interface with the Particle Device cloud and your connected devices! Next, let's explore using BLE with Particle Gen3 Devices.