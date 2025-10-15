---
title: Threading explainer
layout: commonTwo.hbs
columns: two
---
# {{title}}

Threads allow concurrent execution of multiple bits of code. They're popular in desktop operating systems like Windows and in languages like Java. Threads have limited support in the Particle platform, but exist.

Though the semantics are a bit different, you might use threads in the same way you would use separate processes in Unix as well.

Threading in Device OS is stable, and threads are used by Device OS internally and can be used judiciously.

Because Particle Devices have limited RAM and no virtual memory it's impractical to use a large number of threads. You should not expect to start dozens of threads as you might in a Java application, for example.

As with threaded programs on all platforms, you have to be careful with thread safety across API calls, preventing simultaneous access to resources by using a lock, and preventing deadlock.

See also [Threading](/reference/device-os/api/threading/threading/) in the Device OS API reference and [thread and interrupt safety](/firmware/best-practices/thread-interrupt-safety/).


## Using threads

A bit of background:

- Threads are based on FreeRTOS (currently) but there is abstraction layer over it in case this changes.
- Threads are preemptively scheduled.
- A thread that yields will be called up to 1000 times per second (1 millisecond interval).
- Basic synchronization capabilities exist, including mutex, recursive mutex, and queues.
- Most threads calls are not safe to use in an interrupt service routine. However you can use `os_queue_put` from an ISR.
- The default worker thread stack size is 3K. (Main loop is 6K bytes, and software timers are 1K).
- Threads are not supported on the Spark Core (Gen 1).
- You can use user threads whether you use `SYSTEM_THREAD(ENABLED)` or not, but you probably want to enable system threading.
- With Device OS {{systemThreadRequired}} and later, system thread is always enabled. For additional information, see [non-threaded system mode](/reference/discontinued/software/non-threaded-system-mode/).

### How fast does loop run?

The speed of the loop() function not using system threading varies depending on the device. Running this test code:

```cpp
#include "Particle.h"

SerialLogHandler logHandler;

unsigned long lastReport = 0;
int counter = 0;

void setup() {
}

void loop() {
	counter++;

	if (millis() - lastReport >= 1000) {
		lastReport = millis();

		Log.info("counter=%d", counter);
		counter = 0;
	}
}
```

The results for Photon (1.4.2):

```
0000061487 [app] INFO: counter=1000
0000062487 [app] INFO: counter=1000
0000063487 [app] INFO: counter=1000
0000064487 [app] INFO: counter=1000
0000065487 [app] INFO: counter=1000
0000066487 [app] INFO: counter=1001
```

Electron:

```
0000022916 [app] INFO: counter=91
0000023917 [app] INFO: counter=91
0000024918 [app] INFO: counter=91
0000025919 [app] INFO: counter=91
0000026920 [app] INFO: counter=91
0000027921 [app] INFO: counter=91
```

Argon:

```
0000012565 [app] INFO: counter=6875
0000013565 [app] INFO: counter=6871
0000014565 [app] INFO: counter=6878
0000015565 [app] INFO: counter=6873
0000016565 [app] INFO: counter=6875
0000017565 [app] INFO: counter=6876
```

P2 and Photon 2:

```
0000014885 [app] INFO: counter=10039
0000015885 [app] INFO: counter=10160
0000016885 [app] INFO: counter=10212
```

The results are quite different when the system thread is enabled:

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

unsigned long lastReport = 0;
int counter = 0;

void setup() {
}

void loop() {
	counter++;

	if (millis() - lastReport >= 1000) {
		lastReport = millis();

		Log.info("counter=%d", counter);
		counter = 0;
	}
}
```

For Photon 1.4.2:

```
0000004000 [app] INFO: counter=188644
0000005001 [app] INFO: counter=115429
0000006001 [app] INFO: counter=178045
0000007001 [app] INFO: counter=190002
0000008001 [app] INFO: counter=192766
0000009001 [app] INFO: counter=192819
0000010001 [app] INFO: counter=192768
```

Electron:

```
0000025000 [app] INFO: counter=183435
0000026000 [app] INFO: counter=183457
0000027000 [app] INFO: counter=183435
0000028000 [app] INFO: counter=183420
0000029000 [app] INFO: counter=183431
0000030000 [app] INFO: counter=183434
```

Argon:

```
0000015275 [app] INFO: counter=31493
0000016275 [app] INFO: counter=31566
0000017275 [app] INFO: counter=31688
0000018275 [app] INFO: counter=31658
```

P2 and Photon 2:

```
0000015000 [app] INFO: counter=77111
0000016000 [app] INFO: counter=77353
0000017000 [app] INFO: counter=77440
```

The takeaways is: 

**The number of loops varies depending on the device and system threading. Do not make assumptions about how often your loop will be executed!**


### How fast does a thread run?

Here's a simple example of implementing a thread to increment a counter in a loop. You should not use this code, use one of the yielding versions below instead.

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void);

volatile int counter = 0;
unsigned long lastReport = 0;

void setup() {
	new Thread("testThread", threadFunction);
}

void loop() {
	if (millis() - lastReport >= 1000) {
		lastReport = millis();

		Log.info("counter=%d", counter);
		counter = 0;
	}
}


void threadFunction(void) {
	while(true) {
		counter++;

		// This is not recommended. It forces the thread to use its entire timeslice
		// causing the rest of the system to be affected.
	}
	// You must not return from the thread function
}
```

Photon 1.4.2:

