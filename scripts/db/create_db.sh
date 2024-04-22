#!/bin/bash

DBDIR="/var/lib/osmud/store.db"

if [[ $1 ]]; then
    DBDIR=$1;
fi

SQL="
CREATE TABLE IF NOT EXISTS mudfiles (
    mac_address TEXT NOT NULL PRIMARY KEY, 
    ip TEXT NOT NULL, 
    mud_url TEXT NOT NULL, 
    mud_loc TEXT NOT NULL, 
    hostname TEXT
);

CREATE TABLE IF NOT EXISTS manager (
    mac_address TEXT NOT NULL PRIMARY KEY,
    updated_at INTEGER NOT NULL,
    mud_file BLOB NOT NULL
);
"

COMMAND="sqlite3 $DBDIR \"${SQL}\""
eval $COMMAND

if [[ $? == 0 ]]; then
    echo DB at $DBDIR
    exit 0
else
    exit 1
fi