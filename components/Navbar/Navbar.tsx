"use client";
import React from "react";
import Modal from "../Modal";
import LoadFile from "./LoadFile";
import classNames from "classnames";
import MudStore from "@/services/MudStore";
import { MudContext } from "@/contexts/MudContext";

export default function Navbar() {
  var MudCtx = React.useContext(MudContext);
  const btnClassName = "btn-sm btn-neutral";

  return (
    <div className="w-full flex flex-row gap-x-2 bg-base-200 p-6">
      <LoadFile buttonClassName={btnClassName} />
      <button className={classNames(btnClassName, "btn")}>
        Export to JSON
      </button>
      <Modal id="settings_modal" title="Settings" className={btnClassName}>
        Settings
      </Modal>
      <div className="ml-auto">
        <button
          className="btn btn-sm btn-error"
          onClick={(e) => {
            MudStore.ClearJson();
            MudCtx.refresh();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
