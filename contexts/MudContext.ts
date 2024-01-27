"use client";

import { DefaultMudInfo, MudFile } from "@/types/Mud";
import React from "react";

export function getInitMudContext() {
  return null;
}

export const MudContext = React.createContext<{
  mud: MudFile;
  refresh: () => void;
}>({
  mud: DefaultMudInfo,
  refresh() {},
});
