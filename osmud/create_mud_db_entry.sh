#!/bin/bash

DBDIR="/var/lib/osmud/store.db"

usage() { 
  echo "Usage: 
Required: -d <mud-file-database-file> -i <device-ip-address> -m <device-mac-address> 
Optional: -u <mud-url> -f <local-mud-file> -c <target host name>" 1>&2; 
  exit 0; 
}

MUD_DB_FILE=""
SRC_IP=""
SRC_MAC_ADDR=""
MUD_URL=""
MUD_LOCAL_FILE=""
HOST_NAME=""

while getopts 'hd:i:m:u:f:c:' option; do
    case "${option}" in
        d) MUD_DB_FILE=$OPTARG;;
        i) SRC_IP=$OPTARG;;
        m) SRC_MAC_ADDR=$OPTARG;;
        u) MUD_URL=$OPTARG;;
        f) MUD_LOCAL_FILE=$OPTARG;;
        c) HOST_NAME=$OPTARG;;
	h | *) usage;;
    esac
done

if [[ -z "${MUD_DB_FILE/ //}" ]]; then
echo -e "ERROR: Please specify the MUD DB file!\n"
    exit 1
fi

if [[ -z "${HOST_NAME/ //}" ]]; then
    echo -e "ERROR: Please specify the target device host name!\n"
    exit 1
fi

if [[ -z "${SRC_IP/ //}" ]]; then
    echo -e "ERROR: Please specify device ip!\n"
    exit 1
fi

if [[ -z "${SRC_MAC_ADDR/ //}" ]]; then
    echo "ERROR: Please specify device MAC address!\n"
    exit 1
fi

SQL="INSERT INTO mudfiles (mac_address, ip, mud_url, mud_loc, hostname) VALUES ('${SRC_MAC_ADDR}', '${SRC_IP}', '${MUD_URL}', '${MUD_LOCAL_FILE}', '${HOST_NAME}');"

COMMAND="sqlite3 $DBDIR \"${SQL}\""
eval $COMMAND

exit 0
