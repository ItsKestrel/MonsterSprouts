import { PairingTypes } from "@walletconnect/types";
import Pairing from "./components/Pairing";

import './modalStyles.css';

interface IPairingModalProps {
    pairings: PairingTypes.Struct[];
    connect: (pairing?: { topic: string }) => Promise<void>;
}

export default function PairingModal(props: IPairingModalProps) {
    const { pairings, connect } = props;

    return (
        <div className='SModalContainer'>
            <div className='SModalTitle'>
                Select available pairing or create new one
            </div>
            <div className='SContainer STable'>
                {pairings.map((pairing) => (
                    <Pairing
                        key={pairing.topic}
                        pairing={pairing}
                        onClick={() => connect({ topic: pairing.topic })}
                    />
                ))}
            </div>
            <button onClick={() => connect()}>New Pairing</button>
        </div>
    );
}