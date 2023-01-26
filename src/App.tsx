import './index.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Game from './pages/Game';
import Market from './pages/Market';
import Home from './pages/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home loggedIn={true} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/game' element={<Game />} />
                <Route path='/market' element={<Market />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
