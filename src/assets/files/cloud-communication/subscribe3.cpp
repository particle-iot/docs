#include "Particle.h"

// The following line is optional, but it allows your code to run
// even when not cloud connected
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This allows for USB serial debug logs
SerialLogHandler logHandler;

void logEvent(const char *event, const char *data);

void setup()
{
    Particle.subscribe("testEvent", logEvent);
}

void loop()
{
}

void logValue(int indent, const char *key, JSONValue value)
{
    String prefixStr;
    if (indent > 0)
    {
        prefixStr.reserve(indent);
        for (int ii = 0; ii < indent; ii++)
        {
            prefixStr += String(" ");
        }
    }
    if (key)
    {
        prefixStr += String::format("key=\"%s\" ", key);
    }

    if (value.isNull())
    {
        Log.info("%snull", prefixStr.c_str());
    }
    if (value.isNumber())
    {
        Log.info("%sNumber: %s", prefixStr.c_str(), value.toString().data());
    }
    if (value.isBool())
    {
        Log.info("%sBool: %s", prefixStr.c_str(), value.toString().data());
    }
    if (value.isString())
    {
        Log.info("%sString: \"%s\"", prefixStr.c_str(), value.toString().data());
    }
    if (value.isArray())
    {
        Log.info("%sArray", prefixStr.c_str());

        JSONArrayIterator iter(value);
        while (iter.next())
        {
            logValue(indent + 2, 0, iter.value());
        }
    }
    if (value.isObject())
    {
        Log.info("%sObject", prefixStr.c_str());

        JSONObjectIterator iter(value);
        while (iter.next())
        {
            logValue(indent + 2, iter.name().data(), iter.value());
        }
    }
}

void logEvent(const char *event, const char *data)
{
    JSONValue outerObj = JSONValue::parseCopy(data);

    logValue(0, 0, outerObj);
}
