import cors from 'cors';
import express from 'express';
import { Card, GameCache, TestLoadout } from '../../shared/src';
import { CardRow, db, GameRow } from './database';

export type { GameInfoRequest, GameInfoResponse } from './routes/api/game-info';
export type {
    StartGameRequest,
    StartGameResponse,
} from './routes/api/start-game';

export const gameCaches: Record<number, GameCache> = {};

const gameRows: GameRow[] = db.prepare('SELECT * FROM `games`').all();

for (const gameRow of gameRows) {
    const cards: Card[] = [];

    const cardRows: CardRow[] = db
        .prepare('SELECT * FROM `cards` WHERE `game_id` = ?')
        .all(gameRow.id);

    for (const cardRow of cardRows) {
        const card = TestLoadout.find((card) => card.cardId === cardRow.id)!;

        cards.push(card);
    }

    gameCaches[gameRow.id] = new GameCache(cards);
}

export const app = express();
app.use(cors());
app.use(express.json());

export const api = express.Router();
require('./routes/api/start-game');

app.use('/api/v1', api);

const port = process.env.SERVER_PORT!;

app.listen(port, () => console.log(`Server started on port ${port}.`));
