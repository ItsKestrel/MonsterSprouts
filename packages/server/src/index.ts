import express from 'express';
import { Test, NewGame } from '../../shared/src';
import {v4 as uuidv4} from 'uuid';

const app = express();

app.use(express.json());

app.get('/api/v1/test', (_req, res) => {
    let response: Test = {
        something: 'hello',
    };

    res.send(response);
});

app.get('/api/v1/new-game', (_req, res) => {
    let response: NewGame = {
        gameid: uuidv4()
    }
});
//test
const port = process.env.SERVER_PORT!;

app.listen(port, () => console.log(`Server started on port ${port}.`));
