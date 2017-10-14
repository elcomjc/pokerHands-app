import { Card } from '../Card';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  @Input() hand: Array<Card>;
  @Input() loadingHand: boolean;

  constructor() { }

  ngOnInit() {
  }

}