```
0000005002 [app] INFO: counter=37070779
0000006002 [app] INFO: counter=44287262
0000007002 [app] INFO: counter=9884197
0000008002 [app] INFO: counter=19636638
0000009002 [app] INFO: counter=9875395
0000010003 [app] INFO: counter=19770019
0000011003 [app] INFO: counter=9874890
0000012003 [app] INFO: counter=19755476
```

Electron:

```
0000012003 [app] INFO: counter=9893660
0000013003 [app] INFO: counter=19791357
0000014003 [app] INFO: counter=29687354
0000015003 [app] INFO: counter=39585234
0000016003 [app] INFO: counter=9897732
0000017003 [app] INFO: counter=19793759
0000018003 [app] INFO: counter=29691487
0000019003 [app] INFO: counter=9896030
0000020003 [app] INFO: counter=9897731
```

Argon:

```
0000014317 [app] INFO: counter=5235050
0000015317 [app] INFO: counter=5235106
0000016317 [app] INFO: counter=10480112
0000017317 [app] INFO: counter=15725016
0000018317 [app] INFO: counter=20969938
0000019317 [app] INFO: counter=5235056
0000020317 [app] INFO: counter=10480384
0000021317 [app] INFO: counter=15725377
0000022317 [app] INFO: counter=5234981
0000023317 [app] INFO: counter=5235241
```

P2 and Photon 2:

```
0000016000 [app] INFO: counter=38384422
0000017000 [app] INFO: counter=19615061
0000018000 [app] INFO: counter=19566063
0000019000 [app] INFO: counter=19675594
0000020000 [app] INFO: counter=39428569
```

The reason it's bad and unpredictable is that when the thread begins execution, it does not yield until its 1 millisecond time slice is completed used up and interrupted.

### Yielding using delay

The `delay()` function yields to other threads internally, and won't resume until the delay is complete. Since the thread scheduler is also on a 1 millisecond schedule, setting it to 1 will delay until the next timeslice.

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void);

volatile int counter = 0;
unsigned long lastReport = 0;

void setup() {
	new Thread("testThread", threadFunction);
}

void loop() {
	if (millis() - lastReport >= 1000) {
		lastReport = millis();

		Log.info("counter=%d", counter);
		counter = 0;
	}
}


void threadFunction(void) {
	while(true) {
		counter++;

		delay(1);
	}
	// You must not return from the thread function
}
```

Argon 1.4.2:

```
0000019277 [app] INFO: counter=999
0000020277 [app] INFO: counter=999
0000021277 [app] INFO: counter=999
0000022277 [app] INFO: counter=999
0000023277 [app] INFO: counter=999
```

### Periodic scheduled calls

It's also possible to schedule periodic calls. In this case, we schedule the thread to execute every 10 milliseconds (100 times per second):

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void);

volatile int counter = 0;
unsigned long lastReport = 0;

void setup() {
	new Thread("testThread", threadFunction);
}

void loop() {
	if (millis() - lastReport >= 1000) {
		lastReport = millis();

		Log.info("counter=%d", counter);
		counter = 0;
	}
}


void threadFunction(void) {
	system_tick_t lastThreadTime = 0;

	while(true) {
		counter++;

		// Delay so we're called every 10 milliseconds (100 times per second)
		os_thread_delay_until(&lastThreadTime, 10);
	}
	// You must not return from the thread function
}
```

Argon 1.4.2:

```
0000025269 [app] INFO: counter=100
0000026269 [app] INFO: counter=100
0000027269 [app] INFO: counter=100
0000028269 [app] INFO: counter=100
0000029269 [app] INFO: counter=100
0000030269 [app] INFO: counter=100
0000031269 [app] INFO: counter=100
0000032269 [app] INFO: counter=100
```

The important difference between this and just using delay() is that `os_thread_delay_until` takes into account the time spent within the thread function so the delay does not drift.

### Drift

To illustrate the problem of drift, this example delays between 0 and 4 milliseconds in the thread function, and uses a fixed `delay(10)` to yield.

(Note: While `delay()` immediately yields to other threads, `delayMicroseconds()` does not.)

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void);

volatile int counter = 0;
unsigned long lastReport = 0;

void setup() {
	new Thread("testThread", threadFunction);
}

void loop() {
	if (millis() - lastReport >= 1000) {
		lastReport = millis();

		Log.info("counter=%d", counter);
		counter = 0;
	}
}


void threadFunction(void) {
	while(true) {
		counter++;

		// Random microsecond delay of up to 4 milliseconds to
		// simulate code that takes varying around of time to run
		delayMicroseconds(rand() % 4000);

		// Fixed 10 millisecond delay
		delay(10);
	}
	// You must not return from the thread function
}
```

Argon 1.4.2:

```
0000018326 [app] INFO: counter=79
0000019326 [app] INFO: counter=84
0000020326 [app] INFO: counter=83
0000021326 [app] INFO: counter=81
0000022326 [app] INFO: counter=86
0000023326 [app] INFO: counter=86
0000024326 [app] INFO: counter=83
0000025326 [app] INFO: counter=81
0000026326 [app] INFO: counter=82
0000027326 [app] INFO: counter=87
0000028326 [app] INFO: counter=83
0000029326 [app] INFO: counter=85
0000030326 [app] INFO: counter=80
0000031326 [app] INFO: counter=82
```

As you can see, the number of loops varies.

### Drift fixed

In this example, `delay()` is replaced with `os_thread_delay_until()` and the drift is eliminated:

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void);

volatile int counter = 0;
unsigned long lastReport = 0;

void setup() {
	new Thread("testThread", threadFunction);
}

void loop() {
	if (millis() - lastReport >= 1000) {
		lastReport = millis();

		Log.info("counter=%d", counter);
		counter = 0;
	}
}


void threadFunction(void) {
	system_tick_t lastThreadTime = 0;

	while(true) {
		counter++;

		// Random microsecond delay of up to 4 milliseconds to
		// simulate code that takes varying around of time to run
		delayMicroseconds(rand() % 4000);

		// Delay so we're called every 10 milliseconds (100 times per second)
		// without drifting when the code above takes varying arounds of time.
		os_thread_delay_until(&lastThreadTime, 10);
	}
	// You must not return from the thread function
}
```

