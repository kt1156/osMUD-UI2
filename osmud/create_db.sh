#!/bin/bash

DBDIR="/var/lib/osmud/store.db"

if [[ $1 ]]; then
    DBDIR=$1;
fi

SQL="CREATE TABLE IF NOT EXISTS mudfiles (mac_address TEXT NOT NULL PRIMARY KEY, ip TEXT NOT NULL, mud_url TEXT NOT NULL, mud_loc TEXT, hostname TEXT);"

COMMAND="sqlite3 $DBDIR \"${SQL}\""
eval $COMMAND

if [[ $? == 0 ]]; then
    echo Created DB at $DBDIR
    exit 0
else
    exit 1
fi