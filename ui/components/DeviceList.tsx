import DeviceService, { OsMudEntry } from "@/services/api/DeviceService";
import { ApiError } from "@/services/api/NetworkService";
import React from "react";
import { useQuery } from "react-query";
import ApiErrorAlert from "./ApiErrorAlert";

export default function DeviceList() {
  const { isLoading, error, data } = useQuery<OsMudEntry[], ApiError>(
    "deviceList",
    DeviceService.GetAllDevices
  );

  return (
    <div className="overflow-x-auto">
      {error && <ApiErrorAlert error={error} />}
      <table className="table">
        <thead>
          <tr>
            <th>Mac Address</th>
            <th>Hostname</th>
            <th>Assigned IP</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d.hostname}>
              <th>{d.macAddress}</th>
              <td>{d.hostname}</td>
              <td>{d.ip}</td>
              <td>
                <a
                  href={`/editor?mac=${encodeURIComponent(d.macAddress)}`}
                  className="btn btn-sm btn-neutral"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
          {isLoading && (
            <tr>
              <th>
                <div className="skeleton my-2 h-4 w-28" />
              </th>
              <td>
                <div className="skeleton my-2 h-4 w-28" />
              </td>
              <td>
                <div className="skeleton my-2 h-4 w-28" />
              </td>
              <td>
                <div className="skeleton my-2 h-4 w-16" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
