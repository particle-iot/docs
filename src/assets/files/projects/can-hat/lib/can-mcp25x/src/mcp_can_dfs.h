/*
    mcp_can_dfs.h
    2012 Copyright (c) Seeed Technology Inc.  All right reserved.

    Author:Loovee (loovee@seeed.cc)
    2014-1-16

    Contributor:

    Cory J. Fowler
    Latonita
    Woodward1
    Mehtajaghvi
    BykeBlast
    TheRo0T
    Tsipizic
    ralfEdmund
    Nathancheek
    BlueAndi
    Adlerweb
    Btetz
    Hurvajs
    xboxpro1
    ttlappalainen

    The MIT License (MIT)

    Copyright (c) 2013 Seeed Technology Inc.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/
#ifndef _MCP2515DFS_H_
#define _MCP2515DFS_H_

#include "Particle.h"
#include <inttypes.h>

// if print debug information
#define CAN_DEBUG_MODE 0

// Begin mt

#define TIMEOUTVALUE    50
#define MCP_SIDH        0
#define MCP_SIDL        1
#define MCP_EID8        2
#define MCP_EID0        3

#define MCP_TXB_EXIDE_M     0x08                                        // In TXBnSIDL
#define MCP_DLC_MASK        0x0F                                        // 4 LSBits
#define MCP_RTR_MASK        0x40                                        // (1<<6) Bit 6

#define MCP_RXB_RX_ANY      0x60
#define MCP_RXB_RX_EXT      0x40
#define MCP_RXB_RX_STD      0x20
#define MCP_RXB_RX_STDEXT   0x00
#define MCP_RXB_RX_MASK     0x60
#define MCP_RXB_BUKT_MASK   (1<<2)


// Bits in the TXBnCTRL registers.

#define MCP_TXB_TXBUFE_M    0x80
#define MCP_TXB_ABTF_M      0x40
#define MCP_TXB_MLOA_M      0x20
#define MCP_TXB_TXERR_M     0x10
#define MCP_TXB_TXREQ_M     0x08
#define MCP_TXB_TXIE_M      0x04
#define MCP_TXB_TXP10_M     0x03

#define MCP_TXB_RTR_M       0x40                                        // In TXBnDLC
#define MCP_RXB_IDE_M       0x08                                        // In RXBnSIDL
#define MCP_RXB_RTR_M       0x40                                        // In RXBnDLC

#define MCP_STAT_TX_PENDING_MASK (0x54)
#define MCP_STAT_TX0_PENDING (0x04)
#define MCP_STAT_TX1_PENDING (0x10)
#define MCP_STAT_TX2_PENDING (0x40)
#define MCP_STAT_TXIF_MASK   (0xA8)
#define MCP_STAT_TX0IF       (0x08)
#define MCP_STAT_TX1IF       (0x20)
#define MCP_STAT_TX2IF       (0x80)
#define MCP_STAT_RXIF_MASK   (0x03)
#define MCP_STAT_RX0IF (1<<0)
#define MCP_STAT_RX1IF (1<<1)

#define MCP_EFLG_RX1OVR (1<<7)
#define MCP_EFLG_RX0OVR (1<<6)
#define MCP_EFLG_TXBO   (1<<5)
#define MCP_EFLG_TXEP   (1<<4)
#define MCP_EFLG_RXEP   (1<<3)
#define MCP_EFLG_TXWAR  (1<<2)
#define MCP_EFLG_RXWAR  (1<<1)
#define MCP_EFLG_EWARN  (1<<0)
#define MCP_EFLG_ERRORMASK  (0xF8)                                      // 5 MS-Bits

// Define MCP2515 register addresses

#define MCP_RXF0SIDH    0x00
#define MCP_RXF0SIDL    0x01
#define MCP_RXF0EID8    0x02
#define MCP_RXF0EID0    0x03
#define MCP_RXF1SIDH    0x04
#define MCP_RXF1SIDL    0x05
#define MCP_RXF1EID8    0x06
#define MCP_RXF1EID0    0x07
#define MCP_RXF2SIDH    0x08
#define MCP_RXF2SIDL    0x09
#define MCP_RXF2EID8    0x0A
#define MCP_RXF2EID0    0x0B
#define MCP_BFPCTRL     0x0C
#define MCP_TXRTSCTRL   0x0D
#define MCP_CANSTAT     0x0E
#define MCP_CANCTRL     0x0F
#define MCP_RXF3SIDH    0x10
#define MCP_RXF3SIDL    0x11
#define MCP_RXF3EID8    0x12
#define MCP_RXF3EID0    0x13
#define MCP_RXF4SIDH    0x14
#define MCP_RXF4SIDL    0x15
#define MCP_RXF4EID8    0x16
#define MCP_RXF4EID0    0x17
#define MCP_RXF5SIDH    0x18
#define MCP_RXF5SIDL    0x19
#define MCP_RXF5EID8    0x1A
#define MCP_RXF5EID0    0x1B
#define MCP_TEC         0x1C
#define MCP_REC         0x1D
#define MCP_RXM0SIDH    0x20
#define MCP_RXM0SIDL    0x21
#define MCP_RXM0EID8    0x22
#define MCP_RXM0EID0    0x23
#define MCP_RXM1SIDH    0x24
#define MCP_RXM1SIDL    0x25
#define MCP_RXM1EID8    0x26
#define MCP_RXM1EID0    0x27
#define MCP_CNF3        0x28
#define MCP_CNF2        0x29
#define MCP_CNF1        0x2A
#define MCP_CANINTE     0x2B
#define MCP_CANINTF     0x2C
#define MCP_EFLG        0x2D
#define MCP_TXB0CTRL    0x30
#define MCP_TXB0SIDH    0x31
#define MCP_TXB1CTRL    0x40
#define MCP_TXB1SIDH    0x41
#define MCP_TXB2CTRL    0x50
#define MCP_TXB2SIDH    0x51
#define MCP_RXB0CTRL    0x60
#define MCP_RXB0SIDH    0x61
#define MCP_RXB1CTRL    0x70
#define MCP_RXB1SIDH    0x71

#define MCP_TX_INT      0x1C                                    // Enable all transmit interrup ts
#define MCP_TX01_INT    0x0C                                    // Enable TXB0 and TXB1 interru pts
#define MCP_RX_INT      0x03                                    // Enable receive interrupts
#define MCP_NO_INT      0x00                                    // Disable all interrupts

#define MCP_TX01_MASK   0x14
#define MCP_TX_MASK     0x54


// Define SPI Instruction Set

#define MCP_WRITE       0x02
#define MCP_READ        0x03
#define MCP_BITMOD      0x05
#define MCP_LOAD_TX0    0x40
#define MCP_LOAD_TX1    0x42
#define MCP_LOAD_TX2    0x44

#define MCP_RTS_TX0     0x81
#define MCP_RTS_TX1     0x82
#define MCP_RTS_TX2     0x84
#define MCP_RTS_ALL     0x87
#define MCP_READ_RX0    0x90
#define MCP_READ_RX1    0x94
#define MCP_READ_STATUS 0xA0
#define MCP_RX_STATUS   0xB0
#define MCP_RESET       0xC0


// CANCTRL Register Values

#define MCP_MODE_NORMAL     0x00
#define MCP_MODE_SLEEP      0x20
#define MCP_MODE_LOOPBACK   0x40
#define MCP_MODE_LISTENONLY 0x60
#define MCP_MODE_CONFIG     0x80
#define MCP_MODE_POWERUP    0xE0
#define MCP_MODE_MASK       0xE0
#define MCP_ABORT_TX        0x10
#define MCP_MODE_ONESHOT    0x08
#define MCP_CLKOUT_ENABLE   0x04
#define MCP_CLKOUT_DISABLE  0x00
#define MCP_CLKOUT_PS1      0x00
#define MCP_CLKOUT_PS2      0x01
#define MCP_CLKOUT_PS4      0x02
#define MCP_CLKOUT_PS8      0x03


// CNF1 Register Values

#define SJW1            0x00
#define SJW2            0x40
#define SJW3            0x80
#define SJW4            0xC0


//  CNF2 Register Values

#define BTLMODE         0x80
#define SAMPLE_1X       0x00
#define SAMPLE_3X       0x40


// CNF3 Register Values

#define SOF_ENABLE      0x80
#define SOF_DISABLE     0x00
#define WAKFIL_ENABLE   0x40
#define WAKFIL_DISABLE  0x00


// CANINTF Register Bits

#define MCP_RX0IF       0x01
#define MCP_RX1IF       0x02
#define MCP_TX0IF       0x04
#define MCP_TX1IF       0x08
#define MCP_TX2IF       0x10
#define MCP_ERRIF       0x20
#define MCP_WAKIF       0x40
#define MCP_MERRF       0x80

// BFPCTRL Register Bits

#define B1BFS           0x20
#define B0BFS           0x10
#define B1BFE           0x08
#define B0BFE           0x04
#define B1BFM           0x02
#define B0BFM           0x01

// TXRTCTRL Register Bits

#define B2RTS           0x20
#define B1RTS           0x10
#define B0RTS           0x08
#define B2RTSM          0x04
#define B1RTSM          0x02
#define B0RTSM          0x01

// clock

#define MCP_20MHZ   0
#define MCP_16MHz   1
#define MCP_8MHz    2
#define MCP_12MHz   3

// speed 8M

#define MCP_8MHz_1000kBPS_CFG1 (0x00)
#define MCP_8MHz_1000kBPS_CFG2 (0xC0)
#define MCP_8MHz_1000kBPS_CFG3 (0x80)

#define MCP_8MHz_500kBPS_CFG1 (0x00)
#define MCP_8MHz_500kBPS_CFG2 (0xD1)
#define MCP_8MHz_500kBPS_CFG3 (0x81)

#define MCP_8MHz_250kBPS_CFG1 (0x80)
#define MCP_8MHz_250kBPS_CFG2 (0xE5)
#define MCP_8MHz_250kBPS_CFG3 (0x83)

#define MCP_8MHz_200kBPS_CFG1 (0x80)
#define MCP_8MHz_200kBPS_CFG2 (0xF6)
#define MCP_8MHz_200kBPS_CFG3 (0x84)

#define MCP_8MHz_125kBPS_CFG1 (0x81)
#define MCP_8MHz_125kBPS_CFG2 (0xE5)
#define MCP_8MHz_125kBPS_CFG3 (0x83)

#define MCP_8MHz_100kBPS_CFG1 (0x81)
#define MCP_8MHz_100kBPS_CFG2 (0xF6)
#define MCP_8MHz_100kBPS_CFG3 (0x84)

#define MCP_8MHz_80kBPS_CFG1 (0x84)
#define MCP_8MHz_80kBPS_CFG2 (0xD3)
#define MCP_8MHz_80kBPS_CFG3 (0x81)

#define MCP_8MHz_50kBPS_CFG1 (0x84)
#define MCP_8MHz_50kBPS_CFG2 (0xE5)
#define MCP_8MHz_50kBPS_CFG3 (0x83)

#define MCP_8MHz_40kBPS_CFG1 (0x84)
#define MCP_8MHz_40kBPS_CFG2 (0xF6)
#define MCP_8MHz_40kBPS_CFG3 (0x84)

#define MCP_8MHz_33k3BPS_CFG1 (0x85)
#define MCP_8MHz_33k3BPS_CFG2 (0xF6)
#define MCP_8MHz_33k3BPS_CFG3 (0x84)

#define MCP_8MHz_31k25BPS_CFG1 (0x87)
#define MCP_8MHz_31k25BPS_CFG2 (0xE5)
#define MCP_8MHz_31k25BPS_CFG3 (0x83)

#define MCP_8MHz_20kBPS_CFG1 (0x89)
#define MCP_8MHz_20kBPS_CFG2 (0xF6)
#define MCP_8MHz_20kBPS_CFG3 (0x84)

#define MCP_8MHz_10kBPS_CFG1 (0x93)
#define MCP_8MHz_10kBPS_CFG2 (0xF6)
#define MCP_8MHz_10kBPS_CFG3 (0x84)

#define MCP_8MHz_5kBPS_CFG1 (0xA7)
#define MCP_8MHz_5kBPS_CFG2 (0xF6)
#define MCP_8MHz_5kBPS_CFG3 (0x84)


 // speed 12M

#define MCP_12MHz_1000kBPS_CFG1 (0x00)
#define MCP_12MHz_1000kBPS_CFG2 (0x80)
#define MCP_12MHz_1000kBPS_CFG3 (0x02)

#define MCP_12MHz_500kBPS_CFG1 (0x00)
#define MCP_12MHz_500kBPS_CFG2 (0x91)
#define MCP_12MHz_500kBPS_CFG3 (0x05)

#define MCP_12MHz_250kBPS_CFG1 (0x80)
#define MCP_12MHz_250kBPS_CFG2 (0xbe)
#define MCP_12MHz_250kBPS_CFG3 (0x07)

#define MCP_12MHz_200kBPS_CFG1 (0x01)
#define MCP_12MHz_200kBPS_CFG2 (0x9a)
#define MCP_12MHz_200kBPS_CFG3 (0x06)

#define MCP_12MHz_125kBPS_CFG1 (0x01)
#define MCP_12MHz_125kBPS_CFG2 (0xbe)
#define MCP_12MHz_125kBPS_CFG3 (0x07)

#define MCP_12MHz_100kBPS_CFG1 (0x02)
#define MCP_12MHz_100kBPS_CFG2 (0xac)
#define MCP_12MHz_100kBPS_CFG3 (0x07)

#define MCP_12MHz_80kBPS_CFG1 (0x02)
#define MCP_12MHz_80kBPS_CFG2 (0xbf)
#define MCP_12MHz_80kBPS_CFG3 (0x08)

#define MCP_12MHz_50kBPS_CFG1 (0x04)
#define MCP_12MHz_50kBPS_CFG2 (0xbe)
#define MCP_12MHz_50kBPS_CFG3 (0x07)

#define MCP_12MHz_40kBPS_CFG1 (0x05)
#define MCP_12MHz_40kBPS_CFG2 (0xbf)
#define MCP_12MHz_40kBPS_CFG3 (0x07)

#define MCP_12MHz_20kBPS_CFG1 (0x0b)
#define MCP_12MHz_20kBPS_CFG2 (0xbf)
#define MCP_12MHz_20kBPS_CFG3 (0x07)

#define MCP_12MHz_10kBPS_CFG1 (0x17)
#define MCP_12MHz_10kBPS_CFG2 (0xbf)
#define MCP_12MHz_10kBPS_CFG3 (0x07)

#define MCP_12MHz_5kBPS_CFG1 (0x2f)
#define MCP_12MHz_5kBPS_CFG2 (0xbf)
#define MCP_12MHz_5kBPS_CFG3 (0x07)

 // speed 16M

#define MCP_16MHz_1000kBPS_CFG1 (0x00)
#define MCP_16MHz_1000kBPS_CFG2 (0xCA)
#define MCP_16MHz_1000kBPS_CFG3 (0x81)

#define MCP_16MHz_500kBPS_CFG1 (0x40)
#define MCP_16MHz_500kBPS_CFG2 (0xE5)
#define MCP_16MHz_500kBPS_CFG3 (0x83)

#define MCP_16MHz_250kBPS_CFG1 (0x41)
#define MCP_16MHz_250kBPS_CFG2 (0xE5)
#define MCP_16MHz_250kBPS_CFG3 (0x83)

#define MCP_16MHz_200kBPS_CFG1 (0x41)
#define MCP_16MHz_200kBPS_CFG2 (0xF6)
#define MCP_16MHz_200kBPS_CFG3 (0x84)

#define MCP_16MHz_125kBPS_CFG1 (0x43)
#define MCP_16MHz_125kBPS_CFG2 (0xE5)
#define MCP_16MHz_125kBPS_CFG3 (0x83)

#define MCP_16MHz_100kBPS_CFG1 (0x44)
#define MCP_16MHz_100kBPS_CFG2 (0xE5)
#define MCP_16MHz_100kBPS_CFG3 (0x83)

#define MCP_16MHz_95kBPS_CFG1 (0x03)
#define MCP_16MHz_95kBPS_CFG2 (0xAD)
#define MCP_16MHz_95kBPS_CFG3 (0x07)

#define MCP_16MHz_83k3BPS_CFG1 (0x03)
#define MCP_16MHz_83k3BPS_CFG2 (0xBE)
#define MCP_16MHz_83k3BPS_CFG3 (0x07)

#define MCP_16MHz_80kBPS_CFG1 (0x44)
#define MCP_16MHz_80kBPS_CFG2 (0xF6)
#define MCP_16MHz_80kBPS_CFG3 (0x84)

#define MCP_16MHz_50kBPS_CFG1 (0x47)
#define MCP_16MHz_50kBPS_CFG2 (0xF6)
#define MCP_16MHz_50kBPS_CFG3 (0x84)

#define MCP_16MHz_40kBPS_CFG1 (0x49)
#define MCP_16MHz_40kBPS_CFG2 (0xF6)
#define MCP_16MHz_40kBPS_CFG3 (0x84)

#define MCP_16MHz_33k3BPS_CFG1 (0x4E)
#define MCP_16MHz_33k3BPS_CFG2 (0xE5)
#define MCP_16MHz_33k3BPS_CFG3 (0x83)

#define MCP_16MHz_33kBPS_CFG1 (0x09)
#define MCP_16MHz_33kBPS_CFG2 (0xBE)
#define MCP_16MHz_33kBPS_CFG3 (0x07)

#define MCP_16MHz_31k25BPS_CFG1 (0x0F)
#define MCP_16MHz_31k25BPS_CFG2 (0xF1)
#define MCP_16MHz_31k25BPS_CFG3 (0x85)

#define MCP_16MHz_25kBPS_CFG1 (0X0F)
#define MCP_16MHz_25kBPS_CFG2 (0XBA)
#define MCP_16MHz_25kBPS_CFG3 (0X07)


#define MCP_16MHz_20kBPS_CFG1 (0x53)
#define MCP_16MHz_20kBPS_CFG2 (0xF6)
#define MCP_16MHz_20kBPS_CFG3 (0x84)

#define MCP_16MHz_10kBPS_CFG1 (0x67)
#define MCP_16MHz_10kBPS_CFG2 (0xF6)
#define MCP_16MHz_10kBPS_CFG3 (0x84)

#define MCP_16MHz_5kBPS_CFG1 (0x3F)
#define MCP_16MHz_5kBPS_CFG2 (0xFF)
#define MCP_16MHz_5kBPS_CFG3 (0x87)


// speed 20M

#define MCP_20MHz_1000kBPS_CFG1 (0x00)
#define MCP_20MHz_1000kBPS_CFG2 (0xD9)
#define MCP_20MHz_1000kBPS_CFG3 (0x82)

#define MCP_20MHz_500kBPS_CFG1 (0x40)
#define MCP_20MHz_500kBPS_CFG2 (0xF6)
#define MCP_20MHz_500kBPS_CFG3 (0x84)

#define MCP_20MHz_250kBPS_CFG1 (0x41)
#define MCP_20MHz_250kBPS_CFG2 (0xF6)
#define MCP_20MHz_250kBPS_CFG3 (0x84)

#define MCP_20MHz_200kBPS_CFG1 (0x44)
#define MCP_20MHz_200kBPS_CFG2 (0xD3)
#define MCP_20MHz_200kBPS_CFG3 (0x81)

#define MCP_20MHz_125kBPS_CFG1 (0x44)
#define MCP_20MHz_125kBPS_CFG2 (0xE5)
#define MCP_20MHz_125kBPS_CFG3 (0x83)

#define MCP_20MHz_100kBPS_CFG1 (0x44)
#define MCP_20MHz_100kBPS_CFG2 (0xF6)
#define MCP_20MHz_100kBPS_CFG3 (0x84)

#define MCP_20MHz_80kBPS_CFG1 (0xC4)
#define MCP_20MHz_80kBPS_CFG2 (0xFF)
#define MCP_20MHz_80kBPS_CFG3 (0x87)

#define MCP_20MHz_50kBPS_CFG1 (0x49)
#define MCP_20MHz_50kBPS_CFG2 (0xF6)
#define MCP_20MHz_50kBPS_CFG3 (0x84)

#define MCP_20MHz_40kBPS_CFG1 (0x18)
#define MCP_20MHz_40kBPS_CFG2 (0xD3)
#define MCP_20MHz_40kBPS_CFG3 (0x81)

#define MCPDEBUG        (0)
#define MCPDEBUG_TXBUF  (0)
#define MCP_N_TXBUFFERS (3)

#define MCP_RXBUF_0 (MCP_RXB0SIDH)
#define MCP_RXBUF_1 (MCP_RXB1SIDH)

#define MCP2515_OK         (0)
#define MCP2515_FAIL       (1)
#define MCP_ALLTXBUSY      (2)

#define CANDEBUG   1

#define CANUSELOOP 0

#define CANSENDTIMEOUT (200)                                            // milliseconds

#define MCP_PIN_HIZ (0)
#define MCP_PIN_INT (1)
#define MCP_PIN_OUT (2)
#define MCP_PIN_IN  (3)

#define MCP_RX0BF (0)
#define MCP_RX1BF (1)
#define MCP_TX0RTS (2)
#define MCP_TX1RTS (3)
#define MCP_TX2RTS (4)

#define MCP_RX_ANY    0
#define MCP_RX_STDEXT 1


// initial value of gCANAutoProcess

#define CANAUTOPROCESS      (1)
#define CANAUTOON           (1)
#define CANAUTOOFF          (0)
#define CAN_STDID           (0)
#define CAN_EXTID           (1)
#define CANDEFAULTIDENT     (0x55CC)
#define CANDEFAULTIDENTEXT  (CAN_EXTID)

#define CAN_5KBPS           1
#define CAN_10KBPS          2
#define CAN_20KBPS          3
#define CAN_25KBPS          4
#define CAN_31K25BPS        5
#define CAN_33KBPS          6
#define CAN_40KBPS          7
#define CAN_50KBPS          8
#define CAN_80KBPS          9
#define CAN_83K3BPS         10
#define CAN_95KBPS          11
#define CAN_100KBPS         12
#define CAN_125KBPS         13
#define CAN_200KBPS         14
#define CAN_250KBPS         15
#define CAN_500KBPS         16
#define CAN_666KBPS         17
#define CAN_1000KBPS        18

#define CAN_OK              (0)
#define CAN_FAILINIT        (1)
#define CAN_FAILTX          (2)
#define CAN_MSGAVAIL        (3)
#define CAN_NOMSG           (4)
#define CAN_CTRLERROR       (5)
#define CAN_GETTXBFTIMEOUT  (6)
#define CAN_SENDMSGTIMEOUT  (7)
#define CAN_FAIL            (0xff)

#define CAN_MAX_CHAR_IN_MESSAGE (8)

#endif
/*********************************************************************************************************
    END FILE
*********************************************************************************************************/
