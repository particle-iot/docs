---
title: AN040 Device Setup Patterns
layout: commonTwo.hbs
columns: two
---

# AN040 Device Setup Patterns

There are a number of patterns to use when setting up devices in a product.

## Assembly and test

### Smaller scale

### CM for manufacturing only

### CM does testing only

### CM does complete setup 

## Device setup options

## Common patterns

### Fully OTA

| Pros | Cons |
| :---: | :---: |
| Very easy | May use a lot of cellular data |
| | Cannot be used out-of-area |
| | Can be slow in areas with poor connectivity |
| | Not a convenient to use test firmware |
| | Doing install OTA starts billing for the device |

It is possible to do all setup over-the-air (OTA) which is extremely easy to do if you are ordering devices in tray or reel quantities.

- Add the list of device IDs in your product in bulk. 
- Turn on the devices. This can be done incrementally, as needed, or all at once.

There are a few scenarios where you cannot do this:

- If you are setting up devices out of area. For example, if the devices are set up in China using US LTE Cat M1 devices which cannot connect there.
- If you are setting up devices in a factory that does not have suitable signal (cellular or Wi-Fi).
- For cellular devices, if you expect to be near the cellular data limit for your plan you may want to conserve data use by working devices instead of for downloading Device OS and firmware upgrades.



### Cellular or Wi-Fi test using separate account

If your supply chain from assembly to the device is greater than six months, this pattern may be useful.



## Other resources

- [Creating a product](/tutorials/product-tools/creating-a-product/)
- [Migrating to growth plan](/tutorials/product-tools/migrating-to-growth/)
- [Manufacturing with cellular devices](/tutorials/product-tools/manufacturing-cellular/)

