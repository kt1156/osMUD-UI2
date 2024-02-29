import { MudContext } from "@/contexts/MudContext";
import MudParser from "@/services/MudParser";
import MudStore from "@/services/MudStore";
import classNames from "classnames";
import React from "react";
import { flushSync } from "react-dom";

interface SaveMudProps {
  buttonClassName?: string;
}

export default function SaveMud(props: SaveMudProps) {
  const fileDownloadElement = React.useRef<HTMLAnchorElement>(null);
  const [fileText, setFileText] = React.useState("");
  const { blockedPolicies } = React.useContext(MudContext);

  function download() {
    const newMud = MudParser.removePolicies(
      MudStore.LoadJson(),
      blockedPolicies
    );
    console.log("newMud: ", newMud);
    flushSync(() => {
      setFileText(encodeURI(JSON.stringify(newMud, undefined, 2)));
    });
    fileDownloadElement.current?.click();
  }

  return (
    <>
      <button
        onClick={download}
        className={classNames("btn", props.buttonClassName, {
          "btn-disabled": blockedPolicies.length == 0,
        })}
      >
        Download Updated MUD
      </button>
      <a
        hidden
        target="_blank"
        href={"data:attachment/text," + fileText}
        download="new_mud.json"
        ref={fileDownloadElement}
      />
    </>
  );
}
