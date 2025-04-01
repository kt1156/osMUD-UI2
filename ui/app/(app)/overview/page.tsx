"use client";

import DeviceList from "@/components/DeviceList";
import OverviewNavbar from "@/components/Navbar/OverviewNavbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("devices");

  useEffect(() => {
    if (activeTab === "visualiser") {
      router.push("/pcap");
    }
  }, [activeTab, router]);

  return (
    <>
      <OverviewNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full max-w-screen-xl mx-auto py-16 px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Device List</h1>
          <p className="text-gray-600">
            This page displays a list of network devices. To view their associated Manufacturer Usage Description (MUD) policies, you can click on the devices edit button. 
            <br/>MUD helps improve security by defining device communication rules.
          </p>
        </div>

        {activeTab === "devices" && <DeviceList />}
      </div>
    </>
  );
}
