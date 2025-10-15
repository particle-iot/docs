#include "Particle.h"
#include <dirent.h>
#include <fcntl.h>
#include <sys/stat.h>

#ifndef SYSTEM_VERSION_v550RC1
#error "Device OS 5.5.0 or later is required to use Asset OTA"
#endif

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SerialLogHandler logHandler(LOG_LEVEL_TRACE);

void handleAssets(spark::Vector<ApplicationAsset> assets);

// In production code, you may prefer to use onAssetOta from STARTUP
// however see the node below in setup()
// STARTUP(System.onAssetOta(handleAssets));

// This is the directory to hold the assets. You should typically store
// user data in /usr to avoid any future conflicts with the system.
const char *const assetsDir = "/usr/assets";

void checkAssets();

void setup()
{
    // This is just here to make it easier to see the early log messages on
    // the USB serial debug. You probably don't want this in production code.
    waitFor(Serial.isConnected, 10000); delay(2000);

    // This handles the assets. You can use the STARTUP method above, instead, but
    // when using STARTUP it's harder to see the debug log messages because they
    // occur too early.
    handleAssets(System.assetsAvailable());
}

void loop()
{
    // This is just for demonstration purposes for reading assets
    static unsigned long lastCheck = 0;
    if (millis() - lastCheck >= 10000)
    {
        lastCheck = millis();

        // Runs every 10 seconds
        checkAssets();
    }
}

void handleAssets(spark::Vector<ApplicationAsset> assets)
{
    if (assets.size() == 0) {
        Log.info("handleAssets called but no assets available");
        return;
    }

    Log.info("handleAssets called");

    struct stat sb;
    if (stat(assetsDir, &sb))
    {
        // Directory does not already exist stat returns -1 and errno == ENOENT
        Log.info("created assets dir %s", assetsDir);
        mkdir(assetsDir, 0777);
    }

    for (auto &asset : assets)
    {
        String path = String::format("%s/%s", assetsDir, asset.name().c_str());
        int size = (int)asset.size();

        Log.info("asset path=%s size=%d", path.c_str(), size);

        int fd = open(path.c_str(), O_RDWR | O_CREAT | O_TRUNC);
        if (fd != -1)
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
                write(fd, buf, count);
                Log.info("wrote %d bytes to file", count);

                amountRead += count;
            }
            close(fd);
        }
        else
        {
            Log.info("unable to open file on flash file system %s %d", path.c_str(), errno);
        }
    }

    // Mark assets as handled so you won't be called again
    System.assetsHandled(true);
    Log.info("set assetsHandled to true");
}

void checkAssets()
{
    // This is just for demonstration purposes for reading assets
    DIR *dirp = opendir(assetsDir);
    if (dirp)
    {
        while (true)
        {
            struct dirent *de = readdir(dirp);
            if (!de)
            {
                break;
            }
            if (de->d_type != DT_REG)
            {
                // Not a file
                continue;
            }
            String path = String::format("%s/%s", assetsDir, de->d_name);

            struct stat sb;
            stat(path.c_str(), &sb);

            char buf[256];
            int count = (int)sb.st_size;
            if (count > (int)sizeof(buf))
            {
                count = (int)sizeof(buf);
            }
            Log.info("found asset %s size=%d", path.c_str(), (int)sb.st_size);

            int fd = open(path.c_str(), O_RDONLY);
            if (fd != -1)
            {
                read(fd, buf, count);
                close(fd);

                if (path.endsWith("json"))
                {
                    // File is JSON, so print out all of the top level keys
                    JSONValue outerObj = JSONValue::parseCopy(buf, count);

                    JSONObjectIterator iter(outerObj);
                    while (iter.next())
                    {
                        Log.info("key=%s value=%s",
                                 (const char *)iter.name(),
                                 (const char *)iter.value().toString());
                    }
                }
                else
                {
                    // Dump the first 256 bytes of the file in hex to serial debug
                    Log.dump(buf, count);
                    Log.print("\n");
                }
            }
        }
    }
    else
    {
        Log.info("no assets directory %s", assetsDir);
    }
}
