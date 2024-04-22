package mud

import "time"

type MudManagerEntry struct {
	MacAddress string    `json:"macAddress"`
	UpdatedAt  time.Time `json:"updatedAt"`
	MudFile    []byte    `json:"mudFile"`
}
