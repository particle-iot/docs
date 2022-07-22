If the status LED is off and the blue LED next to pin D7 is on dimly on the Photon or Electron, the device is experiencing the "Dim D7" issue. It is caused by the bootloader on the STM32 MCU being erased. 

If this occurs, the only solution is to reprogram the bootloader. This requires a specialized (but inexpensive) SWD programmer and is a somewhat complicated procedure. 
