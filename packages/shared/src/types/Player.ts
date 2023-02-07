import { Loadout } from './Loadout';

export class Player {
    private loadout: Loadout;
    private health: number;

    constructor(loadout: Loadout, health: number) {
        this.loadout = loadout;
        this.health = health;
    }
}
