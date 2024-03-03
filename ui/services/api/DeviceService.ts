import NetworkService from "./NetworkService";

export type OsMudEntry = {
  macAddress: string;
  ip: string;
  mudUrl: string;
  hostname: string;
};

class DeviceService {
  async GetAllDevices(): Promise<OsMudEntry[]> {
    return NetworkService.get("/api/osmud");
  }

  async GetDevice(macAddress: string): Promise<OsMudEntry> {
    return NetworkService.get(`/api/osmud/${encodeURIComponent(macAddress)}`);
  }

  async GetDeviceMudFile(macAddress: string): Promise<any> {
    return NetworkService.get(
      `/api/osmud/${encodeURIComponent(macAddress)}/mud`
    );
  }
}

export default new DeviceService();
