#pragma once

#include "mcp_can.h"

class MCP_CAN_25625 : public MCP_CAN {
public:
    MCP_CAN_25625(pin_t cs, pin_t standby, SPIClass &spi=SPI, int speed=10 /* MHz */);

    void setStandby(bool);

    byte sleep();
    byte wake();
private:
    pin_t standby;
};
