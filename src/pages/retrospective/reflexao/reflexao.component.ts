import { Component, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Card } from '../../../models/card';
import { RetrospectiveService } from '../../../providers/retrospective.service';
import { MdDialog } from '@angular/material';
import { CreateCardDialogComponent } from '../../../shared/dialogs/createCard-dialog.component';
import { Annotation } from '../../../models/annotation';
import { Retrospective } from '../../../models/retrospective';
import { User } from '../../../models/user';

@Component({
  selector: 'reflexao-retrospective',
  templateUrl: './reflexao.component.html',
  styleUrls: ['./reflexao.component.scss'],
})
export class ReflexaoComponent {
  public swiperConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
  };

  @Input() retrospective: Retrospective;
  public cards: Card[];

  constructor(private retrospectiveService: RetrospectiveService,
              public mdDialog: MdDialog) {}

  ngOnInit() {
    this.retrospectiveService.getCards(this.retrospective.id).then(cards => {
      this.cards = cards;
    }).catch(err => {
      console.log(err);
    });
  }

  createAnnotation(cardId: number) {
    let dialogRef = this.mdDialog.open(CreateCardDialogComponent, {
      data: cardId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        let newAnnotation: Annotation = {
          description: result.feedback,
          cardId: cardId,
        };

        this.retrospectiveService.createNewAnnotation(newAnnotation).then(annotation => {
          let index = this.cards.findIndex((card) => (card.id === annotation.cardId));
          if (index != -1) {
            this.cards[index].annotation.push(annotation);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    });
  }

  addResponsible(annotation: Annotation, responsible: User) {
    annotation.responsibles.push(responsible);
  }
}
