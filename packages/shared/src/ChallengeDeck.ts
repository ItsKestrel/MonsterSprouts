import { CardType, MonsterCard, Rarity, Tag, TrapCard } from './types/Card';

export const Goblin: MonsterCard = {
    cardId: 'mdnbfalikjh3g458723rbkjsbdf93',
    type: CardType.Monster,
    name: 'Goblin',
    image: '',
    rarity: Rarity.Common,
    health: 10,
    actions: [
        {
            name: 'Slash',
            damage: 2,
            block: 0,
        },
    ],
};

export const Orc: MonsterCard = {
    cardId: '3kjbrf9asdvh9a8w3h598hfijhsbg34',
    type: CardType.Monster,
    name: 'Orc',
    image: '',
    rarity: Rarity.Uncommon,
    health: 15,
    actions: [
        {
            name: 'Slash',
            damage: 2,
            block: 0,
        },
        {
            name: 'Stab',
            damage: 8,
            block: 0,
        },
        {
            name: 'Dodge',
            damage: 0,
            block: 4,
        },
    ],
};

export const Troll: MonsterCard = {
    cardId: '0s8ayhroiw34hnbk5qjbafiuaghw9485howhnfls',
    type: CardType.Monster,
    name: 'Troll',
    image: '',
    rarity: Rarity.Rare,
    health: 30,
    actions: [
        {
            name: 'Slash',
            damage: 6,
            block: 0,
        },
        {
            name: 'Pound',
            damage: 10,
            block: 0,
        },
        {
            name: 'Guard',
            damage: 6,
            block: 4,
        },
    ],
};

export const Wolf: MonsterCard = {
    cardId: 'zsdbfclkjvq3b4985hkwjnbfc3',
    name: 'Wolf',
    image: '',
    type: CardType.Monster,
    rarity: Rarity.Rare,
    health: 40,
    actions: [
        { name: 'Bite', damage: 10, block: 10 },
        { name: 'Rip', damage: 25, block: 0 },
    ],
};

export const Bull: MonsterCard = {
    cardId: '7v9ahw4kj5bqwjhabcowy3g5ihwnlkjdsvha983h4',
    name: 'bull',
    image: '',
    type: CardType.Monster,
    rarity: Rarity.Uncommon,
    health: 30,
    actions: [
        { name: 'Smash', damage: 15, block: 5 },
        { name: 'Charge', damage: 20, block: 0 },
    ],
};

export const SpikeTrap: TrapCard = {
    cardId: 'xmnfvh9w834y5owjnfkuh2983yoi4hlfhcj0w3',
    type: CardType.Trap,
    name: 'Spike Pit',
    image: '',
    rarity: Rarity.Common,
    effectiveTags: [Tag.Scalable],
    ineffectiveTags: [Tag.Jump],
};

export const DartTrap: TrapCard = {
    cardId: 'x4ghrlq2jkg498wyat908u4o5jo9uf0wu3oi5nlfj9834',
    type: CardType.Trap,
    name: 'Hidden Darts',
    image: '',
    rarity: Rarity.Uncommon,
    effectiveTags: [Tag.Shielding],
    ineffectiveTags: [Tag.Traversable],
};

export const WallTrap: TrapCard = {
    cardId: 'sdjfhviaw3y45908qaw7e0f87aw9u5hksjbhvksuiz7364oawhiuac98734',
    type: CardType.Trap,
    name: 'Crushing Walls',
    image: '',
    rarity: Rarity.Rare,
    effectiveTags: [Tag.Speed],
    ineffectiveTags: [Tag.Traversable],
};

export const MonsterDeck = [Goblin, Orc, Troll, Wolf, Bull];

export const TrapDeck = [SpikeTrap, DartTrap, WallTrap];
