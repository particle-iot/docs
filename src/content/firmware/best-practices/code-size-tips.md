---
title: Code size tips
layout: commonTwo.hbs
columns: two
---

# {{title}}

*Optimizing code size for the Particle platform*

There are several different things you might want to optimize for, described in the sections below.

## Flash size optimization

Gen 2 devices including the Photon, P1, Electron, and E-Series have a 128 Kbyte (131,072 byte) flash memory sector for user code. Within the flash, there are a number of things including:

- Your compiled code
- String constants
- Variables initialized to values other than 0
- C++ template expansions
- Some overhead

Gen 3 devices (including the Argon, Boron, B-Series SoM, and Tracker) running Device OS 3.1 or later have 256 Kbyte user binaries (262,144 byte), double the space. Earlier versions of Device OS only supported 128K binaries like Gen 2. For more information, see [256K user binaries](/reference/device-os/256K-user-binaries/).

## Your compiled code

The flash memory section contains your compiled C++ code. It's compiled optimized for size, so the compiler itself will attempt to make your code as small as possible.

There's also a bit of overhead; the smallest possible program uses about 3,596 bytes (Boron targeting Device OS 2.3.0).

```cpp
void setup() {
}

void loop() {
}
```

### Particle Workbench

In Particle Workbench, if building locally there is no summary, but the text, data, and bss values work in the same way.

```none
Creating /Users/rick/Documents/src/CodeSize/target/2.3.0/boron/platform_user_ram.ld ...
   text    data     bss     dec     hex   filename
   3548     112     332    3992     f98   /Users/rick/Documents/src/CodeSize/target/2.3.0/boron/CodeSize.elf
```   

- text is the code and constant data that is stored in flash memory
- data is initialized data. It uses both flash and RAM.
- bss is the uninitialized data. If you allocate uninitialized global or static local variables, they get added to bss.
- dec is the sum of text, data, and bss in decimal.
- hex is the sum of text, data, and bss in hexadecimal. 

All Gen 2 and Gen 3 devices uses execute-in-place (XIP) the code runs directly out of flash memory and is not copied into RAM.

- To calculate total flash used, add text and data.
- To calculate total RAM statically allocated, add data and bss.

### Web IDE

The size output in the Web IDE is:

```none
Output of arm-none-eabi-size:

text   data   bss   dec   hex
3484   112    588   4184  1058

In a nutshell:
Flash used	3596 bytes
RAM used	700 bytes
```

Use the Verify button, then click on the i-in-circle icon in the status bar in the status bar at the bottom of the window.

The nutshell summary below that lists:

- Flash used is the sum of text and data.
- RAM used is the sum of data and bss.


## Strings

String constants are also included in the flash memory section text. Here's a slightly longer code example with a string constant:

```cpp
void setup() {
    Serial.begin();
}

void loop() {
    Serial.println("abc");
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3676     112     332    4120    1018 
```

If you make the string longer by about 50 bytes:

```cpp
void setup() {
    Serial.begin();
}

void loop() {
    Serial.println("abc01234567890123456789012345678901234567890123456789");
    delay(1000);
}
```

```none
   text    data     bss     dec     hex
   3724     112     332    4168    1048 
```

Note that the flash used is not exactly 50 bytes larger because of the way strings are laid out in memory and padding, but it's close.

The compiler is smart enough to reuse duplicate strings. Even though the text (code and initialized data) goes up by 16 bytes for the extra Serial.println call, because of the extra Serial.printlnf call, it does not go up by the nearly 50 bytes for an extra copy of the string in flash.

```cpp
void setup() {
    Serial.begin();
}

void loop() {
    Serial.println("abc01234567890123456789012345678901234567890123456789");
    Serial.println("abc01234567890123456789012345678901234567890123456789");
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3740     112     332    4184    1058
```

However changing just one byte means the string can't be shared anymore:

```cpp
void setup() {
    Serial.begin();
}

void loop() {
    Serial.println("abc01234567890123456789012345678901234567890123456789");
    Serial.println("xbc01234567890123456789012345678901234567890123456789");
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3804     112     332    4248    1098 
```

