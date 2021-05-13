---
title: AN004 Interpreting Cloud Debug Logs 2
layout: commonTwo.hbs
columns: two
---
# AN004 Interpreting Cloud Debug Logs 2

The Cloud Debug tool is helpful for diagnosing connectivity issues. This application note begins with [AN003 Interpreting Cloud Debug](/datasheets/app-notes/an003-interpreting-cloud-debug/) which shows the basic patterns you'll see.

This application note is a deep dive into interpreting a complete successful log.

This guide mostly concentrates on cellular issues (Electron, E Series, and Boron).

Author: Rick

## Decoding u-blox AT Commands

In order to decode the u-blox AT commands you'll probably need to use the (somewhat confusing) AT Commands Manual. There are two different versions:

- [2G and 3G](/assets/pdfs/ublox-sara-at.pdf)
- [LTE](/assets/pdfs/ublox-sara-r4-at.pdf)

A typical transaction looks lie this for the Network registration status (AT+CREG) command:

```
    20.853 AT send      11 "AT+CREG=2\r\n"
    20.858 AT read OK    6 "\r\nOK\r\n"
    20.858 AT send      10 "AT+CREG?\r\n"
    20.865 AT read  +   33 "\r\n+CREG: 2,5,\"2CF7\",\"8A5A782\",6\r\n"
    20.867 AT read OK    6 "\r\nOK\r\n"
```

There are several forms of most commands, and most support the set, read, and test types. For example:

![CREG Syntax](/assets/images/app-notes/AN004/creg-syntax.png)

The first line of the output is a set command `AT+CREG=2`, and the value 2 is defined in the manual as "network registration and location information URC."

![CREG Set](/assets/images/app-notes/AN004/creg-set.png)

The second line `\r\nOK\r\n` indicates that the command was successful.

The third line `AT+CREG?` is a read request.

The fourth line `+CREG: 2,5,\"2CF7\",\"8A5A782\",6` is the response. From the syntax section, we can see:

- 2 = `<n>` value that was requested (network registration and location information URC)

![CREG Set](/assets/images/app-notes/AN004/creg-stat.png)

- 5 = `<stat>` from the table above, this is "registered, roaming." It is common for Particle SIM cards to show as roaming.

![CREG Set](/assets/images/app-notes/AN004/creg-lac.png)

- 2CF7 = `<lac>` The location area code
- 8A5A782 = `<ci>` The cell ID
- 6 = `<AcTStatus>` UTRAN with HSDPA and USUPA availability (common for 3G)

There is also an Action type, see `AT+CSQ` below.

The logs are very similar for the 2G/3G devices:

- Electron 2G (SARA-G350)
- Electron 3G Americas/Australia/New Zealand (SARA-U260)
- Electron 3G Europe/Asia/Africa (SARA-U270)
- E Series 2G/3G E310 (SARA-U201)
- Boron 2G/3G (SARA-U201)

And also for the LTE devices:

- Electron LTE (SARA-R410M-02B)
- E Series LTE (SARA-R410M-02B)
- Boron LTE (SARA-R410M-02B)

There are two different log explanations because the LTE logs are sufficiently different.

### Electron U260 log explanation

Here's an example of a successful connection on an Electron 2G/3G (U260), with some explanations:

```
clouddebug: press letter corresponding to the command
a - enter APN for 3rd-party SIM card
k - set keep-alive value
c - show carriers at this location
t - run normal tests (occurs automatically after 10 seconds)
or tap the MODE button once to show carriers
starting tests...
turning cellular on...
deviceID=2c0031000a51343334363138
manufacturer=u-blox
model=SARA-U260
firmware version=23.20
ordering code=SARA-U260-00S-00
IMEI=353162077777777
IMSI=u-blox
ICCID=8934076500009999999
```

This is the basic information about the modem. Note that on many versions of cloud debug, the IMSI is not filled in correctly.

```
0000020858 [app] INFO: enabling trace logging
attempting to connect to the cellular network...
0000020858 [system] INFO: Sim Ready
0000020858 [system] INFO: Sim Ready
0000020859 [system] INFO: ARM_WLAN_WD 1
0000020859 [system] INFO: ARM_WLAN_WD 1
```

This is the normal sequence when the modem is starting up:

```
[ Modem::register ] = = = = = = = = = = = = = =
    20.848 AT send      12 "AT+CGREG=2\r\n"
    20.853 AT read OK    6 "\r\nOK\r\n"
    20.853 AT send      11 "AT+CREG=2\r\n"
    20.858 AT read OK    6 "\r\nOK\r\n"
    20.858 AT send      10 "AT+CREG?\r\n"
    20.865 AT read  +   33 "\r\n+CREG: 2,5,\"2CF7\",\"8A5A782\",6\r\n"
    20.867 AT read OK    6 "\r\nOK\r\n"
```

The `AT+CREG` command registers with the cellular network, and is described above.
    
```    
    20.867 AT send      11 "AT+CGREG?\r\n"
    20.875 AT read  +   39 "\r\n+CGREG: 2,5,\"2CF7\",\"8A5A782\",6,\"65\"\r\n"
    20.877 AT read OK    6 "\r\nOK\r\n"
    20.877 AT send       4 "AT\r\n"
    20.880 AT read OK    6 "\r\nOK\r\n"
```

The next step is very similar, but uses the `AT+CGREG` command. That is he GPRS network registration status, the IP data layer. The response is nearly identical by adds the `<rac>` code (65, hexadecimal).

```    
    20.880 AT send      13 "AT+COPS=3,2\r\n"
    20.885 AT read OK    6 "\r\nOK\r\n"
```

The next step is Operator Selection (AT+COPS). The first operation is a set `AT+COPS=3,2`

![COPS values](/assets/images/app-notes/AN004/cops-values.png)

From the table, that is:

- 3 = `<mode>` set only `<format>`
- 2 = `<format>` numeric `<oper>`

This determines what we get back when we read the value.

```
    20.885 AT send      10 "AT+COPS?\r\n"
    20.892 AT read  +   25 "\r\n+COPS: 0,2,\"310410\",2\r\n"
    20.894 AT read OK    6 "\r\nOK\r\n"
```

When reading the COPS value back, we get:

- 0 = `<mode>` Automatic mode
- 2 = `<format>` Numeric `<oper>`
- "310410" = `<oper>` Operator code MCC=310 MNC=410 (AT&T)

![COPS AcT](/assets/images/app-notes/AN004/cops-act.png)

- 2 = `<AcT>` UTRAN (3G)

```
    20.894 AT send       8 "AT+CSQ\r\n"
    20.899 AT read  +   14 "\r\n+CSQ: 14,1\r\n"
    20.900 AT read OK    6 "\r\nOK\r\n"
```

Next is the test for signal quality (AT+CSQ). This is another command variation, the Action type. The CSQ action command returns the `<rssi>` and `<qual>` values. These values vary by modem and are different for 2G, 3G, and LTE.

![CSQ Syntax](/assets/images/app-notes/AN004/csq.png)

The RSSI value is somewhat confusing but for 2G/3G, larger numbers are better and the range is typically 0 - 31. 0 is a very poor signal and 31 is very good. The value of 14 in the response above is in the middle.

![CSQ RSSI](/assets/images/app-notes/AN004/csq-rssi.png)


```
[ Modem::join ] = = = = = = = = = = = = = = = =
    20.900 AT send       4 "AT\r\n"
    20.904 AT read OK    6 "\r\nOK\r\n"
    20.904 AT send      12 "AT+CGATT=1\r\n"
    20.909 AT read OK    6 "\r\nOK\r\n"
    20.909 AT send      14 "AT+UPSND=0,8\r\n"
    20.916 AT read  +   17 "\r\n+UPSND: 0,8,0\r\n"
    20.917 AT read OK    6 "\r\nOK\r\n"
    20.917 AT send      23 "AT+UPSD=0,7,\"0.0.0.0\"\r\n"
    20.924 AT read OK    6 "\r\nOK\r\n"
    20.924 AT send      36 "AT+UPSD=0,1,\"spark.telefonica.com\"\r\n"
    20.932 AT read OK    6 "\r\nOK\r\n"
    20.932 AT send      15 "AT+UPSD=0,6,0\r\n"
    20.938 AT read OK    6 "\r\nOK\r\n"
    20.938 AT send      14 "AT+UPSDA=0,3\r\n"
    23.387 AT read OK    6 "\r\nOK\r\n"
    23.387 AT send      14 "AT+UPSND=0,0\r\n"
    23.396 AT read  +   31 "\r\n+UPSND: 0,0,\"10.44.231.139\"\r\n"
    23.398 AT read OK    6 "\r\nOK\r\n"
    23.398 AT send      14 "AT+UPSND=0,1\r\n"
    23.405 AT read  +   30 "\r\n+UPSND: 0,1,\"80.58.61.250\"\r\n"
    23.406 AT read OK    6 "\r\nOK\r\n"
    23.406 AT send      14 "AT+UPSND=0,2\r\n"
    23.413 AT read  +   30 "\r\n+UPSND: 0,2,\"80.58.61.254\"\r\n"
    23.414 AT read OK    6 "\r\nOK\r\n"
0000023426 [system] INFO: ARM_WLAN_WD 2
0000023426 [system] INFO: ARM_WLAN_WD 2
0000023426 [system] INFO: CLR_WLAN_WD 1, DHCP success
0000023426 [system] INFO: CLR_WLAN_WD 1, DHCP success
```

This is typical for the last step of setting up packet switched data. The `AT+UPSD` is the Packet switched data configuration command.
    
