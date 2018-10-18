---
title: Installing curl (for Windows)
layout: support.hbs
columns: two
devices: [ photon,electron,core,argon,boron,xenon ]
order: 1100
---

# Installing curl (for Windows)

The curl command, used in the [Particle cloud examples](/reference/api/) is generally built-in on the Mac and Linux, but not Windows. These instructions explain how to install it.


## Installation

### Download

Download the files from [https://curl.haxx.se/download.html](https://curl.haxx.se/download.html). You generally want one of the two highlighted files, depending on whether you have 32-bit or 64-bit Windows:

- Win32 Generic - Win32 zip 7.51.0 binary SSL SSH
- Win64 Generic - Win64 x86_64 zip 7.51.0 binary SSL SSH

Click on the version number (7.51.0, for example) to download the file.

If you are unsure, this Microsoft knowledge base article on [how to tell whether you have a 32-bit or 64-bit Windows installation](https://support.microsoft.com/en-us/kb/827218) may be helpful.

![Download Options](/assets/images/installing-curl-01download.png)

You should also go to the page [http://curl.haxx.se/docs/caextract.html](http://curl.haxx.se/docs/caextract.html). Right click on the link to cacert.pem and select **Save Target** to save the file to your Downloads folder.

![Save Target](/assets/images/installing-curl-02savetarget.png)

You first need to create a place to save your curl installation. I like to put the files in C:\Program Files\curl. In the Windows File Explorer:

1. Select This PC
2. Select your C: drive, called **Windows 10 (C:)** in this example, but your may be different.
3. Double click Program Files

![Create folder in program files](/assets/images/installing-curl-10programfiles.png)

Right click on the right side of the window, select **New** then **Folder**.

![Create folder in program files](/assets/images/installing-curl-11newfolder.png)

Name the new folder **curl**. Then moved the files you downloaded into this directory. 

![Create curl directory in program files](/assets/images/installing-curl-03curldir.png)

Open the .zip file that you downloaded earlier. Inside the **src** folder should be the file **curl.exe**. Copy this into the new directory that you just created.

![Copy curl.exe](/assets/images/installing-curl-04copy.png)

Also copy the **cacert.pem.htm** file into the curl directory.

![Copy cacert.pem.htm](/assets/images/installing-curl-05copy.png)

Rename the **cacert.pem.htm** file to **curl-ca-bundle.crt**. You should get a warning about changing the filename extension. Click **Yes**.

![Rename cacert.pem.htm](/assets/images/installing-curl-06rename.png)

Depending on your system settings, the filename extension may be hidden. This will cause some problems. You can tell because the the curl program is just **curl** not **curl.exe** and also **cacert.pem** is of type **HTML Document**.

![No filename extensions](/assets/images/installing-curl-07noextension.png)

One way to fix this is to just turn on filename extension viewing. Open the **Control Panel** and select **Appearance and Personalization**.

![Apperance](/assets/images/installing-curl-08appearance.png)

Then **Folder Options**.

![Folder Options](/assets/images/installing-curl-09folderoptions.png)

Click the **View** tab (1) and then deselect the checkbox for **Hide extensions for known file types** (2).

![Hide Extension](/assets/images/installing-curl-10hideext.png)

Then you can finally rename the file **curl-ca-bundle.crt** and have it show up as type **Security Certificate**.

![Rename](/assets/images/installing-curl-12rename.png)


### Editing the path - Windows 10

Click on the Windows Start menu, then the Settings (gear icon).

![Start Settings](/assets/images/installing-curl-13startsettings.png)

In the Windows 10 Settings window, type **environment** into the box at the top and select **Edit the system environment variables.**

![Settings](/assets/images/installing-curl-14settings.png)

Click the **Environment Variables** button at the bottom of the page.

![Enviroment Variables](/assets/images/installing-curl-15environmentvariables.png)

In the **Environment Variables** window, select **Path** in the bottom list (System variables) and click Edit.

![Edit](/assets/images/installing-curl-16edit.png)

In the **Edit environment variable** window, click **New** then enter a new row in the table, **C:\Program Files\curl**. 

![Edit New](/assets/images/installing-curl-17editnew.png)

After editing the system path environment variable you'll need to restart the computer.

### Editing the path - Windows 7 and 8

You need to open the Control Panel. 

![Open Control Panel](/assets/images/installing-curl-05controlpanel.png)

And then click on **System and Security**.

![System and Security](/assets/images/installing-curl-06systemandsecurity.png)

Then click **System**.

![System and Secury](/assets/images/installing-curl-18system.png)

Then click on the **Advanced System Settings** link on the left side of the window.

![Advanced Settings](/assets/images/installing-curl-08advanced.png)

Then click on **Environment Variables...**

![Environment](/assets/images/installing-curl-09environment.png)
 
Click on **Path** in the bottom list (System variables) and click Edit.

Finally, position the cursor at the end of the box and add to the end:

```
;C:\Program Files\curl
```
There must be a semicolon separating the new item from the previous last item, and then the path to the directory we just created.

![Edit variable](/assets/images/installing-curl-19editvar.png)

After editing the system path environment variable you'll need to restart the computer or log out and log back in.

## Testing

Most calls require an access token. You can find one by logging into [https://build.particle.io](https://build.particle.io). Click on the Settings icon (1) and your access token is in the highlighted box.

![Access Token](/assets/images/installing-curl-20accesstoken.png)

Make sure you keep your token secret, because it allows access and control over all of your devices.

You should now be able to open a Command Prompt window and type in a command like:

```
curl https://api.particle.io/v1/devices?access_token=PASTE_YOUR_ACCESS_TOKEN_HERE
```

Also note: Many of the examples show a command that continues across lines with a backslash (\\) at the end of the line. This is the correct character for Mac and Linux, but using the Windows Command Prompt you should use the carat (^) instead.

