import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.SERVER_PORT!;

app.listen(port, () => console.log(`Server started on port ${port}.`));
