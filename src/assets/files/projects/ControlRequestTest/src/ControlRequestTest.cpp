#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

int counter = 0;

int cmdHandler(String cmd);

void setup() {
    Particle.function("cmd", cmdHandler);
}

void loop() {
}

// This function is used for both USB and Particle.function requests
int commonCustomHandler(Variant &reqVar, Variant &respVar) {
    int result = SYSTEM_ERROR_NOT_SUPPORTED;

    // Read the "op" value out of the JSON. You can use a different key.
    String op = reqVar.get("op").asString();
    Log.info("Request received op=%s %s", op.c_str(), reqVar.toJSON().c_str());

    if (op == "test") {
        // If "op" is "test" then do something here
        respVar.set("counter", ++counter);
        respVar.set("result", 0);

        result = SYSTEM_ERROR_NONE;
    }
    return result;
}

// This function handles USB control requests
void ctrl_request_custom_handler(ctrl_request *req) {
    int result = SYSTEM_ERROR_NOT_SUPPORTED;

    // Parse the incoming request as JSON
    String reqData(req->request_data, req->request_size);
    Variant reqVar = Variant::fromJSON(reqData.c_str());

    // Optionally fill this in with JSON data to return by USB control request
    Variant respVar;

    result = commonCustomHandler(reqVar, respVar);

    if (respVar.isMap()) {
        // If respVar is a JSON object, then return it to the caller.
        String respJson = respVar.toJSON();
        if (respJson.length()) {
            if (system_ctrl_alloc_reply_data(req, respJson.length(), nullptr) == 0) {
                memcpy(req->reply_data, respJson.c_str(), respJson.length());
            } else {
                result = SYSTEM_ERROR_NO_MEMORY;
            }        
            Log.info("response %s", respJson.c_str());
        }

    }

    system_ctrl_set_result(req, result, nullptr, nullptr, nullptr);
}

// This is the Particle.function handler. It's optional. Also note that it does not return the response data, just the result code!
int cmdHandler(String cmd) {
    int result = SYSTEM_ERROR_NOT_SUPPORTED;

    Variant reqVar = Variant::fromJSON(cmd.c_str());

    // This data is discarded single Particle.function can't return a string.
    Variant respVar;

    result = commonCustomHandler(reqVar, respVar);

    return result;
}


