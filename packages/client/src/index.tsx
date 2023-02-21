import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { WalletConnectContextProvider } from './contexts/WalletConnectContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <WalletConnectContextProvider>
            <App />
        </WalletConnectContextProvider>
    </React.StrictMode>
);
