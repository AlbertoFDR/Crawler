#!/bin/bash
# Alberto FDR
trap ctrl_c INT 

# Define color
GOLD='\033[33m'
RED='\033[31m'
NC='\033[0m' # No Color

# Function to trap CTRL+C and kill all proccesses
function ctrl_c() {
        echo -e "\n${GOLD}Exiting demo... ${NC}\n";
        # Kill 5678 WS Process
        sudo lsof -i :5678 | awk '{print $2}' | tail -n 1 | xargs sudo kill -9
}

if [ "$EUID" -ne 0 ]
    then echo -e "${RED}\n [*] Please run as root. Is for using port 80 :) ${NC}"
    exit
fi

# Initialize WebSocket Server
echo -e "\n${GOLD}[*] Starting the websocket server... ${NC}\n"
sudo python3 server.py 2>/dev/null &

# Serve the index.html
echo -e "\n${GOLD}[*] Serving the web... ${NC}\n"
python3 -m http.server 80;
