//
// This example stores bundled sound samples in an SD card for 
// playback using the Adafruit Music Maker FeatherWing:
// https://www.adafruit.com/product/3436
// 
// Original library: https://github.com/adafruit/Adafruit_VS1053_Library
// Ported for Particle by ScruffR
// Forked and ported: https://github.com/ScruffR/Adafruit_VS1053_Library
//
// This FW will create the following hierarchy in the microSD card:
// SD:
//  └─── samples
//        001.mp3
//        002.mp3
// optionally up to ...  
//        998.mp3
//        999.mp3
//

#include "Particle.h"
#include "SdFat.h"
#include "Adafruit_VS1053.h"

SYSTEM_MODE(SEMI_AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// In production code, you may prefer to use onAssetOta from STARTUP
// however see the note below in setup()
// STARTUP(System.onAssetOta(handleAssets));

SerialLogHandler traceLog(LOG_LEVEL_WARN, { { "app", LOG_LEVEL_INFO } });

SdFat SD;

// These are the pins used for the Music Maker FeatherWing
const int  MP3_RESET        = -1;                 // VS1053 reset pin (unused!)
const int  SD_CS            = D2;                 // SD Card chip select pin
const int  MP3_CS           = D3;                 // VS1053 chip select pin (output)
const int  DREQ             = D4;                 // VS1053 Data request, ideally an Interrupt pin
const int  MP3_DCS          = D5;                 // VS1053 Data/command select pin (output)
const char *fileNamePattern = "%03d.mp3";         // file name pattern to insert track number
Adafruit_VS1053_FilePlayer musicPlayer(MP3_RESET, MP3_CS, MP3_DCS, DREQ, SD_CS); 

int trackNumber = 0;
bool needStart = false;

// This is the directory to hold the assets.
const char *const assetsDir = "/samples";

// Forward function declarations
void blink();
void handleAssets(spark::Vector<ApplicationAsset> assets);
int playTrack(String num);
int setVolume(String vol);

void setup()
{
    // This is just here to make it easier to see the early log messages on
    // the USB serial debug. You probably don't want this in production code.
    waitFor(Serial.isConnected, 10000); delay(2000);

    if (!SD.begin(SD_CS))
    {
        Log.error("SD failed or not present, entering Safe Mode");
        System.enterSafeMode();
    }
    Log.info("SD OK!");

    // This handles the assets. You can use the STARTUP method above, instead, but
    // when using STARTUP it's harder to see the debug log messages because they
    // occur too early.
    handleAssets(System.assetsAvailable());

    // Set current working directory
    SD.chdir(assetsDir, true);
    
    // List files
    SD.ls(&Serial, LS_R);
    
    // Initialise the music player
    Log.info("Adafruit VS1053 Library Test");
    if (!musicPlayer.begin())
    {
        Log.error("Couldn't find VS1053, entering Safe Mode");
        System.enterSafeMode();
    }
    Log.info("VS1053 found");

    // Make a tone to indicate VS1053 is working
    musicPlayer.sineTest(0x44, 200);

    pinMode(D7, OUTPUT);

    // DREQ must be on an interrupt pin.
    if (musicPlayer.useInterrupt(VS1053_FILEPLAYER_PIN_INT))
    {
        digitalWrite(D7, HIGH);
        musicPlayer.setIsrCallback(blink);
    }
    else Log.info("DREQ pin is not an interrupt pin");

    Particle.function("playTrack", playTrack);
    Particle.function("setVolume", setVolume);

    Particle.connect();
}

void loop()
{
    // Wait for a command from the Cloud to start playing a track
    if (needStart && trackNumber)
    {
        char fileName[32];
        char msg[128];
        uint32_t us = micros();

        // Start playing a file, then we can do stuff while waiting for it to finish
        snprintf(fileName, sizeof(fileName), fileNamePattern, trackNumber);
        Log.trace("Starting: %lu", micros() - us); us = micros();
        
        if (musicPlayer.startPlayingFile(fileName))
        {
            Log.trace("Started: %lu", micros() - us); us = micros();
            snprintf(msg, sizeof(msg), "Started playing '%s'",fileName);
        }
        else
        {
            Log.trace("Not started: %lu", micros() - us); us = micros();
            snprintf(msg, sizeof(msg), "Could not open file '%s'",fileName);
        }
        Log.info(msg);
        needStart = false;
    }
}

void blink()
{
    digitalWriteFast(D7, !pinReadFast(D7));
}

void handleAssets(spark::Vector<ApplicationAsset> assets)
{
    if (assets.size() == 0) {
        Log.info("handleAssets called but no assets available");
        return;
    }

    Log.info("handleAssets called");

    if (SD.exists(assetsDir) == 0) 
    {
        // Directory does not already exist
        SD.mkdir(assetsDir);
        Log.info("created assets dir %s", assetsDir);
    }

    for (auto &asset : assets)
    {
        File myFile;
        String path = String::format("%s/%s", assetsDir, asset.name().c_str());
        int size = (int)asset.size();

        Log.info("asset path=%s size=%d", path.c_str(), size);

        int assetExists = SD.exists(path.c_str());
        if (assetExists == 0)
        {
            // SD.open() with FILE_WRITE will create a file if it does not exist
            myFile = SD.open(path.c_str(), FILE_WRITE);
            if (myFile)
            {
                int amountRead = 0;
                char buf[512];

                while (amountRead < size)
                {
                    int count = size - amountRead;
                    if (count > (int)sizeof(buf))
                    {
                        count = (int)sizeof(buf);
                    }

                    count = asset.read(buf, count);
                    if (count <= 0)
                    {
                        break;
                    }
                    myFile.write(buf, count);
                    Log.info("wrote %d bytes to file", count);

                    amountRead += count;
                }
                // Always close files when you're done with them
                myFile.close();
                Log.info("Done writing");
            }
            else
            {
                Log.info("Unable to create file on SD %s", path.c_str());   
            }

        }
        else
        {
            Log.info("File already exists, doing nothing");
        }
    }

    // Mark assets as handled so this won't be called again
    System.assetsHandled(true);
    Log.info("set assetsHandled to true");
}

// Usage: send a 3 over the Particle Console to start playing track 003.mp3
int playTrack(String num)
{
  int n = atoi(num);

  if (n > 0) {
    trackNumber = n;
    if (musicPlayer.playingMusic) {
      musicPlayer.stopPlaying();
    }
    needStart = true;
  }
  return trackNumber;
}

// Set volume for left, right channels. lower numbers == louder volume
int setVolume(String vol)
{
    int volume = atoi(vol);
    musicPlayer.setVolume(volume, volume);
    return volume;
}
