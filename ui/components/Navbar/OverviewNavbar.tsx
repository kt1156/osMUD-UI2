"use client";

import React from "react";
import classNames from "classnames";

interface OverviewNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function OverviewNavbar({ activeTab, setActiveTab }: OverviewNavbarProps) {
  const btnClassName = "btn-sm btn-neutral";

  return (
    <div className="w-full flex flex-row gap-x-4 bg-base-200 p-6">
      <button
        onClick={() => setActiveTab("devices")}
        className={classNames("btn", btnClassName, { "btn-active": activeTab === "devices" })}
      >
        Device List
      </button>

      <button
        onClick={() => setActiveTab("visualiser")}
        className={classNames("btn", btnClassName, { "btn-active": activeTab === "visualiser" })}
      >
        Traffic Visualizer
      </button>
    </div>
  );
}
