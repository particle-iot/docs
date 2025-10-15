#include "Particle.h"

#include "CellularHelper.h"
#include "JsonParserGeneratorRK.h"

// This works best on a Boron 2G/3G.
//
// It works in a limited fashion on a Boron LTE. It only works if you can successfully get a cellular
// connection and only returns information about the connected tower. This is a limitation
// of the u-blox SARA-R410M-02B cellular modem which does not support the tower scan (AT+COPS).
//
// It won't work on the Electron/E Series because it requires BLE, which is only on Gen 3

SYSTEM_MODE(MANUAL);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

const unsigned long MODEM_ON_WAIT_TIME_MS = 4000;
const unsigned long MAX_CGI_TRY_MS = 120 * 1000; // 2 minutes


// Forward declarations
bool getDataFromCGI();
void cellularScan();
void bleCommandReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context);
void sendResponse(const char *op, const char *fmt = NULL, ...);

const BleUuid serviceUuid("378a36ab-1a74-4b28-a2da-c9e3e96affed");
const BleUuid responseUuid("ec119123-1b3d-4a28-b4b5-64db46f0da69");
const BleUuid commandUuid("fa7fbdf6-e86a-461c-9eb8-78af97e2d73c");

BleCharacteristic responseCharacteristic("response", BleCharacteristicProperty::NOTIFY, responseUuid, serviceUuid);
BleCharacteristic commandCharacteristic("command", BleCharacteristicProperty::WRITE, commandUuid, serviceUuid, bleCommandReceived, NULL);


enum State {
	STARTUP_STATE,
	RUN_TEST_STATE,
	CGI_STATE,
	DONE_STATE,
	IDLE_WAIT_STATE
};
State state = STARTUP_STATE;
unsigned long stateTime = 0;
bool wasConnected = false;
bool isLTE = false;

// Global parser that supports up to 256 bytes of data and 20 tokens
JsonParserStatic<256, 20> parser;

// Global JSON writer
JsonWriterStatic<256> jw;

class CustomResponse : public CellularHelperEnvironmentResponseStatic<32> {
public:
	CustomResponse();
	virtual ~CustomResponse();

	// Override
	virtual int parse(int type, const char *buf, int len);

	int lastCurDataIndex = -1;
};

class ResponseUCGED : public CellularHelperCommonResponse {
public:
	ResponseUCGED();
	virtual ~ResponseUCGED();

	virtual int parse(int type, const char *buf, int len);

	int run();

public:
	int earfcn = 0;
	String rsrp;
	String rsrq;
};

CustomResponse envResp;

void setup() {
	Serial.begin(9600);

	// waitFor(Serial.isConnected, 15000);

    BLE.addCharacteristic(responseCharacteristic);
    BLE.addCharacteristic(commandCharacteristic);

    BleAdvertisingData data;
    data.appendServiceUUID(serviceUuid);
    BLE.advertise(&data);

}

void loop() {
	switch(state) {
	case STARTUP_STATE:
		Log.info("turning on modem...");
		Cellular.on();

		delay(MODEM_ON_WAIT_TIME_MS);

		isLTE = CellularHelper.isLTE();
		if (isLTE) {
			// This is an LTE modem (SARA-R410M-02B) which doesn't have tower scan so we need
			// to connect to a tower to get its information
			Particle.connect();
		}

		state = IDLE_WAIT_STATE;
		stateTime = millis();
		break;

	case RUN_TEST_STATE:
		if (isLTE) {
			stateTime = millis();
			state = CGI_STATE;
		}
		else {
			cellularScan();
			state = DONE_STATE;
		}
		break;

	case CGI_STATE:
		if (millis() - stateTime < MAX_CGI_TRY_MS) {
			if (Particle.connected()) {
				if (getDataFromCGI()) {
					// Got data!
					sendResponse("done");
					state = DONE_STATE;
				}
				else {
					// Wait a few seconds and try again
					delay(5000);
				}
			}
			else {
				sendResponse("status", "Not connected to the cloud yet, can't determine tower information");
			}
		}
		else {
			sendResponse("done");
			state = DONE_STATE;
		}
		break;

	case DONE_STATE:
		Log.info("tests complete!");
		state = IDLE_WAIT_STATE;
		break;

	case IDLE_WAIT_STATE:
		break;
	}

    if (BLE.connected()) {
    	if (!wasConnected) {
    		// The BLE central just connected
    		Log.info("BLE connected");

    		// Wait for a "scan" command to start scanning
    	}
    	wasConnected = true;
    }
    else {
    	wasConnected = false;
    }



}

