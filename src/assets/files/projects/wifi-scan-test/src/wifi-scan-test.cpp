#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

const std::chrono::milliseconds publishPeriod = 1h;
unsigned long publishLast = 0;
const char *eventName = "wifiScan";

void wifiScanPublish();

// Class to hold information about an access point
class ApInfo {
public:
    ApInfo(const WiFiAccessPoint *ap) {
        ssid = ap->ssid; 
        rssi = ap->rssi;
        channel = ap->channel;

        snprintf(bssid, sizeof(bssid), "%02x:%02x:%02x:%02x:%02x:%02x", 
            (int) ap->bssid[0], (int) ap->bssid[1], (int) ap->bssid[2], (int) ap->bssid[3], (int) ap->bssid[4], (int) ap->bssid[5]);
        locallyAdministered = (strncmp(bssid, "00:00:5e", 8) == 0) || ((ap->bssid[0] & 0x02) == 0);
    }

    bool isLocallyAdministered() const {
        return locallyAdministered;
    }

    String toString() const {
        return String::format("ssid=%s bssid=%s rssi=%d channel=%d %s", 
            ssid.c_str(), bssid, rssi, channel, (locallyAdministered ? "locallyAdministered" : ""));
    }
    
    String ssid; // This isn't needed for geolocation, but it's nice for debugging
    char bssid[20]; // In hex format xx:xx:xx:xx:xx:xx
    int rssi;
    int channel; 
    bool locallyAdministered;
};

const size_t accessPointsMax = 25;
size_t accessPointsCount = 0;
const size_t accessPointJsonSize = 45;
ApInfo *accessPoints[accessPointsMax];
char eventBuf[particle::protocol::MAX_EVENT_DATA_LENGTH + 1];

void setup() {
}

void loop() {
    if (Particle.connected() && (publishLast == 0) || (millis() - publishLast >= publishPeriod.count())) {
        publishLast = millis();
        wifiScanPublish();
    }
}

// Function passed to qsort() to sort by signal strength (RSSI), strongest first.
static int wifiScanCompareRssi(const void *a, const void *b) {
    return (*(ApInfo **)b)->rssi - (*(ApInfo **)a)->rssi;
}

static void wifiScanCallback(WiFiAccessPoint*ap, void* data) {
    // A new access point has bee found
    ApInfo *apInfo = new ApInfo(ap);
    if (apInfo) {
        // It was successfully copied into a new ApInfo object
        Log.info("wifiScanCallback %s", apInfo->toString().c_str());

        if (apInfo->isLocallyAdministered()) {
            // Google recommends omitting locally administered MAC addresses from search
            delete apInfo;
            return;
        }

        if (accessPointsCount < accessPointsMax) {
            // We have not reached the maximum, so just add it to the list
            accessPoints[accessPointsCount++] = apInfo;
        }
        else 
        if (apInfo->rssi > accessPoints[accessPointsMax - 1]->rssi) {
            // The list of access points is full, but this signal strength is 
            // stronger than the weakest currently saved, so replace the weakest
            Log.info("removing %s", accessPoints[accessPointsMax - 1]->toString().c_str());
            delete accessPoints[accessPointsMax - 1];
            accessPoints[accessPointsMax - 1] = apInfo;            
        }
        
        // Sort the list so it's always strongest first
        qsort(accessPoints, accessPointsCount, sizeof(ApInfo *), wifiScanCompareRssi);
    }

}

void wifiScanPublish() {

    Log.info("wifiScanPublish");

    // Clear the buffer because JSONBufferWriter doesn't null terminate the buffer
    memset(eventBuf, 0, sizeof(eventBuf));
    JSONBufferWriter writer(eventBuf, sizeof(eventBuf) - 1);

    // Scan using the callback so we can filter access points as they arrive
    accessPointsCount = 0;
    WiFi.scan(wifiScanCallback);

    Log.info("accessPointsCount=%lu", accessPointsCount);

    if (accessPointsCount == 0) {
        // Don't publish if count is 0. Could change this before to publish an empty
        // array by removing the return here.
        return;
    }

    // Write to JSON
    writer.beginObject();
    writer.name("ap").beginArray();

    for(size_t ii = 0; ii < accessPointsCount; ii++) {
        ApInfo* apInfo = accessPoints[ii];

        // If this entry will not fit, stop adding elements to the array. Any
        // remaining items will be lower in signal strength.
        if ((sizeof(eventBuf) - strlen(eventBuf)) < accessPointJsonSize) {
            Log.info("can't fit ap %lu %s", ii, apInfo->toString().c_str());
            break;
        }

        writer.beginObject();

        writer.name("b").value(apInfo->bssid);
        writer.name("c").value(apInfo->channel);
        writer.name("r").value(apInfo->rssi);

        Log.info("ap %lu %s", ii, apInfo->toString().c_str());

        writer.endObject();
    }
    writer.endArray();

    writer.endObject();

    // Free objects in the accessPoints array
    for(size_t ii = 0; ii < accessPointsCount; ii++) {
        delete(accessPoints[ii]);
        accessPoints[ii] = 0;
    }

    // Publish to the Particle cloud 
    if (Particle.connected()) {
        Log.info("Publishing %s %s", eventName, eventBuf);
        Particle.publish(eventName, eventBuf);
    }
}