Argon 1.4.2:

```
0000013272 [app] INFO: counter=99
0000014272 [app] INFO: counter=99
0000015272 [app] INFO: counter=99
0000016272 [app] INFO: counter=99
0000017272 [app] INFO: counter=99
0000018272 [app] INFO: counter=99
0000019272 [app] INFO: counter=99
0000020272 [app] INFO: counter=99
```

### Synchronized access

Many device resources are not thread-safe and you must manually manage synchronization.

For example, the USB serial debug port (Serial) can only be called safely from multiple threads if you surround all accesses with WITH_LOCK(), as in:

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

void threadFunction(void *param);

volatile int counter = 0;
unsigned long lastReport = 0;

void setup() {
	Serial.begin();

	new Thread("testThread", threadFunction);
}

void loop() {
	if (millis() - lastReport >= 1000) {
		lastReport = millis();

		WITH_LOCK(Serial) {
			Serial.printlnf("counter=%d", counter);
			counter = 0;
		}
	}
}


void threadFunction(void *param) {
	system_tick_t lastThreadTime = 0;

	while(true) {
		WITH_LOCK(Serial) {
			Serial.print(".");
		}
		counter++;

		// Delay so we're called every 100 milliseconds (10 times per second)
		os_thread_delay_until(&lastThreadTime, 100);
	}
	// You must not return from the thread function
}

```

Serial output for Argon (1.4.2):

```text
..........counter=10
..........counter=10
..........counter=10
..........counter=10
..........counter=10
..........counter=10
..........counter=10
..........counter=10
..........counter=10
..........counter=10
..........counter=10
..........counter=10
```

Note that you must add WITH\_LOCK in both your thread AND in the loop thread (and any software timers). Internally, this uses a mutex to prevent simultaneous access.

Note: The [logging class](/reference/device-os/api/logging/logging/), such as Log.info, is MT safe and you can call it from multiple threads without a lock. It's much better to use that instead of directly writing to Serial.

### Using a mutex with an OLED display

Running this code will result in chaos. Or at least the display won't update correctly and will show random garbage, sometimes text will show upside-down, fragmented, and otherwise unreadable. The reason is that the two threads can interrupt each other mid-update, which is bad.

```cpp
#include "Particle.h"

#include "oled-wing-adafruit.h"
#include "FreeSans9pt7b.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void);

int threadCounter = 0;

unsigned long loopUpdate = 0;
int loopCounter = 0;

OledWingAdafruit display;


void setup() {
	display.setup();

	display.clearDisplay();
	display.display();

	display.setTextColor(WHITE);
	display.setTextSize(1);
	display.setFont(&FreeSans9pt7b);

	new Thread("testThread", threadFunction);
}

void loop() {
	display.loop();

	if (millis() - loopUpdate >= 100) {
		loopUpdate = millis();

		display.fillRect(0, 0, 64, 32, 0);
		display.setCursor(0, 20);
		display.println(++loopCounter);
		display.display();
	}
}


void threadFunction(void) {
	system_tick_t lastThreadTime = 0;

	while(true) {

		display.fillRect(64, 0, 64, 32, 0);
		display.setCursor(64, 20);
		display.println(++threadCounter);
		display.display();

		// Delay so we're called every 100 milliseconds (10 times per second)
		os_thread_delay_until(&lastThreadTime, 100);
	}
	// You must not return from the thread function
}

```

A better way is to use `WITH_LOCK()`:

```cpp
#include "Particle.h"

#include "oled-wing-adafruit.h"
#include "FreeSans9pt7b.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void);

int threadCounter = 0;

unsigned long loopUpdate = 0;
int loopCounter = 0;


// OledWingAdafruit 0.0.7 implements the lock(), tryLock(), and unlock() methods so you can use
// WITH_LOCK() with no additional setup
OledWingAdafruit display;



void setup() {
	display.setup();

	display.clearDisplay();
	display.display();

	display.setTextColor(WHITE);
	display.setTextSize(1);
	display.setFont(&FreeSans9pt7b);

	new Thread("testThread", threadFunction);
}

void loop() {
	display.loop();

	if (millis() - loopUpdate >= 100) {
		loopUpdate = millis();

		WITH_LOCK(display) {
			// Automatically lock the display mutex when we enter this scope
			// and unlock when we leave. This is especially useful if your
			// code could, return, break, etc. to get out of the block in the
			// middle and miss an unlock.
			display.fillRect(0, 0, 64, 32, 0);
			display.setCursor(0, 20);
			display.println(++loopCounter);
			display.display();
		}
	}
}


