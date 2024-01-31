export interface ACL {
  name: string;
  type: ACL_TYPE;
  aces: { ace: ACE[] };
}

export type ACE_DIRECTION = "from-device" | "to-device";

export interface ACE_TCP_UDP {
  directionInitiated?: ACE_DIRECTION;
  destinationPort?: PortRange;
  sourcePort?: PortRange;
  operator?: "eq";
}

interface ACE_ETH {
  sourceAddress?: string;
  destinationAddress?: string;
}

// export type ACE = IPV4_ACE | IPV6_ACE | ETH_ACE;

export interface ACE {
  name: string;
  matches: {
    eth?: ACE_ETH;
    tcp?: ACE_TCP_UDP;
    udp?: ACE_TCP_UDP;
    ipv4?: IPV_SOURCE_DEST;
    ipv6?: IPV_SOURCE_DEST;
  };
  actions: {
    forwarding: string;
    logging?: string;
  };
}

interface PortRange {
  port: number;
  operator?: string;
}

export type ACL_TYPE_IPV4 = "ipv4-acl-type";
export type ACL_TYPE_IPV6 = "ipv6-acl-type";
export type ACL_TYPE_ETH = "eth-acl-type";
export type ACL_TYPE = ACL_TYPE_IPV4 | ACL_TYPE_IPV6 | ACL_TYPE_ETH;

export interface IPV_SOURCE_DEST {
  sourceDnsName?: string;
  destinationDnsName?: string;
  sourceNetwork?: string;
  destinationNetwork?: string;
  protocol: number;
}
