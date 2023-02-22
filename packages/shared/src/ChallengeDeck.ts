import { CardType, MonsterCard, Rarity, Tag, TrapCard } from "./types/Card";

export const Goblin: MonsterCard = {
    type: CardType.Monster,
    name: 'Goblin',
    image: '',
    rarity: Rarity.Common,
    health: 10,
    actions: [
        {
            name: 'Slash',
            damage: 2,
            block: 0
        }
    ]
}

export const Orc: MonsterCard = {
    type: CardType.Monster,
    name: 'Orc',
    image: '',
    rarity: Rarity.Uncommon,
    health: 15,
    actions: [
        {
            name: 'Slash',
            damage: 2,
            block: 0
        },
        {
            name: 'Stab',
            damage: 8,
            block: 0
        },
        {
            name: 'Dodge',
            damage: 0,
            block: 4
        }
    ]
}

export const Troll: MonsterCard = {
    type: CardType.Monster,
    name: 'Troll',
    image: '',
    rarity: Rarity.Rare,
    health: 30,
    actions: [
        {
            name: 'Slash',
            damage: 6,
            block: 0
        },
        {
            name: 'Pound',
            damage: 10,
            block: 0
        },
        {
            name: 'Guard',
            damage: 6,
            block: 4
        }
    ]
}



export const Wolf: MonsterCard = {
    name: "Wolf",
    image: "",
    type: CardType.Monster,
    rarity: Rarity.Rare,
    health: 40,
    actions: [
      { name: "Bite", damage: 10, block: 10 },
      { name: "Rip", damage: 25, block: 0 },
    ]
}

export const Bull: MonsterCard = {
    name: "bull",
    image: "",
    type: CardType.Monster,
    rarity: Rarity.Uncommon,
    health: 30,
    actions: [
      { name: "Smash", damage: 15, block: 5 },
      { name: "Charge", damage: 20, block: 0 },
    ]
}

export const SpikeTrap: TrapCard = {
    type: CardType.Trap,
    name: 'Spike Pit',
    image: '',
    rarity: Rarity.Common,
    effectiveTags: [Tag.Scalable],
    ineffectiveTags: [Tag.Jump]
}

export const DartTrap: TrapCard = {
    type: CardType.Trap,
    name: 'Hidden Darts',
    image: '',
    rarity: Rarity.Uncommon,
    effectiveTags: [Tag.Shielding],
    ineffectiveTags: [Tag.Traversable]
}

export const WallTrap: TrapCard = {
    type: CardType.Trap,
    name: 'Crushing Walls',
    image: '',
    rarity: Rarity.Rare,
    effectiveTags: [Tag.Speed],
    ineffectiveTags: [Tag.Traversable]
}

export const MonsterDeck = [
    Goblin,
    Orc,
    Troll,
    Wolf,
    Bull
];

export const TrapDeck = [
    SpikeTrap,
    DartTrap,
    WallTrap
];

