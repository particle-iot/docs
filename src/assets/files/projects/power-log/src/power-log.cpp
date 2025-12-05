#include "Particle.h"

SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_TRACE);

std::chrono::milliseconds logPeriod = 30s;

#if !HAL_PLATFORM_POWER_MANAGEMENT
#error "this code can only be used on devices with power management"
#endif

void powerLog();

void setup() {
	// Wait for a USB serial connection for up to 10 seconds
	waitFor(Serial.isConnected, 10000);

#if (PLATFORM_ID == PLATFORM_BSOM) || (PLATFORM_ID == PLATFORM_B5SOM) || (PLATFORM_ID == PLATFORM_MSOM) 
	// This setting is for the M.2 breakout board and only needs to be run once because the setting is persistent
	// Change for other boards if necessary. 
	// This setting is not necessary on the Boron, Tracker, 
	SystemPowerConfiguration powerConfig = System.getPowerConfiguration();
	powerConfig.auxiliaryPowerControlPin(D23).interruptPin(A6);
	System.setPowerConfiguration(powerConfig);

	// For Muon, use these pins instead
	// powerConfig.auxiliaryPowerControlPin(D7).interruptPin(A7);
#endif 

	// Particle.connect()
}

void loop() {
	static unsigned long lastLog = 0;

	if (lastLog == 0 || millis() - lastLog >= logPeriod.count()) {
		lastLog = millis();

		powerLog();		
	}
}



void powerManagerLog() {
    // See system_power.h for these definitions
    // typedef enum {
    //     BATTERY_STATE_UNKNOWN = 0,
    //     BATTERY_STATE_NOT_CHARGING = 1,
    //     BATTERY_STATE_CHARGING = 2,
    //     BATTERY_STATE_CHARGED = 3,
    //     BATTERY_STATE_DISCHARGING = 4,
    //     BATTERY_STATE_FAULT = 5,
    //     BATTERY_STATE_DISCONNECTED = 6
    // } battery_state_t;

    // typedef enum {
    //     POWER_SOURCE_UNKNOWN = 0,
    //     POWER_SOURCE_VIN = 1,
    //     POWER_SOURCE_USB_HOST = 2,
    //     POWER_SOURCE_USB_ADAPTER = 3,
    //     POWER_SOURCE_USB_OTG = 4,
    //     POWER_SOURCE_BATTERY = 5
    // } power_source_t;

    int powerSource = System.powerSource();
    int batteryState = System.batteryState();
    float batterySoc = System.batteryCharge();
    
    constexpr char const* batteryStates[] = {
        "unknown", "not charging", "charging",
        "charged", "discharging", "fault", "disconnected"
    };
    constexpr char const* powerSources[] = {
        "unknown", "vin", "usb host", "usb adapter",
        "usb otg", "battery"
    };

    Log.info("System Power source: %s", powerSources[std::max(0, powerSource)]);
    Log.info("System Battery state: %s", batteryStates[std::max(0, batteryState)]);
    Log.info("System Battery charge: %f", batterySoc);	
}

void powerConfigurationLog() {
	SystemPowerConfiguration c;

	c = System.getPowerConfiguration();

	Log.info("SystemPowerConfiguration powerSourceMinVoltage=%d, powerSourceMaxCurrent=%d",
		(int) c.powerSourceMinVoltage(), (int) c.powerSourceMaxCurrent());

	Log.info("SystemPowerConfiguration batteryChargeVoltage=%d, batteryChargeCurrent=%d",
		(int) c.batteryChargeVoltage(), (int) c.batteryChargeCurrent());

	Log.info("SystemPowerConfiguration auxiliaryPowerControlPin=%d, auxiliaryPowerControlActiveLevel=%d",
		(int) c.auxiliaryPowerControlPin(), (int) c.auxiliaryPowerControlActiveLevel());

	Log.info("SystemPowerConfiguration interruptPin=%d, socBitPrecision=%d",
		(int) c.interruptPin(), (int) c.socBitPrecision());

	Log.info("SystemPowerConfiguration feature PMIC_DETECTION=%d", (int) c.isFeatureSet(SystemPowerFeature::PMIC_DETECTION));
	Log.info("SystemPowerConfiguration feature USE_VIN_SETTINGS_WITH_USB_HOST=%d", (int) c.isFeatureSet(SystemPowerFeature::USE_VIN_SETTINGS_WITH_USB_HOST));
	Log.info("SystemPowerConfiguration feature DISABLE=%d", (int) c.isFeatureSet(SystemPowerFeature::DISABLE));
	Log.info("SystemPowerConfiguration feature DISABLE_CHARGING=%d", (int) c.isFeatureSet(SystemPowerFeature::DISABLE_CHARGING));
}

