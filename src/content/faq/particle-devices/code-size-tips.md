---
title: Code Size Tips
layout: faq.hbs
columns: two
devices: [ photon,electron ]
order: 1150
---

# Code Size Tips

*Optimizing code size for the Particle platform*

There are several different things you might want to optimize for, described in the sections below.

## Flash

The Photon/P1/Electron have a 128 Kbyte (131072 byte) flash memory sector for user code. Within the flash, there are a number of things including:

- Your compiled code
- Strings
- Variables initialized to values other than 0
- C++ template expansions
- Some overhead 

### Your compiled code

The flash memory section contains your compiled C++ code. It's compiled optimized for size, so the compiler itself will attempt to make your code as small as possible.

There's also a bit of overhead; the smallest possible program uses about 4460 bytes (targeting system firmware 0.6.2).

```
void setup() {
}

void loop() {
}
```

The size output is:

```
Output of arm-none-eabi-size:

text	data	bss	dec	hex
4460	8	1424	5892	1704

In a nutshell:
Flash used	4468 / 110592	4.0 %
RAM used	1432 / 20480	7.0 %
```

This output is from Particle Build (Web IDE). Use the Verify button, then click on the i-in-circle icon in the status bar in the status bar at the bottom of the window.

Note: The maximum value in RAM used is wrong. It's 20480 bytes on the Spark Core. You can exceed this by quite a bit and your code will continue to work. The Photon and Electron usually have at least 60 Kbytes free. The amount used, however, is correct.

### Strings

String constants are also included in the flash memory section. Here's a slightly longer code example with a string constant:

```
void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println("abc");
    delay(1000);
}
```

```
Flash used	4612 / 110592	4.2 %
RAM used	1432 / 20480	7.0 %
```

If you make the string longer by about 50 bytes:

```
void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println("abc01234567890123456789012345678901234567890123456789");
    delay(1000);
}
```

```
Flash used	4660 / 110592	4.2 %
RAM used	1432 / 20480	7.0 %
```

Note that the flash used is not exactly 50 bytes larger because of the way strings are laid out in memory and padding, but it's close.

The compiler is smart enough to reuse duplicate strings:

```
void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println("abc01234567890123456789012345678901234567890123456789");
    Serial.println("abc01234567890123456789012345678901234567890123456789");
    delay(1000);
}
```

```
Flash used	4660 / 110592	4.2 %
RAM used	1432 / 20480	7.0 %
```

However changing just one byte means the string can't be shared anymore:

```
void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println("abc01234567890123456789012345678901234567890123456789");
    Serial.println("xbc01234567890123456789012345678901234567890123456789");
    delay(1000);
}
```

```
Flash used	4724 / 110592	4.3 %
RAM used	1432 / 20480	7.0 %
```

Using a `const char *` variable increases the size of the flash used by 4 bytes, the size of a pointer variable. It also increases RAM used by 4 bytes.

```
const char *str = "abc01234567890123456789012345678901234567890123456789";

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(str);
    delay(1000);
}
```

```
Flash used	4664 / 110592	4.2 %
RAM used	1436 / 20480	7.0 %
```

However, using `const char * const` instead drops the flash and RAM usage back down to what it would be for just using the string constant.

```
const char * const str = "abc01234567890123456789012345678901234567890123456789";

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(str);
    delay(1000);
}
```

```
Flash used	4660 / 110592	4.2 %
RAM used	1432 / 20480	7.0 %
```

The reason is that `const char *` indicates that you can't modify the contents of str. However, you can assign str to a completely different value later on. By making it `const char * const`, str can't be modified at all, so the compiler doesn't need to reserve a variable or initializer, saving 4 bytes of flash and 4 bytes of RAM.

### Variables initialized to values other than 0

Starting with this code:

```
unsigned long valueA = 0;
unsigned long valueB = 0;

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.printlnf("a=%lx b=%lx", valueA, valueB);
    delay(1000);
}
```

```
Flash used	4756 / 110592	4.3 %
RAM used	1440 / 20480	7.0 %
```

If instead, valueA and valueB are initialized to some other values, you get this:

```
unsigned long valueA = 0x12345678;
unsigned long valueB = 1;

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.printlnf("a=%lx b=%lx", valueA, valueB);
    delay(1000);
}
```

```
Flash used	4764 / 110592	4.3 %
RAM used	1440 / 20480	7.0 %
```

