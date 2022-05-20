---
title: Messaging Architecture for Scale
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## Overview

This white paper describes an architecture for tackling many of the challenges associated with addressing multiple distributed devices, leveraging the powerful abstractions Particle's DeviceOS and Cloud API provide.

You will learn how to:

* Use **Particle Events** to send hierarchical messages to your fleet, and how to utilize `Particle.subscribe()` to determine if action on a specific device is required.
* Configure your devices, using the on-board emulated **EEPROM**, into hierarchical groups.
* Remotely commission devices into groups using DeviceOS's `Particle.function()` method.

Example code for this example can be found on [Github](https://github.com/particle-iot/messaging%5Farch%5Ffor%5Fscale)

### Background

As your fleet grows larger, it will quickly become necessary to implement a scalable cloud-to-device messaging architecture. Maybe you need to trigger your fleet report back a sensor value in response to an external event, or you may need to actuate all of the valves for irrigating a specific section of a farm. In any of these cases and many others, a scalable way to address all of your devices either as a whole, or in groups is essential to the operation of your distributed system.

## A Simple Example

Let's imagine you have designed a system of distributed irrigation valves controlled by a Particle device. The system has the following qualities:

* One Boron controls one valve
* These systems will be sold to multiple customers, each of which having multiple valves per farm
* The end customer wants the ability to control each valve individually, or group them together and combine control over them
* Groups need to be configurable and flexible by the end user
* A backend system monitoring all valves at all customers needs to know the status of each valve and update a database

Now, this type of system can be easily prototyped using the `Particle.function()` and `Particle.variable()` primitives. However, functions and variables have one major limitation when it comes to this kind of system: they are scoped to _individual devices_. This means that to perform an action on a device, you need to send it a function call. To perform an action on 100 devices, you need to issue 100 function calls, and so on. As you can imagine, this can quickly become unsustainable as your fleet scales. Keeping track of the state of thousands of function and variable calls, managing all of those connections, and staying below the rate limits of the Particle Cloud will add significant complexity and maintenence burden to your systems.

## Particle Best Practice: Using Events

The best way to accomplish this kind of control and communication with a distributed system is to leverage the Particle Events service. Instead of having to dig all the way down to the device level of the hierarchy to control the actions of your fleet and manage these mappings in your own systems, an events-based approach allows you to define logic for this communication layer dynamically with our publish/subscribe architecture.

### Hierarchical Events

Going back to the irrigation system example above we need to define a hierarchy of devices. Based on the requirements, we will have three layers of device hierarchy in this product:

1. **User:** the highest layer of the hierarchy. This will include all devices on a particular farm, and an event sent to this layer of the hierarchy will affect every one. For example, a customer may want to shut off all irrigation if rain in the forecast.
2. **Group:** an intermediate layer of the hierarchy. An event sent to this layer would only affect devices part of the group. Additionally, multiple groups may exist, and any one valve may belong to multiple groups. For example, a customer may want to water a specific section of a farm, thus turning on all valves for that group.
3. **Device:** The lowest layer of the hierarchy. An event sent addressed to a specific device will only affect that device. For example, a customer may have seen a leak at a particular valve and want to shut it off independent of any groups it may belong to being turned on.

These values should be stored in a backend database and linked to the front end user interface you supply with your product. This will provide the basic functionality needed to implement the above use cases: adding users, linking them to a set of products, letting your users create groups of your product, and sending events to your devices to initiate actions.

### Hierarchical Events in Practice

Given this layering, we need to turn this into a structure for a Particle event. Our event will have the following structure:

* **Event Name:** _User ID_**.** This is chosen for the title because it enables individual devices to subscribe to events only for their attributed user. This prevents events from one user being published to devices claimed by another, thus wasting cellular data and processing time.
* **Event Data:** _User ID, Request ID_, and an optional _Group ID_ or _Device ID_. These values will be separated by a forward slash character to identify the hierarchy.

Here's what some example events could look like, sent to User ID `123ABC`:

* `123ABC/set_req_output`: Run `set_requested_output` function of all devices belonging to user `123ABC`
* `123ABC/set_req_output/1`: Run `set_requested_output` function of all devices belonging to user `123ABC` in group `1`
* `123ABC/set_req_output/e00fce68f5048fcadf1ea38a`: Run `set_requested_output` function on device `e00fce68f5048fcadf1ea38a`, if it belongs to user `123ABC`

### Example Implementation

The code provided below shows how to use the above architecture with some hardcoded values for user ID and group mappings. It provides the following functionality:

1. Subscribes to events titled with the provided userID, `ABC123`
2. Subscribes to groups `0`, `1`, `7`, and `127`. The group datatype `uint8_t` means we can have up to 256 unique groups, _per user_. This can easily be changed to support your use case
3. When an event is received, the userID, command, and groupID are extracted by the `parseMessage()` callback
4. If there is a match for the configured values user ID (and group if supplied), the supplied function will fire
5. The example functions `red`, `green`, and `blue` change the onboard LED colors respectively. They could easily be configured to change GPIO pin, trigger a sensor to report back, or something else entirely
6. Log all the events and their resulting output to the serial terminal

 SerialLogHandler logHandler(LOG_LEVEL_WARN, {  
     {"app", LOG_LEVEL_ALL}  
 });  
 ​  
 // Particle protocol sets a maximum event name size  
 constexpr auto MAX_EVENT_NAME_LENGTH = particle::protocol::MAX_EVENT_NAME_LENGTH;  
 ​  
 // Limits for the lengths of some variables  
 constexpr auto MAX_USER_ID_LEN = 8;  
 constexpr auto MAX_DEVICE_GROUPS =  16;  
 ​  
 // Fixed User ID  
 constexpr char userID[MAX_USER_ID_LEN+1] = "ABC123";  
 ​  
 // Fixed array of groups this device belongs to  
 constexpr uint8_t deviceGroups[MAX_DEVICE_GROUPS] = {  
     0,  
     1,  
     7,  
     127  
 };  
 ​  
 // --------------------------------------------------  
 // Main code  
 // --------------------------------------------------  
 ​  
 void setup() {  
 ​  
     // Using the RGB LED as an "output" for this example  
     RGB.control(true);  
 ​  
     // Set up our subscription to events to the configured User ID  
     Particle.subscribe(userID, parseMessage, MY_DEVICES);  
 }  
 ​  
 void loop() {  
     // Nothing to see here  
 }  
 ​  
 // ---------------------------------------------------------------------------------------------------------------------------------------------------------  
 // Parse event callback function  
 // Example events:  
 // "123ABC/set_req_output"                              Runs set_requested_output function of all devices belonging to user 123ABC (agnostic of groups)  
 // "123ABC/set_req_output/group1"                       Runs set_requested_output function of all devices belonging to user 123ABC in group "group1"  
 // "123ABC/set_req_output/e00fce68f5048fcadf1ea38a"     Runs set_requested_output function on device e00fce68f5048fcadf1ea38a, if it belongs to user 123ABC  
 // ---------------------------------------------------------------------------------------------------------------------------------------------------------  
 void parseMessage(const char *event, const char *data) {  
     Log.trace("Event received {\n\tevent: %s\n\tdata: %s\n}", event, data);  
       
     // Local copy of the event string.  strtok modifies its input string.  
     char event_data[strlen(data)+1];  
     strcpy(event_data, data);  
     // --------------------------------------------------  
     // tokenize on slashes to go down in hierarchy:  
     // <userID>/<command>/<group or Device ID, optional>  
     // --------------------------------------------------  
 ​  
     // Parse the <userID> level of the hierarchy  
     // Note: this should always return true, since the Particle.subscribe function is subscribing to all events that start with this!  
     char* parsedUserID = strtok(event_data, "/");  
     if (parsedUserID != NULL && strcmp(parsedUserID, userID) == 0) {  
         Log.trace("Event parsed %s", parsedUserID);  
           
         // Parse the <command> level of the event hierarchy  
         char* parsedFunction = strtok(NULL, "/");  
         if (parsedFunction != NULL) {  
             Log.trace("Command parsed: %s", parsedFunction);  
 ​  
             // Parse the optional <group> level of the event hierarchy  
             char* parsedGroup = strtok(NULL, "/");  
             bool groupMatched = false;  
               
             if (parsedGroup == NULL) {  
                 // No group supplied means all groups are addressed  
                 groupMatched = true;  
                 Log.info("All groups addressed!");  
             } else if (strcmp(parsedGroup, System.deviceID().c_str()) == 0) {  
                 // Our Device ID supplied as a group means we were addressed directly  
                 groupMatched = true;  
                 Log.info("Device addressed by Device ID");                  
             } else {  
                 // Anything else received - check if it matches a group ID we belong to  
                 uint32_t parsedDeviceGroup = (uint32_t)strtol(parsedGroup, NULL, 10);  
                 for (int i = 0; i < MAX_DEVICE_GROUPS; i++) {  
                     if (parsedDeviceGroup == deviceGroups[i]) {  
                         groupMatched = true;  
                         break;  
                     }  
                 }  
             }  
 ​  
             if (groupMatched) {  
                 // Matched a group we belong to - run the required function  
                 Log.info("Group parsed: %s", parsedGroup);  
 ​  
                 if      (!strcmp(parsedFunction, "red"))   red(data);  
                 else if (!strcmp(parsedFunction, "green")) green(data);  
                 else if (!strcmp(parsedFunction, "blue"))  blue(data);  
                 else Log.warn("Unknown function received: %s", parsedFunction);  
 ​  
             } else {  
                 // A group was addressed, but it wasn't ours - ignore the received event  
                 Log.info("Device's group was NOT addressed: %s", parsedGroup);  
             }  
         }  
     }  
 }  
 ​  
 // ----------------------------------------------------------------------------------------------------  
 // These functions are called from events sent to the device  
 // Replace these with your functions, and their references above for naming  
 // ----------------------------------------------------------------------------------------------------  
 ​  
 // TODO: make these actually do something physical (change the LED color for example, or read a sensor)  
 void red(const char* data) {  
     Log.info("red() called with data: %s", data);  
     RGB.color(255, 0, 0);  
 }  
 ​  
 void green(const char* data) {  
     Log.info("green() called with data: %s", data);  
     RGB.color(0, 255, 0);  
 }  
 ​  
 void blue(const char* data) {  
     Log.info("blue() called with data: %s", data);  
     RGB.color(0, 0, 255);  
 }

#### Running the Example

To demonstrate this code, I flashed it to 3 Argon boards that are part of a product in the console. I then sent 3 example events to the product. Below is the example events and respective serial log output:

1. Title: `ABC123` Data: `ABC123/blue`. This will turn all the LEDs blue:  
 0001812226 [app] TRACE: Event received {  
         event: ABC123  
         data: ABC123/blue  
 }  
 0001812227 [app] TRACE: Event parsed ABC123  
 0001812228 [app] TRACE: Command parsed: blue  
 0001812229 [app] INFO: All groups addressed!  
 0001812229 [app] INFO: Group parsed: 0  
 0001812230 [app] INFO: blue() called with data: ABC123/blue
2. Title: `ABC123` Data: `ABC123/red/128`.This will do nothing, as the group ID doesn't match the configured values:  
 0001832476 [app] TRACE: Event received {  
         event: ABC123  
         data: ABC123/red/128  
 }  
 0001832477 [app] TRACE: Event parsed ABC123  
 0001832478 [app] TRACE: Command parsed: red  
 0001832479 [app] INFO: Device's group was NOT addressed: 128
3. Title: `ABC123` Data: `ABC123/foo`. This will do nothing, as the function name doesn't match any configured one:  
 0001870978 [app] TRACE: Event received {  
         event: ABC123  
         data: ABC123/foo  
 }  
 0001870979 [app] TRACE: Event parsed ABC123  
 0001870980 [app] TRACE: Command parsed: foo  
 0001870981 [app] INFO: All groups addressed!  
 0001870981 [app] INFO: Group parsed: 0  
 0001870982 [app] WARN: Unknown function received: foo

## Particle Best Practice: Storing Configuration Values in EEPROM

The above example shows the basics of how to set up subscriptions that are specific to a user, filter issued events by pre-programmed group identifiers, and expose access to internal functions on your device. However, it relies on hardcoded values for the user ID and group ID lists. This isn't ideal in a production setting, as these values may need to be modified at the time of manufacture, or while the device is in the field.

We can take advantage of the emulated EEPROM and provided API to store these settings in a non-volatile, but modifiable way.

### EEPROM Configuration Example Code

First, we will need to define our configuration data structure that will replace our hardcoded values, and instantiate it in our code as a global variable, `config`. The struct contains the elements we need for our parsing, as well as a `version` variable. Including a version in your configuration structs is good practice, and enables checking for validity of read values, or allowing for changing the struct in a future version of firmware and having upgrades be automatic.

Additionally, we define three utility functions to allow for writing, reading (initializing if necessary), and printing out our configuration. Please note that the initialization method _does not_ write the initialized configuration to EEPROM. This allows devices to remain un-configured unless explicitly configured.

We will replace the previous `constexpr` definitions of `userID` and `deviceGroups` with the following code above the `setup()` and `loop()` routines:

 // --------------------------------------------------  
 // EEPROM-based device configuration  
 // --------------------------------------------------  
 constexpr auto EEPROM_VERSION = 0x01;  
 ​  
 struct DeviceConfig_t {  
     uint8_t version;  
     char    userID[MAX_USER_ID_LEN+1];          // Add one char for termination char  
     uint8_t numGroups;  
     uint8_t deviceGroups[MAX_DEVICE_GROUPS];  
 };  
 ​  
 DeviceConfig_t config;  
 ​  
 void printConfig(DeviceConfig_t &config) {  
     Log.trace("EEPROM Configuration:");  
     Log.trace("    Config Version:    %02X", config.version);  
     Log.trace("    User ID:           \"%s\"", config.userID);  
     Log.trace("    Num Device Groups: %u", config.numGroups);  
     Log.trace("    Device Groups:     %s", uint8ArrToString(config.deviceGroups, MAX_DEVICE_GROUPS).c_str());  
 }  
 ​  
 void writeConfigToEEPROM(DeviceConfig_t &config) {  
     EEPROM.put(0, config);  
     Log.info("New config written to EEPROM");  
     printConfig(config);  
 }  
 ​  
 void readOrInitEEPROM(DeviceConfig_t &config) {  
     // Attempt to configure device from EEPROM  
     Log.info("Attempt to configure from EEPROM...");  
     Log.trace("EEPROM length: %u bytes", (unsigned int)EEPROM.length());  
     Log.trace("Config length: %u bytes", (unsigned int)sizeof(config));  
     EEPROM.get(0, config);  
     Log.trace("EEPROM read");  
 ​  
     if (config.version == 0xFF) {  
         // Device is unconfigured - set some sane defaults  
         Log.info("EEPROM unconfigured: setting defaults");  
         config.version = EEPROM_VERSION;  
         strcpy(config.userID, "000000");  
         config.numGroups = 0;  
         for (int i = 0; i < MAX_DEVICE_GROUPS; i++) {  
             config.deviceGroups[i] = 0;  
         }  
     } else {  
         Log.info("Configure success");  
     }  
 ​  
     // Show what we have done  
     printConfig(config);  
 }

Next, we need to add our configuration initialization method to our `setup()`, which now becomes:

 void setup() {  
     // Using the RGB LED as an "output" for this example  
     RGB.control(true);  
 ​  
     // Read our EEPROM configuration  
     readOrInitEEPROM(config);  
 ​  
     // Set up our subscription to events to the configured User ID  
     Particle.subscribe(config.userID, parseMessage, MY_DEVICES);  
 }

Finally, we need to point our comparisons in the `parseMessage()` routine at our new `config` struct:

* `deviceGroups[i]` becomes `config.deviceGroups[i]`
* `userID` becomes `config.userID`

### Running the Example

Now we have our configuration parameters, `userID` and `deviceGroups` stored in EEPROM. If you run this code it will run fine, except our devices will now only respond to the values defined in the `readOrInitEEPROM()` method!

In order for these parameters to be truly dynamic and configurable, we need to take advantage of another Particle Primitive: `Particle.function()`.

## Commissioning Individual Devices with Particle.function()

Now with our configurable parameters stored and accessible in EEPROM, it is time to link this functionality to the cloud. Below is some example code that creates three Particle functions that:

1. `addToGroup()`: Adding a particular device to a **device group**
2. `clearGroups()`: **Clearing all groups** a device is assigned to
3. `setUserID()`:Setting the device's associated **User ID**

 // ----------------------------------------------------------------------------------------------------  
 // The following functions are exposed as Particle.function() instances in the cloud  
 // ----------------------------------------------------------------------------------------------------  
 ​  
 int addToGroup(String extra) {  
     // Parse function argument and do some basic range checking, as groups are specified as a uint8_t  
     int parsedGroup = (int)strtol(extra.c_str(), NULL, 10);  
     if (parsedGroup > 0 && parsedGroup < 256) {  
         if (config.numGroups < MAX_DEVICE_GROUPS) {  
             config.deviceGroups[config.numGroups] = (uint8_t)parsedGroup;  
             config.numGroups++;  
             writeConfigToEEPROM(config);  
             Log.info("Device added to group %u (%u groups total)", (uint8_t)parsedGroup, config.numGroups);  
             return parsedGroup;  
         } else {  
             int retcode = -2;  
             Log.code(retcode).details("Max number of groups exceeded").warn("Cannot add device to group %u", (uint8_t)parsedGroup);  
             return retcode;  // No more room to add groups  
         }  
     } else {  
         int retcode = -1;  
         Log.code(retcode).details("Group number invalid").warn("Invalid group received: %s", extra.c_str());  
         return retcode;  // Out of range  
     }  
 }  
 ​  
 int clearGroups(String extra) {  
     config.numGroups = 0;  
     writeConfigToEEPROM(config);  
     Log.info("Groups cleared");  
     return 0;  
 }  
 ​  
 int setUserID(String extra) {  
     // Basic bounds checking for sanity  
     if (extra.length() > 0) {  
         // Process our new User ID (restrict length to MAX_USER_ID_LEN) and write configuration  
         strncpy(config.userID, extra.c_str(), MAX_USER_ID_LEN);  
         config.userID[MAX_USER_ID_LEN] = 0x0;    // Ensure termination char for safety  
         writeConfigToEEPROM(config);  
 ​  
         // Resubscribe to events addressed at our new User  
         Particle.unsubscribe(); // NOTE: THIS WILL UNSUBSCRIBE FROM ALL SUBSCRIPTIONS  
         Particle.subscribe(config.userID, parseMessage, MY_DEVICES);  
           
         Log.info("New user ID set: %s", config.userID);  
     } else {  
         int retcode = -1;  
         Log.code(retcode).details("Empty string received").warn("Reject new User ID setting");  
         return retcode;  
     }  
     return 0;  
 }

In addition to defining the above functions, we need to register them with the cloud. For that we call the `Particle.function()` method at the beginning of our `setup()` routine, which now becomes:

 void setup() {  
     // Functions and variables should always be set up first  
     Particle.function("addToGroup", addToGroup);  
     Particle.function("clearGroups", clearGroups);  
     Particle.function("setUserID", setUserID);  
       
     // Using the RGB LED as an "output" for this example  
     RGB.control(true);  
 ​  
     // Read our EEPROM configuration  
     readOrInitEEPROM(config);  
 ​  
     // Set up our subscription to events to the configured User ID  
     Particle.subscribe(config.userID, parseMessage, MY_DEVICES);  
 }

Once your device comes online, these three functions will appear in the right hand side of the console and can be used to provision a device at manufacturing time with a specific User ID, or enable a user in the field to dynamically create groups of devices.

Using `Particle.function()` works great here because these functions all act on a _specific device_, and seldomly need to be called — only during intial provisioning, or when a user requests to group/ungroup devices. They form a feature that is used outside of the main use case for our example product (turning irrigation valves on and off), but that is still critical for the product as a whole.

## Conclusion

In this example, we've illustrated how to use the various Particle pub/sub primitives to build a communication architecture that can scale as your fleet grows, provides configurability to the product owner and end user with the on-board EEPROM, and enables dynamic configuration of devices with Particle functions.

When building your own product, it is important to consider the following guidelines about which actions to use events for and which to use Functions and Variables for:

* **Events** are intended for use when addressing multiple units at once. They are perfect when an action needs to take place across an entire fleet, or across a group of devices. They are also more configurable than Functions and Variables, as subscriptions can be updated at runtime.
* **Functions and Variables** are intended for use when only a single device is involved in a query, and this query is intended to happen infrequently. They are great for when you want to perform a diagnostic on a specific device to troubleshoot an issue, or commission a device that has just been deployed to a customer site.

Also, please note that Functions and Variables have an impact on data consumption: calls to either require twice the data than publishing an event! This is due to the acknowledge structure of our communication stack — each Function or Variable requires two call/response cycles with our cloud, whereas a Publish only requires one.
