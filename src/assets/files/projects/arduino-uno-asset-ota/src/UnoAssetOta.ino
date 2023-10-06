#include <Particle.h>

#define defaultDelay  50          //Delay for bootloader process
#define resetPin      D19         //IO for asserting reset to arduino
#define serial1RxPin  D9          //Serial1 RX pin for asset ota
#define serial1TxPin  D8          //Serial1 TX pin for asset ota
#define maxSyncTries  5           //Max retries for bootloader sync
#define assetBinName  "UnoFW.bin" //Specifies the name expected for the asset firmware bin

//Global variables
int readBuff[16], readBuffLength;
bool updateTrigger = 0;

//Log handler
SerialLogHandler logHandler(LOG_LEVEL_INFO);

void readAssetBytes()
{
  //This fuction reads any received data from target and checks SOMETHING
  int preBuff;
  readBuffLength = 0;                   //The read buffer will start to fill at the first positon
  while (Serial1.available() > 0)       //While there is data on the serial RX,
  {
    preBuff = Serial1.read();           //Write the next byte on the prebuffer
    if (preBuff == 0xFC)                //Changes the buffer read to 0x10 when it's 0xFC. Why?
    {
      preBuff = 0x10;
    }
    readBuff[readBuffLength] = preBuff; //Fill the buffer with the processed incoming byte on it's position
    readBuffLength++;                   //Increment the buffer position for next round
  }
}

void releaseAssetPorts()
{
  /*
  This function releases the serial and pins used to connect to the target.
  If the target AVR is mounted on its Arduino board, the USB-Serial chip
  in the board is also connected to this pins, causing a collision (and a
  short circuit) between the photon and the usb-serial chip. Releasing the
  pins allows you to upload a binary trough the arduino IDE and the photon 2
  without disconnecting anything.
  Just be careful of not using the IDE upload at the same time the photon
  is writing / reading on the target
  */
  Serial1.end();                  //Serial1.end() does not revert the IOs used as INPUT,
  pinMode(serial1RxPin,INPUT);
  pinMode(serial1TxPin,INPUT);
  pinMode(resetPin, INPUT);
}

