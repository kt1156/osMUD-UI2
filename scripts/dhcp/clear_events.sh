#!/bin/bash

rm -f /var/log/osmud-dhcp-events.log || true
touch /var/log/osmud-dhcp-events.log
if [ $? -ne 0 ]; then
    echo -e "ERROR: Unable to reset dhcp events log - are you using sudo?"
    exit 1
fi

echo -e "Cleared DHCP events file"
exit 0