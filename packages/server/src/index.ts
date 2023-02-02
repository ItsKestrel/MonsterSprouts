import express from 'express';
import { Test } from '../../shared/src';

const app = express();

app.use(express.json());

app.get('/api/v1/test', (_req, res) => {
    let response: Test = {
        something: 'hello',
    };

    res.send(response);
});

const port = process.env.PORT!;

app.listen(port, () => console.log(`Server started on port ${port}.`));