```
connected to the cellular network in 0 milliseconds
connected to cellular network!
    23.416 AT send      12 "AT+UDOPN=9\r\n"
    23.447 AT read  +   20 "\r\n+UDOPN: 6,\"AT&T\"\r\n"
    23.448 AT read OK    6 "\r\nOK\r\n"
operator name=AT&T
    23.448 AT send       8 "AT+CSQ\r\n"
    23.453 AT read  +   14 "\r\n+CSQ: 15,1\r\n"
    23.454 AT read OK    6 "\r\nOK\r\n"
rssi=-83, qual=1
    23.454 AT send      11 "AT+CGED=5\r\n"
    23.461 AT read ERR  39 "\r\n+CME ERROR: operation not supported\r\n"
    23.462 AT send      11 "AT+CGED=3\r\n"
    23.470 AT read  +   22 "\r\n+CGED: RAT:\"UMTS\",\r\n"
    23.476 AT read UNK  62 "\r\nMCC:310, MNC:410, LAC:2cf7, CI:8a5a782, DLF:4384, ULF:4159\r\n"
    23.478 AT read OK    6 "\r\nOK\r\n"
0000023490 [app] INFO: service rat=UMTS mcc=310, mnc=410, lac=2cf7 ci=8a5a782 band=UMTS 850 rssi=0 dlf=4384 ulf=4159
0000023490 [app] INFO: service rat=UMTS mcc=310, mnc=410, lac=2cf7 ci=8a5a782 band=UMTS 850 rssi=0 dlf=4384 ulf=4159
    23.480 AT send      20 "AT+UPING=\"8.8.8.8\"\r\n"
    23.485 AT read OK    6 "\r\nOK\r\n"
ping addr 8.8.8.8=1
    23.485 AT send      31 "AT+UDNSRN=0,\"device.spark.io\"\r\n"
    30.275 AT read  +   27 "\r\n+UDNSRN: \"18.205.60.52\"\r\n"
    30.277 AT read OK    6 "\r\nOK\r\n"
device.spark.io=18.205.60.52
    30.283 AT send       4 "AT\r\n"
    30.283 AT read  +   47 "\r\n+UUPING: 1,32,\"dns.google\",\"8.8.8.8\",51,349\r\n"
    30.285 AT read  +   47 "\r\n+UUPING: 2,32,\"dns.google\",\"8.8.8.8\",51,339\r\n"
    30.289 AT read  +   47 "\r\n+UUPING: 3,32,\"dns.google\",\"8.8.8.8\",51,317\r\n"
    30.293 AT read  +   47 "\r\n+UUPING: 4,32,\"dns.google\",\"8.8.8.8\",51,315\r\n"
    30.295 AT read OK    6 "\r\nOK\r\n"
```

These commands are specific to cloud debug. The operator name is retrieved (`AT+UDOPN=9`), the signal quality is retrieved (`AT+CSQ`).

The nearby towers are attempted to be retrieved (`AT+CGED=5`) but this only works on 2G modems (u-blox SARA-G350).

For 2G/3G (SARA-U201, U260, and U270), `AT+CGED=3` will find the information on the connected tower.

For LTE devices, both commands fail.

Then for testing purposes, an attempt is done to do an ICMP PING of 8.8.8.8 (`AT+UPING`) and a DNS lookup of device.spark.io (`AT+UDNSRN`). As it turns out, this DNS address is not used for cellular devices, but it should still succeed.

```
connecting to cloud
0000030289 [system] INFO: Cloud: connecting
0000030289 [system] INFO: Cloud: connecting
0000030291 [system] INFO: Read Server Address = type:1,domain:$id.udp.particle.io
0000030291 [system] INFO: Read Server Address = type:1,domain:$id.udp.particle.io
0000030292 [system] ERROR: Failed to load session data from persistent storage
0000030292 [system] ERROR: Failed to load session data from persistent storage
0000030293 [system] INFO: Discarding session data
0000030293 [system] INFO: Discarding session data
0000030294 [system] TRACE: Resolving 2c0031000a51343334363138.udp.particle.io
    30.295 AT send      56 "AT+UDNSRN=0,\"2c0031000a51343334363138.udp.particle.io\"\r\n"
    30.855 AT read  +   27 "\r\n+UDNSRN: \"34.194.48.89\"\r\n"
    30.856 AT read OK    6 "\r\nOK\r\n"
0000030868 [system] INFO: Resolved 2c0031000a51343334363138.udp.particle.io to 34.194.48.89
0000030868 [system] INFO: Resolved 2c0031000a51343334363138.udp.particle.io to 34.194.48.89
```

This is standard for cloud connecting (Particle.connect). Note the device ID will be your device ID, not the one above. 

```
    30.857 AT send       4 "AT\r\n"
    30.860 AT read OK    6 "\r\nOK\r\n"
    30.860 AT send      15 "AT+USOCTL=0,0\r\n"
    30.868 AT read ERR  37 "\r\n+CME ERROR: operation not allowed\r\n"
    30.869 AT send      15 "AT+USOCTL=1,0\r\n"
    30.876 AT read ERR  37 "\r\n+CME ERROR: operation not allowed\r\n"
    30.877 AT send      15 "AT+USOCTL=2,0\r\n"
    30.884 AT read ERR  37 "\r\n+CME ERROR: operation not allowed\r\n"
    30.885 AT send      15 "AT+USOCTL=3,0\r\n"
    30.892 AT read ERR  37 "\r\n+CME ERROR: operation not allowed\r\n"
    30.893 AT send      15 "AT+USOCTL=4,0\r\n"
    30.900 AT read ERR  37 "\r\n+CME ERROR: operation not allowed\r\n"
    30.901 AT send      15 "AT+USOCTL=5,0\r\n"
    30.908 AT read ERR  37 "\r\n+CME ERROR: operation not allowed\r\n"
    30.909 AT send      15 "AT+USOCTL=6,0\r\n"
    30.916 AT read ERR  37 "\r\n+CME ERROR: operation not allowed\r\n"
socketSocket(UDP)
```

This is the setup of the sockets. The ERROR is common and is not an issue here. It's looking to see if sockets are still open and need to be closed. The error means the socket is not in use, which is actually what we want to happen.

```
    30.917 AT send      18 "AT+USOCR=17,5684\r\n"
    30.923 AT read  +   13 "\r\n+USOCR: 0\r\n"
    30.924 AT read OK    6 "\r\nOK\r\n"
Socket 0: handle 0 was created
0000030936 [system] TRACE: Connection attempt to 34.194.48.89:5684
0000030936 [system] INFO: Cloud socket connected
0000030936 [system] INFO: Cloud socket connected
```

This is creating the socket for the cloud connection.

