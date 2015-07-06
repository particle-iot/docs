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


### Mobile SDKs? As in plural?

There are two parts to the Particle Mobile SDK: the Cloud SDK and the Device Setup library.
In a nutshell, the **Cloud SDK** is a library that enables your mobile app to interact with internet-connected hardware through the Particle Cloud. It serves the same purpose as [ParticleJS](http://docs.particle.io/photon/javascript/) — it’s an easy-to-use wrapper for our REST API, accessible from Objective-C and Swift. The **Device Setup library** allows you to create a setup wizard within your app for connecting your device to the internet with two lines of code. 

### How To Get Started?

**iOS**

Both the Cloud SDK and Device Setup library are available through CocoaPods, the most widely used iOS dependency manager. If you don’t have it, you’ll need to start by installing the Cocoapods `ruby gem`; check out the CocoaPods site for more info. 

**Starting from scratch**

TODO

Then, to install the Device Setup library for iOS (which has the Cloud SDK as a dependency), simply add the following line to the Podfile in your iOS project root folder:

`pod "SparkSetup"`

and from the command-line, in the project root directory type:

`pod install`

You project will now contain the Particle iOS SDKs ready to use.
The mobile SDKs use the Apache 2.0 open source license, so submitting issues and contributions through pull requests is most welcome! In addtion apps built with the SDK can be free distrubuted in the Apple App Store or Google's Play Store.

You can find the source code for the Cloyd SDK in our GitHub:

[Repository of iOS Cloud SDK](https://github.com/spark/spark-sdk-ios)

[Repository of iOS Device Setup library](https://github.com/spark/spark-setup-ios)

**Modifying existing app**

TODO

There’s also an example app written in Swift that demonstrates the basic usage of invoking the setup wizard, customizing its UI and using the returned SparkDevice class instance once Device Setup wizard completes.

**Android**

The overall process is very similar, but it’s a native Java experience so Android developers will feel right at home.
One big difference in the user experience of setting up a Photon from an Android app vs. an iOS app is that on Android an app can control which Wi-Fi network the phone connects to, whereas on iOS the user has to leave the app, go to settings, and change the Wi-Fi network. We’ve made both flows as easy as possible, but it’s definitely smoother on Android since the user doesn’t have to do as much.

The Cloud SDK and Device Setup library for Android will soon be available on our GitHub and through [JCenter](https://bintray.com/bintray/jcenter) as Apache Maven packages for easy integration as dependencies in an Android Studio project.

TODO