void sendResponse(const char *op, const char *fmt, ...) {
	char msg[200];
	if (!BLE.connected()) {
		return;
	}
	if (fmt != NULL) {
		va_list ap;
		va_start(ap, fmt);
		vsnprintf(msg, sizeof(msg), fmt, ap);
		va_end(ap);
	}
	else {
		msg[0] = 0;
	}
	Log.info("op=%s msg=%s", op, msg);

	jw.init();
	{
		JsonWriterAutoObject obj(&jw);

		// Add various types of data
		jw.insertKeyValue("op", op);
		if (fmt != NULL) {
			jw.insertKeyValue("msg", msg);
		}
	}

	responseCharacteristic.setValue((const char *)jw.getBuffer());

}

void printCellData(CellularHelperEnvironmentCellData *data) {
	const char *whichG = data->isUMTS ? "3G" : "2G";

	// Log.info("mcc=%d mnc=%d", data->mcc, data->mnc);

	Log.info("%s %s %d bars (%03d%03d)", whichG, data->getBandString().c_str(), data->getBars(), data->mcc, data->mnc);
}

bool getDataFromCGI() {
	CellularGlobalIdentity cgi = {0};
	cgi.size = sizeof(CellularGlobalIdentity);
	cgi.version = CGI_VERSION_LATEST;

	cellular_result_t res = cellular_global_identity(&cgi, NULL);
	if (res == SYSTEM_ERROR_NONE) {

		// For LTE devices, send the UCGED data first. We'll use it in the table
		// when we add the data next. The data is too big to fit in a single
		// characteristic.
		ResponseUCGED ucged;
		int ucgedRes = ucged.run();
		if (ucgedRes == RESP_OK) {
			jw.init();
			{
				JsonWriterAutoObject obj(&jw);
				jw.insertKeyValue("op", "lte");
				jw.insertKeyValue("earfcn", ucged.earfcn);
				jw.insertKeyValue("rsrp", ucged.rsrp);
				jw.insertKeyValue("rsrq", ucged.rsrq);
			}
			Log.info("lte response: %s", jw.getBuffer());
			responseCharacteristic.setValue((const char *)jw.getBuffer());
		}


		// Send the tower data
		jw.init();
		{
			JsonWriterAutoObject obj(&jw);

			// Add various types of data
			jw.insertKeyValue("op", "tower");
			jw.insertKeyValue("mcc", cgi.mobile_country_code);
			jw.insertKeyValue("mnc", cgi.mobile_network_code);
			jw.insertKeyValue("lac", cgi.location_area_code);
			jw.insertKeyValue("ci", cgi.cell_id);

			CellularSignal s = Cellular.RSSI();

			String lteType = "unknown";
			auto rat = s.getAccessTechnology();
			switch(rat) {
			case NET_ACCESS_TECHNOLOGY_LTE_CAT_M1:
				lteType = "M1";
				break;

			case NET_ACCESS_TECHNOLOGY_LTE_CAT_NB1:
				lteType = "NB1";
				break;

			default:
				break;
			}
			jw.insertKeyValue("lte", lteType);

			jw.insertKeyValue("rssi", (int) s.getStrengthValue());
		}

		Log.info("tower response: %s", jw.getBuffer());

		responseCharacteristic.setValue((const char *)jw.getBuffer());



		return true;
	}
	else {
		Log.info("cellular_global_identity returned %d", res);
		sendResponse("status", "No tower information available yet");
		return false;
	}
}

void cellularScan() {

	// envResp.enableDebug = true;
	envResp.clear();

	// Command may take up to 3 minutes to execute!
	envResp.resp = Cellular.command(CellularHelperClass::responseCallback, (void *)&envResp, 360000, "AT+COPS=5\r\n");
	if (envResp.resp == RESP_OK) {
		envResp.postProcess();
		envResp.logResponse();

		sendResponse("done");
	}

}

void bleCommandReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
    // Log.trace("Received data from: %02X:%02X:%02X:%02X:%02X:%02X:", peer.address()[5], peer.address()[4], peer.address()[3], peer.address()[2], peer.address()[1], peer.address()[0]);

    parser.clear();
    parser.addData((const char *)data, len);

    if (parser.parse()) {
    	String op = parser.getReference().key("op").valueString();

    	// Log.info("request parsed op=%s", op.c_str());

    	if (op.equals("scan")) {
    		if (state == IDLE_WAIT_STATE) {
        		Log.info("manual scan started");
    			state = RUN_TEST_STATE;
    		}
    		else {
        		Log.info("manual scan ignored (state = %d)", state);
    		}

    	}
    	else {
    		Log.info("unknown op=%s", op.c_str());
    	}
    }
    else {
    	Log.info("command did not parse successfully");
    }

}


CustomResponse::CustomResponse() {
}

CustomResponse::~CustomResponse() {
}

int CustomResponse::parse(int type, const char *buf, int len) {
	int res = CellularHelperEnvironmentResponseStatic::parse(type, buf, len);

	if (curDataIndex != lastCurDataIndex) {
		lastCurDataIndex = curDataIndex;

		// A new environment record has been added
		Log.info("new tower found curDataIndex=%d", curDataIndex);

		CellularHelperEnvironmentCellData *cellData;
		if (curDataIndex == 0) {
			cellData = &service;
		}
		else {
			cellData = &neighbors[curDataIndex - 1];
		}

		if (cellData->isValid()) {
			// Found a valid looking record. If the signal is very weak the mcc, ci, and lac won't be filled in
			// and we can't use it for location.
			jw.init();
			{
				JsonWriterAutoObject obj(&jw);

				// Add various types of data
				jw.insertKeyValue("op", "tower");
				jw.insertKeyValue("mcc", cellData->mcc);
				jw.insertKeyValue("mnc", cellData->mnc);
				jw.insertKeyValue("lac", cellData->lac);
				jw.insertKeyValue("ci", cellData->ci);
				jw.insertKeyValue("rssi", cellData->getRSSI());

				if (cellData->isUMTS) {
					// 3G
					jw.insertKeyValue("ulf", cellData->ulf);
				}
				else {
					// 2G
					jw.insertKeyValue("arfcn", cellData->arfcn);
				}
			}

			Log.info("tower response: %s", jw.getBuffer());

			responseCharacteristic.setValue((const char *)jw.getBuffer());
		}
	}

	return res;
}


ResponseUCGED::ResponseUCGED() {
}

ResponseUCGED::~ResponseUCGED() {
}

int ResponseUCGED::parse(int type, const char *buf, int len) {
	if (enableDebug) {
		logCellularDebug(type, buf, len);
	}
	if (type == TYPE_PLUS) {
		// Copy to temporary string to make processing easier
		char *copy = (char *) malloc(len + 1);
		if (copy) {
			strncpy(copy, buf, len);
			copy[len] = 0;

			// +RSRP: 162,5110,"-075.00",
			// +RSRQ: 162,5110,"-14.20",
			// OK

			char *cp = copy;
			while(*cp && *cp != '+') {
				cp++;
			}
			if (*cp == '+') {
				cp++;
			}

			// Skip over "RSRP: " or "RSRQ: "
			char *resp = cp;
			cp += 6;

			cp = strtok(cp, ",");
			if (cp) {
				// pcid
				cp = strtok(NULL, ",");
				if (cp) {
					// earfcn
					earfcn = atoi(cp);

					cp = strtok(NULL, ",");
					if (cp) {
						// value
						if (*cp == '"') {
							cp++;
							char *end = strchr(cp, '"');
							if (end) {
								*end = 0;
							}
						}
						if (strncmp(resp, "RSRP", 4) == 0) {
							rsrp = cp;
						}
						else
						if (strncmp(resp, "RSRQ", 4) == 0) {
							rsrq = cp;
						}
					}
				}
			}


			free(copy);
		}
	}
	return WAIT;
}

int ResponseUCGED::run() {
	Log.info("running AT+UCGED command");
	enableDebug = false;

	Cellular.command("AT+UCGED=5\r\n");

	resp = Cellular.command(CellularHelperClass::responseCallback, (void *)this, CellularHelperClass::DEFAULT_TIMEOUT, "AT+UCGED?\r\n");

	return resp;
}