```
0000030938 [system] INFO: Starting handshake: presense_announce=0
0000030938 [system] INFO: Starting handshake: presense_announce=0
0000030938 [comm.protocol.handshake] INFO: Establish secure connection
0000030938 [comm.protocol.handshake] INFO: Establish secure connection
0000030949 [comm.dtls] TRACE: restore size mismatch 1: 0/220
0000030949 [comm.dtls] INFO: (CMPL,RENEG,NO_SESS,ERR) restoreStatus=2
0000030949 [comm.dtls] INFO: (CMPL,RENEG,NO_SESS,ERR) restoreStatus=2
socketSendTo(0,34.194.48.89,5684,,111)
    30.940 AT send      36 "AT+USOST=0,\"34.194.48.89\",5684,111\r\n"
    30.947 AT read  >    3 "\r\n@"
    30.947 AT send     111 "\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x00\x00b\x01\x00\x00V\x00\x00\x00\x00\x00\x00\x00V\xfe\xfd\x96d\x9a\x94\x89\x99o;T2/K$\xad\x86R\x14hH\x93\xcf$\x15\xf3\xd6\xf02(\xe9=\"\t\x00\x00\x00\x04\xc0\xae\x00\xff\x01\x00\x00(\x00\r\x00\n\x00\b\x04\x03\x04\x01\x03\x03\x03\x01\x00\n\x00\x04\x00\x02\x00\x17\x00\v\x00\x02\x01\x00\x00\x13\x00\x02\x01\x02\x00\x14\x00\x02\x01\x02"
    31.090 AT read  +   17 "\r\n+USOST: 0,111\r\n"
    31.091 AT read OK    6 "\r\nOK\r\n"
    31.091 AT send       4 "AT\r\n"
    31.094 AT read OK    6 "\r\nOK\r\n"
    31.094 AT send      14 "AT+USORF=0,0\r\n"
    31.099 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    31.100 AT read OK    6 "\r\nOK\r\n"
    31.372 AT read  +   17 "\r\n+UUSORD: 0,60\r\n"
Socket 0: handle 0 has 60 bytes pending
    31.375 AT send      17 "AT+USORF=0,1024\r\n"
    31.389 AT read  +   99 "\r\n+USORF: 0,\"34.194.48.89\",5684,60,\"\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x00\x00/\x03\x00\x00#\x00\x00\x00\x00\x00\x00\x00#\xfe\xfd ]\x7fY\x80\f\x10\x19\x10 \xff\b\x89\xa0aL\xe8\xb9\xa2}~\x9cb\xe8\x89sE\x96\xaa\xf8\xc8~\xa1\"\r\n"
    31.393 AT read OK    4 "OK\r\n"
    31.393 AT send       4 "AT\r\n"
    31.396 AT read OK    6 "\r\nOK\r\n"
    31.396 AT send      14 "AT+USORF=0,0\r\n"
    31.401 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    31.402 AT read OK    6 "\r\nOK\r\n"
0000031414 [system] TRACE: received 60
socketSendTo(0,34.194.48.89,5684,,143)
    31.403 AT send      36 "AT+USOST=0,\"34.194.48.89\",5684,143\r\n"
    31.410 AT read  >    3 "\r\n@"
    31.410 AT send     143 "\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x01\x00\x82\x01\x00\x00v\x00\x01\x00\x00\x00\x00\x00v\xfe\xfd\x96d\x9a\x94\x89\x99o;T2/K$\xad\x86R\x14hH\x93\xcf$\x15\xf3\xd6\xf02(\xe9=\"\t\x00 ]\x7fY\x80\f\x10\x19\x10 \xff\b\x89\xa0aL\xe8\xb9\xa2}~\x9cb\xe8\x89sE\x96\xaa\xf8\xc8~\xa1\x00\x04\xc0\xae\x00\xff\x01\x00\x00(\x00\r\x00\n\x00\b\x04\x03\x04\x01\x03\x03\x03\x01\x00\n\x00\x04\x00\x02\x00\x17\x00\v\x00\x02\x01\x00\x00\x13\x00\x02\x01\x02\x00\x14\x00\x02\x01\x02"
    31.557 AT read  +   17 "\r\n+USOST: 0,143\r\n"
    31.558 AT read OK    6 "\r\nOK\r\n"
    31.558 AT send       4 "AT\r\n"
    31.562 AT read OK    6 "\r\nOK\r\n"
    31.562 AT send      14 "AT+USORF=0,0\r\n"
    31.567 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    31.568 AT read OK    6 "\r\nOK\r\n"
    31.844 AT read  +   18 "\r\n+UUSORD: 0,346\r\n"
Socket 0: handle 0 has 346 bytes pending
    31.854 AT send      17 "AT+USORF=0,1024\r\n"
    31.873 AT read  +  158 "\r\n+USORF: 0,\"34.194.48.89\",5684,118,\"\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x01\x00i\x02\x00\x00]\x00\x01\x00\x00\x00\x00\x00]\xfe\xfd]\x7fY\x81\x1eP\\\b\xcc\xf2\x14\xc0\x0e\xfc}\x10qX\xe3\xed\x895 ?q.\x846i\xde<\x90 fM\xc3\xfb\x8a\x81\x82\x03\"\x91\xd1\xfb\x9cZ\xd5\x82\xad\x88x\xdd?\xe1\xa2W\xb8O\x81AS/]\x88\xc0\xae\x00\x00\x15\xff\x01\x00\x01\x00\x00\v\x00\x02\x01\x00\x00\x13\x00\x01\x02\x00\x14\x00\x01\x02\"\r\n"
    31.879 AT read OK    4 "OK\r\n"
0000031891 [system] TRACE: received 118
    31.879 AT read  +   18 "\r\n+UUSORF: 0,228\r\n"
Socket 0: handle 0 has 228 bytes pending
    31.890 AT send      17 "AT+USORF=0,1024\r\n"
    31.914 AT read  +  210 "\r\n+USORF: 0,\"34.194.48.89\",5684,170,\"\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x02\x00\x9d\f\x00\x00\x91\x00\x02\x00\x00\x00\x00\x00\x91\x03\x00\x17A\x04\xe2\x84&\xd0;\xf2\x11\xe0\x8bs_\x1c\x82\xd3Rt\x8f\xd4\xf7\xa9\x19\xf7\r\xd8\xe5\xf03\xfb\xa9\x9a\xdc\x9c\xd1\xb9C\x800w\xc6tz\x9b\xd9\xbc >\xcbdA\xf4\x86I\xcc\xc2/\x06_^$`F\xeb1>\x04\x03\x00H0F\x02!\x00\xd1\x81\x93r\x9a\x80\b~TO\x01\xc1\xc0T\x00\xcf\x990\"f\x85\n\x8f\xa2\xd2\xcd-m\x10i\x9aI\x02!\x00\x9d\xb9\xf8)\x1aR\x1a8\xaa\xf4\xccH\x16\xffxoK\xcd\x17<\x16qaJ\x16v\x0f\x86\xf4\xb0\x90\xd2\"\r\n"
    31.921 AT read OK    4 "OK\r\n"
0000031933 [system] TRACE: received 170
    32.738 AT read  +   17 "\r\n+UUSORF: 0,58\r\n"
Socket 0: handle 0 has 58 bytes pending
    32.749 AT send      17 "AT+USORF=0,1024\r\n"
    32.760 AT read  +   72 "\r\n+USORF: 0,\"34.194.48.89\",5684,33,\"\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x03\x00\x14\r\x00\x00\b\x00\x03\x00\x00\x00\x00\x00\b\x01@\x00\x02\x04\x03\x00\x00\"\r\n"
    32.763 AT read OK    4 "OK\r\n"
0000032775 [system] TRACE: received 33
    32.763 AT read  +   17 "\r\n+UUSORF: 0,25\r\n"
Socket 0: handle 0 has 25 bytes pending
    32.774 AT send      17 "AT+USORF=0,1024\r\n"
    32.784 AT read  +   64 "\r\n+USORF: 0,\"34.194.48.89\",5684,25,\"\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x04\x00\f\x0e\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\"\r\n"
    32.787 AT read OK    4 "OK\r\n"
    32.787 AT send       4 "AT\r\n"
    32.790 AT read OK    6 "\r\nOK\r\n"
    32.790 AT send      14 "AT+USORF=0,0\r\n"
    32.795 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    32.796 AT read OK    6 "\r\nOK\r\n"
0000032808 [system] TRACE: received 25
socketSendTo(0,34.194.48.89,5684,,377)
    34.013 AT send      36 "AT+USOST=0,\"34.194.48.89\",5684,377\r\n"
    34.020 AT read  >    3 "\r\n@"
    34.020 AT send     377 "\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x02\x00j\v\x00\x00^\x00\x02\x00\x00\x00\x00\x00^\x00\x00[0Y0\x13\x06\a*\x86H\xce=\x02\x01\x06\b*\x86H\xce=\x03\x01\a\x03B\x00\x04\xeay|'7\xfb\xde$/\xab\x97I\xc40\x1c\x19!\"'i\xc5P\xff.\xa7\x8a\xd3\x8ey\x81\xad>\xfcq\xf1)I\xc2\x9a\xb3\x0eCz\x7f\x9b\xb5\xc0jb\v\b3\xd4>\xb4\xe9ELRV,XH\x80\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x03\x00N\x10\x00\x00B\x00\x03\x00\x00\x00\x00\x00BA\x04\".a\xc5\xc1{<lO\xffb\x87s\\\xfek\xe1_o\fCm\x9fQ\x0f\x8b8\x9d\xe0\ty\xd9\xaf\xbe\xf0-|\xf6\xc2\xdc\x9a\xaa.Rx\xa6)\xa97\xb0\xa3\xd9\x1c\xb9\x18\x89U|\xc8\xa4\xbc\xe18o\x16\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x04\x00W\x0f\x00\x00K\x00\x04\x00\x00\x00\x00\x00K\x04\x03\x00G0E\x02!\x00\xcb\x03\xf1\xc5<6\x97(\xc2\x82M+](\xfd\\\x92_\xd1\x86'\xec\xee\x96\"\xc3\xc5\xe9f-?T\x02 m\xd2\x19\x1dl\xf9\xa9P7\xbb\xd2\xa9\xc2\xc4\xdd\xfaS\xd2\x15\x1a\xf5\xb7\xa3o\xfdx\xe6\x15\xb1}8\x1d\x14\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x05\x00\x01\x01\x16\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x00\x00(\x00\x01\x00\x00\x00\x00\x00\x00\xb1_t\x93\xbe\xa4Q\xe9B!:D\x8dT0\xeca\xeaNM1~\r\x11!\x87\xac\xd7\x11\xa08G"
    34.195 AT read  +   17 "\r\n+USOST: 0,377\r\n"
    34.196 AT read OK    6 "\r\nOK\r\n"
    34.196 AT send       4 "AT\r\n"
    34.199 AT read OK    6 "\r\nOK\r\n"
    34.199 AT send      14 "AT+USORF=0,0\r\n"
    34.204 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    34.205 AT read OK    6 "\r\nOK\r\n"
    34.604 AT read  +   17 "\r\n+UUSORD: 0,14\r\n"
Socket 0: handle 0 has 14 bytes pending
    34.612 AT send      17 "AT+USORF=0,1024\r\n"
    34.621 AT read  +   53 "\r\n+USORF: 0,\"34.194.48.89\",5684,14,\"\x14\xfe\xfd\x00\x00\x00\x00\x00\x00\x00\x05\x00\x01\x01\"\r\n"
    34.623 AT read OK    4 "OK\r\n"
    34.623 AT send       4 "AT\r\n"
    34.623 AT read  +   17 "\r\n+UUSORF: 0,53\r\n"
Socket 0: handle 0 has 53 bytes pending
    34.626 AT read OK    6 "\r\nOK\r\n"
    34.626 AT send      14 "AT+USORF=0,0\r\n"
    34.631 AT read  +   16 "\r\n+USORF: 0,53\r\n"
Socket 0: handle 0 has 53 bytes pending
    34.632 AT read OK    6 "\r\nOK\r\n"
0000034644 [system] TRACE: received 14
    34.644 AT send      17 "AT+USORF=0,1024\r\n"
    34.657 AT read  +   92 "\r\n+USORF: 0,\"34.194.48.89\",5684,53,\"\x16\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x00\x00(\x00\x01\x00\x00\x00\x00\x00\x00M\x11J\xb9\x1dqp\x05W\x88/<\xe0\xdb\xaf\x0fa\x02\xf5y>U\xe6QN\xc9\xec\xf6\xee\x05?\xd8\"\r\n"
    34.661 AT read OK    4 "OK\r\n"
    34.661 AT send       4 "AT\r\n"
    34.664 AT read OK    6 "\r\nOK\r\n"
    34.664 AT send      14 "AT+USORF=0,0\r\n"
    34.669 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    34.670 AT read OK    6 "\r\nOK\r\n"
