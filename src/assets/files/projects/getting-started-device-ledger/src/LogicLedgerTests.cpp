#include "Particle.h"
SYSTEM_MODE(AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_WARN,{{ "app", LOG_LEVEL_ALL }}); //Enable only warning logs for system and all logs for user fw

Ledger deviceConfig;          //Ledger for device scoped configurations
Ledger productConfig;         //Ledger for product scoped configurations

//Control variables for Led in D7 
unsigned long millis_ant1;  //Time count
bool state1 = 0;            //Led state control
unsigned int freq1 = 1000;  //Default frequency

//Control variables for led in D2
unsigned long millis_ant2;    
bool state2 = 0;
unsigned int freq2 = 1000;

//Forward declarations
void onDeviceConfigSync(Ledger ledger);     //Helper function to get the ledger's data when synced
void onProductConfigSync(Ledger ledger);    //Helper function to get the ledger's data when synced
void startupSync();                         //Function for first (setup) ledger sync

void setup() 
{
  pinMode(D7,OUTPUT);           //On board led
  pinMode(D2,OUTPUT);           //External led

  //Configure ledgers and helper function to get the data
  deviceConfig = Particle.ledger("cloud-to-device-test");   //Name of the ledger in the particle console
  deviceConfig.onSync(onDeviceConfigSync);
  
  productConfig = Particle.ledger("cloud-to-product-test");
  productConfig.onSync(onProductConfigSync);

  //Get initial ledger values from cloud
  startupSync();
}


void loop()
{
  // This code determines if the led 1 must be on or off based on device time and config variable for frequency
  if ((millis()-millis_ant1)>=(freq1/2))
  {
    millis_ant1 = millis();
    state1 = !state1;
  }
  digitalWrite(D7, (state1) ? HIGH : LOW);

    // This code determines if the led 2 must be on or off based on device time and config variable for frequency
  if ((millis()-millis_ant2)>=(freq2/2))
  {
    millis_ant2 = millis();
    state2 = !state2;
  }
  digitalWrite(D2, (state2) ? HIGH : LOW);
}

void onDeviceConfigSync(Ledger ledger)
{
    LedgerData data = ledger.get();                                 //Syncs ledger data from the cloud
    Log.info("%s data: %s", ledger.name(), data.toJSON().c_str());  //Logs the vent
    freq1 = data["freq1"].asUInt();                                 //Sets the configuration variable
}

void onProductConfigSync(Ledger ledger)
{
    LedgerData data = ledger.get();
    Log.info("%s data: %s", ledger.name(), data.toJSON().c_str());
    freq2 = data["freq2"].asUInt();
}

void startupSync (void)
{
  LedgerData data;
  
  data = deviceConfig.get();
  Log.info("%s data: %s", deviceConfig.name(), data.toJSON().c_str());
  freq1 = data["freq1"].asUInt();
  
  data = productConfig.get();
  Log.info("%s data: %s", productConfig.name(), data.toJSON().c_str());
  freq2 = data["freq2"].asUInt();
}