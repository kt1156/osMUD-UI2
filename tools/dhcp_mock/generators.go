package main

import (
	"crypto/rand"
	"fmt"
	"net"
)

const (
	local     = 0b10
	multicast = 0b1
)

func RandomGenerateMacAddress() string {
	buf := make([]byte, 6)
	_, err := rand.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("error generating mac address: %s", err.Error()))
	}

	buf[0] = buf[0]&^multicast | local
	return fmt.Sprintf("%02x:%02x:%02x:%02x:%02x:%02x", buf[0], buf[1], buf[2], buf[3], buf[4], buf[5])
}

func RandomGenerateIpAddress() string {
	buf := make([]byte, 4)

	_, err := rand.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("error generating ip address: %s", err.Error()))
	}

	return net.IP(buf).String()
}
