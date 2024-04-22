"use client";

import { DefaultMudInfo, MudFile } from "@/types/Mud";
import React from "react";

export function getInitMudContext() {
  return null;
}

export const MudContext = React.createContext<{
  blockedPolicies: string[];
  addBlockedPolicy: (policy: string) => void;
  removeBlockedPolicy: (policy: string) => void;
  mud: MudFile;
  rawMud: any;
  refresh: () => void;
  refreshing: boolean
  load: () => void;
}>({
  blockedPolicies: [],
  addBlockedPolicy() {},
  removeBlockedPolicy() {},
  mud: DefaultMudInfo,
  rawMud: {},
  refresh() {},
  refreshing: false,
  load() {},
});
