/*
 * Copyright (c) 2020 Particle Industries, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(TRACKER_PRODUCT_ID);
#endif
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

float readACCurrentValue()
{
  float ACCurrtntValue = 0;
  float peakVoltage = 0;
  float voltageVirtualValue = 0;  //Vrms

  peakVoltage = 3.3*analogRead(A3)/4096;   //read peak voltage
  voltageVirtualValue = peakVoltage * 0.707;    //change the peak voltage to the Virtual Value of voltage

  //The circuit is amplified by 2 times, so it is divided by 2.
  voltageVirtualValue /= 2;  
  ACCurrtntValue = voltageVirtualValue * 20;

  return ACCurrtntValue;
}

void loc_gen_cb(JSONWriter &writer, LocationPoint &point, const void *context)
{
    writer.name("current").value(readACCurrentValue());
}

void setup()
{   
    Tracker::instance().init();
    Tracker::instance().location.regLocGenCallback(loc_gen_cb);
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);

    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();
}