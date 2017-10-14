import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() suit: string;
  @Input() number: number;

  private assetsPath = './assets/';
  private suitPath: string;

  constructor() { }

  ngOnInit() {
    this.setSuitPath();
  }

  setSuitPath() {
    this.suitPath = this.assetsPath + this.suit + '.png';
  }

}
