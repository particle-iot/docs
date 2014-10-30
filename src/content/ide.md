---
word: IDE
title: Local IDE
order: 6
---

Build Apps with Local IDE
===

Introduction
===

![IDE Menu]({{assets}}/images/ide-menu.jpg)

Every command is available from **Spark** menu item. Depending on being logged in or having selected a Core, this menu will change.

![Command Palette]({{assets}}/images/ide-palette.jpg)

If you prefer more keyboard oriented workflow, there's **Command Palette** with all available commands, which can be filtered.

To show the palette press `Command`, `Shift` and `P` keys together on a Mac or `Control`, `Shift`, `P` on Windows.

![Toolbar]({{assets}}/images/ide-toolbar.jpg)
**Tip**: you can change toolbar's position in settings.

There's also a toolbar on left side of IDE (it looks just like one from [Build IDE](/build) isn't it?), which contains shortcuts to most used commands like compiling or flashing.

Logging In
---
If you want to work on more advanced projects, local IDE could be the choice for you. Head over and download our IDE:

[Spark IDE Download >](https://www.spark.io/ide)

![IDE Window]({{assets}}/images/ide-window.jpg)

To access most of features you need to log in using your Spark account (which you can [create here](https://www.spark.io/signup)) by clicking link on the bottom of the window.

![Logging in]({{assets}}/images/ide-log-in.jpg)

Enter your email and password then click the "Log In" button. After quick verification, dialog will hide and link from the bottom will show your current account email.

**NOTE**: Using [Command Line](/cli) you'll notice that log-in status is shared between IDE and CLI. So if you successfully ran `spark login`, you will be logged in within IDE.

Selecting Core
---

![Selecting Core]({{assets}}/images/ide-select-core.jpg)

Most of features like **Flashing** or accessing **Cloud variables and functions** requires selecting which Core they will interact with.

There are three ways to select core:

* Click **Select Core** button in the left toolbar
* Click Core's name on the bottom of the window
* Click on **Spark** -> **Select Core...** menu

Then you will see list of all your Core along with online indicator. You can search for specific one by typing its name. Clicking on Core or pressing `Enter` when Core is selected, will make it the current one.

Compiling code
---

![Compile errors]({{assets}}/images/ide-compile-errors.jpg)

To compile your current project, click on the **Compile in the cloud** button. If your code doesn't contain errors, you'll see a new file named **firmware_X.bin** in your project's directory (where *X* is a timestamp).

If there are some errors, you'll see a list of them allowing you to quickly jump to relevant line in code. You can show this list by clicking red error icon on the bottom of the window.