0000034682 [system] TRACE: received 53
0000034683 [comm.protocol.handshake] INFO: Sending HELLO message
0000034683 [comm.protocol.handshake] INFO: Sending HELLO message
0000034684 [comm] TRACE: sending message id=1 synchronously
0000034684 [comm.coap] TRACE: sending message id=1
socketSendTo(0,34.194.48.89,5684,,58)
    34.673 AT send      35 "AT+USOST=0,\"34.194.48.89\",5684,58\r\n"
    34.680 AT read  >    3 "\r\n@"
    34.680 AT send      58 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x01\x00-\x00\x01\x00\x00\x00\x00\x00\x01\xcb%h~}\"\xe5H\f\xde\x87\x12\x83b\x03\xa3\x84\x9b\x05\xa0\x99a\xfc\x00\x87\xb8\x1eQ[\xd4\xf8au\xad\xb9|\xc1"
    34.816 AT read  +   16 "\r\n+USOST: 0,58\r\n"
    34.817 AT read OK    6 "\r\nOK\r\n"
    34.817 AT send       4 "AT\r\n"
    34.820 AT read OK    6 "\r\nOK\r\n"
    34.820 AT send      14 "AT+USORF=0,0\r\n"
    34.825 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    34.826 AT read OK    6 "\r\nOK\r\n"
    35.080 AT read  +   17 "\r\n+UUSORD: 0,33\r\n"
Socket 0: handle 0 has 33 bytes pending
    35.090 AT send      17 "AT+USORF=0,1024\r\n"
    35.101 AT read  +   72 "\r\n+USORF: 0,\"34.194.48.89\",5684,33,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x01\x00\x14\x00\x01\x00\x00\x00\x00\x00\x01\xf8!M\x80N\xc91\x0f\xd8r\xb5\xa0\"\r\n"
    35.104 AT read OK    4 "OK\r\n"
    35.104 AT send       4 "AT\r\n"
    35.104 AT read  +   17 "\r\n+UUSORF: 0,38\r\n"
Socket 0: handle 0 has 38 bytes pending
    35.107 AT read OK    6 "\r\nOK\r\n"
    35.107 AT send      14 "AT+USORF=0,0\r\n"
    35.112 AT read  +   16 "\r\n+USORF: 0,38\r\n"
Socket 0: handle 0 has 38 bytes pending
    35.113 AT read OK    6 "\r\nOK\r\n"
0000035125 [system] TRACE: received 33
0000035125 [comm.coap] TRACE: recieved ACK for message id=1
0000035126 [comm.protocol.handshake] INFO: Handshake completed
0000035126 [comm.protocol.handshake] INFO: Handshake completed
```

This is a successful handshake with the cloud.

```
0000035127 [system] INFO: Send spark/device/last_reset event
0000035127 [system] INFO: Send spark/device/last_reset event
0000035128 [comm.coap] TRACE: sending message id=2
socketSendTo(0,34.194.48.89,5684,,71)
    35.116 AT send      35 "AT+USOST=0,\"34.194.48.89\",5684,71\r\n"
    35.123 AT read  >    3 "\r\n@"
    35.123 AT send      71 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x02\x00:\x00\x01\x00\x00\x00\x00\x00\x02\x1a\xe3O:\x84wV\x1b\xf1\x12j\xd1\xac\xa6\x00\t,\xbf+X\xfa0&\x04\xb4\t\x96\xef\x94\x90\xb9*G\x98\x17.\x8es\xe8e\xa3%\xca\xf2{\xc4lb\xcbK"
    35.261 AT read  +   16 "\r\n+USOST: 0,71\r\n"
    35.262 AT read OK    6 "\r\nOK\r\n"
0000035274 [comm.coap] TRACE: sending message id=3
socketSendTo(0,34.194.48.89,5684,,73)
    35.263 AT send      35 "AT+USOST=0,\"34.194.48.89\",5684,73\r\n"
    35.270 AT read  >    3 "\r\n@"
    35.270 AT send      73 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x03\x00<\x00\x01\x00\x00\x00\x00\x00\x03b\x98\x13}\xf5\xf8F\xfe\x80\x18\x9f\x1cio\x1cVFNs\x96\xa1`\xe7rW|\xa8\x81\xc6\xeb.9STs\x9aS\xab\\\xeb\xe4\xbd\\i\x0fF\x8b\xd2\xdc\x04-u"
    35.408 AT read  +   16 "\r\n+USOST: 0,73\r\n"
    35.409 AT read OK    6 "\r\nOK\r\n"
0000035421 [comm.coap] TRACE: sending message id=4
socketSendTo(0,34.194.48.89,5684,,73)
    35.410 AT send      35 "AT+USOST=0,\"34.194.48.89\",5684,73\r\n"
    35.417 AT read  >    3 "\r\n@"
    35.417 AT send      73 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x04\x00<\x00\x01\x00\x00\x00\x00\x00\x04\x0f\xf0q\xd6\xa9\xf2\xda\xe7\xe5\xeal\x9a\x82\x83,\xd0\xb3qcH\xd7\xd5\x18\xf3f1\xbd\xc3\x1a\r\xc0\xd8\x91x\xe3\x17\x04y\x9b\x91\xf1\xf4\xe2\xb0{\x17\xbcpB=\xb3\xe3"
    35.555 AT read  +   16 "\r\n+USOST: 0,73\r\n"
    35.556 AT read OK    6 "\r\nOK\r\n"
0000035568 [system] INFO: Send subscriptions
0000035568 [system] INFO: Send subscriptions
0000035569 [comm.coap] TRACE: sending message id=5
socketSendTo(0,34.194.48.89,5684,,43)
    35.557 AT send      35 "AT+USOST=0,\"34.194.48.89\",5684,43\r\n"
    35.564 AT read  >    3 "\r\n@"
    35.564 AT send      43 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x05\x00\x1e\x00\x01\x00\x00\x00\x00\x00\x05\xa3~\x87sI\x16\xad~]=\xf6\xd7\xb9\xfe\xaf\xb4\x15\xde\xc0(\xb1\xbf"
    35.699 AT read  +   16 "\r\n+USOST: 0,43\r\n"
    35.700 AT read OK    6 "\r\nOK\r\n"
0000035712 [comm.coap] TRACE: sending message id=6
socketSendTo(0,34.194.48.89,5684,,46)
    35.701 AT send      35 "AT+USOST=0,\"34.194.48.89\",5684,46\r\n"
    35.707 AT read  >    3 "\r\n@"
    35.707 AT send      46 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x06\x00!\x00\x01\x00\x00\x00\x00\x00\x06h\x91:\r\xcc.\xd3\x94X\xb3\x88L\x1fdf\x101\x13n\xbb2\xe3d3\x99"
    35.842 AT read  +   16 "\r\n+USOST: 0,46\r\n"
    35.843 AT read OK    6 "\r\nOK\r\n"
0000035855 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
0000035855 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
0000035856 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
0000035856 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
0000035857 [comm] INFO: Sending TIME request
0000035857 [comm] INFO: Sending TIME request
0000035857 [comm.coap] TRACE: sending message id=7
socketSendTo(0,34.194.48.89,5684,,36)
    35.846 AT send      35 "AT+USOST=0,\"34.194.48.89\",5684,36\r\n"
    35.853 AT read  >    3 "\r\n@"
    35.853 AT send      36 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\a\x00\x17\x00\x01\x00\x00\x00\x00\x00\a\xf9\xd0\xbb0\xcap\x91g\x8e-\x87\xad\xce;\xb9"
    35.989 AT read  +   16 "\r\n+USOST: 0,36\r\n"
    35.990 AT read OK    6 "\r\nOK\r\n"
    36.001 AT send      17 "AT+USORF=0,1024\r\n"
    36.013 AT read  +   77 "\r\n+USORF: 0,\"34.194.48.89\",5684,38,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x02\x00\x19\x00\x01\x00\x00\x00\x00\x00\x02\xa4\xa5m\xcd\a\x93U\xdc\xa0@h\xaa\x8f\x816\x19\xb3\"\r\n"
    36.016 AT read OK    4 "OK\r\n"
    36.016 AT send       4 "AT\r\n"
    36.016 AT read  +   18 "\r\n+UUSORF: 0,132\r\n"
Socket 0: handle 0 has 132 bytes pending
    36.019 AT read OK    6 "\r\nOK\r\n"
    36.019 AT send      14 "AT+USORF=0,0\r\n"
    36.025 AT read  +   17 "\r\n+USORF: 0,132\r\n"
Socket 0: handle 0 has 132 bytes pending
    36.026 AT read OK    6 "\r\nOK\r\n"
0000036038 [system] TRACE: received 38
```

This is the sending of the event subscription list and synchronizing the time.

```
[ Modem::getSignalStrength ] = = = = = = = = = =
    36.028 AT send       4 "AT\r\n"
    36.031 AT read OK    6 "\r\nOK\r\n"
    36.031 AT send      13 "AT+COPS=3,2\r\n"
    36.035 AT read OK    6 "\r\nOK\r\n"
    36.035 AT send      10 "AT+COPS?\r\n"
    36.041 AT read  +   25 "\r\n+COPS: 0,2,\"310410\",2\r\n"
    36.042 AT read OK    6 "\r\nOK\r\n"
    36.042 AT send       8 "AT+CSQ\r\n"
    36.046 AT read  +   14 "\r\n+CSQ: 15,1\r\n"
    36.047 AT read OK    6 "\r\nOK\r\n"
    36.047 AT send       4 "AT\r\n"
    36.050 AT read OK    6 "\r\nOK\r\n"
    36.050 AT send      13 "AT+COPS=3,2\r\n"
    36.054 AT read OK    6 "\r\nOK\r\n"
    36.054 AT send      10 "AT+COPS?\r\n"
    36.060 AT read  +   25 "\r\n+COPS: 0,2,\"310410\",2\r\n"
    36.061 AT read OK    6 "\r\nOK\r\n"
```

