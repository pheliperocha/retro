import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card;
  public voted: boolean = false;

  constructor() {}

  vote() {
    if (this.voted === false) {
      this.voted = true;
      this.card.votes++;
    } else {
      this.voted = false;
      this.card.votes--;
    }
  }
}
