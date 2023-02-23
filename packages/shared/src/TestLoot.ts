import { Card as TCard, Tag, WeaponCard, EquipmentCard, ToolCard, ActionCard, CardType, Rarity } from "./types/Card";
    
export const MagicWand: WeaponCard = {
    name: "Magic Wand",
    image: "",
    type: CardType.Weapon,
    rarity: Rarity.Rare,
    damage: 30,
    criticalDamage: 60,
    criticalChance: 0.1,
    durability: 50,
};

export const AmuletOfHealing: ToolCard = {
    name: "Amulet of Healing",
    image: "",
    type: CardType.Tool,
    rarity: Rarity.Uncommon,
    tags: [],
    durability: 3,
};

export const DragonShield: EquipmentCard = {
    name: "Dragon Shield",
    image: "",
    type: CardType.Equipment,
    rarity: Rarity.Legendary,
    tags: [Tag.Shielding],
    health: 100,
    absorbtion: 0.75,
    durability: 25,
};


export const TestLoot = [
    MagicWand,
    AmuletOfHealing,
    DragonShield
];