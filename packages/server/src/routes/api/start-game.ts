import Joi from 'joi';
import { api } from '../..';

export interface StartGame {
    cardIds: string[];
}

const schema = Joi.object<StartGame>().keys({
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
        // validate cards
    }

    res.send({});
});
