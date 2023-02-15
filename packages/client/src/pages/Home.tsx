import Card from "../components/Card";
import { Card as TCard, WeaponCard, CardType, Rarity } from "../../../shared/src/types/Card";
import { Grid } from "@mui/material";

const TempCard: WeaponCard = {
    type: CardType.Weapon,
    name: 'Sword',
    image: '',
    rarity: Rarity.Common,
    damage: 10,
    criticalDamage: 10,
    criticalChance: 10,
    durability: 4
};

const TempDeck = [
    TempCard,
    TempCard,
    TempCard,
    TempCard
];

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <Grid container spacing={2}>
                {TempDeck.map((card) => {
                    return (
                        <Grid item>
                            <Card card={card} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
