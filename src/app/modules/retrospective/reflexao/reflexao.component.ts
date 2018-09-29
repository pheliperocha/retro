import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Card } from '@models/card';
import { RetrospectiveService } from '@services/retrospective.service';
import { MatDialog } from '@angular/material';
import { Annotation } from '@models/annotation';
import { Retrospective } from '@models/retrospective';
import { CreateCardDialogComponent } from '@components/dialogs/createCard-dialog.component';

@Component({
  selector: 'retro-reflexao-retrospective',
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
