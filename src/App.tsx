import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Game from './pages/Game';
import Market from './pages/Market';
import Main from './pages/Main';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/login' element={<Login />} />
                <Route path='/game' element={<Game />} />
                <Route path='/market' element={<Market />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