This is getting the operator and signal quality issue for device diagnostics.   
   
```    
0000036073 [comm.protocol] INFO: Posting 'M' describe message
0000036073 [comm.protocol] INFO: Posting 'M' describe message
0000036074 [comm.coap] TRACE: sending message id=da4
socketSendTo(0,34.194.48.89,5684,,210)
    36.063 AT send      36 "AT+USOST=0,\"34.194.48.89\",5684,210\r\n"
    36.070 AT read  >    3 "\r\n@"
    36.070 AT send     210 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\b\x00\xc5\x00\x01\x00\x00\x00\x00\x00\b\x92\x11oU\x81\xa1\xcb6\x1a\x15d4\x9a\xb4\xf7VAZt\x81\x19\x84\x91\x8d\xe8\x92]\x95\xad[}\xb3\xcf8xU\x8ce\x88\x84\x83\vY\x8d\xfe\xab\xdb\x8d\xa1\xbe\xea*=u\xf8*\xb4E5\x8dr\xd5\xc8\xf0\xaa\xca\x14\xcd>\x8dg\xdb\x82\xdb\xdf\xfb\xf0\xde\xf2\"\xe2\xad\xa8w\xfb\x94\xb7a\xd7\xc7\xa4Aq\xf1\x89l]\xbe\xac\xb4n\x83\xd7\x0ef\xe1\\^|s\xd1\x9f\xda\xa4\xe1\xbf\x9d\x04\x8b\x83\xa0\xf53\xe4\xe8E\xfb\xe9\xa7\vi\xa8O\x83\xd6\xf0$`\x1c!\xba\x81\x9c\xf6*\x97\x1b\xcaNV;\xcf\xf3\xcd\xd6c\xc7\x80s\xd0r\xd5\xe0}\xc9\x8b\xc9\x88[\xda\x1a\vu\xc0w\x06\b\x9e\xebi_\rL\x11\xe8m\x99TO"
    36.224 AT read  +   17 "\r\n+USOST: 0,210\r\n"
    36.225 AT read OK    6 "\r\nOK\r\n"
0000036237 [comm.protocol] INFO: rcv'd message type=1
0000036237 [comm.protocol] INFO: rcv'd message type=1
0000036238 [system] TRACE: Waiting until all handshake messages are processed by the protocol layer
    36.237 AT send      17 "AT+USORF=0,1024\r\n"
    36.248 AT read  +   72 "\r\n+USORF: 0,\"34.194.48.89\",5684,33,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x03\x00\x14\x00\x01\x00\x00\x00\x00\x00\x03\xa4\xc6=\xdc\xc9\xba\x03\x85\xdf\xf1\xfa{\"\r\n"
    36.251 AT read OK    4 "OK\r\n"
0000036263 [system] TRACE: received 33
0000036263 [comm.coap] TRACE: recieved ACK for message id=2
0000036264 [comm.protocol] TRACE: Reply recieved: type=2, code=0
0000036264 [comm.protocol] INFO: message id 2 complete with code 0.00
0000036264 [comm.protocol] INFO: message id 2 complete with code 0.00
0000036265 [comm.protocol] INFO: rcv'd message type=13
0000036265 [comm.protocol] INFO: rcv'd message type=13
    36.254 AT read  +   18 "\r\n+UUSORF: 0,171\r\n"
Socket 0: handle 0 has 171 bytes pending
    36.265 AT send      17 "AT+USORF=0,1024\r\n"
    36.276 AT read  +   72 "\r\n+USORF: 0,\"34.194.48.89\",5684,33,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x04\x00\x14\x00\x01\x00\x00\x00\x00\x00\x04T\xcc\xe10I\xdd\x01\xd4\x18\xf1\xbc\x9f\"\r\n"
    36.279 AT read OK    4 "OK\r\n"
0000036291 [system] TRACE: received 33
0000036291 [comm.coap] TRACE: recieved ACK for message id=3
0000036292 [comm.protocol] TRACE: Reply recieved: type=2, code=0
0000036292 [comm.protocol] INFO: message id 3 complete with code 0.00
0000036292 [comm.protocol] INFO: message id 3 complete with code 0.00
0000036293 [comm.protocol] INFO: rcv'd message type=13
0000036293 [comm.protocol] INFO: rcv'd message type=13
    36.282 AT read  +   18 "\r\n+UUSORF: 0,138\r\n"
Socket 0: handle 0 has 138 bytes pending
    36.293 AT send      17 "AT+USORF=0,1024\r\n"
    36.304 AT read  +   72 "\r\n+USORF: 0,\"34.194.48.89\",5684,33,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x05\x00\x14\x00\x01\x00\x00\x00\x00\x00\x05\xaf\x06\xa2N\xa4\x80X\x14\x16{P\x02\"\r\n"
    36.307 AT read OK    4 "OK\r\n"
0000036319 [system] TRACE: received 33
0000036319 [comm.coap] TRACE: recieved ACK for message id=4
0000036320 [comm.protocol] TRACE: Reply recieved: type=2, code=0
0000036320 [comm.protocol] INFO: message id 4 complete with code 0.00
0000036320 [comm.protocol] INFO: message id 4 complete with code 0.00
0000036321 [comm.protocol] INFO: rcv'd message type=13
0000036321 [comm.protocol] INFO: rcv'd message type=13
    36.310 AT read  +   18 "\r\n+UUSORF: 0,105\r\n"
Socket 0: handle 0 has 105 bytes pending
    36.321 AT send      17 "AT+USORF=0,1024\r\n"
    36.332 AT read  +   72 "\r\n+USORF: 0,\"34.194.48.89\",5684,33,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x06\x00\x14\x00\x01\x00\x00\x00\x00\x00\x06\xee\x00\xda\xc6\xccBN\x7f\x81\xa1\xf9I\"\r\n"
    36.335 AT read OK    4 "OK\r\n"
0000036347 [system] TRACE: received 33
0000036347 [comm.coap] TRACE: recieved ACK for message id=5
0000036348 [comm.protocol] TRACE: Reply recieved: type=2, code=0
0000036348 [comm.protocol] INFO: message id 5 complete with code 0.00
0000036348 [comm.protocol] INFO: message id 5 complete with code 0.00
0000036349 [comm.protocol] INFO: rcv'd message type=13
0000036349 [comm.protocol] INFO: rcv'd message type=13
    36.338 AT read  +   17 "\r\n+UUSORF: 0,72\r\n"
Socket 0: handle 0 has 72 bytes pending
    36.349 AT send      17 "AT+USORF=0,1024\r\n"
    36.360 AT read  +   72 "\r\n+USORF: 0,\"34.194.48.89\",5684,33,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\a\x00\x14\x00\x01\x00\x00\x00\x00\x00\a\xa5\xc5a\xaa\xc9\xb4\xb0\x85\xafo|[\"\r\n"
    36.363 AT read OK    4 "OK\r\n"
0000036375 [system] TRACE: received 33
0000036375 [comm.coap] TRACE: recieved ACK for message id=6
0000036376 [comm.protocol] TRACE: Reply recieved: type=2, code=0
0000036376 [comm.protocol] INFO: message id 6 complete with code 0.00
0000036376 [comm.protocol] INFO: message id 6 complete with code 0.00
0000036377 [comm.protocol] INFO: rcv'd message type=13
0000036377 [comm.protocol] INFO: rcv'd message type=13
    36.366 AT read  +   17 "\r\n+UUSORF: 0,77\r\n"
Socket 0: handle 0 has 77 bytes pending
    36.377 AT send      17 "AT+USORF=0,1024\r\n"
    36.389 AT read  +   78 "\r\n+USORF: 0,\"34.194.48.89\",5684,39,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\b\x00\x1a\x00\x01\x00\x00\x00\x00\x00\b\x03\xc0t\xdcP\x14\xa6\x90G\xa9\xfc\xdb\xbc\xb7\xc9\x1dG^\"\r\n"
    36.392 AT read OK    4 "OK\r\n"
0000036404 [system] TRACE: received 39
0000036404 [comm.coap] TRACE: recieved ACK for message id=7
0000036405 [system] INFO: All handshake messages have been processed
0000036405 [system] INFO: All handshake messages have been processed
0000036406 [comm.protocol] TRACE: Reply recieved: type=2, code=69
0000036406 [comm.protocol] INFO: message id 7 complete with code 2.05
0000036406 [comm.protocol] INFO: message id 7 complete with code 2.05
0000036407 [comm.protocol] INFO: Received TIME response: 1568627077
0000036407 [comm.protocol] INFO: Received TIME response: 1568627077
0000036408 [comm.protocol] INFO: rcv'd message type=12
0000036408 [comm.protocol] INFO: rcv'd message type=12
    36.397 AT read  +   17 "\r\n+UUSORF: 0,38\r\n"
Socket 0: handle 0 has 38 bytes pending
    36.408 AT send      17 "AT+USORF=0,1024\r\n"
    36.419 AT read  +   77 "\r\n+USORF: 0,\"34.194.48.89\",5684,38,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\t\x00\x19\x00\x01\x00\x00\x00\x00\x00\te\xb6`\xcd\x92\xd5\xc2\xc3\xc5\xd3\xa5\x17\x88\xfcf\xdb\xbe\"\r\n"
    36.422 AT read OK    4 "OK\r\n"
    36.422 AT send       4 "AT\r\n"
    36.425 AT read OK    6 "\r\nOK\r\n"
    36.425 AT send      14 "AT+USORF=0,0\r\n"
    36.430 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    36.431 AT read OK    6 "\r\nOK\r\n"
0000036443 [system] TRACE: received 38
0000036452 [comm.protocol] INFO: Posting 'S' describe message
0000036452 [comm.protocol] INFO: Posting 'S' describe message
0000036453 [comm.coap] TRACE: sending message id=da5
socketSendTo(0,34.194.48.89,5684,,678)
    36.443 AT send      36 "AT+USOST=0,\"34.194.48.89\",5684,678\r\n"
    36.450 AT read  >    3 "\r\n@"
    36.450 AT send     678 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\t\x02\x99\x00\x01\x00\x00\x00\x00\x00\t\x12V\xfc\x9d\xcb\xa0\x10h<\x819\xc3,\x8b \xebV\xf4\xd2\xdb\xeb\r?\x8b'bo@u\xf7\xae.\x8f\vb\xcd]pB\xf1\\}\x9e9\xcd\x14\x95\x12y\x16\xb3\x85\xc1yTq\xa0\xa4\x04a`q\x1e'{\x04\x94\xaf\xee\xd9\x8c\xf3\xb0\x00<\x89*\x14fD\x00\x8a\xf6\x05\x95\xc9\v\x1e(\t\xe8:\xd0\x1b$\x8cT\xbb\x1d\x88\xc8\x9eUCc\x8f'\x95J\x9c9\xc9\xd8,\xda\r\xc7\x83}py\xae\xa5\x81j\x19\xa1g?\xa7RA~k\xed\xf8\x05\xa5J\x8a\xc7\r-\xdei_\xbd\xbd\x1e\xd7\xa4A#\xc1I|\xbf\xe2\x1c\xde/B\x00\x93\x1e\xf4\x06=/\x1aJ\xee\xe5\x1e\xe3W_\xe5\xd1,H\x04 \x1b@\x89\xce\x05\x96\xb2\xe6\x01\xcd\x14>JYS\xfbT\xe9\x91\x9c\xa1x\xdc!\x87\xb6\xd9N\xc4\xd6\x9b\xeb\x04\xe8E2s\"<aZ\xc3k\x94w\xc2\x80*R\xd33{\x04\xb7p\xd8,]h0\xa8\xf0\x961k@o\xa3\x18\xfd\x17\xa4\xf9\x02\x8b\x8f\xe1<\xfb\xc3\xa0\xd1KA\xc2\xd6?P\x99X\xcd\x1f\v\n\xd7\xda\x1a\x97\x82O8:\xe7'\xd6l\xedwR\x907\x18\x82;\f\xf4 )\x99@_\xf6\x95\xa7\v\xf80`jj\x7f\x14\x80\t\xaaS\xb0xQs\x11\x15`Z.\xf2\xbdI\xb4\x1fq\a\xfe\xbcP*:\xa6\xbb^\xc3\x93\x96M\x1da\xa1\xe4HHZ\x92y\x832'\xcfXau6\x94ERJ\xf3\xa1\xaf\xff{\xc8\xe2\b\xb2\xf4\x8a\xa4\xe9\xf1h\x8eH\xab\xe2\xa51\xd0\x03Z\xe7\x83\xabwLA0\x06\xf6E[\x01\xdf3\x16\f\x9f\xb0\x01Y\x86\x14\xc4\xab\xd9\x02\xd0\xcc\xc6I\x98\xad\xdf\x9a\x959\rO\xdf\xe3|\xfe9_\xc4U\x1b_\xdb'\xc1w#\x89Ep<\xf4\x8c~\x8a\b\xe4f\xb2\x16\x18\x15@\x03\\#\xe1\xdb\x9caK\xea\xfa\x8fc\x03\xf8\xa0\"_\xcc!Hj'\xd0ck\xde\xd4Y\xb9G\x8f\\Uk[\xcbU\x19\x89  \xcb \x8c\x9b\xc2\xbcp~P\xcd\xe4\x94\xd0&\xdb\xd2\x1aY9\xdb\x1e\xb1lZY\x8a9\xeb\xa5\xc3\x1b4b+7\xf7\xf1< bKt#L211\xe1\xee-\x8a\xd4\xc8U\xb5\xb5D\x03\x81'\x02\xfb\n*\x83\xdc\x93l\xa0\xff\x10\x05u\x1d\x00\xd7\x94#\xe6\xe2FH|b\xb0\xc5\xd9?`\x95#9_\xf6\x8b/\xc3\x99\xf7\xa2Gx\x16\xc8\xee^\xbdg\v\xf0\xa6\xfa\xa4\x00\x18\x02\xa5\xd4\xc2\xd0\xc6$\x80=I$\xeb\x8b\xfe\xbe\xa1@\xb8\x9f\xef~\n\x91\xbc\xb4'\x92\xb5w\xff \x0e\xa3G\xd7=0\x05R\x85"
    36.659 AT read  +   17 "\r\n+USOST: 0,678\r\n"
    36.660 AT read OK    6 "\r\nOK\r\n"
    36.660 AT send       4 "AT\r\n"
    36.663 AT read OK    6 "\r\nOK\r\n"
    36.663 AT send      14 "AT+USORF=0,0\r\n"
    36.668 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    36.669 AT read OK    6 "\r\nOK\r\n"
0000036681 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
0000036681 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
0000036690 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
0000036690 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
0000036691 [comm.protocol] INFO: rcv'd message type=1
0000036691 [comm.protocol] INFO: rcv'd message type=1
0000036691 [system] INFO: Cloud connected
0000036691 [system] INFO: Cloud connected
connected to the cloud!
    37.048 AT read  +   17 "\r\n+UUSORD: 0,38\r\n"
Socket 0: handle 0 has 38 bytes pending
    37.054 AT send      17 "AT+USORF=0,1024\r\n"
    37.066 AT read  +   77 "\r\n+USORF: 0,\"34.194.48.89\",5684,38,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\n\x00\x19\x00\x01\x00\x00\x00\x00\x00\n\x02\xdd\x01\xcf+l\xee8]\x8a\x14Z\xcd\xaa\x10\xd6 \"\r\n"
    37.069 AT read OK    4 "OK\r\n"
    37.069 AT send       4 "AT\r\n"
    37.072 AT read OK    6 "\r\nOK\r\n"
    37.072 AT send      14 "AT+USORF=0,0\r\n"
    37.077 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    37.078 AT read OK    6 "\r\nOK\r\n"
0000037090 [system] TRACE: received 38
0000037090 [comm.protocol] INFO: Posting 'A' describe message
0000037090 [comm.protocol] INFO: Posting 'A' describe message
0000037091 [comm.coap] TRACE: sending message id=da6
socketSendTo(0,34.194.48.89,5684,,105)
    37.080 AT send      36 "AT+USOST=0,\"34.194.48.89\",5684,105\r\n"
    37.087 AT read  >    3 "\r\n@"
    37.087 AT send     105 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\n\x00\\\x00\x01\x00\x00\x00\x00\x00\nZ\xd4\xae\x9d\x86\xaf\xdb7\xd2Eq_\x16hT)\xdc$\xd9\x85\x14X-\xc5\xf11\xf2\xc5\xff\xab\fQ0~i\x8f\xa0e\xbdp\xc2\xdb\x97\x92\xbd>}\x0eV=R,LQ\x14/\xf9\x8c\x90\xe2\x9e\xd8\x9c\x04\xdbE\x85`\xc2m\x86\xd2\xcbKpn\xe5P\xff\xacC\xcf{\xb8"
    37.229 AT read  +   17 "\r\n+USOST: 0,105\r\n"
    37.230 AT read OK    6 "\r\nOK\r\n"
    37.230 AT send       4 "AT\r\n"
    37.233 AT read OK    6 "\r\nOK\r\n"
    37.233 AT send      14 "AT+USORF=0,0\r\n"
    37.238 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    37.239 AT read OK    6 "\r\nOK\r\n"
0000037251 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
0000037251 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
0000037252 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
0000037252 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
0000037253 [comm.protocol] INFO: rcv'd message type=1
0000037253 [comm.protocol] INFO: rcv'd message type=1
```

