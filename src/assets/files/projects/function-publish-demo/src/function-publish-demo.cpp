#include "Particle.h"

#include "DeviceGroupHelperRK.h"
#include "SetColor.h"

SerialLogHandler logHandler;
SYSTEM_THREAD(ENABLED);

PRODUCT_VERSION(1);

void groupCallback(DeviceGroupHelper::NotificationType notificationType, const char *group);

int firmwareVersion = (int) __system_product_version;
SetColor setColor;

void setup() 
{
    // This variable is used to more easily identify which product firmware is running
    Particle.variable("FunctionPublishDemo01", firmwareVersion);

    setColor.function("setColor");
    setColor.subscribe("setColor");

    DeviceGroupHelper::instance()
        .withRetrievalModeAtStart()
        .withNotifyCallback(groupCallback)
        .withFunction("setDeviceGroups")
        .setup();   
}

void loop() 
{
    setColor.loop();
    DeviceGroupHelper::instance().loop();
}


void groupCallback(DeviceGroupHelper::NotificationType notificationType, const char *group) {
    switch(notificationType) {
    case DeviceGroupHelper::NotificationType::UPDATED:
        {
            Log.info("updated groups");
            Particle.unsubscribe();
            setColor.subscribe("setColor");
            auto groups = DeviceGroupHelper::instance().getGroups();
            for(auto it = groups.begin(); it != groups.end(); it++) {
                String groupName = (*it).c_str();
                String subEvent = String::format("%s/setColor", groupName.c_str());
                Log.info("subscribing to %s", subEvent.c_str());
                setColor.subscribe(subEvent);
            }
        }
        break;

    case DeviceGroupHelper::NotificationType::ADDED:
        // Log.info("added %s", group);
        break;

    case DeviceGroupHelper::NotificationType::REMOVED:
        // Log.info("removed %s", group);
        break;
    }
}

