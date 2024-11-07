#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

add_line_if_not_exists() {
  local file=$1
  local line=$2
  if [ ! -f "$file" ]; then
    echo "$line" > "$file"
  elif ! grep -qF "$line" "$file"; then
    echo "$line" >> "$file"
  fi
}

# Find config.txt to enable USART if needed
CONFIG_FILE=/boot/firmware/config.txt

if [ ! -f $CONFIG_FILE ]; then
    CONFIG_FILE=/boot/config.txt
fi

if [ ! -f $CONFIG_FILE ]; then
    echo "ERROR: No RPi boot config file found"
    exit 1
fi

# Configure TTY for PPP udev 
if grep -q '4-model' /proc/device-tree/compatible;  then
  echo "RPi model 4 detected"
  TTY_DEVICE='ttyS0'
  PI_PLATFORM=4
elif grep -q '5-model' /proc/device-tree/compatible;  then
  echo "RPi model 5 detected"
  TTY_DEVICE='ttyAMA0'
  PI_PLATFORM=5
else 
  echo "ERROR: RPI model not detected"
  exit 1
fi

add_line_if_not_exists $CONFIG_FILE "enable_uart=1"

if [ $PI_PLATFORM == 4 ]; then
  add_line_if_not_exists $CONFIG_FILE "dtoverlay=uart2,ctsrts"
elif [ $PI_PLATFORM == 5 ]; then
  add_line_if_not_exists $CONFIG_FILE "dtoverlay=uart0-pi5,ctsrts"
fi

add_line_if_not_exists "/etc/network/interfaces" "auto ppp0"

# Disable console USART
raspi-config nonint do_serial_cons 1

# If this fails, then edit cmdline.txt directly
if [ $? -ne 0 ]; then
  echo "raspi config doesnt support disabling serial console, manually disabling"
  CMDLINE=$(cat /boot/cmdline.txt)
  CMDLINE=${CMDLINE//"console=serial0,115200"/}
  mv /boot/cmdline.txt /boot/cmdline.txt.bak
  echo $CMDLINE > /boot/cmdline.txt
fi

# Disable PPP options
if [ -f /etc/ppp/options ]; then
  mv /etc/ppp/options /etc/ppp/options.bak
fi

add_line_if_not_exists /etc/ppp/options.$TTY_DEVICE "local"

if [ $PI_PLATFORM == 4 ]; then
  echo "Adding ttySO udev rules for RPi 4"
  add_line_if_not_exists "/etc/udev/rules.d/78-mm-user.rules" 'ACTION!="add|change|move", GOTO="mm_user_rules_end"'
  add_line_if_not_exists "/etc/udev/rules.d/78-mm-user.rules" 'DEVPATH=="/sys/devices/platform/soc/fe215040.serial/tty/ttyS0", ENV{ID_MM_PLATFORM_DRIVER_PROBE}="1"'
  add_line_if_not_exists "/etc/udev/rules.d/78-mm-user.rules" 'LABEL="mm_user_rules_end"'
fi

UDEV_RULES='ACTION=="add|change|move", KERNEL=="'$TTY_DEVICE'", ENV{ID_MM_TTY_BAUDRATE}="921600", ENV{ID_MM_CANDIDATE}="1", ENV{ID_MM_PLATFORM_DRIVER_PROBE}="1", ENV{ID_MM_DEVICE_PROCESS}="1"'
add_line_if_not_exists "/etc/udev/rules.d/78-mm-user1.rules" "$UDEV_RULES"

# Scan for modem
udevadm control -R
udevadm trigger
# echo "Scanning for particle modem..."
mmcli -S
sleep 5
mmcli -L 

# Create NMCLI connection
if ! nmcli -t connection show | grep -q particle; then
  nmcli connection add type gsm con-name "particle" gsm.apn "particle" connection.interface $TTY_DEVICE ppp.crtscts true autoconnect yes
  if [ $? -eq 0 ]; then
    echo "Successfully created particle PPP connection, please reboot"
  fi
fi
