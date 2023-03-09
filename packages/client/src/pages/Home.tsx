import { Button, Grid } from '@mui/material';
import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TestLoadout } from '../../../shared/src/TestLoadout';
import { Card as GameCard } from '../../../shared/src/types/Card';
import Card from '../components/Card';
import { useGameContext } from '../contexts/useGameContext';

import { SPage } from '../styles/styles';

const SERVER_URL = 'http://localhost:3000';
const START_ROUTE = '/api/v1/start-game';

export default function Home() {
    const navigate = useNavigate();
    //const [cardSelection, setCardSelection] = useGlobalState('deck');
    const [cardSelection, setCardSelection] = useState<GameCard[]>([]);
    const [cardSelIDs, setCardSelIDs] = useState<string[]>([]);
    const Stash = TestLoadout;
    const { deck, setDeck } = useGameContext();

    const handleStart = () => {
        console.log(cardSelIDs);
        //navigate(`/game`);
        axios
            .post(SERVER_URL + START_ROUTE, {
                playerId: 'temp',
                cardIds: cardSelIDs,
            })
            .then(function (response) {
                console.log(response);
                //navigate(`/game`);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    };

    const handleClick = (card: GameCard) => {
        console.log(card);
        console.log(card.cardId);
        let newSelection = [...cardSelection];
        let newCardIDs = [...cardSelIDs];

        if (cardSelection.includes(card)) {
            //console.log("card already selected");
            newSelection.splice(cardSelection.indexOf(card), 1);
            setCardSelection(newSelection);
        } else {
            newSelection.push(card);
            setCardSelection(newSelection);
        }

        if (cardSelIDs.includes(card.cardId)) {
            //console.log("card already selected");
            newCardIDs.splice(cardSelIDs.indexOf(card.cardId), 1);
            setCardSelIDs(newCardIDs);
        } else {
            newCardIDs.push(card.cardId);
            setCardSelIDs(newCardIDs);
        }

        setDeck(newSelection);

        console.log(cardSelIDs);
        //console.log('DECK - ', deck);
    };

    return (
        <SPage>
            <h1>Select Your Cards</h1>
            <Grid container spacing={2}>
                {Stash.map((card) => {
                    return (
                        <Grid item key={card.cardId}>
                            <Card
                                card={card}
                                selectable={true}
                                onClick={() => handleClick(card)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Button variant="contained" color="success" onClick={handleStart}>
                Start Game
            </Button>
        </SPage>
    );
}
