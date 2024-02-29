"use client";
import { classnames } from "@/utils/classnames";
import React from "react";

export default function TitleEditor() {
  const [editMode, setEditMode] = React.useState(false);
  const [titleValue, setTitleValue] = React.useState("IoT Device");
  const isInvalidInput = React.useMemo(
    () => titleValue.trim().replaceAll(" ", "") === "",
    [titleValue]
  );

  return editMode ? (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-row items-center gap-x-5">
        <input
          type="text"
          placeholder="IoT Device Name"
          className={classnames(
            "input input-bordered w-full max-w-xs",
            isInvalidInput && "input-error"
          )}
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <button
          className={classnames(
            "btn btn-sm btn-accent",
            isInvalidInput && "btn-disabled"
          )}
          onClick={() => {
            if (!isInvalidInput) {
              setEditMode(false);
              setTitleValue(titleValue.trim());
            }
          }}
        >
          Save Name
        </button>
      </div>
      {isInvalidInput && (
        <p className="text-red-600 font-medium">
          The name of the MUD file cannot be empty!
        </p>
      )}
    </div>
  ) : (
    <div className="flex flex-row items-center gap-x-5 py-2">
      <h1 className="text-3xl font-bold text-primary-content">{titleValue}</h1>
      <button
        className="btn btn-sm"
        onClick={() => {
          setEditMode(true);
        }}
      >
        Edit Name
      </button>
    </div>
  );
}
