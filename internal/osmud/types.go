package osmud

type OSMudEntry struct {
	MacAddress  string `json:"macAddress"`
	Ip          string `json:"ip"`
	MudUrl      string `json:"mudUrl"`
	MudLocation string `json:"-"`
	Hostname    string `json:"hostname"`
}
