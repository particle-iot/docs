#ifndef __DEVICEINFOLEDGER_H
#define __DEVICEINFOLEDGER_H

// Github: https://github.com/rickkas7/DeviceInfoLedgerRK
// License: MIT

#include "Particle.h"
#include <atomic>

class DeviceInfoLedgerLogHandler; // Forward declaration

/**
 * This class is a singleton; you do not create one as a global, on the stack, or with new.
 * 
 * From global application setup you must call:
 * DeviceInfoLedger::instance().setup();
 * 
 * From global application loop you must call:
 * DeviceInfoLedger::instance().loop();
 */
class DeviceInfoLedger {
    /**
     * @brief Header for structure in retained memory 
     */
    struct RetainedBufferHeader { // 12 bytes
        uint32_t    magic;
        uint16_t    size;
        uint8_t     headerSize;
        uint8_t     reserved1;
        std::atomic<uint32_t>   offset;
    };

public:
    /**
     * @brief Gets the singleton instance of this class, allocating it if necessary
     * 
     * Use DeviceInfoLedger::instance() to instantiate the singleton.
     */
    static DeviceInfoLedger &instance();

    /**
     * @brief Enable default configuration from the cloud using a cloud to device product, owner, or organization ledger.
     * 
     * @param value enable (true) or disable (false)
     * @return DeviceInfoLedger& A reference to this object to chain withXXX() calls, fluent style. 
     * 
     * The class default is disabled; calling this with no parameter will enable it. The default name is "device-info-defaults".
     * 
     * Must be called before setup().
     */
    DeviceInfoLedger &withConfigDefaultLedgerEnabled(bool value = true) { configDefaultLedgerEnabled = value; return *this; };

    /**
     * @brief Enable per-device configuration from the cloud using a cloud to device ledger.
     * 
     * @param value enable (true) or disable (false)
     * @return DeviceInfoLedger& A reference to this object to chain withXXX() calls, fluent style. 
     * 
     * The class default is disabled; calling this with no parameter will enable it. The default name is "device-info-config".
     * 
     * Must be called before setup().
     */
    DeviceInfoLedger &withConfigDeviceLedgerEnabled(bool value = true) { configDeviceLedgerEnabled = value; return *this; };


    /**
     * @brief Change the device to cloud ledger that holds the device information.
     * 
     * @param infoLedgerName New name to use.
     * @return DeviceInfoLedger& A reference to this object to chain withXXX() calls, fluent style. 
     * 
     * Default is "device-info". 
     * 
     * Must be called before setup().
     */
    DeviceInfoLedger &withInfoLedgerName(const char *infoLedgerName) {
        this->infoLedgerName = infoLedgerName;
        return *this;
    }

    /**
     * @brief Set a cloud to device ledger to use to configure default settings.
     * 
     * @param configDefaultLedgerName Name of the ledger to use
     * @return DeviceInfoLedger& A reference to this object to chain withXXX() calls, fluent style. 
     *
     * The default Ledger name is "device-info-defaults" but defaults to disabled. To use the default
     * name, use withConfigDefaultLedgerEnabled() to enable the cloud to device default settings ledger.
     * 
     * Making this call sets the name and also enables it. 
     * 
     * Must be called before setup().
     */
    DeviceInfoLedger &withConfigDefaultLedgerName(const char *configDefaultLedgerName) {
        this->configDefaultLedgerName = configDefaultLedgerName;
        this->configDefaultLedgerEnabled = true;
        return *this;
    }

    /**
     * @brief Set a cloud to device ledger to use to configure device settings.
     * 
     * @param configDeviceLedgerName Name of the ledger to use 
     * @return DeviceInfoLedger& A reference to this object to chain withXXX() calls, fluent style. 
     * 
     * The default Ledger name is "device-info-config" but defaults to disabled. To use the default
     * name, use withConfigDeviceLedgerEnabled() to enable the cloud to device device settings ledger.
     * 
     * Making this call sets the name and also enables it. 
     * 
     * Must be called before setup().
     */
    DeviceInfoLedger &withConfigDeviceLedgerName(const char *configDeviceLedgerName) {
        this->configDeviceLedgerName = configDeviceLedgerName;
        this->configDeviceLedgerEnabled = true;
        return *this;
    }

