package mud

type Manager interface {
	Set(macAddress string, mudFile []byte) error
	Get(macAddress string) ([]byte, error)
}
