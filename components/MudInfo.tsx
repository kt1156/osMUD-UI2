"use client";
import MudHelp from "@/json/mud-help.json";
import { MudContext } from "@/contexts/MudContext";
import React from "react";
import classNames from "classnames";

interface KvItemProps {
  title: string;
  value?: string | number;
  suffix?: string;
  help?: string;
  url?: boolean;
}

function KvItem(props: KvItemProps) {
  if (!props?.value) return;

  return (
    <div className="flex flex-row items-center">
      <p className="font-semibold">
        <span className="font-normal">{props.title}:</span>{" "}
        {props.url && typeof props.value == "string" ? (
          <a
            href={props.value}
            target="_blank"
            className="hover:underline text-blue-800"
          >
            {props.value}
          </a>
        ) : (
          <span>{props.value}</span>
        )}
        {props?.suffix && <span className="font-normal"> {props.suffix}</span>}
      </p>
      {props?.help && (
        <div className="tooltip tooltip-right ml-2" data-tip={props.help}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="w-4 h-4 fill-current text-neutral"
            viewBox="0 0 24 24"
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function MudInfo() {
  var { mud } = React.useContext(MudContext);

  return (
    <div className="flex flex-col gap-y-1">
      <KvItem
        title="System Info"
        value={mud.systemInfo}
        help={MudHelp.systeminfo}
      />
      <KvItem
        title="Last Updated"
        value={mud.lastUpdate}
        help={MudHelp.lastUpdate}
      />
      <KvItem
        title="Cache Validity"
        suffix="hours"
        value={mud.cacheValidity}
        help={MudHelp.cacheValidity}
      />
      <KvItem title="URL" value={mud.mudUrl} help={MudHelp.mudUrl} url />
      <KvItem
        title="Signature"
        value={mud.mudSignature}
        help={MudHelp.mudSignature}
        url
      />
      <KvItem
        title="Manufacturer Name"
        value={mud.mfgName}
        help={MudHelp.mfgName}
      />
      <KvItem
        title="Firmware Rev"
        value={mud.firmwareRev}
        help={MudHelp.firmwareRev}
      />
      <KvItem
        title="Software Rev"
        value={mud.softwareRev}
        help={MudHelp.softwareRev}
      />
      <KvItem title="Documentation" value={mud.documentation} url />
      <p
        className={classNames(
          "font-semibold",
          mud.isSupported ? "text-success" : "text-error"
        )}
      >
        {mud.isSupported ? "Supported" : "Not Supported"}
      </p>
    </div>
  );
}
