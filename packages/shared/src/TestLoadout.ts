import {
    ActionCard,
    CardType,
    EquipmentCard,
    Rarity,
    Tag,
    ToolCard,
    WeaponCard,
} from './types/Card';

const SwordCard: WeaponCard = {
    cardId: '34lkjqnaledfkjgvno',
    type: CardType.Weapon,
    name: 'Sword',
    image: '',
    rarity: Rarity.Common,
    damage: 10,
    criticalDamage: 10,
    criticalChance: 10,
    durability: 4,
    actions: [
        {
            name: 'Slash',
            damage: 7,
        },
        {
            name: 'Stab',
            damage: 10,
        },
    ],
};

const ArmorCard: EquipmentCard = {
    cardId: '098a345hqawlnjkrg',
    type: CardType.Equipment,
    name: 'Leather Armor',
    health: 5,
    absorbtion: 3,
    image: '',
    rarity: Rarity.Common,
    durability: 4,
    tags: [],
    actions: [],
};

const Rope: ToolCard = {
    cardId: '3qualmsdfngvgaop983w4',
    type: CardType.Tool,
    name: 'Rope',
    image: '',
    tags: [Tag.Scalable, Tag.Traversable],
    rarity: Rarity.Common,
    durability: 4,
    actions: [
        {
            name: 'Lasso',
            block: 4,
        },
    ],
};

const Action1Card: ActionCard = {
    cardId: '045qwbkjtfgoi4u356',
    type: CardType.Action,
    name: 'Fireball',
    image: '',
    rarity: Rarity.Common,
    tags: [],
};

const Action2Card: ActionCard = {
    cardId: 'lk34n5lqwae8fy4o325h',
    type: CardType.Action,
    name: 'Punch',
    image: '',
    rarity: Rarity.Common,
    tags: [],
};

export const TestLoadout = [
    SwordCard,
    ArmorCard,
    Rope,
    Action1Card,
    Action2Card,
];
