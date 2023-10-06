#include "pico-flashloader.h"

const auto BAUD_RATE = 115200;
#define RP2040_SERIAL Serial2

Logger RP2040Log("app.RP2040");

char* getLine(char* buffer, unsigned int timeout_ms = 1000) {
    char c;
    char* ptr = buffer;
    bool timeout = true;
    time_t last_char = millis();

    while ((millis() - last_char <= timeout_ms)) {
        // Read char if we have one
        if (RP2040_SERIAL.available()) {
            c = RP2040_SERIAL.read();
            last_char = millis(); // Timeout is from last activity

            // Handle newline
            if (c == '\n') {
                timeout = false;
                break; // EOL
            }
            // Upon reboot, the UART line goes low which is read as 0x00. Ignore this.
            else if (c == 0) {
                continue;
            }
            else {
                *ptr++ = c;
            }
        }
    }

    *ptr = 0;
    if (timeout) {
        RP2040Log.warn("UART RX Timeout");
    }
    return buffer;
}

int enterUpdateMode() {
    RP2040Log.info("Enter update mode");
    
    // // Clear the lines
    // for (int i = 0; i < 3; i++) {
    //     RP2040_SERIAL.write("\n");
    //     delay(5);
    // }

    // // Clear out any received chars
    // int flushed_bytes = 0;
    // while (RP2040_SERIAL.available()) {
    //     RP2040_SERIAL.read();
    //     flushed_bytes++;
    // }
    // RP2040Log.trace("Flushed %i bytes", flushed_bytes);

    // Try to enter update mode
    RP2040_SERIAL.write("$UPDATE\n");
    
    // Check for success
    char response[64];
    getLine(response);
    if (strcmp(response, "ENTER UPDATE") == 0) {
        RP2040Log.info("RP2040 ready for update");
        return 0;
    } else if (strlen(response) == 0) {
        RP2040Log.error("RP2040 enter update mode FAIL: no response");
        return -1;
    } else {
        RP2040Log.error("RP2040 enter update mode FAIL: unexpected response (\"%s\")", response);
        return -2;
    }
}

int flashRP2040Binary(ApplicationAsset& asset) {
    RP2040Log.info("Flashing RP2040 binary");
    RP2040_SERIAL.begin(BAUD_RATE);

    // Todo: add retries
    if (enterUpdateMode() == 0) {

        while (asset.available() > 0) {
            char buf[512];
            int read = asset.read(buf, sizeof(buf));
            if (read > 0) {
                RP2040_SERIAL.write((uint8_t *)buf, read);
                RP2040Log.trace("Wrote %u bytes", read);
            } else {
                RP2040Log.error("Asset read() error = %i", read);
                return read;
            }

            // Print any response from the 2040
            char respBuf[64];
            if (RP2040_SERIAL.available()) {
                getLine(respBuf);
                RP2040Log.trace("Flash progress: %s", respBuf);
            }
        }

        time_t flash_start = millis();
        char respBuf[64];
        while (millis() - flash_start < 5000) {
            if (RP2040_SERIAL.available()) {
                /*
                Order of post-flash messages:
                  15680 OK              // Final bytes written count
                  CRC F7FB8C52          // CRC32 of new app written to flash
                  FLASH OK              // Flash step completed
                                        // RP2040 reboot
                  APP UPDATE OK         // New app was flashed by bootloader successfully (no print if unsuccessful)
                
                */
                getLine(respBuf);

                if (strcmp("FLASH OK", respBuf) == 0) {
                    RP2040Log.info("App flash completed, wait for reboot");
                }
                else if (strcmp("APP UPDATE OK", respBuf) == 0) {
                    RP2040Log.info("Flash Success");
                    return 0;
                }
                else {
                    RP2040Log.trace("Flash progress: %s", respBuf);
                }
            }
        }

        RP2040Log.warn("RP2040 Flash Timeout");
        return -1;
    }
    else {
        // Failed to enter update mode
        RP2040Log.error("RP2040 Unable to enter update mode");
        return -2;
    }
}