    /**
     * @brief Use a locally defined configuration (specified with a string of JSON) instead of configDefaultLedger
     * 
     * @param jsonStr The JSON value as a c-string. Is not copied!
     * @return DeviceInfoLedger& A reference to this object to chain withXXX() calls, fluent style. 
     * 
     * If you enable the cloud-based configDefaultLedger, the local configuration is ignored; they are not merged!
     * 
     * Must be called before setup().
     * 
     * The jsonStr parameter pointer is saved and the contents are not copied! Thus jsonStr must remain valid
     * and in scope until setup is called. After that, it can be disposed of. Since the parameter is typically
     * a statically allocated global string, this should not be an issue.
     */
    DeviceInfoLedger &withLocalConfig(const char *jsonStr) { localConfigJsonStr = jsonStr; return *this; };


    /**
     * @brief Retained buffer for use mainly to save log information in a circular buffer.
     * 
     * @param retainedBuffer 
     * @param retainedBufferSize 
     * @return DeviceInfoLedger& A reference to this object to chain withXXX() calls, fluent style. 
     * 
     * This log may be useful for debugging problems that cause a device panic, or similar issues that
     * occur before a device reboot.
     * 
     * Because of the way retained memory works on RTL872x devices (P2/Photon 2), this log may be missing
     * the latest data written to the log.
     * 
     * Must be called before setup().
     */
    DeviceInfoLedger &withRetainedBuffer(uint8_t *retainedBuffer, size_t retainedBufferSize) {
        this->retainedBuffer = retainedBuffer;
        this->retainedBufferSize = retainedBufferSize;
        return *this;
    }

    /**
     * @brief Perform setup operations; call this from global application setup()
     * 
     * You typically use DeviceInfoLedger::instance().setup();
     * 
     * This must only be called once at boot and not again. You cannot use this to reconfigure settings!
     */
    void setup();

    /**
     * @brief Perform application loop operations; call this from global application loop()
     * 
     * You typically use DeviceInfoLedger::instance().loop();
     */
    void loop();

    /**
     * @brief Get a bool (boolean) configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @param key Key to read in the top level of the configuration object
     * @param defaultValue Value to be returned if the key does not exist
     * @return true or false depending on the configuration setting or defaultValue.
     */
    bool getConfigBool(const char *key, bool defaultValue = false) const { return getConfigVariant(key, Variant(defaultValue)).toBool(); };


    /**
     * @brief Get an int (32-bit signed integer) configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @param key Key to read in the top level of the configuration object
     * @param defaultValue Value to be returned if the key does not exist
     * @return true or false depending on the configuration setting or defaultValue.
     */
    int getConfigInt(const char *key, int defaultValue = 0) const { return getConfigVariant(key, Variant(defaultValue)).toInt(); };


    /**
     * @brief Get a double (64-bit floating point) configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @param key Key to read in the top level of the configuration object
     * @param defaultValue Value to be returned if the key does not exist
     * @return true or false depending on the configuration setting or defaultValue.
     */
    double getConfigDouble(const char *key, double defaultValue = 0.0) const { return getConfigVariant(key, Variant(defaultValue)).toDouble(); };

    /**
     * @brief Get a String configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @param key Key to read in the top level of the configuration object
     * @param defaultValue Value to be returned if the key does not exist
     * @return true or false depending on the configuration setting or defaultValue.
     */
    String getConfigString(const char *key, const char *defaultValue = "") const { return getConfigVariant(key, Variant(defaultValue)).toString(); };

    /**
     * @brief Get a configuration setting from local settings or cloud configuration (default or device override)
     *  
     * @param key Top level key in the ledger
     * @param defaultValue Value to be returned if the key does not exist
     * @return Variant Return Variant, see also getConfigBool, getConfigInt, ... that wrap this method
     */
    Variant getConfigVariant(const char *key, Variant defaultValue) const;

    /**
     * @brief Iterate a configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @param key A top-level key in the ledger that specifies an array
     * @param fn A function to call for each element in the array
     */
    void forEachConfigArray(const char *key, std::function<void(const Variant &el)> fn) const;

