---
title: Callback functions
columns: two
layout: commonTwo.hbs
description: Callback functions
includeDefinitions: [api-helper,api-helper-cloud,api-helper-projects,zip]
---

# {{title}}

Callback functions provide a way for your code to be "called back" at a later time, typically when some external event occurs. Some examples include:

- Function handlers: When a Particle function is called from the cloud.
- Subscription handlers: When a Particle event that you have subscribed is received by your device.
- System event handlers: When a system event occurs.
- Software timers: When the timer expires.
- Thread function: Executes a worker thread.
- Interrupt handlers: When a hardware interrupt occurs (attachInterrupt).

## Kinds of callbacks

### Simple C/C++ function callback

The simplest callback is a standard C/C++ function. This code calls a global function `functionHandler1` when the "test1" Particle function is called from the cloud.

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

- `&MyClass6::functionHandler` specifies the method to call. It must be a non-static method, and note the required `&` before the class name.
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

Using a static class member is common when you have to pass a callback to something that only takes a plain C/C++ function and an optional parameter. One example is the `Thread` class, which does not have the option to pass a C++ class member directly, like `Particle.function` does.

The "trick" is to store the class instance pointer in the parameter, and recover it from a static class member, allowing you to call a class instance method.

Code:

```cpp
class MyClass8 {
public:
    void threadFunction();

    static os_thread_return_t threadFunctionStatic(void *param);

    int counter = 0;
};

void MyClass8::threadFunction() {
    while(true) {
        Log.info("MyClass68::threadFunction counter=%d", ++counter);
        delay(10000);
    }
}

// static
os_thread_return_t MyClass8::threadFunctionStatic(void *param) {
    MyClass8 *This = (MyClass8 *)param;

    This->threadFunction();
}

```

Calling the code:

```cpp
void setup() {
    MyClass8 *myClass8 = new MyClass8();
    new Thread("MyClass8", MyClass8::threadFunctionStatic, myClass8);
}
```

### Calling a class member with a lambda

When the call function is a `std::function()`, as is the case with `Thread`, it can be easier to structure the code like this.

The code:

```cpp
class MyClass7 {
public:
    MyClass7();
    virtual ~MyClass7();

    void start(os_thread_prio_t priority=OS_THREAD_PRIORITY_DEFAULT, size_t stack_size=OS_THREAD_STACK_SIZE_DEFAULT);

protected:
    void threadFunction();

    // This class cannot be copied
    MyClass7(const MyClass7&) = delete;
    MyClass7& operator=(const MyClass7&) = delete;

    Thread *thread = nullptr;
    int counter = 0;
};

MyClass7::MyClass7() {
}

MyClass7::~MyClass7() {
    delete thread;
}

void MyClass7::start(os_thread_prio_t priority, size_t stack_size)  {
    thread = new Thread("MyClass7", [this]() { threadFunction(); }, priority, stack_size);
}

void MyClass7::threadFunction() {
    while(true) {
        Log.info("MyClass7::threadFunction counter=%d", ++counter);
        delay(10000);
    }
}
```

Calling the code:

```cpp
void setup() {
    MyClass7 *myClass7 = new MyClass7();
    myClass7->start();
}
```

- The `Thread` object is owned by `MyClass7` which takes care of allocating an deallocating it.
- The `threadFunction` is class member and can take advantage of class member variables like `counter`.
- The "magic" is the lambda passes as the second parameter to the `new Thread` call:

```cpp
[this]() { 
    threadFunction(); 
}
```

What this does is capture `this` (pointer to the instance of `MyClass7`) and use it later, when the callback is called, to invoke the class member function `threadFunction()` which is possible because the `this` pointer has been saved (captured). Using the lambda eliminates the need to have a separate static member function.


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

It's a good practice to use `std::function` for your callbacks instead of using plain C/C++ callback function pointers.

- It allows the optional use of a lambda as the function.
- It makes it easy to call a C++ class member without having to create a static wrapper.
- It eliminates the need to have an optional parameter to pass instance data.

The code:

```cpp
class MyClass9 {
public:
    void setCallback(std::function<void(int value)> callback) { 
        this->callback = callback; 
    };

    void callCallback(int value) {
        if (callback) {
            callback(value);
        }
    };

protected:
    std::function<void(int value)> callback = nullptr;
};
MyClass9 myClass9;
```


Calling the code:

```cpp
void setup() {
    int param9a = 1234;
    const char *param9b = "testing!";
    myClass9.setCallback([param9a, param9b](int value) {
        Log.info("myClass9 callback called value=%d param9a=%d param9b=%s", value, param9a, param9b);
    });
    Log.info("about to myClass9.callCallback(1234)");
    myClass9.callCallback(1234);    
}
```

Debugging output:

```
0000002868 [app] INFO: about to myClass9.callCallback(1234)
0000002907 [app] INFO: myClass9 callback called value=1234 param9a=1234 param9b=testing!
```

Note the lambda in this code. The capture section `[param9a, param9b]` saves a copy of two local variables, `param9a` and `param9b`. This is a good way to pass additional information to the body of the lambda.


```cpp
[param9a, param9b](int value) {
    Log.info("myClass9 callback called value=%d param9a=%d param9b=%s", value, param9a, param9b);
}
```


## Sample code

This is the code that was used to test all of the examples above. It was only intended to exercise all of the examples above, but is provided in case you need some extra context beyond what was included above.

{{> project-browser project="StdFunctionExample" default-file="src/StdFunctionExample.cpp" height="400" flash="false"}}


### Sample output

Running this code on a device will generate something like this. The "this" and "value" may be different in your output.

```
0000002708 [app] INFO: test starting
0000002718 [app] INFO: ExampleService1 1007ae14 about to call callback s=test1a
0000002737 [app] INFO: test1a lambda called test1a
0000002750 [app] INFO: myClass1b value=2098003830
0000002761 [app] INFO: ExampleService1 1007ae24 about to call callback s=test1b
0000002781 [app] INFO: MyClass1 serviceCallback called this=1007adfc s=test1b value=2098003830
0000002804 [app] INFO: myClass2 instance 1007ae00
0000002816 [app] INFO: ExampleService2 1007ae34 about to call callback s=test2
0000002834 [app] INFO: MyClass2 serviceCallback called this=1007ae00 s=test2
0000002852 [app] INFO: MyStateMachine::startState
0000002865 [app] INFO: MyClass7::threadFunction counter=1
0000002867 [app] INFO: MyClass8::threadFunction counter=1
0000002868 [app] INFO: about to myClass9.callCallback(1234)
0000002907 [app] INFO: myClass9 callback called value=1234 param9a=1234 param9b=testing!
0000002928 [app] INFO: test complete!
```

