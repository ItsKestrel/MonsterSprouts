import { EquipmentCard, ToolCard, WeaponCard } from './Card';

export interface Loadout {
    primaryWeapon: WeaponCard;
    secondaryWeapon: WeaponCard;
    toolBag: ToolCard[];
    armorSuit: EquipmentCard;
}
