---
title: Building your own mobile app (iOS and Android)
columns: two
template: guide.hbs
order: 7
---

# Building your own Mobile App

While using your Photon, you've probably come across our Particle mobile apps (iOS and Android). You may have used these apps to set up your device and "tinker" with the GPIO pins.

Particle provides native mobile SDKs for both iOS (Objective-C and Swift) and Android (Java) that allow you to build your own branded app for setting up and interacting with your product. If all you need is the set-up process, you can build your own branded app by editing a 15-line configuration file in the **Device setup library** (no software development necessary). If you want to build a complete mobile interface, our iOS and Android **Cloud SDKs** provide native access to our API for interfacing with the product.

You have already learned a lot about what you'll need to do to build your web
application in the last section on [Authentication &
Security](/guide/how-to-build-a-product/authentication/). This section will
focus more specifically on building mobile applications.

### Prerequisites for Building & Deploying Mobile Apps

**iOS**

- Mac computer/laptop running latest OSX
- [Apple developer account](https://developer.apple.com/programs/)
- iOS device & USB lightning cable (Particle device setup process cannot run on simulator)
- [XCode](https://developer.apple.com/xcode/downloads/) 6 and up
- [Cocoapods](https://cocoapods.org/) installed
- Particle iOS SDKs: [Cloud SDK](http://docs.particle.io/photon/ios/#ios-cloud-sdk) and [Device setup library](http://docs.particle.io/photon/ios/#ios-device-setup-library)
- Skills in object oriented programming. Knowledge in Objective-C / Swift and Cocoa Touch APIs. Here are few recommended free learning resources:
	- Official [Apple tutorials](https://developer.apple.com/resources/)
	- [Developing iOS 8 Apps with Swift Stanford Universitry CS193p course](https://itunes.apple.com/us/course/developing-ios-8-apps-swift/id961180099) on iTunes U
	- [Ray Wenderlich](http://www.raywenderlich.com/) - a great iOS-centric tutorials website
	- [Try iOS](https://www.codeschool.com/courses/try-ios) - Free online iOS course from Codeschool
	- and always: [Stack Overflow](http://stackoverflow.com/questions/tagged/ios) - best Q&A website for programmers. You can probably find an answer to ALL your how-do-I-do-that iOS questions there.


**Android**

- PC or Mac computer running OS X, Windows, or Linux (i.e.: anything that can run Android Studio)
- [Google Play developer account](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- An Android device running Android v4.0 and up (the Particle device setup process isn't supported via emulators), and a USB cable to connect the device to your computer
- [Android Studio](https://developer.android.com/sdk/index.html) v1.4 and up
- Particle Android SDKs: [Cloud SDK](https://docs.particle.io/reference/android/#android-cloud-sdk) and the [Device Setup library](https://docs.particle.io/reference/android/#android-device-setup-library)
- Basic familiarity with Android development using Java and the Gradle build system.  Here are few recommended free resources to get you started:
	- Official [Google tutorials](https://developer.android.com/training/basics/firstapp/index.html)
	- [Udemy Learn Android Programming From Scratch](https://www.udemy.com/learn-android-programming-from-scratch-beta/) free online video course
	- [Udacity Developing Android apps course](https://www.udacity.com/course/developing-android-apps--ud853)
	- and as always: [Stack Overflow](http://stackoverflow.com/questions/tagged/android) - best Q&A website for programmers. You can find good answers to almost _any_ how-do-I-do-that Android questions there.

![](/assets/images/apple-android.png)

### Two-tier SDK

There are two parts to the Particle Mobile SDK: the Cloud SDK and the Device Setup library.
In a nutshell, the **Cloud SDK** is a library that enables your mobile app to interact with internet-connected hardware through the Particle Cloud. It serves the same purpose as [ParticleJS](http://docs.particle.io/photon/javascript/) — it’s an easy-to-use wrapper for our REST API, accessible from Objective-C and Swift. The **Device Setup library** allows you to create a setup wizard within your app for connecting your device to the internet with two lines of code.

### How To Get Started?

Let's go through a basic step by step example on how to integrate and use the mobile SDKs into a basic app, for both platforms:

#### iOS

Both the Cloud SDK and Device Setup library are available through CocoaPods, the most widely used iOS dependency manager. If you don’t have it, you’ll need to start by installing the Cocoapods `ruby gem`; check out the CocoaPods site for more info.

**Starting from scratch**

Go ahead and create a new app in XCode by going to File menu and then:
New -> Project -> iOS Application -> Single View Application -> Next
then name your app and identifier, choose if you prefer to code in Obj-C or Swift, decide if the app is an iPhone/iPad or Universal app and click Next to place your new project in a folder. Project will open up.

![XCode new project](/assets/images/xcode-new-project.png)

 Open Finder or Terminal and go to your project folder - create a new plain textfile named `Podfile` in the same directory then install the Device Setup library for iOS (which has the Cloud SDK as a dependency). Simply add the following line to the `Podfile` in your iOS project root folder:

`pod "SparkSetup"`

save & exit.
Now, from command line, while still in the project root directory type:

`pod install`

Go back to XCode, close the project and open the newly created `.xcworkspace` file - your project will now contain the Particle iOS SDKs ready to use.

Go to the project storyboard, drag a UIButton to your main ViewController. Double click it and type "Setup device", press the "Assistant editor" in XCode toolbar to show your viewcontroller code side by side to the storyboard. Ctrl-drag the button to your code to create a new IBAction, name the function "startDeviceSetup".
In the function body add:

```objc
- (IBAction)startDeviceSetup:(id)sender {
    SparkSetupMainController *setupController = [[SparkSetupMainController alloc] init];
    [self presentViewController:setupController animated:YES completion:nil];
}
```
Or the Swift version:

```swift
@IBAction func startDeviceSetup(sender: AnyObject) {
    var setupController = SparkSetupMainController()
    self.presentViewController(setupController, animated: true, completion: nil)
}
```

If you're using Objective-C, don't forget to import the file `SparkSetup.h` in your view controller implementation file. If you're using Swift, be sure to complete all the required steps to integrate the Objective-C Cocoapod libraries in your project, mainly adding bridging header file to the project settings, as described [here](http://swiftalicio.us/2014/11/using-cocoapods-from-swift/). We've included a bridging header file in both the SDKs.

That's it. Build and run your project on a device or a simulator, tap the "Start Setup" button you created and you should see the device setup wizard pop up ready for authenticating with Particle Cloud and then setting up a new Particle Device.
Make sure you set up your new Photon, and name the device `myDevice` at the last screen, you'll see why in a moment. If you already setup your device and just need to rename it you can do it from [Particle Build](https://build.particle.io/build) -> Devices. You can also rename the device from the Tinker app.

Now, let's try to list your devices and read a variable from the device you just set up (by using the Cloud SDK). Stop the app and go back to the split view of your view controller and code. Drag another button and name it "Read Variable", Ctrl-Drag it to your code and create another IBAction function. Call the function "readVariableButtonTapped" and fill in its body like so:

```objc
- (IBAction)readVariableButtonTapped:(id)sender {
	 // 1
	 [[SparkCloud sharedInstance] getDevices:^(NSArray *sparkDevices, NSError *error) {
            NSLog(@"%@",sparkDevices.description);
            // 2
            if (!error)
            {
                // 3
                for (SparkDevice *device in sparkDevices)
                {
                    if ([device.name isEqualToString:@"myDevice"])
                    {
                        SparkDevice *myPhoton = device;
                        // 4
                        [myPhoton callFunction:@"digitalwrite" withArguments:@[@"D7",@"HIGH"] completion:^(NSNumber *resultCode, NSError *error) {
                            // 5
                            if (!error)
                            {
                                NSLog(@"Called a function on myDevice");
                            }
                        }];
                    }
                }
            }
        }];
}
```

or the Swift version:

```swift
@IBAction func readVariableButtonTapped(sender: AnyObject) {
		// 1
        SparkCloud.sharedInstance().getDevices { (sparkDevicesList : [AnyObject]!, error :NSError!) -> Void in
        	// 2
            if let sparkDevices = sparkDevicesList as? [SparkDevice]
            {
                println(sparkDevices)
                // 3
                for device in sparkDevices
                {
                    if device.name == "myDevice"
                    {
                    	// 4
                        device.callFunction("digitalwrite", withArguments: ["D7","HIGH"], completion: { (resultCode :NSNumber!, error : NSError!) -> Void in
                        	// 5
                            println("Called a function on myDevice")
                        })
                    }
                }
            }
        }
}
```


**Step by step explanation**
See `// 1,2,3..` comments in code and follow:

1. here we are calling the SparkCloud to get a list of all the device the user owns (the device you just set up should appear here), we also print the list onto the console so you can check everything is in place
2. If the cloud did not return an error (in Swift we are optionally downcasting the result list to an Array of `SparkDevice`s)
3. Then lets iterate on the returned array searching for a `SparkDevice` with a `name` field which is `myDevice` (as we set it up)
4. Once its found, call the function `digitalwrite` on *this* device with two arguments, which mean `D7=HIGH` which should cause the onboard LED (connected to pin D7) to light up
5. And if there wasn't any error calling this function on the device (default Tinker firmware exposes this function always) then print to console that call was successful

Go ahead and run the app, see everything works alright.
Well Done! You've just created a mobile basic app that can:
1. Set up a Particle device interactively
2. List the devices on the user's account
3. Call a function on a device and report to the user

**Modifying existing app**

If you prefer to have a point of reference you're more than welcome to modify an existing app. Ideas for modifiable apps include:

- [Example app](https://github.com/spark/spark-setup-ios-example)
- [Particle Tinker open-source app](https://github.com/spark/photon-tinker-ios)
- Other users/3rd party apps, [ideas?](https://www.hackster.io/particle/projects)

There’s also an example app written in Swift that demonstrates the basic usage of invoking the setup wizard, customizing its UI and using the returned SparkDevice class instance once Device Setup wizard completes.

You can find the source code for the Cloud SDK under our GitHub account:

[Repository of iOS Cloud SDK](https://github.com/spark/spark-sdk-ios)

[Repository of iOS Device Setup library](https://github.com/spark/spark-setup-ios)


#### Android

The overall process for building an Android app is very similar to that of building an iOS app, but with a native Java experience so Android developers will feel right at home.
One major difference in the user experience of setting up a Photon from an Android app vs. an iOS app is that on Android an app can control which Wi-Fi network the phone connects to, whereas on iOS the user has to leave the app, go to settings, and change the Wi-Fi network. We’ve made both flows as easy as possible, but it’s definitely smoother on Android since the user doesn’t have to do as much.

The Cloud SDK and Device Setup library for Android are available on our GitHub and through [JCenter](https://bintray.com/bintray/jcenter) as Apache Maven packages for easy integration as dependencies in an Android Studio project.

The guide for how to create an Android app for Particle devices in Android studio is coming soon.
Meanwhile you can find the source code for the Android Cloud SDK and Device Setup under our GitHub account:

[Repository of Android Cloud SDK](https://github.com/spark/spark-sdk-android)

[Repository of Android Device Setup library](https://github.com/spark/spark-setup-android)

#### What's next?

Well now you've written all of your software, so it's probably time to start:

[Manufacturing >](../manufacturing).
