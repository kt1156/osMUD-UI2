package config

type AppConfig struct {
	Server
	DB
}

type Server struct {
	Port string `env:"PORT" envDefault:"8080"`
}

type DB struct {
	DbPath string `env:"DB_PATH" envDefault:"/var/lib/osmud/store.db"`
}
