export type Card =
    | WeaponCard
    | MonsterCard
    | ToolCard
    | TrapCard
    | EquipmentCard;

export enum CardType {
    Weapon,
    Monster,
    Tool,
    Trap,
    Equipment,
}

export enum Rarity {
    Legendary,
    Rare,
    Uncommon,
    Common,
}

export enum Quality {
    Fireproof,
    Traversable,
    Scalable,
}

export interface BaseCard {
    name: string;
    image: string;
    type: CardType;
    rarity: Rarity;
    durability: number;
}

export interface WeaponCard extends BaseCard {
    type: CardType.Weapon;
    damage: number;
    criticalDamage: number;
    criticalChance: number;
}

export interface MonsterCard extends BaseCard {
    type: CardType.Monster;
    health: number;
    actions: MonsterAction[];
}

export interface ToolCard extends BaseCard {
    type: CardType.Tool;
    qualities: Quality[];
}

export interface TrapCard extends BaseCard {
    type: CardType.Trap;
    effectiveQualities: Quality[];
    ineffectiveQualities: Quality[];
}

export interface EquipmentCard extends BaseCard {
    type: CardType.Equipment;
    health: number;
    absorbtion: number;
}

export interface MonsterAction {
    damage: number;
    block: number;
}
