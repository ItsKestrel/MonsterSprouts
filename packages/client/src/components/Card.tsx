import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import {
    Card as GameCard,
    CardType,
    Tag,
} from '../../../shared/src/types/Card';
import { SCard, SCard_Selected } from '../styles/styles';

interface ICardProps {
    card: GameCard;
    selectable: boolean;
    useable: boolean;
    onClick?: React.MouseEventHandler;
    onUse?: (params: any) => any;
}

export default function Card(props: ICardProps) {
    const { card, selectable, useable, onClick, onUse } = props;

    const [isSelected, setSelected] = useState(false);

    const handleClick = () => {
        if (selectable) {
            setSelected(!isSelected);
            onClick();
        }
    };

    const cardContents = () => {
        switch (card.type) {
            case CardType.Weapon: {
                return (
                    <Grid item container direction="column">
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
                        {useable ? (
                            card.actions.length > 0 ? (
                                <Grid item container direction="row">
                                    {card.actions.map((action) => {
                                        return (
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={onUse}
                                                >
                                                    {action.name}
                                                </Button>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            ) : (
                                <></>
                            )
                        ) : (
                            <></>
                        )}
                    </Grid>
                );
            }

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

            case CardType.Tool: {
                return (
                    <Grid item container direction="column">
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
                        {useable ? (
                            card.actions.length > 0 ? (
                                <Grid item container direction="row">
                                    {card.actions.map((action, index) => {
                                        return (
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={onUse}
                                                >
                                                    {action.name}
                                                </Button>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            ) : (
                                <></>
                            )
                        ) : (
                            <></>
                        )}
                    </Grid>
                );
            }

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
                        {useable ? (
                            card.actions.length > 0 ? (
                                <Grid item container direction="row">
                                    {card.actions.map((action) => {
                                        return (
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={onUse}
                                                >
                                                    {action.name}
                                                </Button>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            ) : (
                                <></>
                            )
                        ) : (
                            <></>
                        )}
                    </Grid>
                );
            }

            default: {
                return <>NO TYPE</>;
            }
        }
    };

    return (
        <>
            {isSelected ? (
                <SCard_Selected onClick={handleClick}>
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
                </SCard_Selected>
            ) : (
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
            )}
        </>
    );
}
