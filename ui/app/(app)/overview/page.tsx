"use client";

import ApiErrorAlert from "@/components/ApiErrorAlert";
import DeviceList from "@/components/DeviceList";
import ScreenLoading from "@/components/ScreenLoading";
import DeviceService, { OsMudEntry } from "@/services/api/DeviceService";
import { ApiError } from "@/services/api/NetworkService";
import React from "react";
import { useQuery } from "react-query";

export default function page() {
  const { isLoading, error, data } = useQuery<OsMudEntry[], ApiError>(
    "deviceList",
    DeviceService.GetAllDevices
  );

  if (isLoading) {
    return <ScreenLoading />;
  }

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto py-16">
        {data && <DeviceList data={data} />}
        {error && <ApiErrorAlert error={error} />}
      </div>
    </>
  );
}
