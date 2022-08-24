A permission error happens when flashing code OTA in the following scenarios:

#### Device claimed to a different account

If the device is claimed to a different account, you need to be logged into the same Particle account that the device is claimed to flash the device OTA from the Particle CLI or Workbench.

- For the Particle CLI, use `particle login` from a command prompt or terminal window.
- For Particle Workbench, use **Particle: Login** from the command palette (Ctrl-Shift-P or Command-Shift-P).


#### Flashing unclaimed product devices

It is not possible to flash unclaimed product devices OTA from the Particle CLI or Workbench, even if you are a team member. 

Other options include:

- Claim the device to your developer account, then you can flash the device OTA from the CLI or Workbench
- Flash the device by USB
- Upload your code as a product firmware binary and Lock and Flash the code to your device OTA

