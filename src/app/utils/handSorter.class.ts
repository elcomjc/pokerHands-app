import { Card } from '../Card';
export default class HandSorter {
    constructor () {

    }

    public sortHand(hand: Array<Card>): Array<Card> {
        return hand.sort(this.sortCards);
    }

    private sortCards(a: Card, b: Card): number {
        if (a.rank < b.rank) {
            return -1;
        }
        if (a.rank > b.rank) {
            return 1;
        }
        return 0;
    }
}
