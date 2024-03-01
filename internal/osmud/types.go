package osmud

type OSMudEntry struct {
	MacAddress  string `json:"macAddress"`
	Ip          string `json:"ip"`
	MudUrl      string `json:"mudUrl"`
	MudLocation string `json:"mudLocation"`
	Hostname    string `json:"hostname"`
}