Using a `const char *` variable increases increases RAM used by 4 bytes (data goes from 112 to 116) because of the pointer variable `str`.

```cpp
const char *str = "abc01234567890123456789012345678901234567890123456789";

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(str);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3740     116     332    4188    105c 
```

However, using `const char * const` instead drops the text and data back down to what it would be for just using the string constant.

```cpp
const char * const str = "abc01234567890123456789012345678901234567890123456789";

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(str);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3724     112     332    4168    1048 
```

The reason is that `const char *` indicates that you can't modify the contents of str. However, you can assign str to a completely different value later on. By making it `const char * const`, the `str` variable can't be modified at all, so the compiler doesn't need to reserve a variable or initializer, saving 4 bytes of flash and 4 bytes of RAM.

## Uninitialized and zero-initialized variables

Starting with this code:

```cpp
unsigned long valueA;
unsigned long valueB;
double valueC;

void setup() {
    Serial.begin();
}

void loop() {
    Serial.printlnf("a=%lx b=%lx c=%lf", valueA, valueB, valueC);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex
   3852     112     348    4312    10d8
```

Initializing variables to 0 does not change text, data, or bss. This is because during boot RAM is initialized to 0, so it's not initialized again, even if you set it in the compiler.

```cpp
unsigned long valueA = 0;
unsigned long valueB = 0;
double valueC = 0.0;

void setup() {
    Serial.begin();
}

void loop() {
    Serial.printlnf("a=%lx b=%lx c=%lf", valueA, valueB, valueC);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex filename
   3852     112     348    4312    10d
```

Note, however, that stack local variables are not initialized to 0 automatically, so make sure you initialize those. It's usually good practice to initialize all variables, because there is essentially no cost to initialize them to 0 and it will prevent horrible to debug bugs.


## Variables initialized to values other than 0

Starting with this code, data goes up by 16 bytes (unsigned long = 4 bytes, double = 8 bytes), but bss goes down by 16 bytes. Since the total flash used is text + data, total flash used goes up by 16 bytes because of initialization.

```cpp
unsigned long valueA = 0x12345678;
unsigned long valueB = 1;
double valueC = 1234.5;

void setup() {
    Serial.begin();
}

void loop() {
    Serial.printlnf("a=%lx b=%lx", valueA, valueB);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3852     128     332    4312    10d8
```

Making the variables const, so they cannot be modified, saves both flash and RAM.

```cpp
const unsigned long valueA = 0x12345678;
const unsigned long valueB = 1;
const double valueC = 1234.5;

void setup() {
    Serial.begin();
}

void loop() {
    Serial.printlnf("a=%lx b=%lx c=%lf", valueA, valueB, valueC);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3848     112     332    4292    10c4 
```

Using `const` variables is the same as using `#define` in terms of flash and RAM, however they're better because they have an explicit type. The `#define` version will also generate compiler warnings in the `Serial.printlnf` line.

```cpp
// Avoid using defines, better to use const variables:
#define valueA 0x12345678
#define valueB 1
#define valueC 1234.5

void setup() {
    Serial.begin();
}

void loop() {
    Serial.printlnf("a=%lx b=%lx c=%lf", valueA, valueB, valueC);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3848     112     332    4292    10c4
```

In C/C++ the actual variable names you use are not included in the compiled code, so using really long names doesn't make your flash consumption any larger.

```cpp
const unsigned long valueWithAnExceptionallyLongNameThisWouldByAPainToType = 0x12345678;
const unsigned long valueB = 1;

void setup() {
    Serial.begin();
}

void loop() {
    Serial.printlnf("a=%lx b=%lx", valueWithAnExceptionallyLongNameThisWouldByAPainToType, valueB);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3852     132     332    4316    10dc
```

## Initialized arrays

Variables also includes initialized arrays.

```cpp
const uint8_t buf[10] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

void setup() {
    Serial.begin();
}

void loop() {

    Serial.printlnf("buf[0]=%d", buf[0]);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3804     112     332    4248    1098
```

Making the array non-const means the array can be modified at runtime, so it's necessary to also allocate RAM for it, as described in more detail in the next section.

