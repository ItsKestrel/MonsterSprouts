import { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Grid,
    Container,
  } from "@mui/material";

type CardAction = "attack" | "heal" | "defend";

type Card = {
  name: string;
  action: CardAction;
  value: number;
};

type Monster = {
  name: string;
  strength: number;
};

type LootCard = {
  name: string;
  action: CardAction;
  value: number;
};

type Room = {
  monster: Monster;
  loot: LootCard;
};

type Stage = {
  index: number;
  room: Room;
};

const CARD_DECK: Card[] = [
  { name: "Sword Slash", action: "attack", value: 10 },
  { name: "Fireball", action: "attack", value: 20 },
  { name: "Healing Potion", action: "heal", value: 10 },
  { name: "Shield Block", action: "defend", value: 5 },
  { name: "Backstab", action: "attack", value: 15 },
];

const MONSTER_TYPES: Monster[] = [
  { name: "Goblin", strength: 20 },
  { name: "Orc", strength: 30 },
  { name: "Troll", strength: 40 },
];

const LOOT_CARDS: LootCard[] = [
  { name: "Magic Wand", action: "attack", value: 30 },
  { name: "Amulet of Healing", action: "heal", value: 20 },
  { name: "Dragon Shield", action: "defend", value: 10 },
];

const generateRoom = (): Room => {
  const monster = MONSTER_TYPES[Math.floor(Math.random() * MONSTER_TYPES.length)];
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

export default function Game() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isDead, setIsDead] = useState(false);
  const stages = generateStages(5);

  const handleStartGame = () => {
    setCards(CARD_DECK.slice(0, 5));
    setCurrentStageIndex(0);
    setIsDead(false);
  };

  const handleEndGame = () => {
    setCards([]);
    setCurrentStageIndex(0);
    setIsDead(true);
  };

  const handleNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    } else {
      handleEndGame();
    }
  };

  const handleCardAction = (card: Card, monster: Monster) => {
    switch (card.action) {
      case "attack":
        monster.strength -= card.value;
        break;
      case "heal":
        // In a real game, you'd need to add logic to prevent overhealing
        // and to handle the case where the player is already at full health.
        setCards((prevState) =>
          prevState.map((c) => (c === card ? { ...c, value: c.value - 1 } : c))
        );
        break;
      case "defend":
        // In a real game, you'd need to add logic to make the player take less damage.
        break;
      default:
        break;
    }
  };
  
  const handleFightMonster = (card: Card) => {
    const { monster, loot } = stages[currentStageIndex].room;
    handleCardAction(card, monster);
    if (monster.strength <= 0) {
      setCards([...cards, loot]);
      handleNextStage();
    } else {
      // In a real game, you'd need to add logic to make the monster attack the player.
      if (cards.length === 1) {
        handleEndGame();
      } else {
        setCards(cards.filter((c) => c !== card));
      }
    }
  };
  
  if (isDead) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" align="center">
          Game Over
        </Typography>
        <Button variant="contained" onClick={handleStartGame}>
          Play Again
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">
        Dungeon Explorer
      </Typography>
      {cards.length === 0 ? (
        <Button variant="contained" onClick={handleStartGame}>
          Start Game
        </Button>
      ) : (
        <>
          <Typography variant="h5" align="center">
            Stage {stages[currentStageIndex].index}
          </Typography>
          <Typography variant="h6" align="center">
            Monster: {stages[currentStageIndex].room.monster.name} ({stages[currentStageIndex].room.monster.strength}
            hp)
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {cards.map((card) => (
              <Grid item key={card.name}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{card.name}</Typography>
                    <Typography color="textSecondary">
                      Action: {card.action}, Value: {card.value}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      onClick={() => handleFightMonster(card)}
                      disabled={card.action !== "attack" || stages[currentStageIndex].room.monster.strength <= 0}
                    >
                      Fight
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}