void threadFunction(void) {
	system_tick_t lastThreadTime = 0;

	while(true) {
		WITH_LOCK(display) {
			display.fillRect(64, 0, 64, 32, 0);
			display.setCursor(64, 20);
			display.println(++threadCounter);
			display.display();
		}

		// Delay so we're called every 100 milliseconds (10 times per second)
		os_thread_delay_until(&lastThreadTime, 100);
	}
	// You must not return from the thread function
}

```

### WITH\_LOCK

Internally, `WITH_LOCK()` runs the block wrapped by the object's `lock()` and `unlock()` methods. For this to work, the class must have those methods. The `OledWingAdafruit` and `Serial` classes in the previous example do. You can also add them to your own classes.

```cpp
    void lock() { os_mutex_lock(mutex); };
    bool trylock() { return os_mutex_trylock(mutex)==0; };
    void unlock() { os_mutex_unlock(mutex); };
```

The mutex variable is:

```cpp
	os_mutex_t mutex = 0;
```

Be careful of when you initialize the mutex object. If your class can be instantiated as a global variable you should not do it from the constructor of your object. This is explained below in more detail.

### Using a mutex externally (manually)

Instead of using `WITH_LOCK()` you can surround your code with `os_mutex_lock()` and `os_mutex_unlock()` calls. The stack-based object technique in the next section initially seems more complicated, but is better because it eliminates the possibility of accidentally forgetting to unlock.

```cpp
#include "Particle.h"

#include "oled-wing-adafruit.h"
#include "FreeSans9pt7b.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void);

int threadCounter = 0;

unsigned long loopUpdate = 0;
int loopCounter = 0;

OledWingAdafruit display;

os_mutex_t mutex;


void setup() {
	// Create the mutex.
	os_mutex_create(&mutex);

	display.setup();

	display.clearDisplay();
	display.display();

	display.setTextColor(WHITE);
	display.setTextSize(1);
	display.setFont(&FreeSans9pt7b);

	new Thread("testThread", threadFunction);
}

void loop() {
	display.loop();

	if (millis() - loopUpdate >= 100) {
		loopUpdate = millis();

		os_mutex_lock(mutex);
		display.fillRect(0, 0, 64, 32, 0);
		display.setCursor(0, 20);
		display.println(++loopCounter);
		display.display();
		os_mutex_unlock(mutex);
	}
}


void threadFunction(void) {
	system_tick_t lastThreadTime = 0;

	while(true) {
		os_mutex_lock(mutex);
		display.fillRect(64, 0, 64, 32, 0);
		display.setCursor(64, 20);
		display.println(++threadCounter);
		display.display();
		os_mutex_unlock(mutex);

		// Delay so we're called every 100 milliseconds (10 times per second)
		os_thread_delay_until(&lastThreadTime, 100);
	}
	// You must not return from the thread function
}
```

### Using a mutex externally (stack-based class)

Instead of using `WITH_LOCK()` you can implement your own class to do it. This is a useful technique if a class does not support `lock()` and `unlock()` and you cannot modify it. This allows the locking mechanism to be separate from the class.

Using a stack-based class like this eliminates the possibility of accidentally forgetting to `os_mutex_unlock()`. For example, if you can return from the function, or break out of a loop, it's easy to accidentally leave without unlocking when manually unlocking.

```cpp
#include "Particle.h"

#include "oled-wing-adafruit.h"
#include "FreeSans9pt7b.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void);

int threadCounter = 0;

unsigned long loopUpdate = 0;
int loopCounter = 0;

OledWingAdafruit display;

/**
 * @brief Class to encapsulate the display mutex
 *
 * From setup() be sure to call StDisplayLock::setup() once.
 *
 * Normally, you use a construct like:
 *
 *		{
 *			StDisplayLock lock;
 *
 *			display.fillRect(0, 0, 64, 32, 0);
 *			display.setCursor(0, 20);
 *			display.println(++loopCounter);
 *			display.display();
 *		}
 *
 * This locks the mutex (and possibly blocks) when the lock object is created
 * on the stack when the block is entered. Then you do stuff with the display.
 * When the block is exited, the destructor for lock is called and the mutex
 * is unlocked.
 *
 * The nice thing about this construct is that if you do a return, break, etc.
 * to get out of a block the mutex will always be unlocked.
 */
class StDisplayLock {
public:
	StDisplayLock() {
		os_mutex_lock(displayMutex);
	}
	~StDisplayLock() {
		os_mutex_unlock(displayMutex);
	}

	static void setup() {
		os_mutex_create(&displayMutex);
	}

protected:
	static os_mutex_t displayMutex;
};
os_mutex_t StDisplayLock::displayMutex;


void setup() {
	// Create the display mutex
	StDisplayLock::setup();

	display.setup();

	display.clearDisplay();
	display.display();

	display.setTextColor(WHITE);
	display.setTextSize(1);
	display.setFont(&FreeSans9pt7b);

	new Thread("testThread", threadFunction);
}

void loop() {
	display.loop();

	if (millis() - loopUpdate >= 100) {
		loopUpdate = millis();

		{
			// Automatically lock the display mutex when we enter this scope
			// and unlock when we leave. This is especially useful if your
			// code could, return, break, etc. to get out of the block in the
			// middle and miss an unlock.
			StDisplayLock lock;

			display.fillRect(0, 0, 64, 32, 0);
			display.setCursor(0, 20);
			display.println(++loopCounter);
			display.display();
		}
	}
}