    /**
     * @brief Get the connectionLog (int) configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @return int The size of the connection log in bytes to be included in the ledger. 
     * 
     * The ledger has a maximum size of 16 Kbytes, and could be lower on some devices due to RAM limitations. Be sure to make this
     * field and others small enough that the ledger fits. A normal value would be 2048 bytes.
     */
    int getConfigConnectionLog() const { return getConfigInt("connectionLog", 0); };

    /**
     * @brief Get the lastRunLog (int) configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @return int The size of the last run log in bytes to be included in the ledger.
     * 
     * The ledger has a maximum size of 16 Kbytes, and could be lower on some devices due to RAM limitations. Be sure to make this
     * field and others small enough that the ledger fits. A normal value would be 2048 bytes.
     * 
     * This is also limited by the amount of retained memory passed to withRetainedBuffer.
     */
    int getConfigLastRunLog() const { return getConfigInt("lastRunLog", 0); };

    /**
     * @brief Get the includeGeneral (bool) configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @return bool 
     */
    bool getConfigIncludeGeneral() const { return getConfigBool("includeGeneral", false); };

    /**
     * @brief Get the includeDiag (bool) configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @return bool 
     */
    bool getConfigIncludeDiag() const { return getConfigBool("includeDiag", false); };

    /**
     * @brief Get the includeTower (bool) configuration setting from local settings or cloud configuration (default or device override)
     * 
     * @return bool 
     */
    bool getConfigIncludeTower() const { return getConfigBool("includeTower", false); };


    /**
     * @brief Called by DeviceInfoLedgerLogHandler to handle log messages
     * 
     * @param c A character written to the logger
     */
    void write(uint8_t c);

    /**
     * @brief Magic bytes at the beginning of the RetainedBufferHeader
     * 
     * This is used to see if the structure has been initialized.
     */
    static const uint32_t retainedMagicBytes = 0xde8e46cc;

protected:
    /**
     * @brief The constructor is protected because the class is a singleton
     * 
     * Use DeviceInfoLedger::instance() to instantiate the singleton.
     */
    DeviceInfoLedger();

    /**
     * @brief The destructor is protected because the class is a singleton and cannot be deleted
     */
    virtual ~DeviceInfoLedger();

    /**
     * This class is a singleton and cannot be copied
     */
    DeviceInfoLedger(const DeviceInfoLedger&) = delete;

    /**
     * This class is a singleton and cannot be copied
     */
    DeviceInfoLedger& operator=(const DeviceInfoLedger&) = delete;

    /**
     * @brief Convert a string like LOG_LEVEL_INFO into its numeric equivalent 
     * 
     * @param levelStr The string (case-sensitive)
     * @return LogLevel numeric log level corresponding to the constant
     * 
     * Note that it really only searches for case-sensitive "INFO", "TRACE", etc. 
     */
    LogLevel stringToLogLevel(const char *levelStr) const;

    /**
     * @brief Configure the log handler with the current settings in logLevel and logFilter
     */
    void configureLogHandler();

    /**
     * @brief Called on the first cloud connection after boot
     */
    virtual void onFirstCloudConnection();

    /**
     * @brief Called on the any cloud connection completed
     */
    virtual void onCloudConnection();

    /**
     * @brief Called at setup and when the configuration is updated
     */
    void updateConfig();

    /**
     * @brief The current default config, either from local config or the cloud
     */
    LedgerData defaultConfig;

    /**
     * @brief String passed to withLocalConfig
     */
    const char *localConfigJsonStr = nullptr;

    /**
     * @brief The current device override config from the cloud
     */
    LedgerData deviceConfig;

    /**
     * @brief Name of the info ledger
     * 
     * Change name using withInfoLedgerName() (before setup).
     */
    String infoLedgerName = "device-info";


    /**
     * @brief Name of the default config ledger
     * 
     * Enable the ledger using withConfigDefaultLedgerEnabled (before setup),
     * Change name using withConfigDefaultLedgerName() (before setup).
     */
    String configDefaultLedgerName = "device-info-defaults"; //

    /**
     * @brief Name of the device-specific config override ledger
     * 
     * Enable the ledger using withConfigDeviceLedgerEnabled (before setup),
     * Change name using withConfigDeviceLedgerName() (before setup).
     */
    String configDeviceLedgerName = "device-info-config"; 

