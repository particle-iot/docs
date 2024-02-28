Blinking green indicates that your cellular device is attempting to connect to the cellular network. This can take anywhere from a few seconds to several minutes. You should wait at least 10 minutes.

#### SIM not activated

You must activate the SIM card. This normally happens during device setup, but if you set up your device manually you can miss this step. Also if you manually deactivate your SIM card, it will get stuck in blinking green. You can check the status in [the Particle console](https://console.particle.io/).

Also check the [console billing page](https://console.particle.io/billing) to make sure your account is not paused.

#### Device not compatible

Some devices, including the Boron LTE (BRN404X, BRN404, BRN402), B-Series LTE (B404X, B404, B402), Tracker SoM (ONE404, ONE402, T404, T402), E-Series LTE (E404X, E404, E402), Electron LTE (ELC402) are only intended for use in North America, the United States, Canada and Mexico. The devices will not generally connect from other locations and will be be stuck in blinking green.

Likewise, some EMEAA models including the B-Series SoM (B524, B523), Tracker (ONE524, ONE523, T524, T523) will not connect in North America, and will only connect in limited circumstances in other locations in the Americas.

2G/3G models including the Boron 2G/3G (BRN314, BRN310), E-Series (E310), Electron (U270, U260, G350) may have connectivity impacted by 2G/3G shutdown in some countries.

#### No local carrier

Check the [Carrier List](/reference/cellular/cellular-carriers/) to make sure you have a compatible cellular carrier for your device and location. Note that different devices have different sets of carriers, even with a Particle SIM, as there are four different Particle SIM cards.

#### Antenna problems

If you antenna is disconnected, not compatible with your device, or damaged you could get stuck in blinking green.

Adjusting the antenna position may help, and on some devices using a larger external antenna can help.

#### Battery required in some cases

For 2G/3G devices, you should always connect a battery. The USB power supply may not supply enough current to connect, especially to 2G.

LTE Cat M1 devices can connect without a battery.

#### Cellular outage

Check the [Particle status page](https://status.particle.io/) to see if there is a widespread outage. 

Localized outages that affect a small number of towers, such as weather or power-related issues that are localized to a single city or region, may not appear in the status page.
