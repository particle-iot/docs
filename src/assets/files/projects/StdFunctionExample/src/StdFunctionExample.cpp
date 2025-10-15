#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SerialLogHandler logHandler(LOG_LEVEL_INFO);

void runTest();

void myISR1(void) {
}

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

class MyClass4 {
public:
    void interruptHandler();
};
MyClass4 myClass4;

void MyClass4::interruptHandler() {
}

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

int functionHandler1(String cmd) {
    Log.info("functionHandler1 called %s", cmd.c_str());
    return 0;
}

class MyClass6 {
public:
    int functionHandler(String cmd) {
        Log.info("MyClass6::functionHandler1 called %s", cmd.c_str()); 
        return 0;
    }
};
MyClass6 myClass6;

class ExampleService1 {
public:
    ExampleService1 &withCallback(std::function<void(const char *s)> callback) { this->callback = callback; return *this; };

    void callCallback(const char *s);

private: 
    std::function<void(const char *s)> callback = 0;
};
ExampleService1 test1a;
ExampleService1 test1b;


void ExampleService1::callCallback(const char *s) {
    if (callback) {
        Log.info("ExampleService1 %x about to call callback s=%s", (int) this, s);
        callback(s);
    }
    else {
        Log.info("No callback set");
    }
};

class MyClass1 {
public:
    void registerCallback(ExampleService1 &service);

    void serviceCallback(const char *s) {
        Log.info("MyClass1 serviceCallback called this=%x s=%s value=%d", (int) this, s, value);
    }
    int value = 0;
};
MyClass1 myClass1b;


void MyClass1::registerCallback(ExampleService1 &service) {
    service.withCallback([this](const char *s) { serviceCallback(s); });
}
    

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
        Log.info("ExampleService2 %x about to call callback s=%s", (int) this, s);
        callback(s, param);
    }
};

class MyClass2 {
public:
    void serviceCallback(const char *s) {
        Log.info("MyClass2 serviceCallback called this=%x s=%s", (int) this, s);
    }

    static void serviceCallbackStatic(const char *s, void *param) {
        MyClass2 *This = (MyClass2 *)param;

        This->serviceCallback(s);
    }
};
MyClass2 myClass2;


class MyStateMachine {
public:
    void run();
    
protected:
    void startState();

    void endState();

private:
    std::function<void(MyStateMachine&)> stateHandler = &MyStateMachine::startState;
};

void MyStateMachine::run() {
    if (stateHandler) {
        stateHandler(*this);
    }
}

void MyStateMachine::startState() {
    Log.info("MyStateMachine::startState");
    stateHandler = &MyStateMachine::endState;
}

void MyStateMachine::endState() {
}

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


class MyClass8 {
public:
    void threadFunction();

    static os_thread_return_t threadFunctionStatic(void *param);

    int counter = 0;
};

void MyClass8::threadFunction() {
    while(true) {
        Log.info("MyClass8::threadFunction counter=%d", ++counter);
        delay(10000);
    }
}

// static
os_thread_return_t MyClass8::threadFunctionStatic(void *param) {
    MyClass8 *This = (MyClass8 *)param;

    This->threadFunction();
}

class MyClass9 {
public:
    void setCallback(std::function<void(int value)> callback) { this->callback = callback; };

    void callCallback(int value) {
        if (callback) {
            callback(value);
        }
    }

protected:
    std::function<void(int value)> callback = nullptr;
};
MyClass9 myClass9;

void setup() {
    waitFor(Serial.isConnected, 15000); delay(1000);

    Log.info("test starting");

    Particle.function("test1", functionHandler1);
    Particle.function("test2", &MyClass6::functionHandler, &myClass6);

    attachInterrupt(D2, myISR1, FALLING);

    attachInterrupt(D3, MyClass3::interruptHandlerStatic, FALLING);

    attachInterrupt(D5, &MyClass4::interruptHandler, &myClass4, FALLING);

    MyClass5::instance(); // Allocate singleton
    attachInterrupt(D5, MyClass5::interruptHandlerStatic, FALLING);

    test1a.withCallback([](const char *s) {
        Log.info("test1a lambda called %s", s);
    });
    test1a.callCallback("test1a");
    
    myClass1b.value = rand();
    Log.info("myClass1b value=%d", myClass1b.value);
    myClass1b.registerCallback(test1b);
    test1b.callCallback("test1b");

    Log.info("myClass2 instance %x", (int) &myClass2);
    testService2.setCallback(myClass2.serviceCallbackStatic, &myClass2);
    testService2.callCallback("test2");

    MyStateMachine *testStateMachine = new MyStateMachine();

    for(int ii = 0; ii < 100; ii++) {
        testStateMachine->run();
    }

    delete testStateMachine;


    MyClass7 *myClass7 = new MyClass7();
    myClass7->start();

    MyClass8 *myClass8 = new MyClass8();
    new Thread("MyClass8", MyClass8::threadFunctionStatic, myClass8);

    int param9a = 1234;
    const char *param9b = "testing!";
    myClass9.setCallback([param9a, param9b](int value) {
        Log.info("myClass9 callback called value=%d param9a=%d param9b=%s", value, param9a, param9b);
    });
    Log.info("about to myClass9.callCallback(1234)");
    myClass9.callCallback(1234);


    
    Log.info("test complete!");
}


void loop() {
}

