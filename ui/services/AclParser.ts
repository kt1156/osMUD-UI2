import type {
  ACE,
  ACL,
  ACL_TYPE,
  IPV_SOURCE_DEST,
  ACE_TCP_UDP,
} from "@/types/Acl";

class AclParser {
  private parseIPV(obj: any): IPV_SOURCE_DEST {
    let out: IPV_SOURCE_DEST = {
      protocol: obj["protocol"],
    };
    let keys = Object.keys(obj);

    const dns_src_key = "ietf-acldns:src-dnsname";
    const dns_dst_key = "ietf-acldns:dst-dnsname";
    if (keys.includes(dns_src_key)) {
      out.sourceDnsName = obj[dns_src_key];
    }

    if (keys.includes(dns_dst_key)) {
      out.destinationDnsName = obj[dns_dst_key];
    }

    const network_src_key = "source-ipv4-network";
    const network_dst_key = "destination-ipv4-network";
    if (keys.includes(network_src_key)) {
      out.sourceNetwork = obj[network_src_key];
    }

    if (keys.includes(network_dst_key)) {
      out.destinationNetwork = obj[network_dst_key];
    }

    return out;
  }

  private parseTCP_UDP(obj: any): ACE_TCP_UDP {
    let out: ACE_TCP_UDP = {};

    let keys = Object.keys(obj);
    if (keys.includes("destination-port")) {
      out.destinationPort = {
        port: obj["destination-port"]["port"],
        operator: obj["destination-port"]["operator"],
      };
    }

    if (keys.includes("source-port")) {
      out.sourcePort = {
        port: obj["source-port"]["port"],
        operator: obj["source-port"]["operator"],
      };
    }

    return out;
  }

  private parseAce(obj: any, type: ACL_TYPE): ACE {
    let ace: ACE = {
      name: obj["name"],
      matches: {},
      actions: {
        forwarding: obj["actions"]["forwarding"],
      },
    };

    switch (type) {
      case "ipv4-acl-type":
        ace.matches.ipv4 = this.parseIPV(obj["matches"]["ipv4"]);
        break;
      case "ipv6-acl-type":
        ace.matches.ipv6 = this.parseIPV(obj["matches"]["ipv6"]);
        break;
      case "eth-acl-type":
        const ethObj: any = obj["matches"]["eth"];
        ace.matches.eth = {
          destinationAddress: ethObj["destination-mac-address"],
          sourceAddress: ethObj["source-mac-address"],
        };
        break;
      default:
        throw new Error("Type of ace is unknown: " + type);
    }

    let matchesKeys = Object.keys(obj["matches"]);
    if (matchesKeys.includes("tcp")) {
      ace.matches.tcp = this.parseTCP_UDP(obj["matches"]["tcp"]);
    }

    if (matchesKeys.includes("udp")) {
      ace.matches.tcp = this.parseTCP_UDP(obj["matches"]["udp"]);
    }

    return ace;
  }

  parseSingle(obj: any): ACL {
    let acl: ACL = {
      name: obj["name"],
      type: obj["type"],
      aces: {
        ace: [],
      },
    };

    obj["aces"]["ace"].forEach((o: any) => {
      try {
        acl.aces.ace.push(this.parseAce(o, acl.type));
      } catch (e: unknown) {
        console.error("Error encountered parsing ACE: ", e);
      }
    });

    return acl;
  }

  parseAll(obj: any): ACL[] {
    let output: ACL[] = [];

    let keys = Object.keys(obj);
    if (keys.indexOf("acl") == -1) throw new Error("acl key is not present");

    obj["acl"].forEach((o: any) => {
      output.push(this.parseSingle(o));
    });

    return output;
  }
}

export default new AclParser();
