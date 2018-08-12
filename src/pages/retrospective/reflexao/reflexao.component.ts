import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Card } from '../../../models/card';
import { RetrospectiveService } from '../../../providers/retrospective.service';
import { MatDialog } from '@angular/material';
import { CreateCardDialogComponent } from '../../../shared/dialogs/createCard-dialog.component';
import { Annotation } from '../../../models/annotation';
import { Retrospective } from '../../../models/retrospective';

@Component({
  selector: 'app-reflexao-retrospective',
  templateUrl: './reflexao.component.html',
  styleUrls: ['./reflexao.component.scss'],
})
export class ReflexaoComponent implements OnInit {
  public swiperConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
  };

  @Input() retrospective: Retrospective;
  public cards: Card[];

  constructor(
    private retrospectiveService: RetrospectiveService,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.retrospectiveService.getCards(this.retrospective.id).then(cards => {
      this.cards = cards;
    }).catch(console.error);
  }

  createAnnotation(cardId: number) {
    const dialogRef = this.matDialog.open(CreateCardDialogComponent, {
      data: cardId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        const newAnnotation: Annotation = {
          description: result.feedback,
          cardId: cardId,
        };

        this.retrospectiveService.createNewAnnotation(newAnnotation).then(annotation => {
          const index = this.cards.findIndex((card) => (card.id === annotation.cardId));
          if (index !== -1) {
            this.cards[index].annotation.push(annotation);
          }
        }).catch(console.error);
      }
    });
  }
}