That the last of the handshaking with the cloud!

### E Series LTE log explanation

The log for the LTE devices (both E Series LTE and Boron LTE) are a bit different, so I'll highlight some of the differences here:

```
clouddebug: press letter corresponding to the command
a - enter APN for 3rd-party SIM card
k - set keep-alive value
c - show carriers at this location
t - run normal tests (occurs automatically after 10 seconds)
or tap the MODE button once to show carriers
starting tests...
turning cellular on...
deviceID=2b0039001047373333353132
manufacturer=u-blox
model=SARA-R410M-02B
firmware version=L0.0.00.00.05.06 [Feb 03 2018 13:00:41]
ordering code=SARA-R410M-02B
IMEI=352753090000000
IMSI=u-blox
ICCID=89014103259699999999
0000020098 [app] INFO: enabling trace logging
attempting to connect to the cellular network...
0000020098 [system] INFO: Sim Ready
0000020098 [system] INFO: Sim Ready
0000020099 [system] INFO: ARM_WLAN_WD 1
0000020099 [system] INFO: ARM_WLAN_WD 1
```

The basic information is pretty much the same for both 2G/3G and LTE devices.

```
[ Modem::register ] = = = = = = = = = = = = = =
    20.098 AT send      12 "AT+CEREG=2\r\n"
    20.106 AT read OK    6 "\r\nOK\r\n"
    20.106 AT send      11 "AT+CEREG?\r\n"
    20.116 AT read  +   33 "\r\n+CEREG: 2,1,\"D0B\",\"C45C010\",8\r\n"
    20.118 AT read OK    6 "\r\nOK\r\n"
```

LTE devices don't do `AT+CREG` and `AT+CGREG`, they instead do a single `AT+CEREG` (EPS network registration status). 

![CEREG Syntax](/assets/images/app-notes/AN004/cereg-syntax.png)

