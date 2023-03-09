import { Card } from './Card';

export class Game {
    public playerId: string;
    public cards: Card[];
    public seed: number;

    constructor(playerId: string, cards: Card[], seed: number) {
        this.playerId = playerId;
        this.cards = cards;
        this.seed = seed;
    }
}
