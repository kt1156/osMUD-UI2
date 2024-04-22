package config

type AppConfig struct {
	Server
	DB
	DhcpEvents
}

type Server struct {
	Port string `env:"PORT" envDefault:"8080"`
}

type DB struct {
	DbPath string `env:"DB_PATH" envDefault:"/var/lib/osmud/store.db"`
}

type DhcpEvents struct {
	EventsPath string `env:"DHCP_EVENTS_PATH" envDefault:"/var/log/osmud-dhcp-events.log"`
}