void pmicLog() {
#if HAL_PLATFORM_PMIC_BQ24195
	PMIC pmic(true);

	Log.info("PMIC version=%02x", (int)pmic.getVersion());

	//-----------------------------------------------------------------------------
	//System Status Register
	//-----------------------------------------------------------------------------
	//NOTE: This is a read-only register

	/*
	REG08
	BIT
	--- VBUS status
	7: VBUS_STAT[1] | 00: Unknown (no input, or DPDM detection incomplete), 01: USB host
	6: VBUS_STAT[0] | 10: Adapter port, 11: OTG
	--- Charging status
	5: CHRG_STAT[1] | 00: Not Charging,  01: Pre-charge (<VBATLOWV)
	4: CHRG_STAT[0] | 10: Fast Charging, 11: Charge termination done
	3: DPM_STAT     0: Not DPM
					1: VINDPM or IINDPM
	2: PG_STAT      0: Power NO Good :(
					1: Power Good :)
	1: THERM_STAT   0: Normal
					1: In Thermal Regulation (HOT)
	0: VSYS_STAT    0: Not in VSYSMIN regulation (BAT > VSYSMIN)
					1: In VSYSMIN regulation (BAT < VSYSMIN)

	*/
	byte systemStatus = pmic.getSystemStatus();

    constexpr char const* vbusStates[] = {
		"unknown", "USB host", "adapter port", "OTG"
	};
	char const *vbusStatus = vbusStates[(systemStatus >> 6) & 0b11];

    constexpr char const* chargeStates[] = {
		"not charging", "pre charge", "fast charging", "charge done"
	};
	const char *chargeStatus = chargeStates[(systemStatus >> 4) & 0b11];
	
	char const *dpmStatus = ((systemStatus >> 3) & 0b1) ? "VINDPM or IINDPM" : "not DPM";

	const char *pgStatus = ((systemStatus >> 2) & 0b1) ? "power good" : "power not good";

	const char *thermStatus = ((systemStatus >> 1) & 0b1) ? "in thermal regulation (hot)" : "normal thermal regulation";

	const char *vsysStatus = ((systemStatus >> 0) & 0b1) ? "in VSYSMIN regulation" : "not in VSYSMIN regulation";


	Log.info("PMIC systemStatus=0x%02x, vbusStatus=%s, chargeStatus=%s", (int)systemStatus, vbusStatus, chargeStatus);
	Log.info("PMIC %s, %s, %s, %s", dpmStatus, pgStatus, thermStatus, vsysStatus);

	//-----------------------------------------------------------------------------
	// Input source control register
	//-----------------------------------------------------------------------------

	/*
	REG00
	BIT
	7 : 0:Enable Buck regulator 1:disable buck regulator (powered only from a LiPo)
	--- input volatge limit. this is used to determine if USB source is overloaded
	6 : VINDPM[3] 640mV | offset is 3.88V, Range is 3.88 to 5.08
	5 : VINDPM[2] 320mV | enabling bits 3 to 6 adds the volatges to 3.88 base value
	4 : VINDPM[1] 160mV | Default is 4.36 (0110)
	3 : VINDPM[0] 80mV  |
	--- input current limit
	2 : INLIM[2]  000: 100mA, 001: 150mA, 010: 500mA,   | Default: 100mA when OTG pin is LOW and
	1 : INLIM[1]  011: 900mA, 100: 1.2A,   101: 1.5A    | 500mA when OTG pin is HIGH
	0 : INLIM[0]  110: 2.0A,  111: 3.0A                 | when charging port detected, 1.5A
	*/

	int inputCurrentLimit = (int) pmic.getInputCurrentLimit();
	float inputVoltageLimit = (float) pmic.getInputVoltageLimit() / 1000.0;

	Log.info("PMIC input source register=0x%02x, inputCurrentLimit=%d mA, inputVoltageLimit=%.3f", (int)pmic.readInputSourceRegister(), inputCurrentLimit, inputVoltageLimit);

	//-----------------------------------------------------------------------------
	// Charge current control register
	//-----------------------------------------------------------------------------

	/*
	REG02
	BIT
	7: ICHG[5] 2048mA   | offset is 512mA
	6: ICHG[4] 1024mA   | Range: 512 to 4544mA (BQ24195)
	5: ICHG[3] 512mA    | Range: 512 to 2496mA (BQ24195L)
	4: ICHG[2] 256mA    | Default: 2048mA (011000) = 512mA+1024mA+512mA
	3: ICHG[1] 128mA    | enabling bits 2 to 7 adds the current to 512mA base value
	2: ICHG[0] 64mA     |
	1: Reserved (should always be 0)
	0: FORCE_20PCT (fill this descri
	*/

	byte chargeCurrentRaw = pmic.getChargeCurrent();

	int chargeCurrent = (((int) chargeCurrentRaw) & 0b11111100) >> 2; 
	chargeCurrent *= 64;
	chargeCurrent += 512;
	Log.info("PMIC charge current control register=0x%02x, chargeCurrent=%d mA", (int)chargeCurrentRaw, chargeCurrent);


	//-----------------------------------------------------------------------------
	//PreCharge/ Termination Current Control Register
	//-----------------------------------------------------------------------------

	/*
	REG03
	BIT
	--- precharge current limit
	7: IPRECHG[3]   1024mA  | offset is 128mA
	6: IPRECHG[2]   512mA   | Range: 128 mA to 2048 mA
	5: IPRECHG[1]   256mA   | Default: 256 mA (0001) = 128mA+128mA
	4: IPRECHG[0]   128mA   | enabling bits 4 to 7, adds the current to 128mA base value
	--- termination current limit
	3: ITERM[3]     1024mA  | offset is 128mA
	2: ITERM[2]     512mA   | Range: 128 mA to 2048 mA
	1: ITERM[1]     256mA   | Default: 256 mA (0001) = 128mA+128mA
	0: ITERM[0]     128mA   | enabling bits 0 to 3, adds the current to 128mA base value
	*/
	byte chargeTermRegister = pmic.readChargeTermRegister();
	Log.info("PMIC charge termination register=0x%02x", (int)chargeTermRegister);

	// byte preChargeCurrent = pmic.getPreChargeCurrent();
    // byte termChargeCurrent = pmic.getTermChargeCurrent();

	//-----------------------------------------------------------------------------
	//Charge Voltage Control Register
	//-----------------------------------------------------------------------------

	/*
	REG04
	BIT
	--- Charge Voltage Limit
	7: VREG[5]  512mV   | offset os 3.504V
	6: VREG[4]  256mV   | Range: 3.504V to 4.400V
	5: VREG[3]  128mV   | Default: 4.208V (101100) = 3.504V+512mV+128mV+64mV
	4: VREG[2]  64mV    | enabling bits 2 to 7, adds the voltage to 3.504V base value
	3: VREG[1]  32mV    |
	2: VREG[0]  16mV    |
	--- Battery Precharge to Fast Charge Threshold
	1: BATLOWV  0:2.8V, 1:3.0V Default:3.0V(1)
	--- Battery Recharge Threshold (below battery regulation voltage)
	0: VRECHG   0:100mV, 1:300mV Default:100mV(0)
	*/
	Log.info("PMIC charge voltage control register=0x%02x, chargeVoltage=%.03f", (int)pmic.getChargeVoltage(), ((float)pmic.getChargeVoltageValue()) / 1000.0);


	//-----------------------------------------------------------------------------
	//Fault Register
	//-----------------------------------------------------------------------------
	//NOTE: This is a read-only register

	/*
	REG09
	BIT
	7: WATCHDOG_FAULT   0: Normal
						1: watchdog timer expired
	6: Reserved
	--- Charge fault status
	5: CHRG_FAULT[1]    | 00: Normal, 01: Input fault (VBUS OVP or VBAT < VBUS < 3.8 V)
	4: CHRG_FAULT[0]    | 10: Thermal shutdown, 11: charge safetly timer expiration
	--- Battery fault status
	3: BAT_FAULT        0: Normal
						1: BATOVP battery over threshold
	--- NTC thermistor fault status
	2: NTC_FAULT[2]     | 000: Normal
	1: NTC_FAULT[1]     | 101: Cold
	0: NTC_FAULT[0]     | 110: Hot
	*/
	byte fault = pmic.getFault();

	char const *watchdogStatus = ((fault >> 7) & 0b1) ? "watchdog timer expired" : "watchdog normal";

    constexpr char const* chargeFaultStates[] = {
		"normal", "input fault", "thermal shutdown", "charge safety timer expired"
	};
	const char *chargeFaultStatus = chargeFaultStates[(fault >> 4) & 0b11];

	char const *batFaultStatus = ((fault >> 7) & 0b1) ? "BATOVP" : "normal";

	Log.info("PMIC fault register=0x%02x, %s, charge fault: %s", (int) fault, watchdogStatus, chargeFaultStatus);

	constexpr char const* ntcStates[] = {
		"normal", "unknown", "unknown", "unknown", "unknown", "cold", "hot", "unknown"
	};
	const char *ntcStatus = ntcStates[(fault >> 0) & 0b11];
	int ntcStatusValue = (fault >> 0) & 0b11;

	Log.info("PMIC bat fault: %s, ntcStatus: %s (%d)", batFaultStatus, ntcStatus, ntcStatusValue);


	// uint16_t minimumSystemVoltage = pmic.getMinimumSystemVoltage();
    // byte chargingStat = pmic.getChargingStat();

#endif // HAL_PLATFORM_PMIC_BQ24195
}



void powerLog() {
	Log.info("powerLog ===========================================");

	powerManagerLog();

	powerConfigurationLog();

	pmicLog();
}

