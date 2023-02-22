import './index.css';

import { useEffect } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useWalletConnectClient } from './contexts/WalletConnectContext';
import Game from './pages/Game';
import Home from './pages/Home';
import Market from './pages/Market';

export interface GlobalState {}

export const { useGlobalState } = createGlobalState<GlobalState>({});

function App() {
    const { connect, session, pairings, client } = useWalletConnectClient();

    useEffect(() => {
        if (!client) return;

        if (!session) {
            connect(pairings[0]);
        }
    }, [client]);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/market" element={<Market />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
