import { Grid } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import {
    Card as GameCard,
    CardType,
    Tag,
} from '../../../shared/src/types/Card';

interface ICardProps {
    card: GameCard;
    selectable: boolean;
    onClick: React.MouseEventHandler;
}

export default function Card(props: ICardProps) {
    const { card, selectable, onClick } = props;

    const [isSelected, setSelected] = useState(false);

    const SCard = styled.div`
        width: 200px;
        height: 300px;
        padding: 20px;
        display: flex;
        box-shadow: ${isSelected
            ? '0px 0px 30px 0px rgba(45,255,196,0.4)'
            : ''};
        justify-content: center;
        border-radius: 10px;
        background: grey;
    `;

    const handleClick = () => {
        if (selectable) {
            setSelected(!isSelected);
            onClick();
        }
    };

    const cardContents = () => {
        switch (card.type) {
            // Weapon
            case CardType.Weapon: {
                return (
                    <Grid item container direction="row">
                        <Grid item container direction="column">
                            <Grid item xs={6}>
                                Damage
                            </Grid>
                            <Grid item>{card.damage}</Grid>
                        </Grid>
                        <Grid item container direction="column">
                            <Grid item xs={6}>
                                Durability
                            </Grid>
                            <Grid item>{card.durability}</Grid>
                        </Grid>
                    </Grid>
                );
            }

            // Action
            case CardType.Action: {
                return (
                    <Grid item container direction="row">
                        <Grid item container direction="column">
                            Action
                        </Grid>
                        <Grid>{card.name}</Grid>
                        <Grid item container direction="column">
                            Tags
                        </Grid>
                        <Grid>{card.tags}</Grid>
                    </Grid>
                );
            }
            // Monster
            case CardType.Monster: {
                return (
                    <Grid item container direction="row">
                        <Grid item container direction="column">
                            <Grid item xs={6}>
                                Actions
                            </Grid>
                            {card.actions.map((action) => {
                                return <Grid item>{action.name}</Grid>;
                            })}
                        </Grid>
                        <Grid item container direction="column">
                            <Grid item xs={6}>
                                Rarity
                            </Grid>
                            <Grid item>{card.rarity}</Grid>
                        </Grid>
                    </Grid>
                );
            }
            // Tool
            case CardType.Tool: {
                return (
                    <Grid item container direction="row">
                        <Grid item container direction="column">
                            <Grid item xs={6}>
                                Attributes
                            </Grid>
                            {card.tags.map((tag) => {
                                return <Grid item>{Tag[tag]}</Grid>;
                            })}
                        </Grid>
                        <Grid item container direction="column">
                            <Grid item xs={6}>
                                Durability
                            </Grid>
                            <Grid item>{card.durability}</Grid>
                        </Grid>
                    </Grid>
                );
            }
            // Trap
            case CardType.Trap: {
                return (
                    <Grid item container direction="row">
                        <Grid item container direction="column">
                            <Grid item xs={6}>
                                Rarity
                            </Grid>
                            <Grid item>{card.rarity}</Grid>
                        </Grid>
                    </Grid>
                );
            }
            // Equipment
            case CardType.Equipment: {
                return (
                    <Grid item container direction="column">
                        <Grid item container direction="row">
                            <Grid item container direction="column">
                                <Grid item xs={6}>
                                    Health Boost
                                </Grid>
                                <Grid item>+ {card.health}</Grid>
                            </Grid>
                            <Grid item container direction="column">
                                <Grid item xs={6}>
                                    Attributes
                                </Grid>
                                {card.tags.map((tag) => {
                                    return <Grid item>{Tag[tag]}</Grid>;
                                })}
                            </Grid>
                        </Grid>
                        <Grid item container direction="row">
                            <Grid item container direction="column">
                                <Grid item xs={6}>
                                    Absorbtion
                                </Grid>
                                <Grid item>+ {card.absorbtion}</Grid>
                            </Grid>
                            <Grid item container direction="column">
                                <Grid item xs={6}>
                                    Durability
                                </Grid>
                                <Grid item>{card.durability}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            }
            default: {
                return <>NO TYPE</>;
            }
        }
    };

    return (
        <SCard onClick={handleClick}>
            <Grid
                container
                direction="column"
                alignContent="center"
                alignItems="center"
            >
                <Grid item>
                    <h2>{card.name}</h2>
                </Grid>
                <Grid item>
                    <p>{CardType[card.type]}</p>
                </Grid>
                <Grid item>{cardContents()}</Grid>
            </Grid>
        </SCard>
    );
}
