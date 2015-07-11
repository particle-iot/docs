---
title: Building your own mobile app (iOS and Android)
columns: two
template: guide.hbs
order: 6
---

While using your Photon, you've probably come across our Particle mobile apps (iOS and Android). You may have used these apps to set up your device and "tinker" with the GPIO pins.

Particle provides native mobile SDKs for both iOS (Objective-C and Swift) and Android (Java) that allow you to build your own branded app for setting up and interacting with your product. If all you need is the set-up process, you can build your own branded app by editing a 15-line configuration file (no software development necessary). If you want to build a complete mobile interface, our iOS and Android SDKs provide native access to our API for interfacing with the product.

### Prerequisites for Building & Deploying Mobile Apps

**iOS**

- Mac computer/laptop running latest OSX
- [Apple developer account](https://developer.apple.com/programs/)
- iOS device & USB lightning cable (Particle device setup process cannot run on simulator)
- [XCode](https://developer.apple.com/xcode/downloads/) 6 and up
- [Cocoapods](https://cocoapods.org/) installed
- Particle iOS SDKs: [Cloud SDK](http://docs.particle.io/photon/ios/#ios-cloud-sdk) and [Device setup library](http://docs.particle.io/photon/ios/#ios-device-setup-library)
- Skills in object oriented programming. Knowledge in Objective-C / Swift and Cocoa Touch APIs. Here are few recommended free learning resources:
	- Official [Apple tutorials](https://developer.apple.com/library/ios/referencelibrary/GettingStarted/RoadMapiOS/FirstTutorial.html#//apple_ref/doc/uid/TP40011343-CH3-SW1)
	- [Developing iOS 8 Apps with Swift Stanford Universitry CS193p course](https://itunes.apple.com/us/course/developing-ios-8-apps-swift/id961180099) on iTunes U
	- [Ray Wenderlich](http://www.raywenderlich.com/) - a great iOS-centric tutorials website 
	- [Try iOS](https://www.codeschool.com/courses/try-ios) - Free online iOS course from Codeschool
	- and always: [Stack Overflow](http://stackoverflow.com/questions/tagged/ios) - best Q&A website for programmers. You can probably find an answer to ALL your how-do-I-do-that iOS questions there.


**Android**

- PC or Mac computer running OSX or Windows
- [Google Play developer account](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- Android device running Android v4.0 and up (Particle device setup process cannot run on simulator), micro-USB cable.
- [Android Studio](https://developer.android.com/sdk/index.html) v1.2 and up, [Android SDK](https://developer.android.com/sdk/installing/index.html) 
- Particle Android SDKs: [Cloud SDK](TODO) and [Device Setup library](TODO)
- Skills in object oriented programming. Knowledge in Java and Android SDKs. Here are few recommended free learning resources:
	- Official [Google tutorials](https://developer.android.com/training/basics/firstapp/index.html)
	- [Udemy Learn Android Programming From Scratch](https://www.udemy.com/learn-android-programming-from-scratch-beta/) free online video course
	- [Udacity Developing Android apps course](https://www.udacity.com/course/developing-android-apps--ud853)
	- TODO
	- and always: [Stack Overflow](http://stackoverflow.com/questions/tagged/android) - best Q&A website for programmers. You can probably find an answer to ALL your how-do-I-do-that Android questions there.

![](/assets/images/apple-android.png)

### Mobile SDKs? As in plural?

There are two parts to the Particle Mobile SDK: the Cloud SDK and the Device Setup library.
In a nutshell, the **Cloud SDK** is a library that enables your mobile app to interact with internet-connected hardware through the Particle Cloud. It serves the same purpose as [ParticleJS](http://docs.particle.io/photon/javascript/) — it’s an easy-to-use wrapper for our REST API, accessible from Objective-C and Swift. The **Device Setup library** allows you to create a setup wizard within your app for connecting your device to the internet with two lines of code. 

### How To Get Started?

**iOS**

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

If you're using Objective-C don't forget to import the file `SparkSetup.h` in your view controller implementation file. If you're using Swift be sure to complete all the required steps to integrate the Objective-C Cocoapod libraries in your project as described [here](http://swiftalicio.us/2014/11/using-cocoapods-from-swift/).

That's it. Build and run your project on a device or a simulator, tap the "Start Setup" button you created and you should see the device setup wizard pop up ready for setting up a new Particle Device and claim it to your user account.
Make sure you setup your new Photon, claim it to your account and name the device `myDevice`. If you already setup your device and just need to rename it you can do it from [Particle Build](https://build.particle.io/build) -> Devices.

Now, let's try to list your devices and read a variable from a certain device (using the Cloud SDK). Stop the app and go back to the split view of your view controller and code. Drag another button and name it "Read Variable", Ctrl-Drag it to your code and create another IBAction function. Call the function "readVariableButtonTapped" and fill in its body like so:

TODO - finish code example

```objc
- (IBAction)readVariableButtonTapped:(id)sender {
	__block SparkDevice *myPhoton;
	[[SparkCloud sharedInstance] getDevices:^(NSArray *sparkDevices, NSError *error) {
	    NSLog(@"%@",sparkDevices.description); // print all devices claimed to user

	    for (SparkDevice *device in sparkDevices)
	    {
	        if ([device.name isEqualToString:@"myDevice"])
	        {
	            myPhoton = device;
	        }
	    }
	}];
}
```

or the Swift version:

```swift
@IBAction func startDeviceSetup(sender: AnyObject) {
	var myPhoton : SparkDevice?
	SparkCloud.sharedInstance().getDevices { (sparkDevices:[AnyObject]!, error:NSError!) -> Void in
	    if let e = error {
	        println("Check your internet connectivity")
	    }
	    else {
	        if let devices = sparkDevices as? [SparkDevice] {
	            for device in devices {
	                if device.name == "myDevice" {
	                    myPhoton = device
	                }
	            }
	        }
	    }
	}
}
```


TODO: finish guide, full documentation reference

---

**Modifying existing app**

TODO: list of modifiable apps & suggestions

- Example app
- Particle Tinker open-source app
- 3rd party apps

...
There’s also an example app written in Swift that demonstrates the basic usage of invoking the setup wizard, customizing its UI and using the returned SparkDevice class instance once Device Setup wizard completes.

The mobile SDKs use the Apache 2.0 open source license, so submitting issues and contributions through pull requests is most welcome! In addtion apps built with the SDK can be free distrubuted in the Apple App Store or Google's Play Store.

You can find the source code for the Cloud SDK in our GitHub:
**iOS*
[Repository of iOS Cloud SDK](https://github.com/spark/spark-sdk-ios)
[Repository of iOS Device Setup library](https://github.com/spark/spark-setup-ios)
*


**Android**

The overall process is very similar, but it’s a native Java experience so Android developers will feel right at home.
One big difference in the user experience of setting up a Photon from an Android app vs. an iOS app is that on Android an app can control which Wi-Fi network the phone connects to, whereas on iOS the user has to leave the app, go to settings, and change the Wi-Fi network. We’ve made both flows as easy as possible, but it’s definitely smoother on Android since the user doesn’t have to do as much.

The Cloud SDK and Device Setup library for Android will soon be available on our GitHub and through [JCenter](https://bintray.com/bintray/jcenter) as Apache Maven packages for easy integration as dependencies in an Android Studio project.

TODO
