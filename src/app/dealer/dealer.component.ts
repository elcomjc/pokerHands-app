import { Card } from '../Card';
import { DealerService } from '../dealer.service';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CONSTANTS } from '../consts';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss']
})
export class DealerComponent implements OnInit {

  private isDeckActivated = false;
  private loadingDeck = false;
  private loadingHands = false;
  private serviceError = false;
  private haveToShuffle = false;
  private errorMessage = 'Dealer not available!, please try again!!';
  private deckToken: string;
  private winnerHand: Object = { number: -1, handType: ''};
  public handOne: Array<Card> = [];
  public handTwo: Array<Card> = [];

  constructor(private dealerService: DealerService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  activateDeck(): void {
    this.loadingDeck = true;
    this.serviceError = false;
    this.dealerService.initDeck()
      .subscribe(data => {
        this.loadingDeck = false;
        this.isDeckActivated = true;
        this.deckToken = data;
      },
      err => {
        this.loadingDeck = false;
        this.isDeckActivated = false;
        this.serviceError = true;
        this.errorMessage = 'Dealer not available!, please try again!!';
        console.log(err);
      });
  }

  getDeckTwoHands() {
    this.loadingHands = true;
    this.serviceError = false;
    this.clearHands();
    this.dealerService.getHands(this.deckToken)
      .subscribe(data => {
        this.loadingHands = false;
        data.map((card, index) => {
          if (index > 4) {
            this.handTwo.push(this.setCardRank(card));
          } else {
            this.handOne.push(this.setCardRank(card));
          }
        });
        if (this.handOne.length === 5 && this.handTwo.length === 5) {
          this.winnerHand = this.dealerService.getWinnerHand(this.handOne, this.handTwo);
        }
      },
      err => {
        this.loadingHands = false;
        if (err.status === 405) {
          this.haveToShuffle = true;
          this.errorMessage = 'There is no more cards on deck, please shuffle deck!';
        }else {
          this.serviceError = true;
          this.errorMessage = 'Dealer not available!, please try again!!';
        }
        console.log(err);
      });
  }

  resetDeckToken(): void {
    this.deckToken = null;
    this.isDeckActivated = false;
    this.serviceError = false;
    this.haveToShuffle = false;
    this.clearHands();
  }

  private clearHands(): void {
    this.handTwo.length = 0;
    this.handOne.length = 0;
    this.winnerHand = { number: -1, handType: ''};
  }

  private setCardRank(card: Card): Card {
    card.rank = CONSTANTS.CARD_RANK[card.number];
    return card;
  }

}
