import { ACE, ACE_DIRECTION, ACL_TYPE, IPV_SOURCE_DEST } from "@/types/Acl";
import React from "react";
import Modal from "../Modal";
import classNames from "classnames";
import { MudContext } from "@/contexts/MudContext";

interface AceProps {
  ace: ACE;
  type: ACL_TYPE;
  direction: ACE_DIRECTION;
}

export default function Ace({ ace, type, direction }: AceProps) {
  const { blockedPolicies, addBlockedPolicy, removeBlockedPolicy } =
    React.useContext(MudContext);

  let blocked = React.useMemo(
    () => blockedPolicies.includes(ace.name),
    [blockedPolicies]
  );

  let sourceDestinationName = React.useMemo(() => {
    function getFromIpv(ipv?: IPV_SOURCE_DEST): string {
      if (direction == "from-device") {
        return ipv?.destinationDnsName ?? ipv?.destinationNetwork ?? "";
      }
      return ipv?.sourceDnsName ?? ipv?.sourceNetwork ?? "";
    }

    switch (type) {
      case "ipv4-acl-type":
        return getFromIpv(ace.matches.ipv4);
      case "ipv6-acl-type":
        return getFromIpv(ace.matches.ipv6);
      case "eth-acl-type":
        if (direction == "from-device") {
          return ace.matches.eth?.destinationAddress;
        }
        return ace.matches.eth?.sourceAddress;
      default:
        return "";
    }
  }, [ace, type, direction]);

  return (
    <tr
      className={classNames(
        "transition-all ease-in",
        blocked ? "bg-red-50" : "bg-green-50"
      )}
    >
      <th>{blocked ? "Blocked" : "Allowed"}</th>
      <th>{ace.name}</th>
      <td>{sourceDestinationName}</td>
      <td>{ace.matches.tcp?.sourcePort?.port ?? "any"}</td>
      <td>{ace.matches.tcp?.destinationPort?.port ?? "any"}</td>
      <td>{ace.actions.forwarding}</td>
      <td className="flex flex-row justify-center items-center gap-x-8">
        <Modal title="View" id={ace.name} className="btn-sm ">
          <pre>{JSON.stringify(ace, undefined, 2)}</pre>
        </Modal>
        <button
          onClick={() => {
            blocked
              ? removeBlockedPolicy(ace.name)
              : addBlockedPolicy(ace.name);
          }}
          className={classNames(
            "transition-all ease-in btn btn-sm",
            blocked ? "btn-success" : "btn-error"
          )}
        >
          {blocked ? "Allow" : "Block"}
        </button>
      </td>
    </tr>
  );
}
