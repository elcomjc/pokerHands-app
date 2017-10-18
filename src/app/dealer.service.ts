import HandSorter from './utils/handSorter.class';
import { HandProperties } from './HandProperties';
import { Card } from './Card';
import { Subscribable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CONSTANTS } from './consts';

@Injectable()
export class DealerService {

  constructor(private http: HttpClient) { }

  initDeck(): Observable<any> {
    return this.http.post(CONSTANTS.API_URL + 'deck', {}, {responseType: 'text'});
  }

  getHands(deck_token: string): Observable<any> {
    if (deck_token) {
      return this.http.get(CONSTANTS.API_URL + 'deck/' + deck_token + '/deal/10');
    } else {
      console.log('deck token is nedded');
    }
  }

  getWinnerHand(handOne: Array<Card>, handTwo: Array<Card>): any {
    let handWinner = {
      number: 1,
      handType: ''
    };
    const handSorter = new HandSorter();
    handOne = handSorter.sortHand(handOne);
    handTwo = handSorter.sortHand(handTwo);
    const handOneProps = this.evaluateHand(handOne);
    const handTwoProps = this.evaluateHand(handTwo);
    if (handOneProps.handType.order > handTwoProps.handType.order) {
      handWinner = {
        number: 1,
        handType: handOneProps.handType.name
      };
    }else if (handOneProps.handType.order < handTwoProps.handType.order) {
      handWinner = {
        number: 2,
        handType: handTwoProps.handType.name
      };
    }else {
      handWinner = {
        number: this.handOfHighestCard(handOne, handTwo),
        handType: 'HIGH_CARD'
      };
    }
    return handWinner;
  }

  private evaluateHand(hand: Array<Card>): any {
    const handProperties: HandProperties = {
      hightesCard: null,
      handType: {
        name: '',
        order: 0
      }
    };
    handProperties.hightesCard = hand[hand.length - 1];
    handProperties.handType = this.getHandType(hand);
    return handProperties;
  }

  private handOfHighestCard(handOne: Array<Card>, handTwo: Array<Card>): number {
    let majorHand = 0;
    for (let i = 4; i >= 0; i--) {
      if (handOne[i].rank > handTwo[i].rank) {
        majorHand = 1;
        break;
      } else if (handOne[i].rank < handTwo[i].rank) {
        majorHand = 2;
        break;
      }
    }
    return majorHand;
  }

  private getHandType(hand: Array<Card>): any {
    const isPair = this.isPair(hand);
    const isTwoPairs = this.isTwoPairs(hand);
    const isThreeOfAKind = this.isThreeOfAKind(hand);
    const isStraight = this.isStraightStair(hand);
    const isFlush = this.isFlush(hand);
    const isRoyalStair = this.isRoyalStair(hand);
    let handType = CONSTANTS.HAND_TYPES[0];

    if (isFlush && isRoyalStair && !isPair && !isThreeOfAKind) {
      handType = CONSTANTS.HAND_TYPES[9];
    } else if (isFlush && isStraight && !isPair && !isThreeOfAKind) {
      handType = CONSTANTS.HAND_TYPES[8];
    } else if (this.isPoker(hand)) {
      handType = CONSTANTS.HAND_TYPES[7];
    } else if (isPair && isThreeOfAKind) {
      handType = CONSTANTS.HAND_TYPES[6];
    } else if (isFlush) {
      handType = CONSTANTS.HAND_TYPES[5];
    } else if (isStraight && !isPair && !isThreeOfAKind) {
      handType = CONSTANTS.HAND_TYPES[4];
    } else if (isThreeOfAKind) {
      handType = CONSTANTS.HAND_TYPES[3];
    } else if (isTwoPairs) {
      handType = CONSTANTS.HAND_TYPES[2];
    } else if (isPair) {
      handType = CONSTANTS.HAND_TYPES[1];
    }

    return handType;
  }

  private isFlush(hand: Array<Card>): boolean {
    const suit = this.getCountSameItemsBySuit(hand);
    return (suit[0] === 5);
  }

  private isRoyalStair (hand: Array<Card>) {
    return (hand[0].rank === 9 && hand[hand.length - 1].rank === 13);
  }

  private isStraightStair (hand: Array<Card>) {
    const initialCardRank = hand[0].rank;
    return (hand[hand.length - 1].rank === initialCardRank + 4);
  }

  private isPoker(hand: Array<Card>) {
    let isPoker = false;
    const cardsCount = this.getCountSameItemsByNumber(hand);
    for (const cardNumber in cardsCount) {
      if (cardsCount[cardNumber] === 4) {
        isPoker = true;
      }
    }
    return isPoker;
  }

  private isFullHouse(hand: Array<Card>) {
    let haveThreeOfKind = false;
    let havePair = false;
    const cardsCount = this.getCountSameItemsByNumber(hand);
    for (const cardNumber in cardsCount) {
      if (cardsCount[cardNumber] === 3) {
        haveThreeOfKind = true;
      } else if (cardsCount[cardNumber] === 2) {
        havePair = true;
      }
    }
    return (haveThreeOfKind && havePair);
  }

  private isThreeOfAKind(hand: Array<Card>) {
    let haveThreeOfKind = false;
    const cardsCount = this.getCountSameItemsByNumber(hand);
    for (const cardNumber in cardsCount) {
      if (cardsCount[cardNumber] === 3) {
        haveThreeOfKind = true;
      }
    }
    return (haveThreeOfKind);
  }

  private isTwoPairs(hand: Array<Card>) {
    let pairs = 0;
    const cardsCount = this.getCountSameItemsByNumber(hand);
    for (const cardNumber in cardsCount) {
      if (cardsCount[cardNumber] === 2) {
        pairs++;
      }
    }
    return (pairs === 2);
  }

  private isPair(hand: Array<Card>) {
    let pairs = 0;
    const cardsCount = this.getCountSameItemsByNumber(hand);
    for (const cardNumber in cardsCount) {
      if (cardsCount[cardNumber] === 2) {
        pairs++;
      }
    }
    return (pairs === 1);
  }

  private getCountSameItemsBySuit(hand: Array<Card>): Object {
    const result: Object = {};
    for (const card of hand) {
      result[card.suit] = (result[card.suit]) ? result[card.suit] + 1 : 1;
    }
    return result;
  }

  private getCountSameItemsByNumber(hand: Array<Card>): Object {
    const result: Object = {};
    for (const card of hand) {
      result[card.number] = (result[card.number]) ? result[card.number] + 1 : 1;
    }
    return result;
  }

}
