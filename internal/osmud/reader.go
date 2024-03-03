package osmud

type Reader interface {
	ReadAll() (*[]OSMudEntry, error)
	GetOne(macAddress string) (*OSMudEntry, error)
}