```cpp
uint8_t buf[10] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

void setup() {
    Serial.begin();
}

void loop() {

    Serial.printlnf("buf[0]=%d", buf[0]);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3820     124     332    4276    10b4
```

## Statically allocated RAM

Certain variables that require RAM are allocated at compile time. These include:

- Global variables and objects
- Static local variables

In this simple example, we have a small 28-byte buffer allocated as a global variable:

```cpp
char buf[28];

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex
   3676     112     360    4148    1034
```

If we make the buffer 100 bytes larger, the bss (uninitialized RAM) goes up by 100 bytes as expected:

```cpp
char buf[128];

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex
   3676     112     460    4248    1098 
```

Zero initialization is free. This uses the same amount of flash and RAM:

```cpp
char buf[128] = {0};

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3676     112     460    4248    1098 
```

However as stated above, initialization to non-zero values requires the entire buffer contents be saved in flash. In addition to not being a valid c-string, note that data increases by 128. Recall that the total flash usage is text + data, so this directly affects the amount of flash. 

```cpp
char buf[128] = {255};

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3676     240     332    4248    1098 
```

If you have a large array you want to initialize to a non-zero value, it's more flash-efficient to initialize it with a loop at runtime. The text value increase by 16 bytes because of the for loop code but the data decreases by 128 bytes, saving 112 bytes of flash space. This becomes more noticeable for even larger buffers.

```cpp
char buf[128];

void setup() {
    Serial.begin();

    for(size_t ii = 0; ii < sizeof(buf); ii++) {
        buf[ii] = 255;
    }
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex filename
   3692     112     460    4264    10a8 
```

Another option is to use the standard C library `memset` function to do the initialization:

```cpp
char buf[128];

void setup() {
    Serial.begin();

    memset(buf, 255, sizeof(buf));
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex
   3692     112     460    4264    10a8 
```

Making the variable a static local variable results in the same usage as the uninitialized global example:

```cpp
void setup() {
    Serial.begin();
}

void loop() {
    static char buf[128];
    Serial.println(buf);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3676     112     460    4248    1098
```

Note that leaving the static keyword out does make a difference - without static is a stack allocated variable, which is discussed below.

One of the advantages of using a statically allocated buffer like this is that since the memory is allocated at compile time, if your code successfully compiles, you know the RAM will be available when it's run.

For example, if you try to compile this, you get an error. A bit obscure, but an error nonetheless:

```cpp
char buf[128000];

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```
arm-none-eabi/bin/ld: /Users/rick/Documents/src/CodeSize/target/2.3.0/boron/CodeSize.elf section `.bss' will not fit in region `SRAM'
arm-none-eabi/bin/ld: Insufficient room for .data and .bss sections
arm-none-eabi/bin/ld: section .backup VMA [000000002003f400,000000002003f403] overlaps section .bss VMA [000000002002846c,00000000200479b7]
arm-none-eabi/bin/ld: region `SRAM' overflowed by 37304 bytes
collect2: error: ld returned 1 exit status
```

## Dynamically allocated RAM (heap)

Memory allocated with malloc, new, etc.
Here's an example not using malloc.

```cpp
char buf[1000];

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex
   3676     112    1332    5120    1400
```

And here's the example using malloc instead:

```cpp
char *buf;

void setup() {
    Serial.begin();
    buf = (char *) malloc(1000);
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex
   3692     112     336    4140    102c 
```

Note that the bss (uninitialized variables) went way down, and the total RAM usage is data + bss, so that would go down as well.

There's no such thing as a free lunch, however. The RAM used measure is RAM allocated at compile time, and when you use `malloc`, it just allocates the data at runtime instead.

To illustrate this better, here's a more complicated example using `malloc`. You can see how the free memory (dynamically allocated heap space) drops.

```cpp
char *buf;

void setup() {
    Serial.begin();
    Serial.printlnf("before %lu", System.freeMemory());
    buf = (char *) malloc(1024);
    Serial.printlnf("after %lu", System.freeMemory());
}

void loop() {
    Serial.printlnf("buf[0]=%d", buf[0]);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3948     112     336    4396    112c
```

