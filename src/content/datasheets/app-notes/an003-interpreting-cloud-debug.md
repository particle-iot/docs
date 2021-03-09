---
title: AN003 Interpreting Cloud Debug Logs
layout: datasheet.hbs
columns: two
order: 103
---
# AN003 Interpreting Cloud Debug Logs

The Cloud Debug tool is helpful for diagnosing connectivity issues. There are a few different versions, depending on the device:

- [Electron and E Series](https://github.com/rickkas7/electron-clouddebug)
- [Boron](https://github.com/rickkas7/boron-clouddebug)
- [Photon, P1, and Argon](https://github.com/rickkas7/photon-clouddebug)

The pages above include instructions for installing and removing the cloud debug firmware from your device.

This guide mostly concentrates on cellular issues (Electron, E Series, and Boron).

This application note is continued in [AN004 Interpreting Cloud Debug-2](/datasheets/app-notes/an004-interpreting-cloud-debug-2/) which is a deep dive into interpreting cloud debug logs and cross-referencing the AT command guide for the u-blox modem.


Author: Rick

## Troubleshooting

### Blinking green issues

When your device is stuck in blinking green, there are a number of possible causes.

#### No signal or bad antenna (blinking green)

If there are no towers in range, or there is an antenna problem, you'll get a log like this:

```
attempting to connect to the cellular network...
0000021974 [system] INFO: Sim Ready
0000021974 [system] INFO: Sim Ready
0000021975 [system] INFO: ARM_WLAN_WD 1
0000021975 [system] INFO: ARM_WLAN_WD 1

[ Modem::register ] = = = = = = = = = = = = = =
    21.974 AT send      12 "AT+CGREG=2\r\n"
    21.979 AT read OK    6 "\r\nOK\r\n"
    21.979 AT send      11 "AT+CREG=2\r\n"
    21.984 AT read OK    6 "\r\nOK\r\n"
    21.984 AT send      10 "AT+CREG?\r\n"
    21.990 AT read  +   14 "\r\n+CREG: 2,0\r\n"
    21.991 AT read OK    6 "\r\nOK\r\n"
    21.991 AT send      11 "AT+CGREG?\r\n"
    21.996 AT read  +   15 "\r\n+CGREG: 2,0\r\n"
    21.997 AT read OK    6 "\r\nOK\r\n"
    21.997 AT send      10 "AT+URAT?\r\n"
    22.002 AT read  +   14 "\r\n+URAT: 1,2\r\n"
    22.003 AT read OK    6 "\r\nOK\r\n"
    22.003 AT send      10 "AT+CREG?\r\n"
    22.009 AT read  +   14 "\r\n+CREG: 2,0\r\n"
    22.010 AT read OK    6 "\r\nOK\r\n"
    22.010 AT send      11 "AT+CGREG?\r\n"
    22.015 AT read  +   15 "\r\n+CGREG: 2,0\r\n"
    22.016 AT read OK    6 "\r\nOK\r\n"
    23.192 AT read  +   12 "\r\n+CREG: 2\r\n"
    23.193 AT read  +   13 "\r\n+CGREG: 2\r\n"
    23.312 AT read  +   12 "\r\n+CREG: 0\r\n"
    23.314 AT read  +   13 "\r\n+CGREG: 0\r\n"
    28.312 AT read  +   12 "\r\n+CREG: 2\r\n"
    28.313 AT read  +   13 "\r\n+CGREG: 2\r\n"
    37.020 AT send      10 "AT+CREG?\r\n"
    38.021 AT send      11 "AT+CGREG?\r\n"
    38.048 AT read  +   14 "\r\n+CREG: 2,2\r\n"
    38.049 AT read OK    6 "\r\nOK\r\n"
    38.616 AT read  +   12 "\r\n+CREG: 0\r\n"
    38.617 AT read  +   13 "\r\n+CGREG: 0\r\n"
    43.615 AT read  +   12 "\r\n+CREG: 2\r\n"
    43.617 AT read  +   13 "\r\n+CGREG: 2\r\n"
    43.732 AT read  +   12 "\r\n+CREG: 0\r\n"
    43.733 AT read  +   13 "\r\n+CGREG: 0\r\n"
    48.743 AT read  +   12 "\r\n+CREG: 2\r\n"
    48.744 AT read  +   13 "\r\n+CGREG: 2\r\n"
    53.053 AT send      10 "AT+CREG?\r\n"
    53.562 AT read  +   14 "\r\n+CREG: 2,2\r\n"
    53.563 AT read OK    6 "\r\nOK\r\n"
    53.563 AT send      11 "AT+CGREG?\r\n"
    53.568 AT read  +   15 "\r\n+CGREG: 2,2\r\n"
    53.569 AT read OK    6 "\r\nOK\r\n"
    59.045 AT read  +   12 "\r\n+CREG: 0\r\n"
    59.047 AT read  +   13 "\r\n+CGREG: 0\r\n"
    64.058 AT read  +   12 "\r\n+CREG: 2\r\n"
    64.059 AT read  +   13 "\r\n+CGREG: 2\r\n"
    64.172 AT read  +   12 "\r\n+CREG: 0\r\n"
    64.174 AT read  +   13 "\r\n+CGREG: 0\r\n"
```

Of note is the repeating sequence that looks like this (for 2G or 3G):

```
    99.612 AT send      10 "AT+CREG?\r\n"
    99.697 AT read  +   14 "\r\n+CREG: 2,0\r\n"
    99.698 AT read OK    6 "\r\nOK\r\n"
    99.698 AT send      11 "AT+CGREG?\r\n"
    99.704 AT read  +   15 "\r\n+CGREG: 2,0\r\n"
    99.705 AT read OK    6 "\r\nOK\r\n"
    99.832 AT read  +   12 "\r\n+CREG: 2\r\n"
    99.833 AT read  +   13 "\r\n+CGREG: 2\r\n"
    99.941 AT read  +   12 "\r\n+CREG: 0\r\n"
    99.943 AT read  +   13 "\r\n+CGREG: 0\r\n"
   104.941 AT read  +   12 "\r\n+CREG: 2\r\n"
   104.942 AT read  +   13 "\r\n+CGREG: 2\r\n"
```

Or something like this for LTE:

```
[ Modem::register ] = = = = = = = = = = = = = =
    23.966 AT send      12 "AT+CEREG=2\r\n"
    23.971 AT read OK    6 "\r\nOK\r\n"
    23.971 AT send      11 "AT+CEREG?\r\n"
    23.976 AT read  +   15 "\r\n+CEREG: 2,2\r\n"
    23.977 AT read OK    6 "\r\nOK\r\n"
    23.977 AT send      10 "AT+URAT?\r\n"
    23.983 AT read  +   12 "\r\n+URAT: 7\r\n"
    23.984 AT read OK    6 "\r\nOK\r\n"
    23.984 AT send      13 "AT+CGDCONT?\r\n"
    23.995 AT read  +   50 "\r\n+CGDCONT: 1,\"IP\",\"10569.mcs\",\"0.0.0.0\",0,0,0,0\r\n"
    23.997 AT read OK    6 "\r\nOK\r\n"
    23.997 AT send       4 "AT\r\n"
    24.001 AT read OK    6 "\r\nOK\r\n"
    24.001 AT send      13 "AT+COPS=0,2\r\n"
    24.014 AT read OK    6 "\r\nOK\r\n"
    24.014 AT send      11 "AT+CEREG?\r\n"
    24.019 AT read  +   15 "\r\n+CEREG: 2,2\r\n"
    24.020 AT read OK    6 "\r\nOK\r\n"
    39.024 AT send      11 "AT+CEREG?\r\n"
    39.032 AT read  +   15 "\r\n+CEREG: 2,2\r\n"
    39.033 AT read OK    6 "\r\nOK\r\n"
    39.033 AT read  +   13 "\r\n+CEREG: 0\r\n"
    54.037 AT send      11 "AT+CEREG?\r\n"
    54.044 AT read  +   15 "\r\n+CEREG: 2,0\r\n"
    54.045 AT read OK    6 "\r\nOK\r\n"
    69.052 AT send      11 "AT+CEREG?\r\n"
    69.057 AT read  +   15 "\r\n+CEREG: 2,0\r\n"
    69.058 AT read OK    6 "\r\nOK\r\n"
    78.176 AT read  +   13 "\r\n+CEREG: 2\r\n"
```

#### SIM denied by network

This is similar to the example above, but the CEREG response is 2,3.

```
    35.134 AT send      11 "AT+CEREG?\r\n"
    35.142 AT read  +   15 "\r\n+CEREG: 2,3\r\n"
    35.143 AT read OK    6 "\r\nOK\r\n"
```

The 2,3 response for CEREG (LTE) or CREG/CGREG (2G/3G) indicates that there was a tower, but it rejected the SIM.

#### No compatible carrier for SIM

The logs are very similar to the case where there is no signal, so it's best to do a carrier scan to see if any towers can be seen. You'll see a repeating sequence of CREG/CGREG (2G/3G) or CEREG (LTE) during modem registration:

```
[ Modem::register ] = = = = = = = = = = = = = =
    20.470 AT send      12 "AT+CGREG=2\r\n"
    20.475 AT read OK    6 "\r\nOK\r\n"
    20.475 AT send      11 "AT+CREG=2\r\n"
    20.480 AT read OK    6 "\r\nOK\r\n"
    20.480 AT send      10 "AT+CREG?\r\n"
    20.485 AT read  +   14 "\r\n+CREG: 2,2\r\n"
    20.486 AT read OK    6 "\r\nOK\r\n"
    20.486 AT send      11 "AT+CGREG?\r\n"
    20.492 AT read  +   15 "\r\n+CGREG: 2,2\r\n"
    20.493 AT read OK    6 "\r\nOK\r\n"
    20.493 AT send      10 "AT+URAT?\r\n"
    20.498 AT read  +   14 "\r\n+URAT: 1,2\r\n"
    20.499 AT read OK    6 "\r\nOK\r\n"
    20.499 AT send      10 "AT+CREG?\r\n"
    20.504 AT read  +   14 "\r\n+CREG: 2,2\r\n"
    20.505 AT read OK    6 "\r\nOK\r\n"
    20.505 AT send      11 "AT+CGREG?\r\n"
    20.511 AT read  +   15 "\r\n+CGREG: 2,2\r\n"
    20.512 AT read OK    6 "\r\nOK\r\n"
    35.516 AT send      10 "AT+CREG?\r\n"
    36.517 AT send      11 "AT+CGREG?\r\n"
    37.323 AT read  +   14 "\r\n+CREG: 2,2\r\n"
    37.324 AT read OK    6 "\r\nOK\r\n"
    52.328 AT send      10 "AT+CREG?\r\n"
    53.329 AT send      11 "AT+CGREG?\r\n"
    54.133 AT read  +   14 "\r\n+CREG: 2,2\r\n"
    54.134 AT read OK    6 "\r\nOK\r\n"
    69.138 AT send      10 "AT+CREG?\r\n"
    70.139 AT send      11 "AT+CGREG?\r\n"
    70.944 AT read  +   14 "\r\n+CREG: 2,2\r\n"
    70.945 AT read OK    6 "\r\nOK\r\n"
    85.949 AT send      10 "AT+CREG?\r\n"
    86.950 AT send      11 "AT+CGREG?\r\n"
    87.753 AT read  +   14 "\r\n+CREG: 2,2\r\n"
    87.754 AT read OK    6 "\r\nOK\r\n"
   102.758 AT send      10 "AT+CREG?\r\n"
   103.759 AT send      11 "AT+CGREG?\r\n"
   104.564 AT read  +   14 "\r\n+CREG: 2,2\r\n"
   104.565 AT read OK    6 "\r\nOK\r\n"
   119.569 AT send      10 "AT+CREG?\r\n"
   120.570 AT send      11 "AT+CGREG?\r\n"
   121.374 AT read  +   14 "\r\n+CREG: 2,2\r\n"
   121.375 AT read OK    6 "\r\nOK\r\n"
   122.919 AT read  +   12 "\r\n+CREG: 0\r\n"
   122.920 AT read  +   13 "\r\n+CGREG: 0\r\n"
   127.918 AT read  +   12 "\r\n+CREG: 2\r\n"
   127.920 AT read  +   13 "\r\n+CGREG: 2\r\n"
   128.339 AT read  +   12 "\r\n+CREG: 0\r\n"
   128.340 AT read  +   13 "\r\n+CGREG: 0\r\n"
   133.349 AT read  +   12 "\r\n+CREG: 2\r\n"
   133.350 AT read  +   13 "\r\n+CGREG: 2\r\n"
   136.379 AT send      10 "AT+CREG?\r\n"
   137.380 AT send      11 "AT+CGREG?\r\n"
   138.418 AT read  +   14 "\r\n+CREG: 2,2\r\n"
   138.419 AT read OK    6 "\r\nOK\r\n"
   153.390 AT send      10 "AT+CREG?\r\n"
   154.391 AT send      11 "AT+CGREG?\r\n"
   155.229 AT read  +   14 "\r\n+CREG: 2,2\r\n"
   155.230 AT read OK    6 "\r\nOK\r\n"
   170.234 AT send      10 "AT+CREG?\r\n"
   171.235 AT send      11 "AT+CGREG?\r\n"
   172.039 AT read  +   14 "\r\n+CREG: 2,2\r\n"
   172.040 AT read OK    6 "\r\nOK\r\n"
   187.044 AT send      10 "AT+CREG?\r\n"
   188.045 AT send      11 "AT+CGREG?\r\n"
   188.850 AT read  +   14 "\r\n+CREG: 2,2\r\n"
   188.851 AT read OK    6 "\r\nOK\r\n"
```

#### 2G no longer supported (on Electron 2G G350) (blinking green)

Some carriers have stopped supporting 2G. You can find out more information in [the 2G/3G sunset guide](https://docs.particle.io/tutorials/cellular-connectivity/introduction/#2g-and-3g-sunset). 

If you are using an Electron 2G (G350), it can no longer be used in:

- Australia
- Japan
- Korea
- Singapore
- Taiwan

The following countries can only use 2G with a 3rd-party SIM card, not the Particle SIM:

- New Zealand
- Switzerland

It is also possible that certain areas will have 3G coverage but not 2G. In the United States, both AT&T and T-Mobile are used with the Electron and E Series (2G/3G), but 2G is only supported on T-Mobile. Thus the Electron 2G (G350) will only ever connect to T-Mobile, so it will have a different coverage area than the Electron 2G/3G (U201 and U260) and LTE devices.

The carrier scan is a good way to determine if there is 2G coverage on a nearby tower and which carrier it is.

#### Incorrect model U260 vs. U270 (blinking green)

The Electron has two 3G models:

- Electron 3G Americas/Australia/New Zealand (U260)
- Electron 3G Europe/Asia/Africa (U270)

If you are using a 3rd-party SIM card, the model may vary. For example, if you are using Optus in Australia, you'd use the U270 instead of the U260. There is more information in [the roaming guide](https://docs.particle.io/tutorials/cellular-connectivity/introduction/#roaming).

If you are using the wrong model, the log will typically look like no tower available, as the modem cannot receive the frequencies it is transmitting on.

#### SIM deactivated (blinking green)

A SIM can be deactivated for a number of reasons:

- It was never activated
- It was manually deactivated from the console
- It was deactivated because the data limit was exceeded
- It was deactivated because of non-payment of previous charges

![Deactivated SIM](/assets/images/app-notes/AN003/deactivated-sim.png)

The log for a deactivated SIM looks like this:

```
0000020855 [app] INFO: enabling trace logging
attempting to connect to the cellular network...
0000020855 [system] INFO: Sim Ready
0000020855 [system] INFO: Sim Ready
0000020856 [system] INFO: ARM_WLAN_WD 1
0000020856 [system] INFO: ARM_WLAN_WD 1

[ Modem::register ] = = = = = = = = = = = = = =
    20.845 AT send      12 "AT+CGREG=2\r\n"
    20.850 AT read OK    6 "\r\nOK\r\n"
    20.850 AT send      11 "AT+CREG=2\r\n"
    20.855 AT read OK    6 "\r\nOK\r\n"
    20.855 AT send      10 "AT+CREG?\r\n"
    20.862 AT read  +   33 "\r\n+CREG: 2,5,\"2CF7\",\"8A5A782\",6\r\n"
    20.864 AT read OK    6 "\r\nOK\r\n"
    20.864 AT send      11 "AT+CGREG?\r\n"
    20.869 AT read  +   15 "\r\n+CGREG: 2,0\r\n"
    20.870 AT read OK    6 "\r\nOK\r\n"
    20.870 AT send       4 "AT\r\n"
    20.873 AT read OK    6 "\r\nOK\r\n"
    20.873 AT send      13 "AT+COPS=3,2\r\n"
    20.878 AT read OK    6 "\r\nOK\r\n"
    20.878 AT send      10 "AT+COPS?\r\n"
    20.884 AT read  +   25 "\r\n+COPS: 0,2,\"310410\",2\r\n"
    20.886 AT read OK    6 "\r\nOK\r\n"
    20.886 AT send       8 "AT+CSQ\r\n"
    20.891 AT read  +   14 "\r\n+CSQ: 15,2\r\n"
    20.892 AT read OK    6 "\r\nOK\r\n"
    20.892 AT send      10 "AT+URAT?\r\n"
    20.897 AT read  +   14 "\r\n+URAT: 1,2\r\n"
    20.898 AT read OK    6 "\r\nOK\r\n"
    20.898 AT send      10 "AT+CREG?\r\n"
    20.905 AT read  +   33 "\r\n+CREG: 2,5,\"2CF7\",\"8A5A782\",6\r\n"
    20.907 AT read OK    6 "\r\nOK\r\n"
    20.907 AT send      11 "AT+CGREG?\r\n"
    20.912 AT read  +   15 "\r\n+CGREG: 2,0\r\n"
    20.913 AT read OK    6 "\r\nOK\r\n"
    20.913 AT send       4 "AT\r\n"
    20.916 AT read OK    6 "\r\nOK\r\n"
    20.916 AT send      13 "AT+COPS=3,2\r\n"
    20.921 AT read OK    6 "\r\nOK\r\n"
    20.921 AT send      10 "AT+COPS?\r\n"
    20.927 AT read  +   25 "\r\n+COPS: 0,2,\"310410\",2\r\n"
    20.929 AT read OK    6 "\r\nOK\r\n"
    20.929 AT send       8 "AT+CSQ\r\n"
    20.934 AT read  +   14 "\r\n+CSQ: 15,2\r\n"
    20.935 AT read OK    6 "\r\nOK\r\n"
    35.939 AT send      10 "AT+CREG?\r\n"
    36.940 AT send      11 "AT+CGREG?\r\n"
    37.776 AT read  +   33 "\r\n+CREG: 2,5,\"2CF7\",\"8A5A782\",6\r\n"
    37.778 AT read OK    6 "\r\nOK\r\n"
    37.778 AT send       4 "AT\r\n"
    37.781 AT read OK    6 "\r\nOK\r\n"
    37.781 AT send      13 "AT+COPS=3,2\r\n"
    37.786 AT read OK    6 "\r\nOK\r\n"
    37.786 AT send      10 "AT+COPS?\r\n"
    37.793 AT read  +   25 "\r\n+COPS: 0,2,\"310410\",2\r\n"
    37.794 AT read OK    6 "\r\nOK\r\n"
    37.794 AT send       8 "AT+CSQ\r\n"
    37.799 AT read  +   14 "\r\n+CSQ: 16,1\r\n"
    37.800 AT read OK    6 "\r\nOK\r\n"
```

Of note in this log: It can see a compatible tower:

```
    20.862 AT read  +   33 "\r\n+CREG: 2,5,\"2CF7\",\"8A5A782\",6\r\n"
```

You can see LAC:2cf7, CI:8a5a56f in the carrier scan output, below.

It also tries AT&T:

```
   322.911 AT read  +   25 "\r\n+COPS: 0,2,\"310410\",2\r\n"
```

That's MCC=310 MNC=410, which is AT&T. MCC=310 (United States) MNC=260 is T-Mobile. You can find a full list of MCC/MNC combinations on the Internet, such as [here](https://clients.txtnation.com/hc/en-us/articles/218719768-MCCMNC-mobile-country-code-and-mobile-network-code-list-).


If you subsequently reactivate the SIM card, it will generally reconnect after around 5 minutes. After 5 minutes of failing to connect, the modem is reset, then it will successfully reconnect:

```
   321.058 AT send      10 "AT+CREG?\r\n"
   322.059 AT send      11 "AT+CGREG?\r\n"
   322.895 AT read  +   33 "\r\n+CREG: 2,5,\"2CF7\",\"8A5A782\",6\r\n"
   322.897 AT read OK    6 "\r\nOK\r\n"
   322.897 AT send       4 "AT\r\n"
   322.900 AT read OK    6 "\r\nOK\r\n"
   322.900 AT send      13 "AT+COPS=3,2\r\n"
   322.905 AT read OK    6 "\r\nOK\r\n"
   322.905 AT send      10 "AT+COPS?\r\n"
   322.911 AT read  +   25 "\r\n+COPS: 0,2,\"310410\",2\r\n"
   322.912 AT read OK    6 "\r\nOK\r\n"
   322.912 AT send       8 "AT+CSQ\r\n"
   322.917 AT read  +   14 "\r\n+CSQ: 16,2\r\n"
   322.918 AT read OK    6 "\r\nOK\r\n"
0000322930 [system] WARN: Resetting WLAN due to WLAN_WD_TO()
0000322930 [system] WARN: Resetting WLAN due to WLAN_WD_TO()

[ Modem::powerOff ] = = = = = = = = = = = = = =
   322.919 AT send       4 "AT\r\n"
   322.922 AT read OK    6 "\r\nOK\r\n"
   322.922 AT send      12 "AT+CPWROFF\r\n"
   325.268 AT read OK    6 "\r\nOK\r\n"
[ ElectronSerialPipe::end ] pipeTx=0 pipeRx=0
[ ElectronSerialPipe::begin ] pipeTx=0 pipeRx=0

[ Modem::powerOn ] = = = = = = = = = = = = = =
   326.578 AT send       4 "AT\r\n"
   327.889 AT send       4 "AT\r\n"

```

#### Modem not responding (blinking green or dark blue)

If the modem stops working entirely, then the log will look like this:

```
0000011825 [hal] ERROR: Failed to power off modem
starting tests...
turning cellular on...
0000036010 [hal] ERROR: No response from NCP
0000036011 [system.nm] INFO: State changed: DISABLED -> IFACE_DOWN
deviceID=e00fce687bd30b4135c361dc
manufacturer=
model=
firmware version=
ordering code=
IMEI=
IMSI=
ICCID=
0000117011 [app] INFO: enabling trace logging
attempting to connect to the cellular network...
0000117016 [system.nm] INFO: State changed: IFACE_DOWN -> IFACE_REQUEST_UP
0000117016 [system.nm] INFO: State changed: IFACE_DOWN -> IFACE_REQUEST_UP
0000117020 [hal] TRACE: PPP netif -> 8
0000117022 [net.ifapi] INFO: Netif pp3 state UP
0000117022 [net.ifapi] INFO: Netif pp3 state UP
0000117024 [hal] TRACE: Powering modem on
0000117026 [system.nm] INFO: State changed: IFACE_REQUEST_UP -> IFACE_UP
0000117026 [system.nm] INFO: State changed: IFACE_REQUEST_UP -> IFACE_UP
0000117176 [hal] TRACE: Modem powered on
0000117178 [hal] TRACE: Setting UART voltage translator state 1
0000118180 [ncp.at] TRACE: > AT
0000119181 [ncp.at] TRACE: > AT
0000120182 [ncp.at] TRACE: > AT
0000121183 [ncp.at] TRACE: > AT
0000122184 [ncp.at] TRACE: > AT
0000122395 [sys.power] TRACE: re-enabling charging
0000122428 [sys.power] TRACE: Battery state UNKNOWN -> CHARGED
0000123185 [ncp.at] TRACE: > AT
0000123587 [sys.power] TRACE: Battery state CHARGED -> DISCONNECTED
0000124186 [ncp.at] TRACE: > AT
0000125186 [ncp.at] TRACE: > AT
0000126187 [ncp.at] TRACE: > AT
0000127188 [ncp.at] TRACE: > AT
0000128189 [ncp.at] TRACE: > AT
0000129190 [ncp.at] TRACE: > AT
0000130191 [ncp.at] TRACE: > AT
0000131192 [ncp.at] TRACE: > AT
0000132193 [ncp.at] TRACE: > AT
0000133194 [ncp.at] TRACE: > AT
0000134195 [ncp.at] TRACE: > AT
0000135196 [ncp.at] TRACE: > AT
0000136197 [ncp.at] TRACE: > AT
0000137197 [ncp.at] TRACE: > AT
0000138198 [hal] ERROR: No response from NCP
0000138198 [hal] ERROR: No response from NCP
0000138201 [hal] TRACE: Setting UART voltage translator state 0
0000138203 [hal] TRACE: Hard resetting the modem
0000149205 [net.pppncp] TRACE: Failed to initialize ublox NCP client: -210
0000149207 [hal] TRACE: Setting UART voltage translator state 0
0000149210 [hal] TRACE: Modem already off
0000149312 [hal] TRACE: Powering modem on
0000149463 [hal] TRACE: Modem powered on
0000149465 [hal] TRACE: Setting UART voltage translator state 1
0000150467 [ncp.at] TRACE: > AT
0000151468 [ncp.at] TRACE: > AT
0000152469 [ncp.at] TRACE: > AT
0000153470 [ncp.at] TRACE: > AT
0000154471 [ncp.at] TRACE: > AT
0000155472 [ncp.at] TRACE: > AT
0000156473 [ncp.at] TRACE: > AT
0000157474 [ncp.at] TRACE: > AT
0000158475 [ncp.at] TRACE: > AT
0000159475 [ncp.at] TRACE: > AT
```

In particular, note that there is never a response to the `> AT` command, and the error `ERROR: No response from NCP`. Also, the modem-specific information like manufacturer, model, ICCID, etc. are all blank.

For Gen 3 devices (Boron, B Series SoM), the status LED will blink green.

For Gen 2 devices (Electron, E Series), the status LED will blink dark blue.

## Other cloud connection issues


#### SIM not inserted (blinking dark blue)

This is most common on the Electron as it by default uses a 4FF nano SIM card. It can be caused by:

- No SIM card inserted
- Loose SIM card connection 
- Defective SIM card

```
[ Modem::powerOn ] = = = = = = = = = = = = = =
     5.310 AT send       4 "AT\r\n"
     5.320 AT read OK    6 "\r\nOK\r\n"
     5.320 AT send       7 "AT E0\r\n"
     5.330 AT read OK    6 "\r\nOK\r\n"
     5.330 AT send      11 "AT+CMEE=2\r\n"
     5.340 AT read OK    6 "\r\nOK\r\n"
     5.340 AT send      19 "AT+CMER=1,0,0,2,1\r\n"
     5.350 AT read OK    6 "\r\nOK\r\n"
     5.350 AT send      15 "AT+IPR=115200\r\n"
     5.360 AT read OK    6 "\r\nOK\r\n"
     5.460 AT send      10 "AT+CPIN?\r\n"
     5.470 AT read ERR  32 "\r\n+CME ERROR: SIM not inserted\r\n"
     6.470 AT send      10 "AT+CPIN?\r\n"
     6.480 AT read ERR  32 "\r\n+CME ERROR: SIM not inserted\r\n"
     7.480 AT send      10 "AT+CPIN?\r\n"
     7.490 AT read ERR  32 "\r\n+CME ERROR: SIM not inserted\r\n"
     8.490 AT send      10 "AT+CPIN?\r\n"
     8.500 AT read ERR  32 "\r\n+CME ERROR: SIM not inserted\r\n"
     9.500 AT send      10 "AT+CPIN?\r\n"
     9.510 AT read ERR  32 "\r\n+CME ERROR: SIM not inserted\r\n"
```



### Device keys issue

A device keys issue can result either in endless fast blinking cyan, or blinking cyan with one or more red or orange blinks.

If you're stuck in fast blinking cyan because of changed device private keys that no longer match the cloud, you're probably in a session resume loop if you had recently connected successfully. 

```
0000023886 [comm.protocol.handshake] INFO: Sending HELLO message
0000023886 [comm.protocol.handshake] INFO: Sending HELLO message
0000023886 [comm] TRACE: sending message id=1 synchronously
0000023887 [comm.coap] TRACE: sending message id=1
socketSendTo(0,3.228.117.244,5684,,58)
    23.887 AT send      11 "AT+CEREG?\r\n"
    23.895 AT read  +   33 "\r\n+CEREG: 2,1,\"D0B\",\"C45C010\",8\r\n"
    23.897 AT read OK    6 "\r\nOK\r\n"
    23.897 AT send      36 "AT+USOST=0,\"3.228.117.244\",5684,58\r\n"
    23.906 AT read  >    3 "\r\n@"
    23.906 AT send      58 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x01\x00-\x00\x01\x00\x00\x00\x00\x00\x01\xd2]\x9f\xbd\x0eX\x16\v\xb2\xa2kz/\x8f9\x12\xbf\xa6\x14\xa4Q\x18Z\x13\x9a;\xa5\xdb\xcc\x8a\xf1\xe8\xb4\xcd\v\xef1"
    23.922 AT read  +   16 "\r\n+USOST: 0,58\r\n"
    23.923 AT read OK    6 "\r\nOK\r\n"
    23.923 AT send       4 "AT\r\n"
    23.927 AT read OK    6 "\r\nOK\r\n"
    23.927 AT send      14 "AT+USORF=0,0\r\n"
    23.933 AT read UNK   4 "\r\r\n\r"
    23.934 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    23.935 AT read OK    4 "OK\r\n"
socketSendTo(0,3.228.117.244,5684,,58)
    28.247 AT send      11 "AT+CEREG?\r\n"
    28.257 AT read  +   33 "\r\n+CEREG: 2,1,\"D0B\",\"C45C010\",8\r\n"
    28.259 AT read OK    6 "\r\nOK\r\n"
    28.259 AT send      36 "AT+USOST=0,\"3.228.117.244\",5684,58\r\n"
    28.269 AT read  >    3 "\r\n@"
    28.269 AT send      58 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x02\x00-\x00\x01\x00\x00\x00\x00\x00\x02\b|}\xff\xb3\xa0\x9d\v2*\x92\xe1\xbbTS\x13t7)\xa3\xd6\xe2^\x95pz\x86\xf7\xd5Vc\xf5V\x81w\n\x95"
    28.286 AT read  +   16 "\r\n+USOST: 0,58\r\n"
    28.287 AT read OK    6 "\r\nOK\r\n"
    28.287 AT send       4 "AT\r\n"
    28.291 AT read OK    6 "\r\nOK\r\n"
    28.291 AT send      14 "AT+USORF=0,0\r\n"
    28.297 AT read UNK   4 "\r\r\n\r"
    28.298 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    28.299 AT read OK    4 "OK\r\n"
socketSendTo(0,3.228.117.244,5684,,58)
    39.486 AT send      11 "AT+CEREG?\r\n"
    39.496 AT read  +   33 "\r\n+CEREG: 2,1,\"D0B\",\"C45C010\",8\r\n"
    39.498 AT read OK    6 "\r\nOK\r\n"
    39.498 AT send      36 "AT+USOST=0,\"3.228.117.244\",5684,58\r\n"
    39.508 AT read  >    3 "\r\n@"
    39.508 AT send      58 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x03\x00-\x00\x01\x00\x00\x00\x00\x00\x03\xcf\x97\x1f\x81\x9e\x90\xd8w|\xabMAb)5?\xa6\xcd\xf8@\xd1\xdcv\xba\x85\xc0\xbcO6\x15\xdd\x00\xb0~_}\xf1"
    39.722 AT read  +   16 "\r\n+USOST: 0,58\r\n"
    39.723 AT read OK    6 "\r\nOK\r\n"
    39.723 AT send       4 "AT\r\n"
    39.728 AT read OK    6 "\r\nOK\r\n"
    39.728 AT send      14 "AT+USORF=0,0\r\n"
    39.735 AT read UNK   4 "\r\r\n\r"
    39.736 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    39.737 AT read OK    4 "OK\r\n"
socketSendTo(0,3.228.117.244,5684,,58)
    57.678 AT send      11 "AT+CEREG?\r\n"
    57.688 AT read  +   33 "\r\n+CEREG: 2,1,\"D0B\",\"C45C010\",8\r\n"
    57.690 AT read OK    6 "\r\nOK\r\n"
    57.690 AT send      36 "AT+USOST=0,\"3.228.117.244\",5684,58\r\n"
    57.700 AT read  >    3 "\r\n@"
    57.700 AT send      58 "\x17\xfe\xfd\x00\x01\x00\x00\x00\x00\x00\x04\x00-\x00\x01\x00\x00\x00\x00\x00\x04\x0e\xaa\x05eN#?\x13\x1a\x95v\x87n\xfa\x85\xee`\xec2M\x1eC\x19y\x0e\xa3\xeaq\x01yj\x97\xac\x82\xa0\xdb\xbc"
    57.951 AT read  +   16 "\r\n+USOST: 0,58\r\n"
    57.952 AT read OK    6 "\r\nOK\r\n"
    57.952 AT send       4 "AT\r\n"
    57.956 AT read OK    6 "\r\nOK\r\n"
    57.956 AT send      14 "AT+USORF=0,0\r\n"
    57.963 AT read UNK   4 "\r\r\n\r"
    57.964 AT read  +   15 "\r\n+USORF: 0,0\r\n"
Socket 0: handle 0 has 0 bytes pending
    57.965 AT read OK    4 "OK\r\n"
```

In this log, it tries to `INFO: Sending HELLO message` but repeatedly sends similar data without getting a response back. 

It is also possible to get a `Cloud handshake failed` error that indicates a device keys issue.

This is corrected by putting the device in DFU mode (blinking yellow) and using:

```
particle keys doctor
```

It's not possible to remotely correct device keys, however it is possible to back up and restore the keys on the device using the [DeviceKeyHelperRK](https://github.com/rickkas7/DeviceKeyHelperRK) library.


### Server public key issue(fast blinking cyan with one red blink)

If the server public key is corrupted you might see a message like: `WARN: unable to parse negotiated pub key`.

```
0000023985 [system] TRACE: Connection attempt to 54.86.198.203:5684
0000023985 [system] INFO: Cloud socket connected
0000023985 [system] INFO: Cloud socket connected
0000023987 [system] INFO: Starting handshake: presense_announce=0
0000023987 [system] INFO: Starting handshake: presense_announce=0
0000023988 [comm.protocol.handshake] INFO: Establish secure connection
0000023988 [comm.protocol.handshake] INFO: Establish secure connection
0000023998 [comm.dtls] WARN: unable to parse negotiated pub key: -3b62
0000023998 [comm.dtls] WARN: unable to parse negotiated pub key: -3b62
0000023999 [comm.dtls] ERROR: setup_contex error 10
0000023999 [comm.dtls] ERROR: setup_contex error 10
0000024000 [comm.protocol.handshake] ERROR: handshake failed with code 16
0000024000 [comm.protocol.handshake] ERROR: handshake failed with code 16
0000024001 [system] WARN: Cloud handshake failed, code=16
0000024001 [system] WARN: Cloud handshake failed, code=16
0000024251 [system] INFO: Cloud: disconnecting
0000024251 [system] INFO: Cloud: disconnecting
```

This is corrected by putting the device in DFU mode (blinking yellow) and using:

```
particle keys server
```

Default server keys can be automatically restored on Device OS 0.7.0 and later so this should be less common now.

### DNS issue or data service not enabled (fast blinking cyan)

Sometimes a SIM will be mis-configured in the carrier network and will not allow IP data (GPRS) to be sent or received. One way you can tell is the `ERROR: Cloud: unable to resolve IP` error. 

```
0000346244 [system] INFO: R   346.245 AT send      56 "AT+UDNSRN=0,\"e00fce687bd30b4135c361dc.udp.particle.io\"\r\n"
   376.257 AT send      56 "AT+UDNSRN=0,\"e00fce687bd30b4135c361dc.udp.particle.io\"\r\n"
   406.269 AT send      56 "AT+UDNSRN=0,\"e00fce687bd30b4135c361dc.udp.particle.io\"\r\n"
   407.830 AT read ERR   9 "\r\nERROR\r\n"
0000407831 [system] ERROR: Cloud: unable to resolve IP for e00fce687bd30b4135c361dc.udp.particle.io
```

### Cellular signal strength issue

The cloud debug logs will include at least one `AT+CSQ` command. The first number is the RSSI, which will be in the range of 0 to 31, with 31 being the strongest signal.

If the number is less than 10, the signal is weak and it may be difficult to maintain a cloud connection.

```
    23.448 AT send       8 "AT+CSQ\r\n"
    23.453 AT read  +   14 "\r\n+CSQ: 15,1\r\n"
    23.454 AT read OK    6 "\r\nOK\r\n"
```

## Other useful features

### Basic header information (ICCID, etc.)

The first thing that's output is the basic information:

```
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

If all of the fields (other than Device ID) are blank, then see "modem not responding," above.

Note that the IMSI is not filled in correctly on many version of cloud debug.


## Interpreting Carrier Scan

Carrier scan is available on 2G and 3G devices only. It's not available on LTE devices.

Here's a sample output from a successful carrier scan:

```
clouddebug: press letter corresponding to the command
a - enter APN for 3rd-party SIM card
k - set keep-alive value
c - show carriers at this location
t - run normal tests (occurs automatically after 10 seconds)
or tap the MODE button once to show carriers
starting carrier report...
turning cellular on...
looking up operators (this may take up to 3 minutes)...
0000012500 [app] INFO: cellular response type=TYPE_UNKNOWN len=105
0000012501 [app] INFO: \r\n
0000012502 [app] INFO: MCC:310, MNC:410, LAC:2cf7, RAC:65, CI:8a5a782, DLF: 4384, ULF: 4159, SC:26, RSCP LEV:32, ECN0 LEV:32\r\n
0000012866 [app] INFO: cellular response type=TYPE_UNKNOWN len=106
0000012867 [app] INFO: \r\n
0000012868 [app] INFO: MCC:310, MNC:410, LAC:2cf7, RAC:65, CI:8a5a56f, DLF: 4384, ULF: 4159, SC:324, RSCP LEV:27, ECN0 LEV:23\r\n
0000031840 [app] INFO: cellular response type=TYPE_UNKNOWN len=72
0000031840 [app] INFO: \r\n
0000031841 [app] INFO: MCC:310, MNC:260, LAC:ab22, CI:b633, BSIC:24, Arfcn:00594, RXLEV:017\r\n
0000032079 [app] INFO: cellular response type=TYPE_UNKNOWN len=72
0000032079 [app] INFO: \r\n
0000032080 [app] INFO: MCC:310, MNC:260, LAC:ab22, CI:ffff, BSIC:23, Arfcn:00596, RXLEV:012\r\n
0000042269 [app] INFO: cellular response type=TYPE_OK len=6
0000042269 [app] INFO: \r\n
0000042269 [app] INFO: OK\r\n
0000042270 [app] INFO: service rat=UMTS mcc=310, mnc=410, lac=2cf7 ci=8a5a782 band=UMTS 850 rssi=-89 dlf=4384 ulf=4159
0000042271 [app] INFO: neighbor 0 rat=UMTS mcc=310, mnc=410, lac=2cf7 ci=8a5a56f band=UMTS 850 rssi=-94 dlf=4384 ulf=4159
0000042272 [app] INFO: neighbor 1 rat=GSM mcc=310, mnc=260, lac=ab22 ci=b633 band=DCS 1800 or 1900 rssi=-98 bsic=24 arfcn=594 rxlev=23
0000042273 [app] INFO: neighbor 2 rat=GSM mcc=310, mnc=260, lac=ab22 ci=ffff band=DCS 1800 or 1900 rssi=-103 bsic=23 arfcn=596 rxlev=18
looking up operator names...
results...
3G AT&T UMTS 850 2 bars
3G AT&T UMTS 850 1 bars
2G T-Mobile DCS 1800 or 1900 1 bars
2G T-Mobile DCS 1800 or 1900 1 bars
```

From the output, we can see that there are two different AT&T 3G towers nearby, one with a slightly stronger signal ("2 bars"). There are also two T-Mobile 2G towers with a fairly weak signal ("1 bar").


