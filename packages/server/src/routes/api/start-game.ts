import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { api, games } from '../..';
import { Game } from '../../../../shared/src';
import { TestLoadout } from '../../../../shared/src/TestLoadout';

export interface StartGameRequest {
    playerId: string;
    cardIds: string[];
}

export interface StartGameResponse {
    gameId: string;
}

const schema = Joi.object<StartGameRequest>().keys({
    cardIds: Joi.array().items(Joi.string()),
});

api.get('/start-game', (req, res) => {
    const { body } = req;
    const { value: data, error } = schema.validate(body);

    if (error) {
        return res.status(400).send(error.message);
    } else if (!data) {
        return res.status(400).send('Missing request');
    }

    for (const cardId of data.cardIds) {
        if (TestLoadout.findIndex((card) => card.cardId === cardId) === -1) {
            return res.status(400).send('Unknown card ' + cardId);
        }
    }

    const gameId = uuidv4();

    const game = new Game(data.playerId);

    games[gameId] = game;

    const output: StartGameResponse = {
        gameId,
    };

    res.status(200).send(output);
});
