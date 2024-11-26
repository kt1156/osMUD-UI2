# MUD-UI

A tool to manage and edit Manufacturer Usage Description (MUD) files from the browser.

## Running Locally

1. Create database and move the new db access scripts to the correct directories. This is can be performed by using the `install.sh` script:

```bash
$ ./scripts/install.sh
```

2. Start osMUD with the correct parameters as required. An example when using the test bench is provided in `./scripts/run.sh`
3. Build the api. A make file is provided and should create the build binaries in the `bin` folder:
```bash
$ make
```
4. Set the appropriate environment variables and start the api in `./bin/api`.
  - The variables are defined in `/internal/config/appconfig.go`, most times the `DHCP_EVENTS_PATH` will need to be set, for example:
```bash
$ DHCP_EVENTS_PATH=/path/to/events/file ./bin/api
```
- This points to the events file which osMUD monitors, typically provided in the `-e` parameter when starting osMUD.

5. The api should print the port it has started on, you can verify its running by requesting the health endpoint:
```bash
$ curl localhost:8080/health
{"status":"healthy"}
```
6. Navigate to the `ui` directory and run `npm install` to install the dependencies
7. Next run `npm run dev` to start the development server, more information about the ui sever is provided in the README in this directory.
- If you have changed the port the API starts on, you also need to provide this to the ui in the `API_URL` environment variable. If you have not changed it from the defaults, the ui automatically uses the default which is port 8080. (This is used in `/ui/next.config.mjs` to proxy ui requests to `/api/...` to the local api server at `localhost:8080/...` as explained [here](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites))
8. You can now navigate to `http://localhost:3000` in a browser and should see the MUD ui.

## Building the API for the RPi
The go binary has to built using specific arguments for the Raspberry Pi, defined in the Makefile:

```
  CGO_Enabled = 0 # OpenWRT does not include the C Standard Library
  CC=arm-linux-gnueabi-gcc # Toolchain for this hardware and version of OpenWRT
  GOOS=linux 
  GOARM=7 # Using a 32-bit OS so ARMv7 not v8
```

## SSH/SCP
To SSH into the RPi use the command

`ssh root@192.168.1.1`

whilst connected to the RPi using ethernet

To SCP a file to the RPi you need to use legacy options

`scp -O [file] root@192.168.1.1:/file/destination`

## Launching the API on the RPi
Before launching the API the database `store.db` must be moved to the location that osmud expects it to be in. This can be done with the command

`cp /etc/osmud/store.db /var/lib/osmud/store.db`

The API is an executable script stored in

`~/usr/bin/api`

And can be launched with 

`./usr/bin/api`

from the root directory. This starts a server running at `192.168.1.1:8080`

## Tools

### MUD File Maker 
Python script for generating arbitrary length MUD files for testing. Specify number of rules to generate. Found in root folder

### Batch Create MUD DB Entry
Run `./batch_create_mud_db_entry.sh` in /scripts/osmud/ with a number of devices to add to add that number of devices to the database. All devices have name test_device_n and a sequential MAC address.
