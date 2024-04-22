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
      <a href="/overview" className={classNames("btn btn-sm btn-ghost")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 24 24"
          className="fill-current size-5"
        >
          <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
        </svg>
        Back to overview
      </a>
      <LoadFile buttonClassName={btnClassName} />
      <SaveMud buttonClassName={btnClassName} />
    </div>
  );
}
