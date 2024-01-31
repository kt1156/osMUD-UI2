import { ACE, ACE_DIRECTION, ACL_TYPE, IPV_SOURCE_DEST } from "@/types/Acl";
import React from "react";
import Modal from "../Modal";

interface AceProps {
  ace: ACE;
  type: ACL_TYPE;
  direction: ACE_DIRECTION;
}

export default function Ace({ ace, type, direction }: AceProps) {
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
    <tr>
      <th>{ace.name}</th>
      <td>{sourceDestinationName}</td>
      <td>{ace.matches.tcp?.sourcePort?.port ?? "any"}</td>
      <td>{ace.matches.tcp?.destinationPort?.port ?? "any"}</td>
      <td>{ace.actions.forwarding}</td>
      <td>
        <Modal title="View" id={ace.name} className="btn-sm ">
          <pre>{JSON.stringify(ace, undefined, 2)}</pre>
        </Modal>
      </td>
    </tr>
  );
}
