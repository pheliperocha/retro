import { Component, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Card } from '../../../models/card';
import { RetrospectiveService } from '../../../providers/retrospective.service';

@Component({
  selector: 'reflexao-retrospective',
  templateUrl: './reflexao.component.html',
  styleUrls: ['./reflexao.component.scss']
})
export class ReflexaoComponent {
  public swiperConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
  };

  @Input() retrospectiveId: number;
  public cards: Card[];

  constructor(private retrospectiveService: RetrospectiveService) {
    this.retrospectiveService.getCards(this.retrospectiveId).then(cards => {
      this.cards = cards;
    }).catch(err => {
      console.log(err);
    })
  }
}
