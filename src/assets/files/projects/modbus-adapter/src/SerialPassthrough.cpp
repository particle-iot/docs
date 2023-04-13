#include "SerialPassthrough.h"



void SerialPassthrough::setup() {
    // When the USB CDC client explicitly sets a baud rate, this handler is called. 
    HAL_USB_USART_LineCoding_BitRate_Handler([this](uint32_t bitRate) {
        this->baudRate = (int)bitRate;
    }, nullptr);

}


void SerialPassthrough::loop() {
    stateHandler();
}


void SerialPassthrough::stateStart() {

}
