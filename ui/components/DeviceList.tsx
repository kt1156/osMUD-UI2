import { OsMudEntry } from "@/services/api/DeviceService";
import React from "react";

interface DeviceListProps {
  data: OsMudEntry[];
}

export default function DeviceList({ data }: DeviceListProps) {
  return (
    <div className="overflow-x-auto">
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
          {data.map((d) => (
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
        </tbody>
      </table>
    </div>
  );
}