The amount of RAM is the same, because the variables are still allocated but an additional 8 bytes of flash are used, because the values are initialized to non-zero values.

The compiler puts all of the values initialized to zero near each other and bulk sets them to 0 through code, rather than saving the individual values in flash.

Making the variables const, so they cannot be modified, saves both flash and RAM. 

```
const unsigned long valueA = 0x12345678;
const unsigned long valueB = 1;

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.printlnf("a=%lx b=%lx", valueA, valueB);
    delay(1000);
}
```

```
Flash used	4740 / 110592	4.3 %
RAM used	1432 / 20480	7.0 %
```

Using const variables is the same as using \#define in terms of flash and RAM, however they're better because they have an explicit type.

```
#define valueA 0x12345678
#define valueB 1

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.printlnf("a=%lx b=%lx", valueA, valueB);
    delay(1000);
}
```

```
Flash used	4740 / 110592	4.3 %
RAM used	1432 / 20480	7.0 %
```

In C/C++ the actual variable names you use are not included in the compiled code, so using really long names doesn't make your flash consumption any larger.

```
const unsigned long valueWithAnExceptionallyLongNameThisWouldByAPainToType = 0x12345678;
const unsigned long valueB = 1;

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.printlnf("a=%lx b=%lx", valueWithAnExceptionallyLongNameThisWouldByAPainToType, valueB);
    delay(1000);
}
```

```
Flash used	4740 / 110592	4.3 %
RAM used	1432 / 20480	7.0 %
```

Variables also includes initialized arrays.

```
const uint8_t buf[10] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

void setup() {
    Serial.begin(9600);
}

void loop() {

    Serial.printlnf("buf[0]=%d", buf[0]);
    delay(1000);
}
```

```
Flash used	4740 / 110592	4.3 %
RAM used	1432 / 20480	7.0 %
```

Making the array non-const means the array can be modified at runtime, so it's necessary to also allocate RAM for it, as described in more detail in the next section.

```
uint8_t buf[10] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

void setup() {
    Serial.begin(9600);
}

void loop() {

    Serial.printlnf("buf[0]=%d", buf[0]);
    delay(1000);
}
```

```
Flash used	4752 / 110592	4.3 %
RAM used	1444 / 20480	7.1 %
```


## Statically allocated RAM

Certain variables that require RAM are allocated at compile time. These include:

- Global variables and objects
- Static local variables

In this simple example, we have a small 28-byte buffer allocated as a global variable:

```
char buf[28];

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```
Flash used	4596 / 110592	4.2 %
RAM used	1460 / 20480	7.1 %
```

If we make the buffer 100 bytes larger, the RAM used goes up by 100 bytes as expected:

```
char buf[128];

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```
Flash used	4596 / 110592	4.2 %
RAM used	1560 / 20480	7.6 %
```

Zero initialization is free. This uses the same amount of flash and RAM:

```
char buf[128] = {0};

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```
Flash used	4596 / 110592	4.2 %
RAM used	1560 / 20480	7.6 %
```

However as stated above, initialization to non-zero values requires the entire buffer contents be saved in flash. In addition to not being a valid cstring, note how much the flash usage increases!

```
char buf[128] = {255};

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```
Flash used	4724 / 110592	4.3 %
RAM used	1560 / 20480	7.6 %
```

Making the variable a static local variable results in the same usage as the example before the last one.

```
void setup() {
    Serial.begin(9600);
}

void loop() {
    static char buf[128];
    Serial.println(buf);
    delay(1000);
}
```

```
Flash used	4596 / 110592	4.2 %
RAM used	1556 / 20480	7.6 %
```

Note that leaving the static keyword out does make a difference - without static is a stack allocated variable, which is discussed below.

One of the advantages of using a statically allocated buffer like this is that since the memory is allocated at compile time, if your code successfully compiles, you know the RAM will be available when it's run. 

For example, if you try to compile this, you get an error. A bit obscure, but an error nonetheless:

```
char buf[128000];

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```
arm-none-eabi/bin/ld: target/workspace.elf section `.bss' will not fit in region `SRAM'
arm-none-eabi/bin/ld: Insufficient room for heap.
arm-none-eabi/bin/ld: link_heap_start is in the wrong memory space
arm-none-eabi/bin/ld: region `SRAM' overflowed by 42132 bytes
```


## Dynamically allocated RAM (heap)


### Memory allocated with malloc, new, etc.

