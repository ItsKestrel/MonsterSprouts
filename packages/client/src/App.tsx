import './index.css';

import { SignClient } from '@walletconnect/sign-client/dist/types/client';
import { SessionTypes } from '@walletconnect/types';
import { createGlobalState } from 'react-hooks-global-state';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Market from './pages/Market';

export interface GlobalState {
    session: SessionTypes.Struct | null;
    signClient: SignClient | null;
}

export const { useGlobalState } = createGlobalState<GlobalState>({
    session: null,
    signClient: null,
});

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/game" element={<Game />} />
                <Route path="/market" element={<Market />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