int updateArduinoUno(ApplicationAsset& asset)
{
  //This function receives the asset binary and uploads it to the target
  int i, address, laddress, haddress, buffLength, sketchLength, syncTries = 0;
  bool targetSynced = false;
  
  //1.- Configures the serial port to the target
  Log.info("Configuring serial port to the target");
  Serial1.begin(115200);          //115200 for arduino UNO, 56700 for ProMini
  Serial1.flush();                //Wait for any outcoming data to exit the serial
  pinMode(resetPin, OUTPUT);      //Configure pin to target reset as output and high
  digitalWrite(resetPin, HIGH); 
  delay(5000);                    //Waits to te user to enable serial monitor

  //2.- Reset the target device
  Log.info("Resetting the target");
  digitalWrite(resetPin, LOW);    //Asset reset on target
  delay(50);
  digitalWrite(resetPin, HIGH);   //Release reset on target
  delay(50);
  
  //3.- Syncronize the target device
  //Command:
  //Cmnd_STK_GET_SYNC(0x30),Sync_CRC_EOP(0x20)
  Log.info("Get in sync with target AVR");
  syncTries = 0;
  do
  {
    for (i = 0; i < 8; i++)       //Repeat 8 times the sync frame
    {
      Serial1.write((byte)0x30);  // STK_GET_SYNC - Regain synchronization
      Serial1.write((byte)0x20);  // STK_CRC_EOP  - End of frame
      delay(200);
    }
    Serial1.flush();
    //Response when synced:
    //Resp_STK_INSYNC(0x14),Resp_STK_OK(0x10)
    //If the received data is not valid, exit with error code 2 (Not Sync)
    readAssetBytes();
    if (readBuffLength < 2 || readBuff[readBuffLength - 2] != (byte)0x14 || readBuff[readBuffLength - 1] != (byte)0x10)
    {
      if(syncTries>=maxSyncTries)
      {
        releaseAssetPorts();
        Log.error("Error code 2: Out of sync!");
        return 2;
      }
      syncTries ++;
    }
    else
    {
      targetSynced = true;
    }
  } while (targetSynced == false);
  Serial1.flush();
  
  //4.- Check the device signature
  //Command:
  //Cmnd_STK_READ_SIGN(0x75),Sync_CRC_EOP(0x20)
  Log.info("Checking device signature");
  Serial1.write((byte)0x75);  // READ_SIGN - Read device signature
  Serial1.write((byte)0x20);  // STK_CRC_EOP - End of frame
  delay(200);
  Serial1.flush();
  //Response:
  //Resp_STK_INSYNC(0x14), signHigh, signMiddle, signLow, Resp_STK_OK(0x10)
  //If the device signature is not valid, exit with error code 3
  readAssetBytes();
  if (readBuffLength < 4 || readBuff[readBuffLength - 4] != (byte)0x1E || readBuff[readBuffLength - 3] != (byte)0x95 || readBuff[readBuffLength - 2] != (byte)0x0F)
  {
    releaseAssetPorts();
    Log.error("Error code 3: Wrong device signature!");
    return 3;
  }
  Serial1.flush();

  //5.- Chip Erase
  //Command:
  //Cmnd_STK_CHIP_ERASE(0x52), Sync_CRC_EOP(0x20)
  Log.info("Erasing device");
  Serial1.write((byte)0x52);  // CHIP_ERASE  - Read device signature
  Serial1.write((byte)0x20);  // STK_CRC_EOP - End of frame
  delay(200);
  Serial1.flush();
  //Response:
  //Resp_STK_INSYNC(0x14),value,Resp_STK_OK(0x10)
  //If the chip erase reports failure, exit with error code 4
  readAssetBytes();
  if (readBuffLength < 2 || readBuff[readBuffLength - 2] != (byte)0x14 || readBuff[readBuffLength - 1] != (byte)0x10)
  {
    releaseAssetPorts();
    Log.error("Error code 4: Chip erase failure!");
    return 4;
  }
  Serial1.flush();

  //6.- Set device programming parameters
  //Command:
  //Cmnd_STK_SET_DEVICE(0x41), devicecode, revision, progtype, parmode, polling, selftimed, lockbytes, fusebytes, flashpollval1, flashpollval2, eeprompollval1, eeprompollval2, pagesizehigh, pagesizelow, eepromsizelow, flashsize4, flashsize3, flashsize 2, flashsize1, Sync_CRC_EOP(0x20)
  Log.info("Setting programming parameters");
  Serial1.write((byte)0x42);  //Cmnd_STK_SET_DEVICE
  Serial1.write((byte)0x86);  //devicecode      ->  Target device identifier. 0x86 for ATMega328P
  Serial1.write((byte)0x00);  //revision        ->  Unused
  Serial1.write((byte)0x00);  //progtype        ->  Programming modes. 0x00 for HV/PP AND Serial, 0x01 for only HV/PP
  Serial1.write((byte)0x01);  //parmode         ->  Parallel mode. 0x00 for pseudo-parallel and 0x01 for full-parallel
  Serial1.write((byte)0x01);  //polling         ->  Use of polling in SPI access. 0x00 for no polling, 0x01 for polling
  Serial1.write((byte)0x01);  //selftimed       ->  Programming instructions are self timed. 0x00 for No, 0x01 for Yes
  Serial1.write((byte)0x01);  //lockbytes       ->  Number of lockbytes in the device
  Serial1.write((byte)0x03);  //fusebytes       ->  Number of fusebytes in the device
  Serial1.write((byte)0xff);  //flashpollval1   ->  Flash polling value, as the device datasheet indicates
  Serial1.write((byte)0xff);  //flashpollval2   ->  Flash polling value, as the device datasheet indicates
  Serial1.write((byte)0xff);  //eeprompollval1  ->  EEprom polling value 1, as the device datasheet indicates
  Serial1.write((byte)0xff);  //eeprompollval2  ->  EEprom polling value 2, as the device datasheet indicates
  Serial1.write((byte)0x00);  //pagesizehigh    ->  Page size in bytes for pagemode parts, high part of the 16 bits value
  Serial1.write((byte)0x80);  //pagesizelow     ->  Page size in bytes for pagemode parts, low part of the 16 bits value
  Serial1.write((byte)0x04);  //eepromsizehigh  ->  EEPROM size in bytes, high part of the 16 bit value
  Serial1.write((byte)0x00);  //eepromsizelow   ->  EEPROM size in bytes, low part of the 16 bit value
  Serial1.write((byte)0x00);  //flashsize4      ->  FLASH size in bytes, byte 4 of the 32 bit value
  Serial1.write((byte)0x00);  //flashsize3      ->  FLASH size in bytes, byte 3 of the 32 bit value
  Serial1.write((byte)0x80);  //flashsize2      ->  FLASH size in bytes, byte 2 of the 32 bit value
  Serial1.write((byte)0x00);  //flashsize1      ->  FLASH size in bytes, byte 1 of the 32 bit value
  Serial1.write((byte)0x20);  //Sync_CRC_EOP
  delay(defaultDelay);
  //Response:
  //Resp_STK_INSYNC(0x14),Resp_STK_OK(0x10)
  //If setting the parameters fails, exit with error code 5
  readAssetBytes();
  if (readBuffLength < 2 || readBuff[readBuffLength - 2] != (byte)0x14 || readBuff[readBuffLength - 1] != (byte)0x10)
  {
    releaseAssetPorts();
    Log.error("Error code 5: Failure to write or set parameters/data!");
    return 5;
  }

  //7.- Set the extended programming parameters
  //Command:
  //Cmnd_STK_SET_DEVICE_EXT(0x45), commandsize, eeprompagesize, signalpagel, signalbs2, resetdisable, Sync_CRC_EOP(0x20)
  Log.info("Setting extended programming parameters");
  Serial1.write((byte)0x45);  //Cmnd_STK_SET_DEVICE_EXT
  Serial1.write((byte)0x05);  //commandsize     ->  How many bytes this command will contain
  Serial1.write((byte)0x04);  //eeprompagesize  ->  EEPROM page size in bytes
  Serial1.write((byte)0xd7);  //signalpagel     ->  To wich port the PAGEL signal should be mapped
  Serial1.write((byte)0xc2);  //signalbs2       ->  To wich port the BS2 signal should be maped
  Serial1.write((byte)0x00);  //resetdisable    ->  Defines if the device has RSTDSBL fuse. 0x00 for no, 0x01 for yes
  Serial1.write((byte)0x20);  //Sync_CRC_EOP
  delay(defaultDelay);
  //Response:
  //Resp_STK_INSYNC(0x14),Resp_STK_OK(0x10)
  //If setting the parameters fails, exit with error code 5
  readAssetBytes();
  if (readBuffLength < 2 || readBuff[readBuffLength - 2] != (byte)0x14 || readBuff[readBuffLength - 1] != (byte)0x10)
  {
    releaseAssetPorts();
    Log.error("Error code 5: Failure to write or set parameters/data!");
    return 5;
  }

  //8.- Enter programming mode
  //Command:
  //Cmnd_STK_ENTER_PROGMODE(0x50),Sync_CRC_EOP(0x20)
  Log.info("Entering programming mode");
  Serial1.write((byte)0x50);  //Cmnd_STK_ENTER PROGMODE
  Serial1.write((byte)0x20);  //Sync_CRC_EOP
  delay(defaultDelay);
  //Response:
  //Resp_STK_INSYNC(0x14),Resp_STK_OK(0x10)
  //If setting the parameters fails, exit with error code 5
  readAssetBytes();
  if (readBuffLength < 2 || readBuff[readBuffLength - 2] != (byte)0x14 || readBuff[readBuffLength - 1] != (byte)0x10)
  {
    releaseAssetPorts();
    Log.info("Error code 5: Failure to write or set parameters/data!");
    return 5;
  }

  //9.- Loads the new binary to target
  sketchLength=asset.size();                //Gets the total asset size in bytes
  Log.info("Asset " + asset.name() + "  Size: %d bytes", sketchLength);
  Log.info("Sending binary to target");
  address = 0;                              //Reset the address counter for the target device
  while(asset.available())
  {
    uint8_t buff[128];
    buffLength=asset.read((char*) buff,sizeof(buff));   //Reads the next bytes (amount up to the size of the buffer), puts them on the buffer and returns the amount taken. 
    haddress = address / 256;                           //Computes the high byte of the target's memory address to be written
    laddress = address % 256;                           //Computes the low byte of the target's memory address to be written
    //Send address to write
    //Command:
    //Cmnd_STK_ENTER_PROGMODE(0x55),laddress, haddress, Sync_CRC_EOP(0x20)
    Serial1.write((byte)0x55);  //ENTER_PROGMODE    ->  Starts programming mode (set the address to write)
    Serial1.write(laddress);    //laddress          ->  The low byte of the address to write
    Serial1.write(haddress);    //haddress          ->  The high byte of the address to write
    Serial1.write((byte)0x20);  //Sync_CRC_EOP
    delay(defaultDelay);
    //Response:
    //Resp_STK_INSYNC(0x14),Resp_STK_OK(0x10)
    //If setting the parameters fails, exit with error code 5
    readAssetBytes();
    if (readBuffLength < 2 || readBuff[readBuffLength - 2] != (byte)0x14 || readBuff[readBuffLength - 1] != (byte)0x10)
    {
      releaseAssetPorts();
      Log.error("Error code 5: Failure to write or set parameters/data!");
      return 5;
    }
    //Writes a block
    //Command:
    //Cmnd_STK_PROG_PAGE(0x64), bytesHigh, bytesLow, memtype, data, Sync_CRC_EOP(0x20)
    Serial1.write((byte)0x64);  //PROG_PAGE         ->  Starts writing the block
    Serial1.write((byte)0x00);  //bytesHigh         ->  High part of the number of bytes to be sent (always 0 in this case because mas buffer is 128)
    Serial1.write(buffLength);  //bytesLow          ->  Low part of the number of bytes to be sent. Almost always the buffer will be 128, except the last one sent.
    Serial1.write((byte)0x46);  //memtype           ->  Memory to be written. "E"(0x45) for eeprom, "F"(0x46) for flash
    Serial1.write(buff, buffLength);  // Sends the data in the buffer
    Serial1.write((byte)0x20);  //Sync_CRC_EOP
    delay(defaultDelay);
    //Response:
    //Resp_STK_INSYNC(0x14),Resp_STK_OK(0x10)
    //If setting the parameters fails, exit with error code 5
    readAssetBytes();
    if (readBuffLength < 2 || readBuff[readBuffLength - 2] != (byte)0x14 || readBuff[readBuffLength - 1] != (byte)0x10)
    {
      releaseAssetPorts();
      Log.error("Error code 6: Failure to write block!");
      return 5;
    }
    Log.info("Address %d Ok", address);
    address += 64;                              //For the next iteration. Why 64?
  }

  //10.- Leave programming mode
  //Command:
  //Cmnd_STK_LEAVE_PROGMODE(0x51), Sync_CRC_EOP(0x20)
  Log.info("Leaving programming mode");
  Serial1.write((byte)0x51);  //LEAVE_PROGMODE    ->  Leave programming mode
  Serial1.write((byte)0x20);  //Sync_CRC_EOP
  delay(defaultDelay);
  //Response:
  //Resp_STK_INSYNC(0x14),value,Resp_STK_OK(0x10)
  //If leaving prog mode fails, exit with error code 0
  readAssetBytes();
  if (readBuffLength != 2 || readBuff[0] != 0x14 || readBuff[1] != 0x10)
  {
    releaseAssetPorts();
    Log.error("Error code 0: Failure leaving programming mode!");
    return 0;
  }

  //11.- Releases the serial and reset pins 
  Log.info("Releasing target's serial port and reset pin");
  releaseAssetPorts();
  Log.info("Arduino successfully updated!");
  Log.info("Note: No verification of the uploaded binary was made");
  return 1;     //Return success code
}