Here's an example not using malloc.

```
char buf[1000];

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```
Flash used	4596 / 110592	4.2 %
RAM used	2432 / 20480	11.9 %
```

And here's the example using malloc instead:

```
char *buf;

void setup() {
    Serial.begin(9600);
    buf = (char *) malloc(1000);
}

void loop() {
    Serial.println(buf);
    delay(1000);
}
```

```
Flash used	4644 / 110592	4.2 %
RAM used	1436 / 20480	7.0 %
```

Note that the RAM used went down, but there's no such thing as a free lunch. The RAM used measure is RAM allocated at compile time, and when you use malloc, it just allocates the data at runtime instead.

To illustrate this better, here's a more complicated example using malloc. You can see how the free memory (dynamically allocated heap space) drops.

```
char *buf;

void setup() {
    Serial.begin(9600);
    Serial.printlnf("before %lu", System.freeMemory());
    buf = (char *) malloc(1024);
    Serial.printlnf("after %lu", System.freeMemory());
}

void loop() {
    Serial.printlnf("buf[0]=%d", buf[0]);
    delay(1000);
}
```

```
Flash used	4900 / 110592	4.4 %
RAM used	1436 / 20480	7.0 %
```

And the output on the serial monitor when running the program:

```
before 59336
after 58328
buf[0]=0
```

The drop in free RAM isn't exactly 1000 bytes because there's some overhead for each memory allocation as well.

### String objects

The [String](https://docs.particle.io/reference/firmware/#string-class) object allocates the data for the string itself dynamically, on the heap. The object itself (16 bytes) is allocated based on how it's allocated.

This is a really simple program:

```
String str;

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(str);
    delay(1000);
}
```

```
Flash used	4836 / 110592	4.4 %
RAM used	1448 / 20480	7.1 %
```

Initializing it adds a uses a little more flash, but even though the string can be modified, it doesn't increase RAM used because the string contents are stored dynamically on the heap. It would show up as a decrease in System.freeMemory() instead.

```
String str("hello, this is a test");

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(str);
    delay(1000);
}
```

```
Flash used	4868 / 110592	4.4 %
RAM used	1448 / 20480	7.1 %
```

### Fragmentation

One thing to watch out for is fragmentation. When you allocate a block of memory on the heap it needs to stay in that location until freed. Over time, you can get blocks scattered about the heap, making it impossible to allocate large blocks of memory. You might have enough free bytes, but not enough contiguous bytes to allocate a large block.

It's usually a good idea to allocate any large buffers you need early, either as static variables (statically allocated) or using malloc/new early in execution (from setup, for example).

## Stack

Stack allocated variables include most function local variables. 

```
void setup() {
    Serial.begin(9600);
}

void loop() {
    char buf[256]; // <- stack allocated
    
    Serial.printlnf("buf[0]=%d", buf[0]);
    delay(1000);
}
```

```
Flash used	4740 / 110592	4.3 %
RAM used	1432 / 20480	7.0 %
```

The main advantage of the stack allocated variables is they only take up space when in the scope of the function, and allocation is very fast. Since the allocation goes away when the function exits, it does not lead to fragmentation.

The main caveat is that the stack size is limited:

- Main loop thread: 6144 bytes
- Software timer callbacks: 1024 bytes

Remember that if you have a function that calls another function, the local variables for both functions will be on the stack. It's the total of all of the local variables for the deepest nesting of functions you can have. 

Also note that stack allocation variables are not initialized to zero automatically, so make sure you initialize them!


## Retained memory

[Retained memory](https://docs.particle.io/reference/firmware/photon/#backup-ram-sram-), or the special static RAM (SRAM) or backup RAM section in the processor, is a special block of 3068 bytes that is preserved when the processor is in deep sleep mode and across resets. On the Photon, it's also possible to add a coin cell battery to preserve the contents when the power is removed.

Unlike flash, the SRAM block can be written to at full processor speed, and does not wear out when written to.

Retained memory does not affect the flash size or the RAM used size - it's allocated out of the separate SRAM block.

```
STARTUP(System.enableFeature(FEATURE_RETAINED_MEMORY));

retained char saved[32];

void setup() {
    Serial.begin(9600);
}

void loop() {

    Serial.printlnf("saved[0]=%d", saved[0]);
    delay(1000);
}
```

```
Flash used	4804 / 110592	4.3 %
RAM used	1464 / 20480	7.1 %
```


