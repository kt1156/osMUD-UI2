"use client";
import React from "react";
import Modal from "../Modal";
import LoadFile from "./LoadFile";
import classNames from "classnames";
import MudStore from "@/services/MudStore";
import { MudContext } from "@/contexts/MudContext";
import SaveMud from "./SaveMud";

export default function Navbar() {
  var MudCtx = React.useContext(MudContext);
  const btnClassName = "btn-sm btn-neutral";

  return (
    <div className="w-full flex flex-row gap-x-4 bg-base-200 p-6">
      <a href="/overview" className={classNames("btn", btnClassName)}>
        Back to overview
      </a>
      <LoadFile buttonClassName={btnClassName} />
      <SaveMud buttonClassName={btnClassName} />
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
