import { Button, Grid } from '@mui/material';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { TestLoadout } from '../../../shared/src/TestLoadout';
import { Card as GameCard } from '../../../shared/src/types/Card';

import { useGlobalState } from '../App';
import Card from '../components/Card';

import { SPage } from '../styles/styles';

const Server_URL = 'localhost:3000';

export default function Home() {
    const navigate = useNavigate();
    const [cardSelection, setCardSelection] = useGlobalState('deck');

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

        console.log(cardSelection);
    };

    return (
        <SPage>
            <h1>Select Your Cards</h1>
            <Grid container spacing={2}>
                {TestLoadout.map((card) => {
                    return (
                        <Grid item>
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
