import Joi from 'joi';
import { api } from '../..';

export interface GameInfoRequest {
    gameId: number;
}

export interface GameInfoResponse {}

const schema = Joi.object<GameInfoRequest>().keys({
    gameId: Joi.number(),
});

api.get('/game-info', (req, res) => {
    const { body } = req;
    const { value: data, error } = schema.validate(body);

    if (error) {
        return res.status(400).send(error.message);
    } else if (!data) {
        return res.status(400).send('Missing request');
    }

    const output: GameInfoResponse = {};

    res.status(200).send(output);
});
