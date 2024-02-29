#!/bin/bash

DBDIR="/var/lib/osmud/store.db"

BASEDIR=`dirname "$0"`
usage() { 
  echo "Usage: 
Required: -d <mud-file-database-file> -i <device-ip-address> -m <device-mac-address>" 1>&2; 
  exit 0; 
}

MUD_DB_FILE=""
SRC_IP=""
SRC_MAC_ADDR=""
MUD_URL=""
MUD_LOCAL_FILE=""

while getopts 'hd:i:m:u:f:' option; do
    case "${option}" in
        d) MUD_DB_FILE=$OPTARG;;
        i) SRC_IP=$OPTARG;;
        m) SRC_MAC_ADDR=$OPTARG;;
        u) MUD_URL=$OPTARG;;
        f) MUD_LOCAL_FILE=$OPTARG;;
	h | *) usage;;
    esac
done

if [[ -z "${MUD_DB_FILE/ //}" ]]; then
	echo -e "ERROR: Please specify MUD device database file!\n"
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

SQL="DELETE FROM mudfiles WHERE mac_address = '${SRC_MAC_ADDR}';"

COMMAND="sqlite3 $DBDIR \"${SQL}\""
eval $COMMAND

exit 0
