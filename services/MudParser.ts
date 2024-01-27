"use client";

import { MudFile, DefaultMudInfo } from "@/types/Mud";

class MudParser {
  private extractMudInfo(obj: any): MudFile {
    let info: MudFile = { ...DefaultMudInfo };

    let keys = Object.keys(obj);
    keys.forEach((k) => {
      let val = obj[k];
      switch (k) {
        case "mud-version":
          info.mudVersion = val;
          break;
        case "mud-url":
          info.mudUrl = val;
          break;
        case "last-update":
          info.lastUpdate = val;
          break;
        case "is-supported":
          info.isSupported = val;
          break;
        case "mud-signature":
          info.mudSignature = val;
          break;
        case "cache-validity":
          info.cacheValidity = val;
          break;
        case "systeminfo":
          info.systemInfo = val;
          break;
        case "mfg-name":
          info.mfgName = val;
          break;
        case "firmware-rev":
          info.firmwareRev = val;
          break;
        case "software-rev":
          info.softwareRev = val;
          break;
        case "documentation":
          info.documentation = val;
          break;
        case "extensions":
          info.extensions = val;
          break;
        default:
          break;
      }
    });

    return info;
  }

  parse(mud: any): MudFile {
    const mudInfo = this.extractMudInfo(mud["ietf-mud:mud"]);
    console.log("mud info\n", mudInfo);
    return mudInfo;
  }
}

export default new MudParser();