int raiseTrigger(String extra)
{
  //This function raises the flag to update the arduino board asset
  updateTrigger = 1;
  return 0;
}

void setup()
{
  Particle.function("triggerOta", raiseTrigger);      //Publish a cloud function to start the target flashing
  Serial.begin(115200);                               //Starts USBserial for debug
  waitFor(Serial.isConnected, 15000);                 //Waits for connection on the serial USB
  delay(1000);
  Log.info("Ready.");
  for(auto& asset: System.assetsAvailable())          //Lists the valid assets and their sizes
  {
    if (asset.isValid())
    {
      Log.info("Assets available: " + asset.name() + ", " 
       + asset.size() + " bytes");
    }
  }
}

void loop()
{
  if (updateTrigger == 1)                                     //Checks on every loop if the update flag is raised
  {
    Log.info("Update trigger enabled.");
    for(auto& asset: System.assetsAvailable())                //For every asset listed
    {
      if ((asset.name() == assetBinName) && asset.isValid())  //Checks if the asset is valid and matches with the name defined
      {
        Log.info("Valid asset found. Flashing.");
        updateArduinoUno(asset);                              //Calls the arduino flashing function
        updateTrigger = 0;                                    //Resets the trigger
        return;
      }
    }
    Log.warn("No valid asset found. Update skipped.");
    updateTrigger = 0;
  }
  
  //Your code

}