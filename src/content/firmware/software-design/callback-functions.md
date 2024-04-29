---
title: Callback functions
columns: two
layout: commonTwo.hbs
description: Callback functions
---

# {{title}}

Callback functions provide a way for your code to be "called back" at a later time, typically when some external event occurs. Some examples include:

- Function handlers: When a Particle function is called from the cloud.
- Subscription handlers: When a Particle event that you have subscribed is received by your device.
- System event handlers: When a system event occurs.
- Software timers: When the timer expires.
- Interrupt handlers: When a hardware interrupt occurs (attachInterrupt).

## Kinds of callbacks

### Simple C/C++ function callback

The simplest callback is a standard C/C++ function. This code calls a global function when the "test1" Particle function is called from the cloud.

```cpp
int functionHandler1(String cmd) {
    Log.info("functionHandler1 called %s", cmd.c_str());
    return 0;
}

void setup() {
    Particle.function("test1", functionHandler1);
}
```

### C++ class member callback

What if you want to call a class member instead of a plain function? Several Particle API calls allow this. The syntax must be followed very carefully:

- `&MyClass6::functionHandler` specifies the method to call. It must be a non-static method.
- `&myClass6` is the pointer to the class instance. If you already have a pointer (because you allocated it with `new`) then leave off the `&`.

```cpp
class MyClass6 {
public:
    int functionHandler(String cmd) {
        Log.info("MyClass6::functionHandler1 called %s", cmd.c_str()); 
        return 0;
    }
};
MyClass6 myClass6;


void setup() {
    Particle.function("test2", &MyClass6::functionHandler, &myClass6);
}
```

Note that in this example `MyClass6` is a global variable. Make sure you don't allocate it on the stack within a function, because it will be deleted when the function exits, which will cause problems because a callback is called later.

```cpp
void setup() {
    MyClass6 myClass6; // Don't do this! Class instance will be deleted when exiting setup.

    Particle.function("test2", &MyClass6::functionHandler, &myClass6);
}
```

### Static class member with parameter

Using a static class member is common when you have to pass a callback to something that only takes a plain C/C++ function and an optional parameter.

The "trick" is to store the class instance pointer in the parameter, and recover it from a static class member, allowing you to call a class instance method.

Code:

```cpp
class ExampleService2 {
public:
    typedef void (*ExampleCallback)(const char *s, void *param);

    void setCallback(ExampleCallback callback, void *param);

    void callCallback(const char *s);

protected:
    ExampleCallback callback = 0;
    void *param = 0;
};
ExampleService2 testService2;

void ExampleService2::setCallback(ExampleCallback callback, void *param) {
    this->callback = callback;
    this->param = param;
}

void ExampleService2::callCallback(const char *s) {
    if (callback) {
        Log.info("ExampleService2 %x about to call callback s=%s", this, s);
        callback(s, param);
    }
};

class MyClass2 {
public:
    void serviceCallback(const char *s) {
        Log.info("MyClass2 serviceCallback called this=%x s=%s", this, s);
    }

    static void serviceCallbackStatic(const char *s, void *param) {
        MyClass2 *This = (MyClass2 *)param;

        This->serviceCallback(s);
    }
};
MyClass2 myClass2;
```

Calling the code:

```cpp
Log.info("myClass2 instance %x", &myClass2);

testService2.setCallback(myClass2.serviceCallbackStatic, &myClass2);
testService2.callCallback("test2");
```

Output:

```
0000002935 [app] INFO: myClass2 instance 1007ae10
0000002947 [app] INFO: ExampleService2 1007ae34 about to call callback s=test2
0000002965 [app] INFO: MyClass2 serviceCallback called this=1007ae10 s=test2
```

### Static class member with singleton

If your class is a singleton, you don't need to have an optional parameter, as the class instance is known because it's a singleton.

The code:

```cpp
class MyClass5 {
public:
    /**
     * @brief Gets the singleton instance of this class, allocating it if necessary
     * 
     * Use MyClass5::instance() to instantiate the singleton.
     */
    static MyClass5 &instance();

    void interruptHandler();

    static void interruptHandlerStatic();

protected:
    /**
     * @brief The constructor is protected because the class is a singleton
     * 
     * Use MyClass5::instance() to instantiate the singleton.
     */
    MyClass5();

    /**
     * @brief The destructor is protected because the class is a singleton and cannot be deleted
     */
    virtual ~MyClass5();

    /**
     * This class is a singleton and cannot be copied
     */
    MyClass5(const MyClass5&) = delete;

    /**
     * This class is a singleton and cannot be copied
     */
    MyClass5& operator=(const MyClass5&) = delete;

    /**
     * @brief Singleton instance of this class
     * 
     * The object pointer to this class is stored here. It's NULL at system boot.
     */
    static MyClass5 *_instance;

};
MyClass5 *MyClass5::_instance;

// [static]
MyClass5 &MyClass5::instance() {
    if (!_instance) {
        _instance = new MyClass5();
    }
    return *_instance;
}

MyClass5::MyClass5() {
}

MyClass5::~MyClass5() {
}

void MyClass5::interruptHandler() {
}

// static 
void MyClass5::interruptHandlerStatic() {
    instance().interruptHandler();
}

```

Calling the code. Note the call to allocate the singleton in this example because it's passed to `attachInterrupt()` and interrupt handlers cannot allocate memory.

```cpp
void setup() {
    MyClass5::instance(); // Allocate singleton
    attachInterrupt(D5, MyClass5::interruptHandlerStatic, FALLING);
}
```


### Static class member with self pointer

We generally recommend an allocated singleton as above, but some code has a single instance stored as a global variable. In this scenario, you save
the instance pointer (`this`) from the constructor. The downside of this technique is that only works for classes that are effectively singletons, as only one class instance can be remembered. 

The code:

```cpp
class MyClass3 {
public:
    MyClass3();
    void interruptHandler();

    static void interruptHandlerStatic();
    static MyClass3 *sMyClass3;
};
MyClass3 *MyClass3::sMyClass3 = nullptr;
MyClass3 myClass3;

MyClass3::MyClass3() {
    sMyClass3 = this;
}
void MyClass3::interruptHandler() {
}

void MyClass3::interruptHandlerStatic() {
    if (sMyClass3) {
        sMyClass3->interruptHandler();
    }
}
```

Calling the code:

```cpp
void setup() {
    attachInterrupt(D3, MyClass3::interruptHandlerStatic, FALLING);
}
```

### Using std::function in your code


### C++ class member callback in your code


## Sample code

This is the code that was used to test all of the examples above. It was only intended to exercise all of the examples above, but is provided in case you need some extra context beyond what was included above.

### Sample output

Running this code on a device will generate something like this. The "this" and "value" may be different in your output.

```
0000002839 [app] INFO: test starting
0000002849 [app] INFO: ExampleService1 1007ae14 about to call callback s=test1a
0000002868 [app] INFO: test1a lambda called test1a
0000002881 [app] INFO: myClass1b value=1230612671
0000002894 [app] INFO: ExampleService1 1007ae24 about to call callback s=test1b
0000002913 [app] INFO: MyClass1 serviceCallback called this=1007ae0c s=test1b value=1230612671
0000002935 [app] INFO: myClass2 instance 1007ae10
0000002947 [app] INFO: ExampleService2 1007ae34 about to call callback s=test2
0000002965 [app] INFO: MyClass2 serviceCallback called this=1007ae10 s=test2
0000002984 [app] INFO: MyStateMachine::startState
0000002997 [app] INFO: test complete!
```

