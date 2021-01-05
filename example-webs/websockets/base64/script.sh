#!/bin/bash
# Alberto FDR
trap ctrl_c INT 

# Function to trap CTRL+C and kill all proccesses
function ctrl_c() {
        echo "Exiting demo...";
        # Kill 5678 WS Process
        sudo lsof -i :5678 | awk '{print $2}' | tail -n 1 | xargs sudo kill -9
}

# Initialize WebSocket Server
sudo python3 server.py 2>/dev/null &

# Serve the index.html
python3 -m http.server 80;
