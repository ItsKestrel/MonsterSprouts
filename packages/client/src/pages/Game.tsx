import axios from 'axios';
import { response } from 'express';
import { useEffect } from 'react';

export default function Game() {
    function getGameId(){
        axios.get('/api/v1/new-game', {})
            .then(function (response){
                console.log(response)
            })
    }
    useEffect(()=>{
        getGameId
    })
    return (
        <div>
            <h1>Game</h1>
        </div>
    );
}