    /**
     * @brief Retained buffer for lastRunLog and other purposes. 
     * 
     * Set using withRetainedBuffer() before setup.
     */
    uint8_t *retainedBuffer = nullptr;

    /**
     * @brief Retained buffer size for lastRunLog and other purposes. 
     * 
     * Set using withRetainedBuffer() before setup.
     */
    size_t retainedBufferSize = 0;

    /**
     * @brief lastRunLog, set during setup(), cleared when uploaded
     */
    char *lastRunLog = nullptr;

    /**
     * @brief Buffer for connectionLog, allocated during updateConfig()
     */
    uint8_t *connectionLogBuffer = nullptr;

    /**
     * @brief Size of buffer for connectionLog, set during updateConfig()
     */
    size_t connectionLogSize = 0;

    /**
     * @brief Offset for writing to connectionLog. Written in write().
     */
    std::atomic<uint32_t> connectionLogOffset;

    /**
     * @brief Whether to save data to the connection log
     */
    bool writeToConnectionLog = true;

    /**
     * @brief Flag if config defaults ledger is enabled
     */
    bool configDefaultLedgerEnabled = false;

    /**
     * @brief Flags if config device-specific overrides are enabled
     */
    bool configDeviceLedgerEnabled = false;

    /**
     * @brief Internal state, true if Cellular.ready() returned true
     */
    bool isCellularConnected = false;

    /**
     * @brief Internal state, true if WiFi.ready() returned true
     */
    bool isWiFiConnected = false;

    /**
     * @brief Internal state, true if Network.ready() returned true
     */
    bool isNetworkConnected = false;

    /**
     * @brief Internal state, true if Particle.connected() returned true
     */
    bool isCloudConnected = false;

    /**
     * @brief Internal state, number of times Particle.connected() has transitioned to trye
     */
    int connectionCount = 0;

    /**
     * @brief Internal state, true if setup has been called and completed
     */
    bool setupComplete = false;

    /**
     * @brief Convenience pointer into retainedBuffer. Set during setup.
     */
    RetainedBufferHeader *retainedHdr = nullptr;

    /**
     * @brief Convenience pointer into retainedBuffer for retained log data. Set during setup.
     */
    uint8_t *retainedData = nullptr;

    /**
     * @brief Amount of spaces for retained log data. Set during setup.
     */
    size_t retainedDataSize = 0;

    /**
     * @brief Reset reason, saved at the beginning of setup
     */
    int resetReason = RESET_REASON_NONE;

    /**
     * @brief Reset reason data, saved at the beginning of setup if RESET_REASON_USER.
     */
    uint32_t resetReasonData = 0;

    /**
     * @brief Ledger object for device information, initialized during setup
     */
    Ledger infoLedger;

    /**
     * @brief Ledger default configuration, initialized during setup if enabled
     */
    Ledger configDefaultLedger;

    /**
     * @brief Ledger device-specific override configuration, initialized during setup if enabled
     */
    Ledger configDeviceLedger;
    
    /**
     * @brief The StreamLogHandler object
     * 
     * Allocated during setup() and when the configuration changes.
     */
    DeviceInfoLedgerLogHandler *logHandler = nullptr;

    /**
     * @brief Singleton instance of this class
     * 
     * The object pointer to this class is stored here. It's NULL at system boot.
     */
    static DeviceInfoLedger *_instance;

};

/**
 * @brief Log handler class, used internally
 */
class DeviceInfoLedgerLogHandler : public StreamLogHandler, public Print {
public:
    /**
     * @brief Construct log handler object, allocated during updateConfig
     * 
     * @param level 
     * @param filters 
     */
    DeviceInfoLedgerLogHandler(LogLevel level, LogCategoryFilters filters);

    /**
     * @brief Deleted when a new log handler is created
     */
    virtual ~DeviceInfoLedgerLogHandler();
    
    /**
     * @brief Virtual override in class Print for the StreamLogHandler to write data to the log
     * 
     * Calls write() in the DeviceInfoLedger singleton instance
     */
    virtual size_t write(uint8_t);
};

#endif  /* __DEVICEINFOLEDGER_H */