In this case, we use mode 2 (network registration and location information). The returned information includes:

- 2 = `<n>` network registration and location information

![CEREG Stat](/assets/images/app-notes/AN004/cereg-stat.png)

- 1 = `<stat>` 1 registered, home network. It could also be 5 (registered, roaming).
- "D0B" = `<tac>` tracking area code
- "C45C010" = `<ci>` cell identifier

![CEREG AcT](/assets/images/app-notes/AN004/cereg-act.png)

- 8 = `<AcT>` Access technology 8 is LTE Cat M1. 9 is LTE Cat NB1.

```
    20.118 AT send       4 "AT\r\n"
    20.125 AT read OK    6 "\r\nOK\r\n"
    20.125 AT send      13 "AT+COPS=3,2\r\n"
    20.133 AT read OK    6 "\r\nOK\r\n"
    20.133 AT send      10 "AT+COPS?\r\n"
    20.142 AT read  +   25 "\r\n+COPS: 0,2,\"310410\",8\r\n"
    20.143 AT read OK    6 "\r\nOK\r\n"
```

The `AT+COPS` command is like 2G/3G, except the last component:

![COPS LTE AcT](/assets/images/app-notes/AN004/cops-lte-act.png)

- 8 = `<AcT>` Access technology 8 is LTE Cat M1. 9 is LTE Cat NB1.

```
    20.143 AT send       8 "AT+CSQ\r\n"
    20.151 AT read  +   15 "\r\n+CSQ: 19,99\r\n"
    20.152 AT read OK    6 "\r\nOK\r\n"
```    

On LTE devices the `<signal_power>` ranges from 0 - 31, where 31 is the strongest possible signal. In this case, it was 19, which is medium signal strength.

On LTE devices the `<qual>` parameter is not supported and will always be 99.
   
``` 
[ Modem::join ] = = = = = = = = = = = = = = = =
    20.152 AT send      14 "AT+CGPADDR=1\r\n"
    20.163 AT read  +   29 "\r\n+CGPADDR: 1,10.206.40.209\r\n"
    20.165 AT read OK    6 "\r\nOK\r\n"
```

On LTE devices only, the `AT+CGPADDR=1` command is used to find the PDP address (`<PDP_addr>`) for context identifier (`<cid>`) 1.

```    
0000020167 [system] INFO: ARM_WLAN_WD 2
0000020167 [system] INFO: ARM_WLAN_WD 2
0000020168 [system] INFO: CLR_WLAN_WD 1, DHCP success
0000020168 [system] INFO: CLR_WLAN_WD 1, DHCP success
connected to the cellular network in 0 milliseconds
connected to cellular network!
    20.167 AT send      12 "AT+UDOPN=9\r\n"
    20.175 AT read ERR   9 "\r\nERROR\r\n"
operator name=
    20.175 AT send       8 "AT+CSQ\r\n"
    20.183 AT read  +   15 "\r\n+CSQ: 19,99\r\n"
    20.184 AT read OK    6 "\r\nOK\r\n"
rssi=-75, qual=99
    20.184 AT send      11 "AT+CGED=5\r\n"
    20.192 AT read ERR   9 "\r\nERROR\r\n"
    20.192 AT send      11 "AT+CGED=3\r\n"
    20.200 AT read ERR   9 "\r\nERROR\r\n"
0000020202 [app] INFO: service rat=GSM mcc=65535, mnc=255, lac=0 ci=0 band=GSM 900 rssi=-121 bsic=0 arfcn=0 rxlev=0
0000020202 [app] INFO: service rat=GSM mcc=65535, mnc=255, lac=0 ci=0 band=GSM 900 rssi=-121 bsic=0 arfcn=0 rxlev=0
    20.202 AT send      20 "AT+UPING=\"8.8.8.8\"\r\n"
    20.211 AT read ERR   9 "\r\nERROR\r\n"
ping addr 8.8.8.8=0
    20.211 AT send      31 "AT+UDNSRN=0,\"device.spark.io\"\r\n"
    20.221 AT read ERR   9 "\r\nERROR\r\n"
device.spark.io=0.0.0.0
```

On LTE devices, `AT+CGED` is not supported so those calls all fail. Some versions of cloud debug will show some invalid neighbor cells. These will have a mcc of 65535 and should be ignored.

`AT+UPING` and `AT+UDSRN` are not supported on LTE devices and will always return an error. Because of this, device.spark.io will always be 0.0.0.0 and this is normal on LTE devices.

```    
connecting to cloud
0000020223 [system] INFO: Cloud: connecting
0000020223 [system] INFO: Cloud: connecting
0000020225 [system] INFO: Read Server Address = type:1,domain:$id.udp.particle.io
0000020225 [system] INFO: Read Server Address = type:1,domain:$id.udp.particle.io
0000020226 [system] INFO: Loaded cloud server address and port from session data
0000020226 [system] INFO: Loaded cloud server address and port from session data
    20.225 AT send       4 "AT\r\n"
    20.232 AT read OK    6 "\r\nOK\r\n"
    20.232 AT send      15 "AT+USOCTL=0,0\r\n"
    20.242 AT read  +   19 "\r\n+USOCTL: 0,0,17\r\n"
    20.243 AT read OK    6 "\r\nOK\r\n"
Socket handle 0 (UDP) open, closing...
    20.243 AT send      12 "AT+USOCL=0\r\n"
    20.254 AT read OK    6 "\r\nOK\r\n"
Socket handle 0 was closed.
    20.254 AT send      15 "AT+USOCTL=1,0\r\n"
    20.264 AT read  +   18 "\r\n+USOCTL: 1,0,0\r\n"
    20.265 AT read OK    6 "\r\nOK\r\n"
Socket handle 1 (UNK) open, closing...
    20.265 AT send      12 "AT+USOCL=1\r\n"
    20.276 AT read ERR  37 "\r\n+CME ERROR: Operation not allowed\r\n"
    20.277 AT send      15 "AT+USOCTL=2,0\r\n"
    20.285 AT read UNK   2 "\r\n"
    20.286 AT read  +   18 "\r\n+USOCTL: 2,0,0\r\n"
    20.287 AT read OK    6 "\r\nOK\r\n"
Socket handle 2 (UNK) open, closing...
    20.287 AT send      12 "AT+USOCL=2\r\n"
    20.298 AT read ERR  37 "\r\n+CME ERROR: Operation not allowed\r\n"
    20.299 AT send      15 "AT+USOCTL=3,0\r\n"
    20.307 AT read UNK   2 "\r\n"
    20.308 AT read  +   18 "\r\n+USOCTL: 3,0,0\r\n"
    20.309 AT read OK    6 "\r\nOK\r\n"
Socket handle 3 (UNK) open, closing...
    20.309 AT send      12 "AT+USOCL=3\r\n"
    20.320 AT read ERR  37 "\r\n+CME ERROR: Operation not allowed\r\n"
    20.321 AT send      15 "AT+USOCTL=4,0\r\n"
    20.329 AT read UNK   2 "\r\n"
    20.330 AT read  +   18 "\r\n+USOCTL: 4,0,0\r\n"
    20.331 AT read OK    6 "\r\nOK\r\n"
Socket handle 4 (UNK) open, closing...
    20.331 AT send      12 "AT+USOCL=4\r\n"
    20.342 AT read ERR  37 "\r\n+CME ERROR: Operation not allowed\r\n"
    20.343 AT send      15 "AT+USOCTL=5,0\r\n"
    20.351 AT read UNK   2 "\r\n"
    20.352 AT read  +   18 "\r\n+USOCTL: 5,0,0\r\n"
    20.353 AT read OK    6 "\r\nOK\r\n"
Socket handle 5 (UNK) open, closing...
    20.353 AT send      12 "AT+USOCL=5\r\n"
    20.364 AT read ERR  37 "\r\n+CME ERROR: Operation not allowed\r\n"
    20.365 AT send      15 "AT+USOCTL=6,0\r\n"
    20.373 AT read UNK   2 "\r\n"
    20.374 AT read  +   18 "\r\n+USOCTL: 6,0,0\r\n"
    20.375 AT read OK    6 "\r\nOK\r\n"
Socket handle 6 (UNK) open, closing...
    20.375 AT send      12 "AT+USOCL=6\r\n"
    20.386 AT read ERR  37 "\r\n+CME ERROR: Operation not allowed\r\n"
socketSocket: closed stale socket handle(s)
```

Like 2G/3G, it's normal for the `AT+USOCL` commands to return a `CME ERROR`.

