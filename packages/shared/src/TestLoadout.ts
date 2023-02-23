import { Card as TCard, Tag, WeaponCard, EquipmentCard, ToolCard, ActionCard, CardType, Rarity } from "./types/Card";

const SwordCard: WeaponCard = {
    type: CardType.Weapon,
    name: 'Sword',
    image: '',
    rarity: Rarity.Common,
    damage: 10,
    criticalDamage: 10,
    criticalChance: 10,
    durability: 4
};

const ArmorCard: EquipmentCard = {
    type: CardType.Equipment,
    name: 'Leather Armor',
    health:5,
    absorbtion: 3,
    image: '',
    rarity: Rarity.Common,
    durability: 4,
    tags: []
};

const Rope: ToolCard = {
    type: CardType.Tool,
    name: 'Rope',
    image: '',
    tags: [Tag.Scalable, Tag.Traversable],
    rarity: Rarity.Common,
    durability: 4
};

const Action1Card: ActionCard = {
    type: CardType.Action,
    name: 'Fireball',
    image: '',
    rarity: Rarity.Common,
    tags: []
};

const Action2Card: ActionCard = {
    type: CardType.Action,
    name: 'Punch',
    image: '',
    rarity: Rarity.Common,
    tags: []
};

export const TestLoadout = [
    SwordCard,
    ArmorCard,
    Rope,
    Action1Card,
    Action2Card
];