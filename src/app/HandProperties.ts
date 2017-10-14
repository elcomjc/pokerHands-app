import { Card } from './Card';

export interface HandProperties {
    hightesCard: Card;
    handType: {
        name: string;
        order: number;
    };
}