void threadFunction(void) {
	system_tick_t lastThreadTime = 0;

	while(true) {
		{
			// Automatically lock the display mutex when we enter this scope
			// and unlock when we leave.
			StDisplayLock lock;

			display.fillRect(64, 0, 64, 32, 0);
			display.setCursor(64, 20);
			display.println(++threadCounter);
			display.display();
		}

		// Delay so we're called every 100 milliseconds (10 times per second)
		os_thread_delay_until(&lastThreadTime, 100);
	}
	// You must not return from the thread function
}

```

### Beware of SINGLE\_THREADED\_BLOCK

At first, `SINGLE_THREADED_BLOCK` seems kind of handy. It prevents thread swapping while in the block. For certain timing sensitive code, it can be useful.

However you must avoid within a SINGLE\_THREADED\_BLOCK:

- Lengthy operations
- Calls to `delay()`
- Any call that can block (`Particle.publish`, `Cellular.RSSI`, and others)
- Any function that uses a mutex to guard a resource (`Log.info`, SPI transactions, etc.)

The problem with mutex guarded resources is a bit tricky. For example: `Log.info` uses a mutex to prevent multiple threads from trying to log at the same time, causing the messages to be mixed together. However the code runs with interrupts and thread swapping enabled. Say the system thread is logging and your user thread code swaps in. The system thread still holds the logging mutex. Your code enters a SINGLE\_THREADED\_BLOCK, then does `Log.info`. The device will deadlock at this point. Your `Log.info` in the user thread blocks on the logging mutex. However it will never become available because thread swapping has been disabled, so the system thread can never release it. Both threads will stop running at this point.

Because it's hard to know exactly what resources will be guarded by a mutex its best to minimize the use of SINGLE\_THREADED\_BLOCK.

### Using a mutex to block a thread

One handy trick is to use a mutex to block your thread until something happens elsewhere. In this example, a SETUP/MODE button click handler can unblock the thread to make one run.

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

void threadFunction(void *param);


os_mutex_t mutex;

void buttonHandler();

void setup() {
	Serial.begin(9600);

	// Create the mutex
	os_mutex_create(&mutex);

	// Initially lock it, so when the thread tries to lock it, it will block.
	// It's unlocked in buttonHandler()
	os_mutex_lock(mutex);

	// Create the thread
	new Thread("testThread", threadFunction);

	System.on(button_click, buttonHandler);
}

void loop() {
}

void buttonHandler() {
	// Release the thread mutex
	os_mutex_unlock(mutex);
}

void threadFunction(void *param) {
	while(true) {
		// Block until unlocked by the buttonHandler
		os_mutex_lock(mutex);

		WITH_LOCK(Serial) {
			Serial.println("thread called!");
		}
	}
	// You must not return from the thread function
}
```

You should use a mutex instead a busy wait (testing for a condition in a while loop) whenever possible as mutexes are a fundamental and very efficient part of FreeRTOS. A thread blocked on a mutex doesn't use any CPU.

Note that an earlier version of this application note used `STARTUP()` to create the mutex. This is no longer recommended. Instead of creating mutex and thread objects using STARTUP, global object constructors, or global lambda functions, it's much better to defer everything to `setup()`. The reason is that the order of global object constructions is indeterminate and may fail to initialize properly.

### Using a queue

In addition to the mutex, threading supports queues. A queue is initialized with a maximum length. The main advantage of a queue is that you can add to the queue from another thread and even from an ISR. You can then remove items from the queue from a safer context, for example from loop.

This is a simple example of using queues:

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

void threadFunction(void *param);

os_queue_t queue;

void buttonHandler(system_event_t event, int param);

void setup() {
	Serial.begin();

	// Create a queue. Each element is an int, there are 5 elements. Last parameter is always 0.
	os_queue_create(&queue, sizeof(int), 5, 0);

	// Create the thread
	new Thread("testThread", threadFunction);

	// Register a button handler for when the SETUP/MODE button is pressed
	System.on(button_final_click, buttonHandler);
}

void loop() {
}

void buttonHandler(system_event_t event, int param) {
	int times = system_button_clicks(param);

	os_queue_put(queue, (void *)&times, 0, 0);
}


void threadFunction(void *param) {
	while(true) {
		int times;
		// Take an item from the queue. First 0 is amount of time to wait in milliseconds
		// (0 = don't wait). Last parameter is always 0.
		if (os_queue_take(queue, &times, 0, 0) == 0) {
			Log.info("button pressed %d times", times);
		}

		delay(1);
	}

	// You must not return from the thread function
}
```

Sample output:

```
0000016277 [app] INFO: button pressed 1 times
0000019390 [app] INFO: button pressed 2 times
0000023439 [app] INFO: button pressed 2 times
0000026578 [app] INFO: button pressed 3 times
0000030715 [app] INFO: button pressed 1 times
```

### Reading serial from a thread

One problem with the hardware UART serial is limited buffer size. One workaround for this is to read it from a thread. The [SerialBufferRK](https://github.com/rickkas7/SerialBufferRK) makes this easy to do. 

### Threaded TCPClient

In the [asynctcpclient](https://github.com/rickkas7/asynctcpclient) project, threads are used to make the connect() method of the TCPClient class asynchronous.

## API Reference

### Thread

There are two APIs available for threads: The C++ `Thread` class and the underlying API. Both can be used. They are currently wrappers around [FreeRTOS task functions](https://www.freertos.org/a00019.html).

Note: You should avoid creating a `Thread` object as a global object, a member variable of a global object, or a superclass of a global object unless allocated using `new` during `setup()` or later. The reason is that globally constructed objects are not instantiated in a determinate order, and the thread may fail to initialize properly. It's also impossible to guarantee the correct ordering of initialization of globally allocated mutex and thread objects.

#### Thread::Thread() (constructor os_thread_fn_t)

```cpp
Thread(const char* name, os_thread_fn_t function, void* function_param=NULL,
			os_thread_prio_t priority=OS_THREAD_PRIORITY_DEFAULT, 
			size_t stack_size=OS_THREAD_STACK_SIZE_DEFAULT)
