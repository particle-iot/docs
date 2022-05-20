---
title: What is the difference between .cpp and .ino files?
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
When naming your main application file take notice of its extension as we support two main programming languages when writing firmware:

* Wiring (language used in Arduino) using **.ino** files
* C/C++ using the **.cpp** file extension

Wiring (.ino)

If you're used to Arduino or just new to firmware development you may want to use a .ino file. It is still a C/C++ file, however:

It automatically does a

#include "Particle.h"

transparently for you, so you don't need to manually include it to get definitions for constant like D0, D1, D2, ... and functions like Particle.publish().

Additionally, you do not need to create forward declarations in .ino files. Forward declarations allow you to use a function before it's been implemented in a file. For example this code is valid in a .ino file:

void setup() {  
   System.on(firmware_update, firmwareUpdateHandler);  
}  
  
void loop() {  
}  
  
void firmwareUpdateHandler(system_event_t event, int param) {  
  // Do something here  
}  
  
 Would instead need to be implemented like this in a .cpp file:

#include "Particle.h"  
  
void firmwareUpdateHandler(system_event_t event, int param); // forward declaration  
  
void setup() {  
   System.on(firmware_update, firmwareUpdateHandler);  
}  
  
void loop() {  
}  
  
void firmwareUpdateHandler(system_event_t event, int param) {  
  // Do something here  
}  
  
