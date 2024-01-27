"use client";
import { MudContext } from "@/contexts/MudContext";
import React from "react";

export default function LastUpdated() {
  var { mud } = React.useContext(MudContext);

  return (
    <>
      <p className="font-semibold">
        <span className="font-normal">Last updated:</span> {mud.lastUpdate}
      </p>
    </>
  );
}
