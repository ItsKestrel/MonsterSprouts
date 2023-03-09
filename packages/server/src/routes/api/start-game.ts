import Joi from 'joi';
import { api, gameCaches } from '../..';
import { Card, GameCache, TestLoadout } from '../../../../shared/src';
import { db } from '../../database';

export interface StartGameRequest {
    playerId: string;
    cardIds: string[];
}

export interface StartGameResponse {
    gameId: number;
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

    const gameCache = new GameCache(cards);

    const gameId = Number(
        db
            .prepare(
                'INSERT INTO `games` (`did`, `roomSeed`) VALUES (@did, @roomSeed)'
            )
            .run({
                did: data.playerId,
                roomSeed: Math.random(),
            }).lastInsertRowid
    );

    const insertCard = db.prepare(
        'INSERT INTO `cards` (`id`, `gameId`) VALUES (@id, @gameId)'
    );

    const insertManyCards = db.transaction(
        (gameId: number, cards: string[]) => {
            for (const card of cards)
                insertCard.run({
                    id: card,
                    gameId,
                });
        }
    );

    insertManyCards(gameId, data.cardIds);

    gameCaches[gameId] = gameCache;

    const output: StartGameResponse = {
        gameId,
    };

    res.status(200).send(output);
});
