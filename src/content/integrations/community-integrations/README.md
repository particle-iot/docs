
*Easily connect Tulip with ParticleIO devices*

## Setup

### Setting up Tulip Machine Endpoint
Creating a machine in Tulip requires the following:
* API Credentials
* Machine Type
* Machine

**API Credentials**
Go to settings --> API Tokens to create an API token with the ability to read / write to machines and attributes
<br/>
<img src="./images/api_token.png" height=250px width= auto>

**Machine Type**
Go to Shop Floor --> Machines --> Machine Types and create a new Machine Type. Create machine attributes to reflect the events published from ParticleIO. NOTE: Data type must be string. 
<br/>
<img src="./images/machine_type.png" >

**Machine**
Create a new machine under the newly created machine type; under configuration, map the machine attribute to the Tulip Machine API and note the MachineId and AttributeId
<br/>
<img src="./images/machine_attribute.png">


### Enabling the integration
**Particle Console**
Now that you've done all of the pre-configuration required, you are now ready to enable the Tulip integration on the Particle Console.

Start by going to the integrations hub by clicking on the integrations icon in the sidebar (), or by simply following this link. If you'd like to enable the integration for a product, you'll need to visit the integrations hub for the desired product. Do this by clicking the products icon () in the sidebar, finding your product, then clicking on the integrations icon () in the product context.

Once in the integrations hub, click on the "New Integration" button. From the list of available integrations, click on "Webhook."


The next step is configuring the Webhook. Fill out the following fields:

* Event Name: The name of the event that will trigger publishing an event to Tulip Machine. This is the name of your event when you call Particle.publish() in your firmware.
* URL: The full url of the Tulip Machine API Example: https://[instance].tulip.co/api/v3/attributes/report
* Request Type: The Tulip server is expecting a POST so make sure that's selected.
* Request Format: The Default is Web Form but we will be sending a JSON, so make sure that you change this to JSON.


You'll need to click the Advanced Settings area to fill out the custom JSON format. You can fill this out as follows:

```
{
  "attributes": [
    {
      "machineId": "machineID",
      "attributeId": "attributeID",
      "value": "{{{PARTICLE_EVENT_VALUE}}}"
    }
  ]
}
```

Click "Create Webhook." You have now successfully told the Particle cloud to stream data to Tulip via its MachineAPI!

It's time to move on to your Firmware!

### Firmware
Now that the integration is enabled in the Particle cloud, the final step required to get data streaming into Tulip is to flash a device with some firmware that publishes the targeted event. Head over to the Particle Web IDE, Local IDE, or whichever IDE you are using for firmware development.

If you're already working on a firmware application, just make sure you include a Particle.publish() with the event name matching the event used to enable the Google Cloud Platform integration above. Otherwise, if you need some sample firmware, paste in the below code into your firmware app:

```
void setup() {
}

void loop() {

  // random data
  String data = String((rand()%100)+1); 
  // Trigger the integration
  Particle.publish("temperature", data, PRIVATE);
  // Wait for 6 seconds
  delay(6000);
}
```
The above code will publish an event every 6 seconds, where a random number is generated and then published to the webook event.

Go ahead and flash the firmware with the Particle.publish() that will trigger the integration to a Particle device.

Congrats! This is all you need to get the integration working end-to-end. Your device will now begin to publish the targeted event, which will signal to the Particle cloud to stream the contents of the event to your Tulip instance.

### Confirming the data reaches Tulip
To ensure that the data is successfully being published to Tulip, you can view machine updates in the Shop Floor --> Machines area

<br/>
<img src="./images/machine_attribute_confirm.png">

NOTE: The attribute may have to be in string format and then converted later.

### Example use cases
Using ParticleIO boards such as the Boron404x are great when Wi-Fi is poor and cellular is a faster workaround for device connectivity. The use cases can include:
* Material tracking
* Machine monitoring
* Real-time quality updates
