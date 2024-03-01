package dhcp

import (
	"fmt"
	"time"
)

type Event struct {
	Date       time.Time
	Action     EventType
	MudUrl     string
	MacAddress string
	Ip         string
	Hostname   string
}

func (event *Event) String() string {
	return fmt.Sprintf("%s|%s|lan|DHCP|1,121,3,6,15,119,252,95,44,46|MUD|%s|vendor-0.0.1|%s|%s|%s\n",
		event.Date.Format("2006-01-02T15:04:05"),
		event.Action,
		event.MudUrl,
		event.MacAddress,
		event.Ip,
		event.Hostname)
}

type EventType string

var (
	NewEvent    EventType = "NEW"
	DeleteEvent EventType = "DEL"
)

type EventFileManager interface {
	AddEvent(event *Event) error
}
