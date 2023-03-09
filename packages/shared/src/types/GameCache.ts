import { Card } from './Card';

export class GameCache {
    public cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }
}
