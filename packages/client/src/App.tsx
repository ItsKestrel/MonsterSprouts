import './index.css';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useWalletConnectClient } from './contexts/WalletConnectContext';
import Game from './pages/Game';
import Home from './pages/Home';
import Market from './pages/Market';
import { BaseCard, Card as GameCard } from '../../shared/src/types/Card';

export interface GlobalState {
    deck: GameCard[];
}

const initialState = {
    deck: [],
};

export const { useGlobalState } = createGlobalState<GlobalState>(initialState);

enum Modal {
    Pairing,
}

function App() {
    const { connect, session, pairings, client } = useWalletConnectClient();

    const [modal, setModal] = useState<Modal | null>(null);

    useEffect(() => {
        if (!client || session) return;

        if (pairings.length) {
            setModal(Modal.Pairing);
        } else {
            connect();
        }
    }, [client]);

    useEffect(() => {
        if (session && modal === Modal.Pairing) {
            setModal(null);
        }
    }, [session, modal]);

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/market" element={<Market />} />
                </Routes>
            </HashRouter>

            <Dialog
                open={modal === Modal.Pairing}
                onClose={() => setModal(null)}
            >
                <DialogTitle>WalletConnect Pairings</DialogTitle>
                <DialogContent>
                    <List>
                        {pairings.map((pairing) => {
                            const metadata = pairing.peerMetadata;

                            return (
                                <ListItem key={pairing.topic} disablePadding>
                                    <ListItemButton
                                        onClick={() =>
                                            connect({ topic: pairing.topic })
                                        }
                                    >
                                        {metadata ? (
                                            <div>
                                                <img
                                                    src={metadata.icons[0]}
                                                    alt={metadata.name}
                                                />
                                                {metadata.name}
                                            </div>
                                        ) : (
                                            <ListItemText primary="Unknown Wallet" />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default App;
