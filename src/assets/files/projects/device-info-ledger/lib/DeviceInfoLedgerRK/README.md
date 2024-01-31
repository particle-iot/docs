# DeviceInfoLedger

Store Particle device log data and device information in Ledger


## Configuration

The following JSON structure is used for local configuration, default cloud configuration, and device-specific overrides, if those features are enabled.

```json
{
    "lastRunLog": 1024,
    "connectionLog": 2048,
    "includeGeneral": true,
    "includeDiag": true,
    "includeTower": true,
    "logLevel": "LOG_LEVEL_INFO",
    "logFilters": [],
}
```

All fields must be specified in local configuration and default cloud configuration. In particular, the default cloud configuration is not merged
with a local configuration; they are mutually exclusive. 

Cloud-based device overrides can specify only the fields that need to be changed from the default configuration.


```cpp
const char localConfig[] = 
"{"
    "\"lastRunLog\": 1024,"
    "\"connectionLog\": 2048,"
    "\"includeGeneral\": true,"
    "\"includeDiag\": false,"
    "\"includeTower\": false,"
    "\"logLevel\": \"LOG_LEVEL_INFO\","
    "\"logFilters\": ["
      "{\"level\":\"LOG_LEVEL_TRACE\",\"category\":\"comm\"}"
    "],"
"}";
```

### Detailed description of fields

#### lastRunLog

The last run log is the latest log messages prior to the most recent reboot. This can be useful for troubleshooting device resets.

Value is the size of the text to include in the ledger. Must fit within the available space in the ledger, which is up to 16K but
can be lower on some platforms.

The last run log is stored in retained memory. This is specified in the application source because it's allocated by the compiler,
so the actual run log will be the lesser of lastRunLog and the value stored in the source.

On RTL872x devices (P2, Photon 2), the most recent log entries may not be available if a system panic has occurred.

#### connectionLog

The connection log is the most recent messages from boot until successfully cloud connected on the first connection after
reboot (default) or after every cloud disconnect (if logAllConnections is true). Note that logging every disconnection
may result in a large number of ledger synchronization is the device is frequently disconnecting from the cloud.


#### logLevel (string)

- `LOG_LEVEL_ALL`
- `LOG_LEVEL_TRACE`
- `LOG_LEVEL_INFO`
- `LOG_LEVEL_WARN`
- `LOG_LEVEL_ERROR`
- `LOG_LEVEL_PANIC`
- `LOG_LEVEL_NONE`


#### logFilters (array)

This is a JSON representation of a logging configuration for `LogCategoryFilter`. Each array element is an object:

- `category` (string) The logging category 
- `level` (string) The logging level such as `LOG_LEVEL_INFO` 

For example, given this code:

```cpp
SerialLogHandler logHandler(LOG_LEVEL_WARN, { // Logging level for non-application messages
    { "app", LOG_LEVEL_INFO }, // Default logging level for all application messages
    { "app.network", LOG_LEVEL_TRACE } // Logging level for networking messages
});
```

An equivalent JSON configuration would be:

```json
{
    "logLevel": "LOG_LEVEL_WARN",
    "logFilters": [
        {
            "category": "LOG_LEVEL_INFO",
            "level": "app"
        },
        {
            "category": "LOG_LEVEL_TRACE",
            "level": "app.network"
        }
    ]
}
```
