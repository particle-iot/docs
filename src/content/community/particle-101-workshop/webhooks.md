---
word: Particle Webhooks
title: Webhooks Lab
columns: two
layout: commonTwo.hbs
---

# Lab 5: Introducing Particle Integrations & IFTTT

| **Project Goal**            | Use a Particle Webhook and IFTTT to push device data into Google Sheets.                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn**       | How to configure Particle webhooks; Connecting Particle to other services via IFTTT; Building data visualizations in Google Sheets based on device data |
| **Tools you’ll need**       | A Particle Argon, and the Grove Starter Kit for Particle Mesh, an IFTTT account, and a Google account.                                                                                                            |
| **Time needed to complete** | 40 minutes                                                                                                                                                                |

### Setting up an IFTTT Integration

IFTTT (If This, Then That) is a web-based service that allows you to create integrations via simple conditional statements, called applets. There are hundreds of pre-built services you can leverage, and first-class support for Particle devices. In this section, you're going to create an IFTTT integration that posts a tweet when you press a button on your badge.

{{box op="start" cssClass="boxed warningBox"}}
**Note:** Before you begin<br />
During the flow below, you'll need to connect both your Particle and Google accounts with IFTTT. When prompted, follow the on-screen instructions to do so.
{{box op="end"}}

1.  Start by heading over to [IFTTT](https://ifttt.com/particle) and either login, or create a new account.
![](/assets/images/workshops/particle-101/04/ifttt.png)
<br /><br />
2.  After logging in, click your profile picture in the top right of your dashboard and select the *Create* menu option.
![](/assets/images/workshops/particle-101/04/newapplet.png)
<br /><br />
3.  Click the *+This* button.
![](/assets/images/workshops/particle-101/04/ifthis.png)
<br /><br />
4.  In the *Search services* input, type *particle* and click on the Particle card.
  ![](/assets/images/workshops/particle-101/04/chooseservice.png)
  ![](/assets/images/workshops/particle-101/04/chooseparticle.png)
<br /><br />
5.  Click on the *New event published* card.
  ![](/assets/images/workshops/particle-101/04/choosetrigger.png)
<br /><br />
6. In the trigger fields, set the event name as `env-vals`, leave the *Event Content* field blank and set the *Device Name* to the name of your device. Click *create trigger*.
  ![](/assets/images/workshops/particle-101/04/triggerfields.png)
<br /><br />
7. You've set-up the trigger on the Particle end, now its time for the **That**+ portion of the setup. Click the *+That* button.
  ![](/assets/images/workshops/particle-101/04/thenthat.png)
<br /><br />
8. In the "Search services" input, type *Google Sheets* and click on the Google Sheets card.
  ![](/assets/images/workshops/particle-101/04/choose-gsheets.png)
<br /><br />
9. Click on the *Add row to spreadsheet* card.
<br /><br>
  ![](/assets/images/workshops/particle-101/04/addrow-card.png)
<br /><br />
10. In the action fields, set the spreadsheet name to *TCEnvVals*. Leave the defaults in the other fields and click *Create action*.
  ![](/assets/images/workshops/particle-101/04/ifttt-gsheets.png)
<br /><br />
11. Click the *Finish* button to create your applet.
  ![](/assets/images/workshops/particle-101/04/ifttt-reviewpng.png)
  ![](/assets/images/workshops/particle-101/04/ifttt-live.png)

  Now, let's modify our device firmware to publish temp and humidity values.

### Publishing a payload with temp and humidity values

Now, let's send the current temp, humidity and light level using a `Particle.publish` event. You'll send a single event with all three values in a single JSON object. To do this, you'll use the `JSONParserGenerator` library.

1. Open the Workbench Command Palette (CMD+SHIFT+P or CTRL+SHIFT+P) and select the *Particle: Install Library* option.
<br /><br />
2. In the text box, type `JsonParserGeneratorRK` and click enter.
<br /><br />
3. At the top of your project, add an include statement:

  ```cpp
  #include "JsonParserGeneratorRK.h"
  ```
<br />
4. Add a new function to your app called `createEventPayload` that takes the temp, humidity and light readings. <br /><br />
This function will create an instance of `JsonWriterStatic` and `JsonWriterAutoObject` objects, insert key-value pairs for each reading, and then get the JSON object as a string buffer that you can send along in a `Particle.publish()` event.

  ```cpp
  void createEventPayload(int temp, int humidity, double light)
  {
    JsonWriterStatic<256> jw;
    {
      JsonWriterAutoObject obj(&jw);

      jw.insertKeyValue("temp", temp);
      jw.insertKeyValue("humidity", humidity);
      jw.insertKeyValue("light", light);
    }
  }
  ```
<br />
5. Now, let's publish a new event, and call the `createEventPayload` function to provide a formatted JSON string for the data parameter. Add the following to the end of your `createEventPayload` function.
```cpp
Particle.publish("env-vals", jw.getBuffer(), PRIVATE);
```
<br /><br />
6. Finally, your `loop` function, call the `createEventPayload` function you just created.            
```cpp
createEventPayload(temp, humidity, currentLightLevel);
```

### Posting sensor values to Google Sheets

1. Flash this firmware to your device and navigate to the Particle console. Every few seconds, you'll see a new `env-vals` event show up.

  ![](/assets/images/workshops/particle-101/04/env-vals.png)
<br /><br />
2. Open Google Drive and look for a folder named *events*. In that folder, you'll find a Sheet called *TCEnvVals*. Open it, and you'll see a row for each event published by your device:
  ![](/assets/images/workshops/particle-101/04/gsheet.png)
<br /><br />
Now that you have data streaming into Google Sheets, let's transform the data and create some simple visualizations!

### Processing data in Google Sheets

Before you create data visualizations with our sensor data, you need to transform the sensor values into discrete values. You'll do this by creating a simple script that processes the raw data as it is added to the main sheet, inserting each raw sensor value in a new sheet for data viz.

1. In the *TCEnvVals* document, create a new sheet called *Processed* and give it four columns, 
temp, humidity, light, and time.
<br /><br />
2. In the Tools menu, click the *Script Editor* option, which will open a new tab with the Google Apps Script editor.
<br /><br />
3. Click on the *Untitled project* text and give the project a name, like *ProcessTCSensorData*.
<br /><br />
4. Remove the default function code and add an `onChange` event with the following code.
  ```js
  function onChange(e) {
    var row = SpreadsheetApp.getActiveSheet().getLastRow();
    
    var envVals = SpreadsheetApp.getActiveSheet().getRange("B" + row).getValue();
    var time = SpreadsheetApp.getActiveSheet().getRange("D" + row).getValue();
    
    var envObj = JSON.parse(envVals);
    
    if (envObj.temp != '0') {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var processedSheet = ss.getSheetByName('Processed');
      processedSheet.appendRow([envObj.temp, envObj.humidity, envObj.light, time]);
    }
  }
  ```
The code above is a JavaScript function that uses the Google Sheets API to get the last row inserted into the main sheet, extract the sensor vals, and the timestamp. The sensor vals are parsed into a JSON object, and then you add a new row to the "Processed" sheet with those values and the timestamp.
<br /><br />
5. Save the file.
<br /><br />
6. Now, you'll need to add a change trigger to this app. Click the clock icon to open the triggers for this project.
  ![](/assets/images/workshops/particle-101/04/opentriggers.png)
<br /><br />
7. Click *Add Trigger* at the bottom left.
  ![](/assets/images/workshops/particle-101/04/addtrigger.png)
<br /><br />
8. In the trigger window that opens, make sure that `onChange` is selected as the function name, and *On change* is selected as the event type.
  ![](/assets/images/workshops/particle-101/04/addtriggerwindow.png)
<br /><br />
9. Click save to create the trigger. You'll be asked to sign-in with your Google Account and grant access to your app. Follow the on-screen instructions to do so.
  ![](/assets/images/workshops/particle-101/04/triggerlist.png)
<br /><br />
10. In the tab for your spreadsheet, select the *Processed* sheet. After a few moments, records should start coming through. 
  ![](/assets/images/workshops/particle-101/04/processed.png)
If you're not seeing anything after a bit, you can click the "Check now" button in your IFTTT Applet.
  ![](/assets/images/workshops/particle-101/04/checknow.png)

### Visualizing data with Google Sheets

Once you have some processed data, you can add a chart to your sheet!

1. Create a new tab called *DataViz*.
<br /><br />
2. Click the "Insert" menu and select *Chart*.
  ![](/assets/images/workshops/particle-101/04/chart.png)
<br /><br />
3. The Chart menu will open on the right side of the window. In the *Chart type* drop-down, select the combination chart type.
  ![](/assets/images/workshops/particle-101/04/combochart.png)
<br /><br />
4. Click the X-Axis box to open the *Select a data range* window. Navigate to the *Processed* sheet and select the top of the Time tab.
  ![](/assets/images/workshops/particle-101/04/selectX.gif)
<br /><br />
5. Click *Add Series* to open the *Select a data range* window.
  ![](/assets/images/workshops/particle-101/04/addtemp.gif)
<br /><br />
6. Repeat the same process to add Series data for the *humidity* and *light* columns.
  ![](/assets/images/workshops/particle-101/04/chartfilled.png)
<br /><br />
7. Now let's customize. In the Chart editor, click the *Customize* tab and expand the *Series* item. Select the *temp* series. Then, change the type to *Line*.
  ![](/assets/images/workshops/particle-101/04/templine.png)
<br /><br />
8. Now select the *light* series and change the type to *Columns*.
  ![](/assets/images/workshops/particle-101/04/lightline.png)
<br /><br />
9. Close the chart editor. If everything has been configured properly, you'll see a chart that looks like this.
  ![](/assets/images/workshops/particle-101/04/finalchart.png)
<br /><br />
And that's how you do DataViz with Google Sheets and IFTTT. Now performing on-device debugging with Particle Workbench.