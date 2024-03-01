package osmud

type Reader interface {
	ReadAll() (*[]OSMudEntry, error)
}
