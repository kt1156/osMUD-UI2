import NetworkService from "./NetworkService";

export type OsMudEntry = {
  macAddress: string;
  ip: string;
  mudUrl: string;
  hostname: string;
};

class DeviceService {
  async SetMud(macAddress: string, mudFile: any): Promise<null> {
    return NetworkService.put(`/api/manager/${macAddress}/mud`, mudFile);
  }
}

export default new DeviceService();
