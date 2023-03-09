import Joi from 'joi';
import { api, games } from '../..';

export interface GameInfoRequest {
    gameId: string;
}

export interface GameInfoResponse {}

const schema = Joi.object<GameInfoRequest>().keys({
    gameId: Joi.string(),
});

api.get('/game-info', (req, res) => {
    const { body } = req;
    const { value: data, error } = schema.validate(body);

    if (error) {
        return res.status(400).send(error.message);
    } else if (!data) {
        return res.status(400).send('Missing request');
    }

    const game = games[data.gameId];

    const output: GameInfoResponse = {};

    res.status(200).send(output);
});
