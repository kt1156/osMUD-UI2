#!/bin/bash

mkdir -p /var/lib/osmud/

chmod +x ./create_db.sh 
./create_db.sh $1
if [ $? -ne 0 ]; then
    echo -e "ERROR: Unable to create mud database - are you using sudo?"
    exit 1
fi

move_file_to_osmud() {
    cp ./$1 /etc/osmud/$1 && chmod +x /etc/osmud/$1
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
