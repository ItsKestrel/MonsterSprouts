import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { api, games } from '../..';
import { Card, Game } from '../../../../shared/src';
import { TestLoadout } from '../../../../shared/src/TestLoadout';

export interface StartGameRequest {
    playerId: string;
    cardIds: string[];
}

export interface StartGameResponse {
    gameId: string;
}

const schema = Joi.object<StartGameRequest>().keys({
    playerId: Joi.string(),
    cardIds: Joi.array().items(Joi.string()),
});

api.post('/start-game', (req, res) => {
    const { body } = req;
    const { value: data, error } = schema.validate(body);

    if (error) {
        return res.status(400).send(error.message);
    } else if (!data) {
        return res.status(400).send('Missing request');
    }

    const cards: Card[] = [];

    for (const cardId of data.cardIds) {
        const card = TestLoadout.find((card) => card.cardId === cardId);

        if (!card) return res.status(400).send('Unknown card ' + cardId);

        cards.push(card);
    }

    const gameId = uuidv4();

    const game = new Game(data.playerId, cards, Math.random());

    games[gameId] = game;

    const output: StartGameResponse = {
        gameId,
    };

    res.status(200).send(output);
});
