import { Button, Grid } from '@mui/material';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TestLoadout } from '../../../shared/src/TestLoadout';
import { Card as GameCard } from '../../../shared/src/types/Card';
import Card from '../components/Card';
import { useGameContext } from '../contexts/useGameContext';

import { SPage } from '../styles/styles';

const Server_URL = 'localhost:3000';

export default function Home() {
    const navigate = useNavigate();
    //const [cardSelection, setCardSelection] = useGlobalState('deck');
    const [cardSelection, setCardSelection] = useState<GameCard[]>([]);
    const Stash = TestLoadout;
    const { deck, setDeck } = useGameContext();

    const handleStart = () => {
        console.log(cardSelection);
        navigate(`/game`);
        // axios.get(Server_URL + '/game', {
        //     params: {
        //       deck: []
        //     }
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //     navigate(`/game`);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })
        //   .finally(function () {
        //     // always executed
        //   });
    };

    const handleClick = (card: GameCard) => {
        console.log(card);
        let newSelection = [...cardSelection];

        if (cardSelection.includes(card)) {
            //console.log("card already selected");
            newSelection.splice(cardSelection.indexOf(card), 1);
            setCardSelection(newSelection);
        } else {
            newSelection.push(card);
            setCardSelection(newSelection);
        }

        setDeck(newSelection);

        console.log(cardSelection);
        console.log('DECK - ', deck);
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
