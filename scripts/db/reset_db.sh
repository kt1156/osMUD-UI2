#!/bin/bash

DBDIR="/var/lib/osmud/store.db"

if [[ $1 ]]; then
    DBDIR=$1;
fi

SQL="DELETE FROM mudfiles;"

COMMAND="sqlite3 $DBDIR \"${SQL}\""
eval $COMMAND

if [[ $? == 0 ]]; then
    echo Cleared db mudfiles table
    exit 0
else
    exit 1
fi