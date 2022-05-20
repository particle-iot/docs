---
title: Understanding My Data Consumption
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
Here is a collection of resources relevant to questions around data consumption. If you are curious about how Particle devices use data, are concerned about a change in data usage, or are trying to better understand your bill - this article is for you!  
  
For questions about **how Particle devices consume data**, including information about Publish payloads and system usage, see this link [here](https://docs.particle.io/tutorials/cellular-connectivity/data/#cellular-data-service-with-particle).

For questions about **how Particle bills for data**, please see our [Pricing Page](https://www.particle.io/pricing/) and [Pricing FAQ](https://support.particle.io/hc/en-us/articles/360039741073).  
  
## Data Consumption In Low-Connectivity Environments

If you see unexpectedly high data usage, there are usually two main reasons:  
  
a) a high rate of application-driven calls to our Cloud API, or 

b) high rate of system-related calls made to keep your device online.   
  
If you have done the math on your expected data consumption based on Publish payload size and frequency, it's possible that your device is experiencing poor enough connectivity that the device is forced to consume data in order to try to get online.

You can collect connectivity metrics by navigating to the Console page for a given device, navigating to the “Get Vitals” panel on the left-hand-side, and selecting “Download History.” You can find information about how to interpret these results [here](https://support.particle.io/hc/en-us/articles/360044518213).

Devices with connectivity issues may experience frequent, abrupt disconnects - sometimes in the middle of the handshake process. In certain edge cases, this can lead to noticeably higher-than-expected data consumption. 

## Data Latency

We rely on third party telephony partners to provide us with information about your data consumption. Data consumption logs (“Call Data Records” or CDRs) are processed in a large queue for execution by our telephony partner. In some instances, on high-traffic days, this can lead to delays. In some cases, this can take a few business days, leading to a perceived asynchrony between your device’s real life performance and data usage displayed on the Console. You can find more information about this issue [here](https://support.particle.io/hc/en-us/articles/360044033874).
