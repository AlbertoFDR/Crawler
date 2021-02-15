#!/bin/bash

# Define color
GOLD='\033[33m'
NC='\033[0m' # No Color

# Install project dependencies
echo -e "\n${GOLD}[*] Installing dependencies: ${NC}";
npm install;

# Help of the crawler
echo -e "\n${GOLD}[*] Help of the crawler: ${NC}\n";
node main.js --help;
