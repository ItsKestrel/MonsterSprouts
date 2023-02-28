import express from 'express';

export type { StartGame } from './routes/api/start-game';

export const app = express();
app.use(express.json());

export const api = express.Router();
require('./routes/api/start-game');

app.use('/api/v1', api);

const port = process.env.SERVER_PORT!;
app.listen(port, () => console.log(`Server started on port ${port}.`));