```

- `name` Name for the thread. Currently limited to 16 bytes. Not really used for anything and does not need to be unique.
- `function` the thread function
- `function_param` optional context data to pass to the thread function
- `priority` the thread priority (optional). The default is 2. Smaller numbers are lower priority. The idle task priority is 0 and is the lowest. The maximum is currently 9. Avoid creating very high priority threads as they can adversely affect the operation of the rest of the device.
- `stack_size` the stack size (optional). Default is 3K bytes (3072 bytes).

The `function` parameter is the type:

```cpp
typedef os_thread_return_t (*os_thread_fn_t)(void* param);
``` 

You typically pass the function:

```cpp
os_thread_return_t myThreadFunction(void* param);
```

- `param` The optional `function_param` passed to the constructor.

#### Thread::Thread() (constructor wiring_thread_fn_t)

```cpp
Thread(const char *name, wiring_thread_fn_t function,
			os_thread_prio_t priority=OS_THREAD_PRIORITY_DEFAULT, size_t 			stack_size=OS_THREAD_STACK_SIZE_DEFAULT)
```

- `name` Name for the thread. Currently limited to 16 bytes. Not really used for anything and does not need to be unique.
- `function` the thread function
- `priority` the thread priority (optional). The default is 2. Smaller numbers are lower priority. The idle task priority is 0 and is the lowest. The maximum is currently 9. Avoid creating very high priority threads as they can adversely affect the operation of the rest of the system.
- `stack_size` the stack size (optional). Default is 3K bytes (3072 bytes).


The `function` parameter is the type:

```cpp
typedef std::function<os_thread_return_t(void)> wiring_thread_fn_t;
```

You typically pass the function:

```cpp
os_thread_return_t myThreadFunction(void)
```

This version does not have a `function_param` however it's actually more useful because it's a `std::function`. This allow the function to be a C++11 lambda, which allows it to capture the current class instance, parameters, local variables, etc. easily.

#### void Thread::dispose()

Disposing of a thread is tricky. Among the things to watch out for:

- You can't dispose of a thread that is the currently running thread
- If the thread you are disposing is running, the current thread will block until it exits.

Be sure that the thread returns from the thread function, call the `cancel()` method, or call `os_thread_exit` before attempting to dispose of a thread.

#### bool Thread::cancel()

Causes the thread to no longer be executed. This does not free the resources; you must also call `dispose()` to do that. There is no method to restart a canceled thread.

#### bool Thread::join()

Causes the current thread to block until the specified thread exits. Use with care!

#### bool Thread::isValid() const

Return `true` if the thread appears valid.

#### bool Thread::isCurrent() const

Return `true` if the thread is the currently running thread.

#### os\_thread\_create

```cpp
os_result_t os_thread_create(os_thread_t* result, const char* name,
        os_thread_prio_t priority, os_thread_fn_t fun, void* thread_param,
        size_t stack_size);
