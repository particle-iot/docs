---
word: Dev
title: Spark Dev
order: 6
---

Build Apps with Spark Dev
===

Introduction
===

![IDE Menu]({{assets}}/images/ide-menu.jpg)

**Spark dev** is a desktop application that allows you to work with local copies of your firmware files. However, **internet** access is required as the files are pushed to Spark Cloud for compilation and returns a binary. i.e. This is not an offline development tool, yet.

All the commands are available from the **Spark** menu. The menu changes depending on whether you're logged in or have selected a device, so some of the commands will only show up once you're in the right context.

![Command Palette]({{assets}}/images/ide-palette.jpg)

If you prefer a keyboard-oriented workflow, there's **Command Palette** with all available commands in a searchable list.

To show the palette press `Command`+`Shift`+`P` keys together on a Mac or `Control`+`Shift`+`P` on Windows.

![Toolbar]({{assets}}/images/ide-toolbar.jpg)
**Tip**: you can change toolbar's position in settings.

There's also a toolbar on left side of IDE which contains shortcuts to the most frequently used commands like compiling and flashing (looks a lot like the one from [Web IDE (Build)](/build), doesn't it?).

Logging In
---
If you want to work on more advanced projects, Spark Dev could be the choice for you. Head over and download latest release:

[Spark Dev Download >](https://github.com/spark/spark-dev/releases/latest)

![IDE Window]({{assets}}/images/ide-window.jpg)

To access most of features you need to log in using your Spark account (which you can [create here](https://www.spark.io/signup)) by clicking the link on the bottom of the window.

![Logging in]({{assets}}/images/ide-log-in.jpg)

Enter your email and password then click the "Log In" button. After a successful login, the dialog will hide and a link will appear at the bottom showing your current account email.

**NOTE**: When using [Command Line](/cli) you'll notice that log-in status is shared between Spark Dev and CLI. So if you successfully ran `spark login`, you will be logged in within the Spark Dev.

Selecting device
---

![Selecting device]({{assets}}/images/ide-select-core.jpg)

Most features like **Flashing** or accessing **Cloud variables and functions** require selecting a target device they will interact with.

There are three ways to select core:

* Click **Select device** button in the left toolbar
* Click device's name on the bottom of the window
* Click on **Spark** -> **Select device...** menu

Then you will see list of all your devices along with an indicator of online status. You can search for a specific one by typing its name. Clicking on the device or pressing `Enter` when a device is selected will select it.

Compiling code
---

Before compiling your project, make sure your project files are in a dedicated directory.  If other files not related to your project are present in the project directory, you may experience errors when trying to compile.

![Compile button]({{assets}}/images/ide-compile.jpg)

To compile your current project, click on the **Compile in the cloud** button. If your code doesn't contain errors, you'll see a new file named **firmware_X.bin** in your project's directory (where *X* is a timestamp).

![Compile errors]({{assets}}/images/ide-compile-errors.jpg)

If there are some errors, you'll see a list of them allowing you to quickly jump to relevant line in code. You can show this list by clicking red error icon on the bottom of the window.

Flashing device
---

![Flash button]({{assets}}/images/ide-flash.jpg)

When you're sure that your code is correct it's time to flash it to the device. To do this, click **Flash using cloud** button. Your code will be sent wirelessly to your device. If the request was successful, the LED on your device will begin flashing magenta as code is downloaded to it. The process is complete when the magenta is replaced by your online status indication patterns.

Cloud variables & functions
===

To access all registered variables and functions, go to **Spark** -> **Show cloud functions**/**Show cloud functions** menus.

Variables
---

![Getting variable]({{assets}}/images/ide-get-variable.gif)

All variables declared with [Spark.variable()](http://docs.spark.io/firmware/#spark-variable) are shown on the left side of panel. To poll lastest variable value, click **Refresh** button for variable you want to update.

![Watching variable]({{assets}}/images/ide-watch-variable.gif)

When you want to check variable value constantly, you can click **Watch** button. When a variable is watched, Spark Dev will fetch latest value every 5 seconds.

Functions
---

![Functions]({{assets}}/images/ide-functions.gif)

To call an [exposed function](http://docs.spark.io/firmware/#spark-function) simply click on the button with its name. You'll see any data the function returns on the right side.

You can also add parameters to the call by entering them to the right of button.

Managing device
===

Using Spark Dev you can do many things with your device including setting up its WiFi, claiming or renaming it.

Setting up WiFi
---

![WiFi list]({{assets}}/images/ide-wifi-list.jpg)

To setup device's WiFi, connect it via USB and click **Setup device's WiFi...** button on the toolbar.

If your device isn't in [listening mode](/connect/#connecting-your-core-listening-mode) you'll see animation showing how to enter it.

Next you'll see all available networks. The one you are currently connected to will be listed first.

Select the one you want your device to use or choose **Enter SSID manually** (listed last) to specify all information by hand.

![WiFi setup]({{assets}}/images/ide-wifi-save.jpg)

Now you need to fill missing information and click **Save**. Core will go dark for a second and then try to connect to the WiFi.

Using community libraries
===

Currently community libraries aren't supported natively (but we're working on it). You can still use them, just follow these instructions:

![Libraries]({{assets}}/images/build-libraries.jpg)

Find the [library you want to use](/build/#flash-apps-with-spark-build-using-libraries)

![Link to GitHub repository]({{assets}}/images/build-library-github.jpg)

View it on GitHub

![Download link]({{assets}}/images/github-download.jpg)

Download the repository

![Correct files selected]({{assets}}/images/ide-selected-library.jpg)

Copy files from `firmware` directory **without** `examples` to your project directory

![Example project with include]({{assets}}/images/ide-include-library.jpg)

Include library adding `#include "LIBRARY.h"` to your code
