import { useState } from 'react';
import { useGlobalState } from '../App';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Grid,
    Container,
} from '@mui/material';
import {
    Card as GameCard,
    CardType,
    ActionCard,
    WeaponCard,
    MonsterCard,
    ToolCard,
    EquipmentCard,
    MonsterAction,
} from '../../../shared/src/types/Card';
import { MonsterDeck, TrapDeck } from '../../../shared/src/ChallengeDeck';
import { TestLoadout } from '../../../shared/src/TestLoadout';
import { TestLoot } from '../../../shared/src/TestLoot';

type LootCard = ActionCard | WeaponCard | ToolCard | EquipmentCard;

type Room = {
    monster: MonsterCard;
    loot: WeaponCard | EquipmentCard | ToolCard;
};

type Stage = {
    index: number;
    room: Room;
};

const MONSTER_TYPES = MonsterDeck;
const LOOT_CARDS = TestLoot;

const generateRoom = (): Room => {
    const monster =
        MONSTER_TYPES[Math.floor(Math.random() * MONSTER_TYPES.length)];
    const loot = LOOT_CARDS[Math.floor(Math.random() * LOOT_CARDS.length)];
    return { monster, loot };
};

const generateStages = (numStages: number): Stage[] => {
    const stages: Stage[] = [];
    for (let i = 1; i <= numStages; i++) {
        stages.push({ index: i, room: generateRoom() });
    }
    return stages;
};

const App = () => {
    const [cards, setCards] = useGlobalState('deck');
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [isDead, setIsDead] = useState(false);
    const [playerHealth, setPlayerHealth] = useState(40);
    const stages = generateStages(5);

    const handleStartGame = () => {};

    const handleEndGame = () => {
        setCards([]);
        setCurrentStageIndex(0);
        setIsDead(true);
    };

    const handleNextStage = () => {
        if (currentStageIndex < stages.length - 1) {
            alert('Room Cleared!  Continue to next room!');
            setCurrentStageIndex(currentStageIndex + 1);
        } else {
            handleEndGame();
            alert('Dungon Cleared!');
        }
    };

    const handleCardAction = (card: GameCard, monster: MonsterCard) => {
        switch (card.type) {
            case CardType.Weapon:
                monster.health -= card.damage;
                break;
            case CardType.Action:
                const actionCard = card as ActionCard;
                // In a real game, you'd need to add logic to handle the action tags.
                break;
            case CardType.Tool:
                const toolCard = card as ToolCard;
                // In a real game, you'd need to add logic to handle the tool tags and durability.
                break;
            case CardType.Equipment:
                const equipmentCard = card as EquipmentCard;
                // In a real game, you'd need to add logic to handle the equipment health, absorbtion, and durability.
                break;
            default:
                break;
        }
    };

    const handleFightMonster = (card: GameCard) => {
        const { monster, loot } = stages[currentStageIndex].room;
        handleCardAction(card, monster);
        if (monster.health <= 0) {
            setCards([...cards, loot]);
            handleNextStage();
        } else {
            setPlayerHealth(
                playerHealth -
                    monster.actions[
                        Math.floor(Math.random() * monster.actions.length)
                    ].damage
            );
            if (playerHealth <= 0) {
                handleEndGame();
            }
        }
    };

    if (isDead) {
        return (
            <Container maxWidth="sm">
                <Typography variant="h4" align="center">
                    Game Over
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center">
                Dungeon Explorer
            </Typography>
            <Typography variant="h5" align="center">
                Stage {stages[currentStageIndex].index}
            </Typography>
            <Typography variant="h5" align="center">
                Player Health {playerHealth}
            </Typography>
            <Typography variant="h6" align="center">
                Monster: {stages[currentStageIndex].room.monster.name} (
                {stages[currentStageIndex].room.monster.health}
                hp)
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {cards.map((card) => (
                    <Grid item key={card.name}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">
                                    {card.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    {card.type}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    onClick={() => handleFightMonster(card)}
                                    disabled={
                                        card.type !== CardType.Weapon ||
                                        stages[currentStageIndex].room.monster
                                            .health <= 0
                                    }
                                >
                                    Fight
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default App;
