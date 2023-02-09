import './index.css';

import { HashRouter, Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';
import Market from './pages/Market';

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
