import Joi from 'joi';
import { api } from '../..';
import { db } from '../../database';

export interface GameStatusRequest {
    playerId: string;
}

export interface GameStatusResponse {
    currentGame: number | null;
}

const schema = Joi.object<GameStatusRequest>().keys({
    playerId: Joi.string(),
});

api.get('/game-status', (req, res) => {
    const { body } = req;
    const { value: data, error } = schema.validate(body);

    if (error) {
        return res.status(400).send(error.message);
    } else if (!data) {
        return res.status(400).send('Missing request');
    }

    const gameId: number | null =
        db
            .prepare('SELECT `id` from `games` WHERE `did` = ?')
            .get(data.playerId)?.id ?? null;

    const output: GameStatusResponse = {
        currentGame: gameId,
    };

    res.status(200).send(output);
});
