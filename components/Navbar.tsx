import React from "react";

export default function Navbar() {
  return (
    <div className="w-full flex flex-row gap-x-2">
      <button className="btn btn-primary">Open</button>
      <button className="btn btn-primary">Save</button>
      <button className="btn btn-primary">Settings</button>
    </div>
  );
}
