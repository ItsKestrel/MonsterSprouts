import { Grid } from "@mui/material";
import styled from "styled-components";
import { Card, CardType } from "../../../shared/src/types/Card";

const SCard = styled.div`
  width: 200px;
  height: 300px;
  padding: 20px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background: grey;
`;

interface ICardProps {
    card: Card
}

export default function Card(props: ICardProps) {
    const card = props.card;

    const cardContents = () => {
        switch (card.type) {
            // Weapon
            case 0: {
                return (
                    <Grid item container direction='row'>
                        <Grid item container direction='column'>
                            <Grid item xs={6}>
                                Damage
                            </Grid>
                            <Grid item>
                                {card.damage}
                            </Grid>
                        </Grid>
                        <Grid item container direction='column'>
                            <Grid item xs={6}>
                                Durability
                            </Grid>
                            <Grid item>
                                {card.durability}
                            </Grid>
                        </Grid>
                    </Grid>
                );
            }
            // Monster
            case 1: {
                return (
                    <>MONSTER</>
                );
            }
            // Tool
            case 2: {
                return (
                    <>Tool</>
                );
            }
            // Trap
            case 3: {
                return (
                    <>Trap</>
                );
            }
            // Equipment
            case 4: {
                return (
                    <>Equipment</>
                );
            }
            default: {
                return (
                    <>NO TYPE</>
                );
            }
        }
    }

    return (
        <SCard>
            <Grid container direction='column' alignContent='center' alignItems='center'>
                <Grid item>
                    <h2>{card.name}</h2>
                </Grid>
                <Grid item>
                    <p>{CardType[card.type]}</p>
                </Grid>
                <Grid item>
                    {cardContents()}
                </Grid>
            </Grid>
        </SCard>
    );
}
