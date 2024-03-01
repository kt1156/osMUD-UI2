import { OsMudEntry } from "@/services/DeviceService";
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
                <button className="btn btn-sm btn-neutral">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
