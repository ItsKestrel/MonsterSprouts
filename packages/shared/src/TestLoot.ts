import {
    Card as TCard,
    Tag,
    WeaponCard,
    EquipmentCard,
    ToolCard,
    ActionCard,
    CardType,
    Rarity,
} from './types/Card';

export const MagicWand: WeaponCard = {
    cardId: '147uo23knb5tlmwnfgo8sh043',
    name: 'Magic Wand',
    image: 'wand.png',
    type: CardType.Weapon,
    rarity: Rarity.Rare,
    damage: 30,
    criticalDamage: 60,
    criticalChance: 0.1,
    durability: 50,
};

export const AmuletOfHealing: ToolCard = {
    cardId: 'zje4o95u3o4ih5lngow',
    name: 'Amulet of Healing',
    image: 'amulet.png',
    type: CardType.Tool,
    rarity: Rarity.Uncommon,
    tags: [],
    durability: 3,
};

export const DragonShield: EquipmentCard = {
    cardId: 'nmn6tksdfvhj908235h2lkjebfs0',
    name: 'Dragon Shield',
    image: 'shield.png',
    type: CardType.Equipment,
    rarity: Rarity.Legendary,
    tags: [Tag.Shielding],
    health: 100,
    absorbtion: 0.75,
    durability: 25,
};

export const TestLoot = [MagicWand, AmuletOfHealing, DragonShield];
