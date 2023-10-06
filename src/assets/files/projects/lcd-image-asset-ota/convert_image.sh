#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Usage: $0 <image> <asset>"
    echo "Convert an image into a binary format expected by the Adafruit GFX library."
    echo "The primary color components — red, green and blue — are all packed into a single 16-bit variable, with the most significant 5 bits conveying red, middle 6 bits conveying green, and least significant 5 bits conveying blue."
    exit 1
fi

stream -map rgb -storage-type char $1 - | \
  perl -0777 -ne 'while ($pixel = substr($_, 0, 3, "")) { $red = ord(substr($pixel, 0, 1)); $green = ord(substr($pixel, 1, 1)); $blue = ord(substr($pixel, 2, 1)); $color = (($red >> 3) << 11) + (($green >> 2) << 5) + ($blue >> 3); print chr($color & 0xff); print chr($color >> 8) }' \
  > $2
