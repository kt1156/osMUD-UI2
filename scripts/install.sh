#!/bin/bash

mkdir -p /var/lib/osmud/

chmod +x ./db/create_db.sh 
./db/create_db.sh  $1
if [ $? -ne 0 ]; then
    echo -e "ERROR: Unable to create mud database - are you using sudo?"
    exit 1
fi

chmod +x ./db/reset_db.sh 
./db/reset_db.sh  $1
if [ $? -ne 0 ]; then
    echo -e "ERROR: Unable to reset mud database - are you using sudo?"
    exit 1
fi

move_file_to_osmud() {
    cp ./osmud/$1 /etc/osmud/$1 && chmod +x /etc/osmud/$1
}

move_file_to_osmud create_mud_db_entry.sh
if [ $? -ne 0 ]; then
    echo -e "ERROR: Unable to move create mud_db_entry - are you using sudo?"
    exit 1
fi

move_file_to_osmud remove_mud_db_entry.sh
if [ $? -ne 0 ]; then
    echo -e "ERROR: Unable to move remove_mud_db_entry - are you using sudo?"
    exit 1
fi

echo -e "Copied mud db scripts to /etc/osmud/*"

chmod +x ./dhcp/clear_events.sh
./dhcp/clear_events.sh
if [ $? -ne 0 ]; then
    echo -e "ERROR: Unable to clear dhcp events - are you using sudo?"
    exit 1
fi

