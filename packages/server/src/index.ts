import cors from 'cors';
import express from 'express';
import { GameCache } from '../../shared/src';

export type { GameInfoRequest, GameInfoResponse } from './routes/api/game-info';
export type {
    StartGameRequest,
    StartGameResponse,
} from './routes/api/start-game';

export const gameCaches: Record<number, GameCache> = {};

export const app = express();
app.use(cors());
app.use(express.json());

export const api = express.Router();
require('./routes/api/start-game');

app.use('/api/v1', api);

const port = process.env.SERVER_PORT!;

app.listen(port, () => console.log(`Server started on port ${port}.`));
