import { Grid } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { Card, CardType } from "../../../shared/src/types/Card";

interface ICardProps {
    card: Card,
    selectable: boolean,
    onClick: React.MouseEventHandler
}

export default function Card(props: ICardProps) {
    const { card, selectable, onClick } = props;

    const [isSelected, setSelected] = useState(false);

    const SCard = styled.div`
        width: 200px;
        height: 300px;
        padding: 20px;
        display: flex;
        box-shadow: ${isSelected ? '0px 0px 30px 0px rgba(45,255,196,0.4)' : ''};
        justify-content: center;
        border-radius: 10px;
        background: grey;
    `;

    const handleClick = () => {
        if (selectable) {
            setSelected(!isSelected);
            onClick();
        }
    }

    const cardContents = () => {
        switch (card.type) {
            // Weapon
            case CardType.Weapon: {
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

            // Action
            case CardType.Action: {
                return (
                    <Grid item container direction='row'>
                        <Grid item container direction='column'>
                            Action
                        </Grid>
                        <Grid>
                            {card.name}
                        </Grid>
                        <Grid item container direction='column'>
                            Tags
                        </Grid>
                        <Grid>
                            {card.tags}
                        </Grid>
                    </Grid>
                );
            }
            // Monster
            case CardType.Monster: {
                return (
                    <>MONSTER</>
                );
            }
            // Tool
            case CardType.Tool: {
                return (
                    <>Tool</>
                );
            }
            // Trap
            case CardType.Trap: {
                return (
                    <>Trap</>
                );
            }
            // Equipment
            case CardType.Equipment: {
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
        <SCard onClick={handleClick}>
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
