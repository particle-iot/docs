#This script converts a .hex file to a raw binary data format
#Usage: python binconvert.py /path_to_file/file.hex
#Will create a .bin file with the same name in the script folder

import sys
from pathlib import Path
if len(sys.argv) == 2:
    #Obtains the input file path
    inputPath = Path(sys.argv[1])
    #generates the output file name
    outputPath = (inputPath.stem) + '.bin'
    #Opens the input file as read only
    input = open(inputPath, "r")
    #Creates a byte array to store the result
    byteArray = bytearray()
    #For every line (ending in \n) on the hex file:
    for line in input.read().split('\n'):
        #If the line corresponds to program data type:
        if line[7:9] == "00":
            #Remove the header of the line and the CRC at the end, leaving only the chars representing the data
            line = line[9:-2]
            #For every pair of chars
            for i in range(0, len(line), 2):
                #Converts the char pair to integer and appends it to the result byte array
                byteArray.append(int("%s%s" % (line[i], line[i+1]), 16))
    #Open the output file
    with open(outputPath, "wb") as file: 
        #Write the byte array to the file
        file.write(byteArray)
    print("")
    print("Conversion done")
else:
    print("")
    print("Usage:")
    print("python binconvert.py /path_to_file/file.hex")
    print("")
    print("Will create a .bin file with the same name in the script folder")
    print("")
