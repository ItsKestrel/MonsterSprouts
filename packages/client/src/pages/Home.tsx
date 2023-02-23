import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { TestLoadout } from '../../../shared/src/TestLoadout';
import Card from '../components/Card';

export default function Home() {
    return (
        <div>
            <h1>Select Your Cards</h1>
            <Grid container spacing={2}>
                {TestLoadout.map((card, i) => {
                    return (
                        <Grid item key={i}>
                            <Card card={card} />
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    alert('clicked Lock');
                                }}
                            >
                                Lock In
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
            <Link to={'Game'}>
                <Button variant="contained" color="success">
                    Start Game
                </Button>
            </Link>
        </div>
    );
}
