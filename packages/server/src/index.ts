import express from 'express';

export const app = express();

app.use(express.json());

app.use('/api/v1');

const port = process.env.SERVER_PORT!;

app.listen(port, () => console.log(`Server started on port ${port}.`));
