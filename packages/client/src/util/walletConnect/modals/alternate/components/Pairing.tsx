import * as React from "react";

import { PairingTypes } from "@walletconnect/types";

import Peer from "./Peer";

interface PairingProps {
  pairing: PairingTypes.Struct;
  onClick?: any;
}

const divStyle = {
  width: '100%',
  cursor: 'pointer'
}

const Pairing = (props: PairingProps) => {
  const { peerMetadata } = props.pairing;
  return (
    <div style={divStyle} onClick={props.onClick}>
      <div>
        {typeof peerMetadata !== "undefined" ? (
          <Peer oneLiner metadata={peerMetadata} />
        ) : (
          <div>{`Unknown Wallet`}</div>
        )}
      </div>
    </div>
  );
};

export default Pairing;
