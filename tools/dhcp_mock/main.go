package main

import (
	"flag"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/LouisHatton/MUD-UI/internal/dhcp"
	event_manager "github.com/LouisHatton/MUD-UI/internal/dhcp/event"
	"go.uber.org/zap"
)

const RANDOM_GENERATED_DEFAULT string = "randomly-generated"

var (
	filePathFlag   = flag.String("e", "/var/log/osmud-dhcp-events.log", "The path for the DHCP event file")
	actionFlag     = flag.String("a", "NEW", "The DHCP action (NEW|DEL)")
	mudUrlFlag     = flag.String("m", "http://example.com/mud.json", "The URL for the mud file")
	macAddressFlag = flag.String("mac", RANDOM_GENERATED_DEFAULT, "The mac address of the device")
	ipFlag         = flag.String("ip", RANDOM_GENERATED_DEFAULT, "The assigned ip address of the device")
	hostnameFlag   = flag.String("n", "new-device", "The hostname of the device")
	dryRun         = flag.Bool("dry-run", false, "Generates event but does not add to the event file")
)

func createEventFromFlags() *dhcp.Event {
	var action = dhcp.NewEvent
	switch strings.ToUpper(*actionFlag) {
	case "NEW":
		action = dhcp.NewEvent
	case "DEL":
		action = dhcp.DeleteEvent
	default:
		fmt.Fprintf(os.Stderr, "Unknown action '%s'\n", *actionFlag)
	}

	macAddress := *macAddressFlag
	ip := *ipFlag

	if macAddress == RANDOM_GENERATED_DEFAULT {
		macAddress = RandomGenerateMacAddress()
	}

	if ip == RANDOM_GENERATED_DEFAULT {
		ip = RandomGenerateIpAddress()
	}

	event := dhcp.Event{
		Date:       time.Now(),
		Action:     action,
		MudUrl:     *mudUrlFlag,
		MacAddress: macAddress,
		Ip:         ip,
		Hostname:   *hostnameFlag,
	}

	return &event
}

func main() {
	flag.Usage = func() {
		w := flag.CommandLine.Output() // may be os.Stderr - but not necessarily
		fmt.Fprintf(w, "Usage: %s <options> \n", os.Args[0])
		fmt.Fprintf(w, "\nOptions:\n")
		flag.PrintDefaults()
	}
	flag.Parse()

	event := createEventFromFlags()

	dhcpEventFileManager := event_manager.New(zap.NewNop(), *filePathFlag)

	if *dryRun {
		fmt.Println("DRY-RUN")
	} else {
		err := dhcpEventFileManager.AddEvent(event)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Encountered error attempting to add event to file:\n%s\n", err.Error())
			return
		}
		fmt.Printf("Event added to '%s':\n", *filePathFlag)
	}

	fmt.Println(event.String())
}
