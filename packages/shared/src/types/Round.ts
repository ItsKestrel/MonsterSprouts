import { MonsterCard, WeaponCard } from './Card';
import { Player } from './Player';

export class Round {
    private player: Player;
    private monster: MonsterCard;
    private monsterHealth: number;

    constructor(player: Player, monster: MonsterCard) {
        this.player = player;
        this.monster = monster;
        this.monsterHealth = monster.health;
    }

    public useCard(card: WeaponCard) {}
}
