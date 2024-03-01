import NetworkService from "./NetworkService";

export type OsMudEntry = {
  macAddress: string;
  ip: string;
  mudUrl: string;
  mudLocation: string;
  hostname: string;
};

class DeviceService {
  async GetAllDevices(): Promise<OsMudEntry[]> {
    return NetworkService.get("/api/osmud/all");
  }
}

export default new DeviceService();
