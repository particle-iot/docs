#include "Particle.h"

#include "DeviceGroupHelperRK.h"

SerialLogHandler logHandler;
SYSTEM_THREAD(ENABLED);

PRODUCT_VERSION(1);

void groupCallback(DeviceGroupHelper::NotificationType notificationType, const char *group);

void setup() 
{
    DeviceGroupHelper::instance()
        .withRetrievalModeAtStart()
        .withNotifyCallback(groupCallback)
        .setup();   

    // Particle.subscribe(System.deviceID() + "/hook-response/" + String(eventName), hookResponseHandler);

}

void loop() 
{
    DeviceGroupHelper::instance().loop();
}


void hookResponseHandler(const char *event, const char *data)
{
    Log.info("hook response %s", data);
}

void groupCallback(DeviceGroupHelper::NotificationType notificationType, const char *group) {
    switch(notificationType) {
    case DeviceGroupHelper::NotificationType::UPDATED:
        Log.info("updated groups");
        break;

    case DeviceGroupHelper::NotificationType::ADDED:
        Log.info("added %s", group);
        break;

    case DeviceGroupHelper::NotificationType::REMOVED:
        Log.info("removed %s", group);
        break;
    }
}

