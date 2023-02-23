import express from 'express';

export const app = express();

app.use(express.json());

/**
 * /start-game (card ids) => game id
 */

const port = process.env.SERVER_PORT!;

app.listen(port, () => console.log(`Server started on port ${port}.`));
