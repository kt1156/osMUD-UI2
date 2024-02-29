import { ACL } from "./Acl";

export type MudFile = {
  mudVersion: number;
  mudUrl: string;
  lastUpdate: string;
  isSupported: boolean;
  mudSignature?: string;
  cacheValidity?: number;
  systemInfo?: string;
  mfgName?: string;
  firmwareRev?: string;
  softwareRev?: string;
  documentation?: string;
  extensions?: string[];
  fromDevicePolicy: string[];
  toDevicePolicy: string[];
  acls: ACL[];
};

export const DefaultMudInfo: MudFile = {
  mudVersion: 1,
  mudUrl: "",
  lastUpdate: "Unknown Mud",
  isSupported: true,
  fromDevicePolicy: [],
  toDevicePolicy: [],
  acls: [],
};
