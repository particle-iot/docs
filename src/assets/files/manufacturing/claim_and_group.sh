#!/bin/bash -x
#
# README
# This script does the following:
# 1. Create a log file of batch actions
# 2. Create the group name in the product, if it exists note in the log and continue
# 3. For each device ID in the file:
#    a. Claim to email
#    b. Add to the product
#    c. Add to group
#
# INPUT
# File with one device ID per line. This script extracts the device ID from the first 24 characters of the line.
#
# OUTPUT
# log_claim_and_group_<groupName>_<productID>.txt file with a list of success/fail of claim and group for each device ID.
#
# Example:
# ./claim_and_group.sh group_name_noSpaces <access_token> <productID> filename_deviceIDs.csv

# If the results file exists, remove it
filename="log_claim_and_group_$1_$3.txt";
if [[ -f "$filename" ]]
then
    rm "$filename";
fi

# Create the group name, and if it exists take no actions only log that it exists
echo "Creating the group $1 in product $3" >> "$filename";
VAR=$(curl https://api.particle.io/v1/products/$3/groups \
-d name=$1 \
-d description="added via script" \
-d color="#cae6f6" \
-H "Authorization: Bearer $2" \
# Log result of creating group
echo $VAR >> "$filename";

# Add the list of devices to the product
# Get confirmation from the user
read -p "Are you sure you want to add these devices to the product? Press y? " -n 1 -r
echo    # Move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Adding devices to product $3" >> "$filename";
else
    echo "Script exited";
    exit 0;
fi

# Take the action of adding the list of devices to the product
VAR=$(curl "https://api.particle.io/v1/products/$3/devices" -H "Authorization: Bearer $2" -F file=@"$4");
# Log result of adding device to product
echo $VAR >> "$filename";

# Batch process for each device ID in the input file
while read -r line || [[ -n "$line" ]]; do
    if [[ "$line" != 0 ]]; then
        # Extract the device ID from the line. Removes newline and hidden chars
        deviceID=$(echo $line | cut -c 1-24);  

        # Claim the device
        VAR=$(particle device add "$deviceID");
        # Log result of claiming the device
        echo $VAR >> "$filename";

        # Add the device to the group
        echo "Adding device $deviceID to group $1" >> "$filename";
        VAR=$(curl "https://api.particle.io/v1/products/$3/devices" -X PUT \
        -H "authorization: Bearer $2" \
        -H 'content-type: application/json' \
        -d "{ \"action\": \"groups\", \"devices\": [\"$deviceID\"], \"metadata\": { \"add\": [\"$1\"] }}");
        # Log result of adding group to device
        echo $VAR >> "$filename";
    fi
done < $4