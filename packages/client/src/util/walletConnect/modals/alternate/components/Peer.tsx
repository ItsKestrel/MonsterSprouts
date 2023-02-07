import { SignClientTypes } from "@walletconnect/types";
import * as React from "react";

import './styles.css';


interface PeerProps {
  oneLiner?: boolean;
  metadata: SignClientTypes.Metadata;
}

const Peer = (props: PeerProps) =>
  props.oneLiner ? (
    <div className='SPeerOneLiner'>
      <img src={props.metadata.icons[0]} alt={props.metadata.name} />
      <div>{props.metadata.name}</div>
    </div>
  ) : (
    <div className='SPeerCard'>
      <img className='SIcon' src={props.metadata.icons[0]} alt={props.metadata.name} />
      <div className='SName'>{props.metadata.name}</div>
      <div className='SCenter'>{props.metadata.description}</div>
      <div className='SUrl'>{props.metadata.url}</div>
    </div>
  );

export default Peer;
