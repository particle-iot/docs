/**
 * @file test.cpp
 * @author Ed Ablan
 * @version 1.0
 * @date 06/25/2020
 *
 * @brief test send for can-mcp25x library
 *
 * @details send stuff over can
 *
 * @copyright Copyright (c) 2020 Particle Industries, Inc.  All rights reserved.
 */

#include "Particle.h"
#include "mcp_can.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

#define LISTEN_ONLY               (0)

#if PLATFORM_ID == PLATFORM_TRACKER

#define CAN_SPI_INTERFACE         (SPI1)
#define APP_CONFIG_UNUSED         (-1)
#define CAN_CS_PIN                (CAN_CS)
#define CAN_INT_PIN               (CAN_INT)
#define CAN_RST_PIN               (CAN_RST)
#define BOOST_EN_PIN              (CAN_PWR)
#define CAN_SPEED                 (CAN_500KBPS)
#define CAN_CLOCK                 (MCP_20MHZ)
#define CAN_STBY_PIN              (CAN_STBY)

#else // !PLATFORM_TRACKER

#define CAN_SPI_INTERFACE         (SPI)
#define APP_CONFIG_UNUSED         (-1)
#define CAN_CS_PIN                (A3)
#define CAN_INT_PIN               (A1)
#define CAN_RST_PIN               (A2)
#define BOOST_EN_PIN              (D6)
#define CAN_SPEED                 (CAN_250KBPS)
#define CAN_CLOCK                 (MCP_20MHZ)
#define CAN_STBY_PIN              (APP_CONFIG_UNUSED)

#endif // PLATFORM_ID

SerialLogHandler logHandler(115200, LOG_LEVEL_INFO);

const char SLEEP_CMD[] = "SLEEP";

typedef struct {
    uint32_t id;
    uint8_t len;
    uint8_t  data[8];
} app_msg_log_t;

uint16_t pin_int;
app_msg_log_t msg;
bool is_sleep = false;

MCP_CAN CAN(CAN_CS_PIN, CAN_SPI_INTERFACE); // Set CS pin

void can_boost_enable(bool enable)
{
    digitalWrite(BOOST_EN_PIN, enable ? HIGH : LOW);
}

bool can_init(uint8_t cs_pin, uint8_t int_pin, uint8_t speed, uint8_t clock)
{
    pinMode(BOOST_EN_PIN, OUTPUT);
    can_boost_enable(true);

    // CAN peripherial config
    pinMode(CAN_RST_PIN, OUTPUT);
    if(CAN_STBY_PIN != APP_CONFIG_UNUSED)
    {
        pinMode(CAN_STBY_PIN, OUTPUT);
        digitalWrite(CAN_STBY_PIN, LOW);
    }

    digitalWrite(CAN_RST_PIN, LOW);
    delay(50);
    digitalWrite(CAN_RST_PIN, HIGH);

#if LISTEN_ONLY
    if (CAN.begin(MCP_RX_ANY, speed, clock, MCP_MODE_LISTENONLY) != CAN_OK)
#else
    if (CAN.begin(MCP_RX_ANY, speed, clock) != CAN_OK)
#endif // LISTEN_ONLY
    {
        Log.error("CAN initial failed");
        return false;
    }

#if !LISTEN_ONLY
    // Set NORMAL mode
    if(CAN.setMode(MCP_MODE_NORMAL) == MCP2515_OK) {
        Log.info("CAN mode set");
    }
    else {
      Log.error("CAN mode fail");
      return false;
    }
#endif // LISTEN_ONLY

    CAN.getCANStatus();
    pinMode(int_pin, INPUT);
    pin_int = int_pin;

    return true;
}

bool can_sleep(uint32_t timeout_ms)
{
    uint8_t  op_mode = 0xFF;
    uint32_t try_time = 0;

    if(CAN_STBY_PIN != APP_CONFIG_UNUSED) {
        digitalWrite(CAN_STBY_PIN, HIGH);
    }

    while(1) {
        // Set sleep mode
        CAN.setMode(MCP_MODE_SLEEP);

        // check CAN Operation Mode
        op_mode = CAN.getCANStatus() & 0xE0;

        if((op_mode == MCP_MODE_SLEEP) || (try_time >= timeout_ms)) {
            break;
        }
        try_time += 10;
        delay(10);
    }
    return (op_mode == MCP_MODE_SLEEP);
}

void setup()
{
    waitUntil(Serial.isConnected);

    if(can_init(CAN_CS_PIN, CAN_INT_PIN, CAN_SPEED, CAN_CLOCK)) {
        Log.info("CAN BUS Shield init ok!");
    }
    else {
        Log.error("CAN BUS Shield init failed. Stop program!");
        delay(1000);
        while (1);
    }
}

unsigned char stmp[8] = {0, 0, 0, 0, 0, 0, 0, 0};
void loop()
{
    static uint8_t ret = CAN_FAIL;
    if(!is_sleep) {
#if !LISTEN_ONLY
        // send data:  id = 0x00, standrad frame, data len = 8, stmp: data buf
        stmp[7] = stmp[7] + 1;
        if (stmp[7] == 100) {
            stmp[7] = 0;
            stmp[6] = stmp[6] + 1;

            if (stmp[6] == 100) {
                stmp[6] = 0;
                stmp[5] = stmp[6] + 1;
            }
        }
        if(CAN.sendMsgBuf(0x00, 0, 8, stmp) == CAN_OK) {
            Log.info("Sent CAN message");
        }
        else {
            Log.error("Failed CAN message");
        }
        delay(1000);                       // send data per 100ms
#endif // LISTEN_ONLY

        if(!digitalRead(pin_int)) {
            ret = CAN.readMsgBufID(&msg.id, &msg.len, msg.data);
            if (ret == CAN_OK) {
                if(strncmp((char*)msg.data, SLEEP_CMD, strlen(SLEEP_CMD)) == 0) {
                    if(can_sleep(1000)) {
                        Log.info("CAN module put to sleep");
                        is_sleep = true;
                    }
                }
                else {
                    auto recv_msg = String("Can Msg Received: ");
                    for(int i = 0; i < msg.len; i++) {
                        recv_msg += String::format("%X ", msg.data[i]);
                    }

                    Log.info(recv_msg);
                }
            }
        }
    }
}
