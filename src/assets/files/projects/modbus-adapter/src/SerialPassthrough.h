#ifndef __SERIALPASSTHROUGH_H
#define __SERIALPASSTHROUGH_H

class SerialPassthrough {
public:
    SerialPassthrough(USARTSerial& serial = Serial1) : serial(serial) {};

    void setup();

    void loop();

protected:
    void stateStart();

    USARTSerial &serial;
    int baudRate = 9600;

    std::function<void()> stateHandler = &SerialPassthrough::stateStart;
};

#endif // __SERIALPASSTHROUGH_H
