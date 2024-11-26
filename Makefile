
BUILD_DIR = bin

all: dhcp_mock.build api.build

dhcp_mock.build:
	go build -o ${BUILD_DIR}/dhcp_mock ./tools/dhcp_mock

api.build:
	env CC=arm-linux-gnueabi-gcc CGO_ENABLED=1 GOOS=linux GOARCH=arm GOARM=7  \
                go build -o ${BUILD_DIR}/api -ldflags "-linkmode 'external' -extldflags '-static'"\
                -tags sqlite_omit_load_extension ./api

clean:
	mkdir -p ${BUILD_DIR}
	rm -r ${BUILD_DIR}
