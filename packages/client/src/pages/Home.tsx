import Card from "../components/Card";
import { Grid,Button } from "@mui/material";
import { Link } from "react-router-dom"
import {TestDeck} from "../../../shared/src/TestLoadout"

export default function Home() {
    return (
        <div>
            <h1>Select Your Cards</h1>
            <Grid container spacing={2}>
                {TestDeck.map((card) => {
                    return (
                        <Grid item>
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
                <Button 
                    variant="contained" 
                    color="success"
                    >
                    Start Game
                </Button>
            </Link>
        </div>
    );
}