```

- `result` filled in with the `os_thread_t` thread handle for the new thread
- `name` Name for the thread. Currently limited to 16 bytes. Not really used for anything and does not need to be unique.
- `priority` the thread priority (optional). The default is 2. Smaller numbers are lower priority. The idle task priority is 0 and is the lowest. The maximum is currently 9. Avoid creating very high priority threads as they can adversely affect the operation of the device.
- `fun` thread function
- `thread_param` optional context data that is passed to the thread function.
- `stack_size` the stack size (optional). Default is 3K bytes (3072 bytes).

The `fun` parameter is the type:

```
typedef os_thread_return_t (*os_thread_fn_t)(void* param);
``` 

You typically pass the function:

```
os_thread_return_t myThreadFunction(void* param);
```

- `param` The optional `thread_param` passed to the constructor.

#### os\_thread\_current

```
os_thread_t os_thread_current(void* reserved);
```

- `reserved` must be 0 or `nullptr`. It's not currently used.

Returns the thread handle (`os_thread_t`) of the currently running thread.

#### os\_thread\_is\_current

```
bool os_thread_is_current(os_thread_t thread);
```

- `thread` The thread handle to test

Returns true if the specified thread is the currently running thread or false if not.


#### os\_thread\_join

```cpp
os_result_t os_thread_join(os_thread_t thread);
```

- `thread` The thread handle to wait on

Join will block the current thread until the specified thread exists. Returns 0 on success. May block forever.

#### os\_thread\_exit

```cpp
os_result_t os_thread_exit(os_thread_t thread);
```

- `thread` The thread handle to terminate

Causes the specified thread to exit. The thread function will no longer be called. This does not release the thread resources. There is no way to start it again once exited.

#### os\_thread\_cleanup

```cpp
os_result_t os_thread_cleanup(os_thread_t thread);
```

- `thread` The thread handle to clean up

This frees the resources for the specified thread.


#### os\_thread\_yield

```cpp
os_result_t os_thread_yield(void);
```

Yields the current thread's execution time slice to allow other threads to run. If you don't call this or other function that yields, the thread will get a full 1 millisecond time slices.

You should use `delay(1)` instead of `os_thread_yield()` due to a bug in some versions of Device OS where `os_thread_yield()` does not yield to threads of equal priority, which can cause unexpected behavior. Because the task scheduler timeslice is 1 millisecond, the calls behave similarly.


#### os\_thread\_delay\_until

```cpp
os_result_t os_thread_delay_until(system_tick_t * previousWakeTime, system_tick_t timeIncrement);
```

- `previousWakeTime` a pointer to a `system_tick_t`. This variable must be saved between calls to `os_thread_delay_until`.
- `timeIncrement` the amount of time to wait in milliseconds

This method delays the execution of this thread for a specified time, but does so relative to the last time it was woken. This eliminates the drift that would occur if the processing in your thread was lengthy.


### Mutex

There are two APIs available for mutexes: The C++ `Mutex` class and the underlying API. Both can be used. They are currently wrappers around [FreeRTOS mutex functions](https://www.freertos.org/CreateMutex.html).

In theory, it would be handy to make `Mutex` a superclass of your class. Having the `lock()` and `unlock()` methods would make it work with `WITH_LOCK()`. However, you must not do this if your class will ever be instantiated as a global variable. The reason is that the Mutex constructor calls `os_mutex_create`, and this is not safe during global object construction. It's better to create the mutex during setup() if possible.

Mutex functions cannot be called from an ISR.

#### Mutex::Mutex() (constructor)

Allocates the mutex using `os_mutex_create`. It's important that the Mutex object not be constructed as a global variable, static local variable, or static class member. The reason is that it's not safe to call `os_mutex_create` during global object construction.

#### Mutex::Mutex(os\_mutex\_t handle) (constructor)

This constructor allows a mutex to be shared across multiple class instances. Because the `handle_` is private, you can only do this if you externally allocate the mutex using `os_mutex_create`. 

#### Mutex::~Mutex() (destructor)

Note that the mutex is not freed (`os_mutex_destroy`) during object construction. Since multiple class instances can share an underlying mutex, the mutex is only destroyed using the `dispose()` method.

#### void Mutex::dispose() 

Frees the mutex by calling `os_mutex_destroy`.

#### void Mutex::lock() 

Lock the mutex using `os_mutex_lock`. Note that this mutex is not recursive so calling lock() from the same thread while the mutex is already locked will deadlock the thread!

#### bool Mutex::trylock() 

Try locking the mutex using `os_mutex_trylock`. Returns true if the mutex was obtained and locked. Returns false if already locked. This is opposite of the return value from `os_mutex_trylock`.

#### void Mutex::unlock() 

Unlock the mutex using `os_mutex_unlock`.

#### os\_mutex\_create

```cpp
int os_mutex_create(os_mutex_t* mutex);
``` 

Allocate a mutex. Returns 0 on success. The mutex is located on the heap and you're only limited by the amount of free RAM on how many mutex you can create. The size is small. This wraps the FreeRTOS function `xSemaphoreCreateMutex`.

#### os\_mutex\_destroy

```cpp
int os_mutex_destroy(os_mutex_t mutex);
```

Releases the memory for the mutex. This wraps the FreeRTOS function `vSemaphoreDelete`.

#### os\_mutex\_lock

```cpp
int os_mutex_lock(os_mutex_t mutex);
```

Blocks until the mutex is available. Always returns 0. This wraps the FreeRTOS function `xSemaphoreTake` with an infinite timeout.

#### os\_mutex\_trylock

```cpp
int os_mutex_trylock(os_mutex_t mutex);
```

Attempt to obtain the mutex. If obtained, returns 0. If the mutex is already locked, returns 1. This wraps the FreeRTOS function `xSemaphoreTake` with an 0 timeout.

#### os\_mutex\_unlock

```cpp
int os_mutex_unlock(os_mutex_t mutex);
```

Unlocks the mutex, allowing other threads to access it. This wraps the FreeRTOS function `xSemaphoreGive`.


### RecursiveMutex

The `RecursiveMutex` is handy because it allows a lock to be obtained again from the same thread by maintaining a counter. 

Recursive mutex functions cannot be called from an ISR.

#### RecursiveMutex::RecursiveMutex() (constructor)

Allocates the mutex using `os_mutex_recursive_create`. It's important that the `RecursiveMutex` object not be constructed as a global variable, static local variable, or static class member. The reason is that it's not safe to call `os_mutex_recursive_create ` during global object construction.

#### RecursiveMutex::RecursiveMutex(os\_mutex\_t handle) (constructor)

This constructor allows a mutex to be shared across multiple class instances. Because the `handle_` is private, you can only do this if you externally allocate the mutex using `os_mutex_recursive_create`. 

#### RecursiveMutex::~RecursiveMutex() (destructor)

Note that the mutex is not freed (`os_mutex_recursive_destroy`) during object construction. Since multiple class instances can share an underlying mutex, the mutex is only destroyed using the `dispose()` method.

#### void RecursiveMutex::dispose() 

Frees the mutex by calling `os_mutex_recursive_destroy`.

#### void RecursiveMutex::lock() 

Lock the mutex using `os_mutex_recursive_lock`. 

#### bool RecursiveMutex::trylock() 

Try locking the mutex using `os_mutex_recursive_trylock`. Returns true if the mutex was obtained and locked. Returns false if already locked. This is opposite of the return value from `os_mutex_recursive_trylock`.

#### void RecursiveMutex::unlock() 

Unlock the mutex using `os_mutex_recursive_unlock`.

#### os\_mutex\_recursive\_create

```cpp
int os_mutex_recursive_create(os_mutex_t* mutex);
``` 

Allocate a recursive mutex. Returns 0 on success. The mutex is located on the heap and you're only limited by the amount of free RAM on how many mutex you can create. The size is small. This wraps the FreeRTOS function `xSemaphoreCreateRecursiveMutex`.

#### os\_mutex\_recursive\_destroy

```cpp
int os_mutex_recursive_destroy(os_mutex_t mutex);
```

Releases the memory for the mutex. This wraps the FreeRTOS function `vSemaphoreDelete`.

#### os\_mutex\_recursive\_lock

```cpp
int os_mutex_recursive_lock(os_mutex_t mutex);
```

Blocks until the mutex is available. Always returns 0. This wraps the FreeRTOS function `xSemaphoreTakeRecursive` with an infinite timeout.

#### os\_mutex\_recursive\_trylock

```cpp
int os_mutex_recursive_trylock(os_mutex_t mutex);
```

Attempt to obtain the mutex. If obtained, returns 0. If the mutex is already locked, returns 1. This wraps the FreeRTOS function `xSemaphoreTakeRecursive` with an 0 timeout.

#### os\_mutex\_recursive\_unlock

```cpp
int os_mutex_recursive_unlock(os_mutex_t mutex);
```

Unlocks the mutex, allowing other threads to access it. This wraps the FreeRTOS function `xSemaphoreGiveRecursive`. As it's a recursive mutex it's a counting semaphore, so if the mutex is locked multiple times from the same thread it's only released after the corresponding number of unlocks.

### Queue functions

The queue functions provide a thread-safe queue of arbitrary values (or structures). It's first-in first-out (FIFO).

There is no C++ wrapper for the queue functions. 

The queue functions cannot be called from an ISR except for `os_queue_put`. That is the only ISR safe function, but is quite handy to enqueue item from an ISR. 

#### os\_queue\_create

```cpp
int os_queue_create(os_queue_t* queue, size_t item_size, size_t item_count, void* reserved);
```

Create a queue. Returns 0 on success. The queue is allocated on the heap.

- `queue` is filled in with the queue handle, passed to the other functions.
- `item_size` is the size of each entry in bytes.
- `item_count` is the number of entries in the queue.
- `reserved` must be 0 or `nullptr`. It's not currently used.

This function wraps the FreeRTOS function `xQueueCreate`.

 
#### os\_queue\_put

```cpp
int os_queue_put(os_queue_t queue, const void* item, system_tick_t delay, void* reserved);
```

Adds an item to a queue. Returns 0 on success.

- `queue` the queue handle returned from `os_queue_create`.
- `item` pointer to the value or structure to add to the queue. The bytes are copied. The size of the item is determined when the queue is created.
- `delay` the amount of time to wait for a space in the queue. 0 means do not wait (returns 1); `CONCURRENT_WAIT_FOREVER` waits forever. Otherwise, the value is in milliseconds.

Wraps the FreeRTOS function `xQueueSend` or `xQueueSendFromISR`.

If called from an ISR, the delay field is ignored and do not wait (0) is always used since it's not appropriate to block from an ISR.
 
#### os\_queue\_take

```cpp
int os_queue_take(os_queue_t queue, void* item, system_tick_t delay, void* reserved);
```

Removes an item from the queue.

- `queue` the queue handle returned from `os_queue_create`.
- `item` pointer to the value or structure to add to the queue. The bytes are copied. The size of the item is determined when the queue is created.
- `delay` the amount of time to wait for an item in the queue. 0 means do not wait (returns 1); `CONCURRENT_WAIT_FOREVER` waits forever. Otherwise, the value is in milliseconds.
- `reserved` must be 0 or `nullptr`. It's not currently used.

Returns 0 if an item was returned or 1 if not.

#### os\_queue\_destroy 

```cpp
int os_queue_destroy(os_queue_t queue, void* reserved);
```

Frees the memory allocated during `os_queue_create`.

- `queue` the queue handle returned from `os_queue_create`.
- `reserved` must be 0 or `nullptr`. It's not currently used.


## More details

You can find more documentation in the source:

- [spark\_wiring\_thread.h](https://github.com/particle-iot/firmware/blob/develop/wiring/inc/spark_wiring_thread.h) contains the headers for the Thread class.
- [concurrent\_hal.h](https://github.com/particle-iot/firmware/blob/develop/hal/inc/concurrent_hal.h) contains the headers for the low-level functions.
- [concurrent\_hal.cpp](https://github.com/particle-iot/firmware/blob/develop/hal/src/nRF52840/concurrent_hal.cpp) contains the implementations of the low-level functions so you can see how they map to FreeRTOS functions.
- [FreeRTOS docs](https://www.freertos.org/Documentation/00-Overview) are helpful as well.

Note that if you are browsing the concurrent\_hal not all functions are exported to user firmware. In particular, you cannot use these functions from user firmware:

- `os_condition_variable`
- `os_semaphore`