```
socketSocket(UDP)
    20.387 AT send      18 "AT+USOCR=17,5684\r\n"
    20.399 AT read UNK   2 "\r\n"
    20.400 AT read  +   13 "\r\n+USOCR: 0\r\n"
    20.401 AT read OK    6 "\r\nOK\r\n"
Socket 0: handle 0 was created
0000020403 [system] TRACE: Connection attempt to 54.82.141.176:5684
0000020404 [system] INFO: Cloud socket connected
0000020404 [system] INFO: Cloud socket connected
0000020405 [system] INFO: Starting handshake: presense_announce=0
0000020405 [system] INFO: Starting handshake: presense_announce=0
0000020405 [comm.protocol.handshake] INFO: Establish secure connection
0000020405 [comm.protocol.handshake] INFO: Establish secure connection
0000020415 [comm.dtls] WARN: session has 0 uses
0000020415 [comm.dtls] WARN: session has 0 uses
0000020420 [comm.dtls] INFO: (CMPL,RENEG,NO_SESS,ERR) restoreStatus=0
0000020420 [comm.dtls] INFO: (CMPL,RENEG,NO_SESS,ERR) restoreStatus=0
0000020421 [comm.dtls] INFO: out_ctr 0,1,0,0,0,0,0,11, next_coap_id=7
0000020421 [comm.dtls] INFO: out_ctr 0,1,0,0,0,0,0,11, next_coap_id=7
0000020421 [comm.dtls] INFO: app state crc: cached: 8d164315, actual: 8d164315
0000020421 [comm.dtls] INFO: app state crc: cached: 8d164315, actual: 8d164315
0000020422 [comm.dtls] WARN: skipping hello message
0000020422 [comm.dtls] WARN: skipping hello message
0000020423 [comm.dtls] INFO: restored session from persisted session data. next_msg_id=7
0000020423 [comm.dtls] INFO: restored session from persisted session data. next_msg_id=7
0000020424 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 2
0000020424 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 2
0000020425 [comm.protocol.handshake] INFO: resumed session - not sending HELLO message
0000020425 [comm.protocol.handshake] INFO: resumed session - not sending HELLO message
0000020426 [comm.coap] TRACE: sending message id=8
socketSendTo(0,54.82.141.176,5684,,46)
    20.425 AT send      11 "AT+CEREG?\r\n"
    20.434 AT read  +   33 "\r\n+CEREG: 2,1,\"D0B\",\"C45C010\",8\r\n"
    20.436 AT read OK    6 "\r\nOK\r\n"
    20.436 AT send      36 "AT+USOST=0,\"54.82.141.176\",5684,46\r\n"
    20.446 AT read  >    3 "\r\n@"
    20.446 AT send      46 "\xfe\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\v\x00\x14\x00\x01\x00\x00\x00\x00\x00\v?\xe16\xf3M&\x8e\x02\xfe>B\x17+\x009\x00\x10G733512\f"
    20.680 AT read  +   16 "\r\n+USOST: 0,46\r\n"
    20.681 AT read OK    6 "\r\nOK\r\n"
    20.681 AT send       4 "AT\r\n"
    20.686 AT read OK    6 "\r\nOK\r\n"
    20.686 AT send      14 "AT+USORF=0,0\r\n"
    20.693 AT read UNK   4 "\r\r\n\r"
    20.694 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    20.695 AT read OK    4 "OK\r\n"
0000020697 [system] INFO: cloud connected from existing session.
0000020697 [system] INFO: cloud connected from existing session.
0000020698 [comm.coap] TRACE: sending message id=9
socketSendTo(0,54.82.141.176,5684,,86)
    20.697 AT send      11 "AT+CEREG?\r\n"
    20.705 AT read  +   33 "\r\n+CEREG: 2,1,\"D0B\",\"C45C010\",8\r\n"
    20.707 AT read OK    6 "\r\nOK\r\n"
    20.707 AT send      36 "AT+USOST=0,\"54.82.141.176\",5684,86\r\n"
    20.715 AT read  >    3 "\r\n@"
    20.715 AT send      86 "\xfe\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\f\x00<\x00\x01\x00\x00\x00\x00\x00\f\xaf/\xe00\xdb\xd8\f\x97\tc\xda\x1fZ\xb1\x8f\x86\x97\x12_`\x03\\]\xdd\\15\x03Y\x1b\x8c}O\xe4\xf9\xce\xfc\xdd\xf9\xb6\x06\xe74\xf5o1\xecm\xe1\x16&\x03+\x009\x00\x10G733512\f"
    20.734 AT read  +   16 "\r\n+USOST: 0,86\r\n"
    20.735 AT read OK    6 "\r\nOK\r\n"
    20.735 AT send       4 "AT\r\n"
    20.740 AT read OK    6 "\r\nOK\r\n"
    20.740 AT send      14 "AT+USORF=0,0\r\n"
    20.747 AT read UNK   4 "\r\r\n\r"
    20.748 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    20.749 AT read OK    4 "OK\r\n"
0000020751 [comm.coap] TRACE: sending message id=a
socketSendTo(0,54.82.141.176,5684,,86)
    20.750 AT send      11 "AT+CEREG?\r\n"
    20.758 AT read  +   33 "\r\n+CEREG: 2,1,\"D0B\",\"C45C010\",8\r\n"
    20.760 AT read OK    6 "\r\nOK\r\n"
    20.760 AT send      36 "AT+USOST=0,\"54.82.141.176\",5684,86\r\n"
    20.768 AT read  >    3 "\r\n@"
    20.768 AT send      86 "\xfe\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\r\x00<\x00\x01\x00\x00\x00\x00\x00\rz\x96\xc9J\x9b\x1b\x13\xea\xcb2\xa4+\xd5\xbdhtR\xc3\xd9\x17\xcd\xa4X\xeb\xf4\xc0\xfb\xfb\xdd\x84\aK\xe3_\x03\xd9\x83\xfd\r\x9b\xaeI\x17\x87\x9c\x88G~\x01\xc2Cs+\x009\x00\x10G733512\f"
    20.788 AT read  +   16 "\r\n+USOST: 0,86\r\n"
    20.789 AT read OK    6 "\r\nOK\r\n"
    20.789 AT send       4 "AT\r\n"
    20.793 AT read OK    6 "\r\nOK\r\n"
    20.793 AT send      14 "AT+USORF=0,0\r\n"
    20.800 AT read UNK   4 "\r\r\n\r"
    20.801 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    20.802 AT read OK    4 "OK\r\n"
0000020804 [system] TRACE: Waiting until all handshake messages are processed by the protocol layer
    20.912 AT read  +   17 "\r\n+UUSORF: 0,33\r\n"
Socket 0: handle 0 has 33 bytes pending
    20.913 AT send      17 "AT+USORF=0,1024\r\n"
    20.925 AT read  +   75 "\r\n\r\n+USORF: 0,\"54.82.141.176\",5684,33,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\v\x00\x14\x00\x01\x00\x00\x00\x00\x00\v\xbf\x1eq\xc4?\t\xce\x9d\xd8w\xc1\xe4\"\r\n"
    20.928 AT read OK    6 "\r\nOK\r\n"
    20.928 AT send       4 "AT\r\n"
    20.933 AT read OK    6 "\r\nOK\r\n"
    20.933 AT send      14 "AT+USORF=0,0\r\n"
    20.940 AT read UNK   4 "\r\r\n\r"
    20.941 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    20.942 AT read OK    4 "OK\r\n"
0000020944 [system] TRACE: received 33
0000020944 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
0000020944 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
0000020945 [comm.coap] TRACE: recieved ACK for message id=8
0000020946 [comm.protocol] TRACE: Reply recieved: type=2, code=0
0000020946 [comm.protocol] INFO: message id 8 complete with code 0.00
0000020946 [comm.protocol] INFO: message id 8 complete with code 0.00
0000020947 [comm.protocol] INFO: rcv'd message type=13
0000020947 [comm.protocol] INFO: rcv'd message type=13
    21.001 AT read  +   17 "\r\n+UUSORF: 0,33\r\n"
Socket 0: handle 0 has 33 bytes pending
    21.012 AT send      17 "AT+USORF=0,1024\r\n"
    21.024 AT read  +   75 "\r\n\r\n+USORF: 0,\"54.82.141.176\",5684,33,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\f\x00\x14\x00\x01\x00\x00\x00\x00\x00\f.?\xee\xd7#\x87\xed\x8f8\xf6\xf10\"\r\n"
    21.027 AT read OK    6 "\r\nOK\r\n"
    21.027 AT send       4 "AT\r\n"
    21.027 AT read  +   17 "\r\n+UUSORF: 0,33\r\n"
Socket 0: handle 0 has 33 bytes pending
    21.032 AT read OK    6 "\r\nOK\r\n"
    21.032 AT send      14 "AT+USORF=0,0\r\n"
    21.039 AT read UNK   4 "\r\r\n\r"
    21.040 AT read  +   16 "\r\n+USORF: 0,33\r\n"
Socket 0: handle 0 has 33 bytes pending
    21.041 AT read OK    4 "OK\r\n"
0000021043 [system] TRACE: received 33
0000021043 [comm.coap] TRACE: recieved ACK for message id=9
0000021043 [comm.protocol] TRACE: Reply recieved: type=2, code=0
0000021044 [comm.protocol] INFO: message id 9 complete with code 0.00
0000021044 [comm.protocol] INFO: message id 9 complete with code 0.00
0000021045 [comm.protocol] INFO: rcv'd message type=13
0000021045 [comm.protocol] INFO: rcv'd message type=13
    21.054 AT send      17 "AT+USORF=0,1024\r\n"
    21.067 AT read  +   75 "\r\n\r\n+USORF: 0,\"54.82.141.176\",5684,33,\"\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\r\x00\x14\x00\x01\x00\x00\x00\x00\x00\rv\x0fy\xec\x05\x0fY-\x10\x04z\xd1\"\r\n"
    21.070 AT read OK    6 "\r\nOK\r\n"
    21.070 AT send       4 "AT\r\n"
    21.075 AT read OK    6 "\r\nOK\r\n"
    21.075 AT send      14 "AT+USORF=0,0\r\n"
    21.082 AT read UNK   4 "\r\r\n\r"
    21.083 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    21.084 AT read OK    4 "OK\r\n"
0000021086 [system] TRACE: received 33
0000021086 [comm.coap] TRACE: recieved ACK for message id=a
0000021086 [system] INFO: All handshake messages have been processed
0000021086 [system] INFO: All handshake messages have been processed
0000021087 [comm.protocol] TRACE: Reply recieved: type=2, code=0
0000021088 [comm.protocol] INFO: message id 10 complete with code 0.00
0000021088 [comm.protocol] INFO: message id 10 complete with code 0.00
0000021089 [comm.protocol] INFO: rcv'd message type=13
0000021089 [comm.protocol] INFO: rcv'd message type=13
0000021101 [system] INFO: Cloud connected
0000021101 [system] INFO: Cloud connected
connected to the cloud!
```

