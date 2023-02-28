export type Card =
    | WeaponCard
    | ActionCard
    | MonsterCard
    | ToolCard
    | TrapCard
    | EquipmentCard;

export enum CardType {
    Weapon,
    Action,
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

export enum Tag {
    Fireproof,
    Traversable,
    Scalable,
    Shielding,
    Speed,
    Jump,
}

export interface BaseCard {
    cardId: string;
    name: string;
    image: string;
    type: CardType;
    rarity: Rarity;
}

export interface WeaponCard extends BaseCard {
    type: CardType.Weapon;
    damage: number;
    criticalDamage: number;
    criticalChance: number;
    durability: number;
    actions: WeaponAction[];
}

export interface ActionCard extends BaseCard {
    type: CardType.Action;
    tags: Tag[];
}

export interface MonsterCard extends BaseCard {
    type: CardType.Monster;
    health: number;
    actions: MonsterAction[];
}

export interface ToolCard extends BaseCard {
    type: CardType.Tool;
    tags: Tag[];
    durability: number;
    actions: ToolAction[];
}

export interface TrapCard extends BaseCard {
    type: CardType.Trap;
    effectiveTags: Tag[];
    ineffectiveTags: Tag[];
}

export interface EquipmentCard extends BaseCard {
    type: CardType.Equipment;
    health: number;
    absorbtion: number;
    durability: number;
    tags: Tag[];
    actions: EquipmentAction[];
}

export interface MonsterAction {
    name: string;
    damage: number;
    block: number;
}

export interface ToolAction {
    name: string;
    damage?: number;
    block?: number;
}

export interface EquipmentAction {
    name: string;
    damage?: number;
    block?: number;
}

export interface WeaponAction {
    name: string;
    damage: number;
    block?: number;
}