And the output on the serial monitor when running the program:

```
before 59336
after 58328
buf[0]=0
```

The drop in free RAM isn't exactly 1000 bytes because there's some overhead for each memory allocation as well.

## String objects

The String object allocates the data for the string itself dynamically, on the heap. The object itself (16 bytes) is allocated based on how it's allocated.

This is a really simple program:

```cpp
String str;

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(str);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3884     112     348    4344    10f8 
```

Initializing it adds a uses a little more flash (text), but even though the string can be modified, it doesn't increase RAM used because the string contents are stored dynamically on the heap. It would show up as a decrease in `System.freeMemory()` instead. Note that both data and bss are unchanged.

```cpp
String str("hello, this is a test");

void setup() {
    Serial.begin();
}

void loop() {
    Serial.println(str);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex
   3916     112     348    4376    1118 
```

## Fragmentation

One thing to watch out for is fragmentation. When you allocate a block of memory on the heap it needs to stay in that location until freed. Over time, you can get blocks scattered about the heap, making it impossible to allocate large blocks of memory. You might have enough free bytes, but not enough contiguous bytes to allocate a large block.

It's usually a good idea to allocate any large buffers you need early, either as static variables (statically allocated) or using malloc/new early in execution (from setup, for example).

Another way to deal with fragmentation is to use an out-of-memory handler, as shown below in [out of memory handler](#out-of-memory-handler). If an allocation fails, you can reset the device, using `System.reset()`. Another option is to periodically reset the device, for example once per week. If you are using sleep mode `HIBERNATE` the device will reset after each wake cycle, which will also reduce fragmentation.

To find the largest free block, you can use:

```cpp
#include "Particle.h"
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SerialLogHandler logHandler;
void setup() {
}

void loop() {
    static unsigned long lastUpdate = 0;
    static runtime_info_t heapInfo;
    
    if (millis() - lastUpdate >= 10000UL) {
        lastUpdate = millis();
        
        heapInfo.size = sizeof(heapInfo);
        HAL_Core_Runtime_Info(&heapInfo, nullptr);

        Log.info("FreeHeapMem: %6lu LargestBlockHeapMem: %lu", 
            heapInfo.freeheap, heapInfo.largest_free_block_heap);
    }
}
```

## Stack

Stack allocated variables include most function local variables.

```cpp
void setup() {
    Serial.begin();
}

void loop() {
    char buf[256]; // <- stack allocated
    
    Serial.printlnf("buf[0]=%d", buf[0]);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex
   3820     112     332    4264    10a8
```

The main advantage of the stack allocated variables is they only take up space when in the scope of the function, and allocation is very fast. Since the allocation goes away when the function exits, it does not lead to fragmentation.

The main caveat is that the stack size is limited:

- Main loop thread: 6144 bytes
- Software timer callbacks: 1024 bytes

Remember that if you have a function that calls another function, the local variables for both functions will be on the stack. It's the total of all of the local variables for the deepest nesting of functions you can have.

Also note that stack allocation variables are not initialized to zero automatically, so make sure you initialize them! The code above does not initialize the variable, and it generates a compiler warning:

```
src/CodeSize.cpp: In function 'loop':
src/CodeSize.cpp:10:39: warning: 'buf[0]' is used uninitialized in this function [-Wuninitialized]
   10 |     Serial.printlnf("buf[0]=%d", buf[0]);
      |  
```

## Retained memory

Retained memory, or the special static RAM (SRAM) or backup RAM section in the processor, is a special block of 3068 bytes that is preserved when the processor is in deep sleep mode and across resets. On the Photon, it's also possible to add a coin cell battery to preserve the contents when the power is removed.

Unlike flash, the SRAM block can be written to at full processor speed, and does not wear out when written to.

Retained memory does not affect the RAM used size - it's allocated out of the separate SRAM block. It does use flash space equal to the amount of retained memory used to initialize values. Note that on Gen 3 devices (Argon, Boron, B-Series SoM), retained memory initialization is only supported in Device OS 1.5.0 and later.

```cpp
STARTUP(System.enableFeature(FEATURE_RETAINED_MEMORY));

retained char saved[32];

void setup() {
    Serial.begin();
}

void loop() {

    Serial.printlnf("saved[0]=%d", saved[0]);
    delay(1000);
}
```

```none
   text    data     bss     dec     hex 
   3836     144     332    4312    10d8 
```

## Out of memory handler

When a heap allocation such as `new`, `malloc`, `strdup`, etc. fails, the out of memory handler is called, then the allocation returns null, as exceptions are not enabled on Particle devices.

We strongly recommend leaving a minimum of 10K of available RAM at all times to assure proper operation of the system. Failure to keep enough
free memory and not using an out of memory handler can cause failure to reconnect to the network or the cloud. 

{{collapse op="start" label="Why isn't this automatic?"}}

The reason low memory (under 10K or so) causes unexpected behavior such as connection failure, is that memory needs to be dynamically allocated during the connection process. When the free memory is low, it is also likely to be fragmented, preventing being able to allocate even blocks that are smaller than 10K. This causes the connection process to be aborted and restart. But since there is no way to defragment RAM except by restarting the device, the process tends to fail repeatedly unless an out of memory handler triggers the device to reset.

Other than OTA, Device OS never resets the device spontaneously, because this could adversely affect things that are gathering data even if offline. The reason there is no default out of memory handler is that some applications will want to do something other than reset when out of memory. They might have large temporary data in RAM that they want to save to the file system instead of resetting, for example.
{{collapse op="end"}}

Using an out of memory handler, you can flag this situation, then from loop, you can reset the device. This is not the default behavior in Device OS, because in some cases you may want to continue execution, free some memory in an application-specific manner, or use other techniques to resolve the situation.

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

SerialLogHandler logHandler;

int outOfMemory = -1;

void outOfMemoryHandler(system_event_t event, int param);

const std::chrono::milliseconds freeMemoryLogTime = 5min;

void setup() {
    // Enabling an out of memory handler is a good safety tip. If we run out of
    // memory a System.reset() is done.
    System.on(out_of_memory, outOfMemoryHandler);

    // Connect to the Particle cloud
    Particle.connect();
}


void loop() {
    if (outOfMemory >= 0) {
        // An out of memory condition occurred - reset device.
        Log.info("out of memory occurred size=%d", outOfMemory);
        delay(100);

        System.reset();
    }

    // Log free memory periodically
    static unsigned long lastLog = 0;
    if (millis() - lastLog >= freeMemoryLogTime.count()) {
        lastLog = millis();
        Log.info("freeMemory=%lu", System.freeMemory());
    }
}

void outOfMemoryHandler(system_event_t event, int param) {
    outOfMemory = param;
}
```

```cpp
int outOfMemory = -1;
```

This is the flag variable used to hold the size of the allocation that failed. If its >= 0, an out-of-memory condition occurred.

```cpp
const std::chrono::milliseconds freeMemoryLogTime = 5min;
```

This code prints a serial debug log statement periodically with the free heap memory. This indicates how often to do this. This technique can help locate memory leaks.

```cpp
System.on(out_of_memory, outOfMemoryHandler);
```

This registers the out of memory handler with the system.

```cpp
if (outOfMemory >= 0) {
    // An out of memory condition occurred - reset device.
    Log.info("out of memory occurred size=%d", outOfMemory);
    delay(100);

    System.reset();
}
```

It's not safe to reset the system from the out of memory handler, so we check the flag from loop instead.

```cpp
static unsigned long lastLog = 0;
if (millis() - lastLog >= freeMemoryLogTime.count()) {
    lastLog = millis();
    Log.info("freeMemory=%lu", System.freeMemory());
}
```

This handles logging the free memory periodically. In some cases, you may want to include the free memory with other published information using `Particle.publish`.

```cpp
void outOfMemoryHandler(system_event_t event, int param) {
    outOfMemory = param;
}
```

This is the actual out-of-memory handler. Since it can be run out of other threads you should avoid doing anything complex like publishing, resetting the device, etc. within this function.
