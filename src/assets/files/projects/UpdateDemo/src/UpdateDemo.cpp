// Firmware update demo firmware
//
// Monitor the output using USB serial debugging to see what events occur during updates.
//
// You can choose whether to use disableUpdates() or disableReset() by changing the DO_DISABLE_RESET define below.
//
// Triple tap the MODE button to disable or enable update or reset. When in disable mode, the device will breathe
// yellow instead of cyan when cloud connected.
//
// When the device is receiving a firmware update in the background, there will be red blinks during the download
// process mixed in with the normal breathing cyan or breathing yellow.

#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// Can use LOG_LEVEL_INFO for less verbose logging
SerialLogHandler logHandler(LOG_LEVEL_TRACE);

// Define this to 1 to disableReset. Define this to 0 disableUpdates.
#define DO_DISABLE_RESET 0

int toggleUpdateMode = 0;
bool disableUpdateOrReset = false;
int updateProgress = 0;

// Sets the firmware version used when uploading to the console
PRODUCT_VERSION(1);

// This is what the PRODUCT_VERSION macro sets internally. The value may be incorrect if using AssetOTA,
// but this is fine for a debugging log message in this test firmware.
extern uint16_t __system_product_version;

void systemEventHandler(system_event_t event, int param, void *data) {
    switch(event) {
    case cloud_status:
        switch(param) {
        case cloud_status_disconnected:
            Log.info("System event: cloud_status_disconnected");
            break;

        case cloud_status_connecting:
            Log.info("System event: cloud_status_connecting");
            break;

        case cloud_status_handshake:
            Log.info("System event: cloud_status_handshake");
            break;

        case cloud_status_session_resume:
            Log.info("System event: cloud_status_session_resume");
            break;

        case cloud_status_connected:
            Log.info("System event: cloud_status_connected");
            break;

        case cloud_status_disconnecting:
            Log.info("System event: cloud_status_disconnecting");
            break;
        }
        break;

    case firmware_update:
        switch(param) {
        case firmware_update_begin:
            Log.info("System event: firmware_update_begin");
            break;

        case firmware_update_complete:
            Log.info("System event: firmware_update_complete");
            break;

        case firmware_update_progress:
            Log.info("System event: firmware_update_progress");
            updateProgress++;
            break;

        case (int)firmware_update_failed:
            Log.info("System event: firmware_update_failed");
            break;

        }
        break;

    case firmware_update_pending:
        Log.info("System event: firmware_update_pending");
        break;

    case reset_pending:
        Log.info("System event: reset_pending");
        break;

    case reset:
        Log.info("System event: reset");
        break;

    case button_final_click:
        {
            int clicks = system_button_clicks(param);
            if (clicks == 3) {
                toggleUpdateMode++;
            }
        }
        break;

    default:    
        break;
    }
}


void setup() {
    // Optional: Enable to make it easier to see debug USB serial messages at startup
    waitFor(Serial.isConnected, 10000); delay(1000);

    int reason = System.resetReason();
    switch(reason) {
        case RESET_REASON_PIN_RESET:
            Log.info("resetReason=RESET_REASON_PIN_RESET %d", reason);
            break;
    
        case RESET_REASON_UPDATE:
            Log.info("resetReason=RESET_REASON_UPDATE %d", reason);
            break;
    
        case RESET_REASON_PANIC:
            Log.info("resetReason=RESET_REASON_PANIC %d", reason);
            break;
    
        case RESET_REASON_USER: 
            {
                const uint32_t reasonData = System.resetReasonData();
                Log.info("resetReason=RESET_REASON_USER data=%lu", reasonData);                
            }
            break;

        default:
            Log.info("resetReason=%d", reason);
            break;   
    }

    System.on(cloud_status | firmware_update | firmware_update_pending | reset_pending | reset | button_final_click, systemEventHandler);

    Log.info("setup complete PRODUCT_VERSION=%d", (int)__system_product_version);
}

void loop() {
    if (toggleUpdateMode) {
        toggleUpdateMode = 0;

        disableUpdateOrReset = !disableUpdateOrReset;

#if DO_DISABLE_RESET
        Log.info("toggleUpdateMode disableReset=%d", (int)disableUpdateOrReset);

        if (disableUpdateOrReset) {
            System.disableReset();
        }
        else {
            System.enableReset();
        }
#else
        Log.info("toggleUpdateMode disableUpdates=%d", (int)disableUpdateOrReset);

        if (disableUpdateOrReset) {
            System.disableUpdates();
        }
        else {
            System.enableUpdates();
        }
#endif /* DO_DISABLE_RESET */

        if (disableUpdateOrReset) {
            // Change cloud connected color from breathing cyan to breathing yellow when in disable mode
            LEDSystemTheme theme;
            theme.setColor(LED_SIGNAL_CLOUD_CONNECTED, RGB_COLOR_YELLOW);
            theme.apply();            
        }
        else {
            LEDSystemTheme::restoreDefault();
        }
    }

    static bool lastUpdatesPending = false;
    bool currentUpdatesPending = System.updatesPending();
    if (lastUpdatesPending != currentUpdatesPending) {
        lastUpdatesPending = currentUpdatesPending;
        Log.info("updatesPending=%d", (int)currentUpdatesPending);
    }
    
    static bool lastResetPending = false;
    bool currentResetPending = System.resetPending();
    if (lastResetPending != currentResetPending) {
        lastResetPending = currentResetPending;
        Log.info("resetPending=%d", (int)currentResetPending);
    }

    if (updateProgress) {
        updateProgress = 0;

        //  When firmware_update_progress occurs, briefly blink the status LED red
        RGB.control(true);
        unsigned long startMs = millis();
        RGB.color(RGB_COLOR_RED);
        while(millis() - startMs < 20) {
            delay(1);
        }
        RGB.control(false);
    }

}

