import { ACE_DIRECTION, ACL } from "@/types/Acl";
import React from "react";
import KvItem from "@/components/KvItem";
import Ace from "./Ace";

interface PolicyProps {
  acl?: ACL;
  direction: ACE_DIRECTION;
}

export default function Policy(props: PolicyProps) {
  if (props.acl == undefined) {
    return <></>;
  }

  const acl: ACL = props.acl;
  return (
    <div>
      <h4 className="text-base-content font-semibold text-xl mb-2">
        {acl.name}
      </h4>
      <KvItem
        title="Type"
        value={
          acl.type == "ipv4-acl-type"
            ? "ipv4"
            : acl.type == "ipv6-acl-type"
            ? "ipv6"
            : "eth"
        }
      />
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>
                  {props.direction == "from-device" ? "Destination" : "Source"}
                </th>
                <th>Source Port</th>
                <th>Destination Port</th>
                <th>Forwarding</th>
              </tr>
            </thead>
            <tbody>
              {acl.aces.ace.map((ace) => {
                return (
                  <Ace
                    ace={ace}
                    type={acl.type}
                    direction={props.direction}
                    key={ace.name}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
