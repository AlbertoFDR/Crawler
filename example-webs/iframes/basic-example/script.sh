#!/bin/bash
# Alberto FDR
trap ctrl_c INT 

# Define color
GOLD='\033[33m'
RED='\033[31m'
NC='\033[0m' # No Color

# Function to trap CTRL+C and kill all proccesses
function ctrl_c() {
        echo -e "${GOLD}\n [*] Exiting demo... \n${NC}";
}

if [ "$EUID" -ne 0 ]
    then echo -e "${RED}\n [*] Please run as root. Is for using port 80 :) ${NC}"
    exit
fi

# Serve the index.html
echo -e "${GOLD}\n[*] Starting demo... \n${NC}"
python3 server.py;
