import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../providers/oauth/auth.service';
import { User } from '../../models/user';
import { Retrospective } from '../../models/retrospective';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list';
import { AppSettings } from '../../app/app.settings';
import { RetrospectiveService } from '../../providers/retrospective.service';
import { Subscription } from 'rxjs/Subscription';
import { DragulaService } from 'ng2-dragula';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../shared/dialogs/delete-dialog.component';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Card } from '../../models/card';
import { ApiService } from '../../providers/api/api.service';

@Component({
  selector: 'app-retrospective',
  templateUrl: './retrospective.component.html',
  styleUrls: ['./retrospective.component.scss'],
  providers: [ RetrospectiveService ]
})
export class RetrospectiveComponent implements OnInit, OnDestroy {
  public user: User;
  public id: number;
  public retrospective: Retrospective;
  public lists: List[];
  public appSettings = AppSettings;
  private deleteListSubscribe: Subscription;
  private deleteCardSubscribe: Subscription;
  private dragulaDropSubscribe: Subscription;
  private dragulaPositionSubscribe: Subscription;
  private getNewMemberSubscribe: Subscription;
  private getLeftMemberSubscribe: Subscription;
  private getNewCardSubscribe: Subscription;
  private getDeletedCardSubscribe: Subscription;
  private getUpdatedCardSubscribe: Subscription;
  private getUpvotedCardSubscribe: Subscription;
  private getDownvotedCardSubscribe: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private retrospectiveService: RetrospectiveService,
    public confirmDialog: MatDialog,
    private dragulaService: DragulaService,
    private apiService: ApiService,
    private socket: Socket
  ) {
    this.user = this.authService.user;
    this.socket.connect();
  }

  ngOnInit() {
    this.retrospective = this.route.snapshot.data['retrospective'];
    this.lists = this.route.snapshot.data['lists'];

    this.socket.emit('subscribe', this.retrospective.id);
    this.socket.emit('enter', {retroId: this.retrospective.id, user: this.user});

    if (this.retrospective.facilitador.id !== this.user.id) {
      this.apiService.addMember(this.retrospective.id, this.user.id);
    }

    this.getNewCardSubscribe = this.getNewCard().subscribe(card => {
      const index = this.lists.findIndex((list) => (list.id === card.listId));
      if (index !== -1) {
        this.lists[index].cards.push(card);
      }
    });

    this.deleteListSubscribe = this.retrospectiveService.deleteListSource$.subscribe(list => {
      const index = this.lists.findIndex((elt) => (elt === list));
      if (index !== -1) {
        this.lists.splice(index, 1);
      }
    });

    this.deleteCardSubscribe = this.retrospectiveService.deleteCardSource$.subscribe(card => {
      this.socket.emit('delete_card', {retroId: this.retrospective.id, card: card});
      const listIndex = this.lists.findIndex((list) => (list.id === card.listId));

      if (listIndex !== -1) {
        const cards = this.lists[listIndex].cards;
        const cardIndex = cards.findIndex((elt) => (elt.id === card.id));

        if (cardIndex !== -1) {
          cards.splice(cardIndex, 1);
        }
      }
    });

    this.getDeletedCardSubscribe = this.getDeletedCard().subscribe(card => {
      const listIndex = this.lists.findIndex((list) => (list.id === card.listId));

      if (listIndex !== -1) {
        const cards = this.lists[listIndex].cards;
        const cardIndex = cards.findIndex((elt) => (elt.id === card.id));

        if (cardIndex !== -1) {
          cards.splice(cardIndex, 1);
        }
      }
    });

    this.getUpdatedCardSubscribe = this.getUpdatedCard().subscribe(card => {
      const listIndex = this.lists.findIndex((list) => (list.id === card.listId));

      if (listIndex !== -1) {
        const cards = this.lists[listIndex].cards;
        const cardIndex = cards.findIndex((elt) => (elt.id === card.id));

        if (cardIndex !== -1) {
          cards[cardIndex].description = card.description;
        }
      }
    });

    this.getUpvotedCardSubscribe = this.getUpvotedCard().subscribe(card => {
      const listIndex = this.lists.findIndex((list) => (list.id === card.listId));

      if (listIndex !== -1) {
        const cards = this.lists[listIndex].cards;
        const cardIndex = cards.findIndex((elt) => (elt.id === card.id));

        if (cardIndex !== -1) {
          cards[cardIndex].votes++;
        }
      }
    });

    this.getDownvotedCardSubscribe = this.getDownvotedCard().subscribe(card => {
      const listIndex = this.lists.findIndex((list) => (list.id === card.listId));

      if (listIndex !== -1) {
        const cards = this.lists[listIndex].cards;
        const cardIndex = cards.findIndex((elt) => (elt.id === card.id));

        if (cardIndex !== -1) {
          cards[cardIndex].votes--;
        }
      }
    });

    this.getNewMemberSubscribe = this.getNewMember().subscribe(user => {
      if (this.retrospective.facilitador.id !== user.id) {
        const memberIndex = this.retrospective.members.findIndex((member) => (member.id === user.id));

        if (memberIndex < 0) {
          this.retrospective.members.push(user);
        }
      }
    });

    this.getLeftMemberSubscribe = this.getLeftMember().subscribe(user => {
      if (this.retrospective.facilitador.id !== user.id) {
        const memberIndex = this.retrospective.members.findIndex((member) => (member.id === user.id));

        if (memberIndex >= 0) {
          this.retrospective.members.splice(memberIndex, 1);
        }
      }
    });

    this.dragulaService.setOptions('bag-list', {
      revertOnSpill: true,
      moves: (el: any, container: any, handle: any): any => {
        if (this.retrospective.state !== 1) {
          return false;
        }
        return handle.classList.contains('handle');
      }
    });

    this.dragulaService.setOptions('bag-cards', {
      revertOnSpill: true,
      moves: (el: any): any => {
        return el.classList.contains('drag');
      }
    });

    this.dragulaDropSubscribe = this.dragulaService.drop.subscribe();

    this.dragulaPositionSubscribe = this.dragulaService.dropModel.subscribe((bags) => {
      if (bags[0] === 'bag-list') {
        let itemsProcessed = 0;
        const newOrder = [];

        this.lists.forEach((item, index) => {
          itemsProcessed++;
          item.position = index;
          newOrder.push(Array(index, item.id));

          if (itemsProcessed === this.lists.length) {
            this.sortingLists(newOrder);
          }
        });
      } else if (bags[0] === 'bag-cards') {
        const listPosition = bags[3].offsetParent.getAttribute('data-listPosition');
        let itemsProcessed = 0;
        const newOrder = [];
        const cards = this.lists[listPosition].cards;

        cards.forEach((item, index) => {
          itemsProcessed++;
          item.position = index;
          newOrder.push(Array(index, item.id));

          if (itemsProcessed === cards.length) {
            this.sortingCards(newOrder);
          }
        });
      }
    });
  }

  sortingLists(listsOrder) {
    this.apiService.sortLists(this.retrospective.id, listsOrder);
  }

  sortingCards(cardsOrder) {
    this.apiService.sortCards(this.retrospective.id, cardsOrder);
  }

  goToPrepareStep() {
    if (this.retrospective.facilitador.id !== this.user.id) {
      return false;
    }
    if (this.retrospective.members.length >= 1) {

      const dialogRef = this.confirmDialog.open(DeleteDialogComponent, {
        data: {
          message: 'Existe outras pessoas acessando essa reunião, ao voltar para etapa de preparação, todos os outros participantes serão desconectador. Tem certeza que deseja continuar?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.changeToPrepareStep();
        }
      });
    } else {
      this.changeToPrepareStep();
    }
  }

  private changeToPrepareStep() {
    const update = {
      'op': 'replace',
      'path': 'state',
      'value': 1
    };

    this.retrospectiveService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response.updated === true) {
        this.retrospective.state = 1;
        this.retrospective.pin = null;
      }
    }).catch(console.error);
  }

  goToFeedbackStep() {
    if (this.retrospective.facilitador.id !== this.user.id) {
      return false;
    }
    const newPin = Math.random().toString().substr(-6);

    const update = {
      'status_reuniao': 2,
      'pin': newPin
    };

    this.retrospectiveService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response.updated === true) {
        this.retrospective.state = 2;
        this.retrospective.pin = newPin;
      }
    }).catch(console.error);
  }

  goToReflexaoStep() {
    if (this.retrospective.facilitador.id !== this.user.id) {
      return false;
    }

    const update = {
      'status_reuniao': 3
    };

    this.retrospectiveService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response.updated === true) {
        this.retrospective.state = 3;
      }
    }).catch(console.error);
  }

  createList() {
    this.retrospectiveService.createNewList(this.retrospective.id).then(list => {
      list.cards = [];
      this.lists.push(list);
    }).catch(console.error);
  }

  getNewMember(): Observable<User> {
    const observable = new Observable(observer => {
      this.socket.on('enter_member', user => {
        observer.next(user);
      });
    });
    return observable;
  }

  getLeftMember(): Observable<User> {
    const observable = new Observable(observer => {
      this.socket.on('left_member', user => {
        observer.next(user);
      });
    });
    return observable;
  }

  getNewCard(): Observable<Card> {
    const observable = new Observable(observer => {
      this.socket.on('new_card', card => {
        observer.next(card);
      });
    });
    return observable;
  }

  getDeletedCard(): Observable<Card> {
    const observable = new Observable(observer => {
      this.socket.on('card_deleted', card => {
        observer.next(card);
      });
    });
    return observable;
  }

  getUpvotedCard(): Observable<Card> {
    const observable = new Observable(observer => {
      this.socket.on('upvoted_card', card => {
        observer.next(card);
      });
    });
    return observable;
  }

  getDownvotedCard(): Observable<Card> {
    const observable = new Observable(observer => {
      this.socket.on('downvoted_card', card => {
        observer.next(card);
      });
    });
    return observable;
  }

  getUpdatedCard(): Observable<Card> {
    const observable = new Observable(observer => {
      this.socket.on('updated_card', card => {
        observer.next(card);
      });
    });
    return observable;
  }

  ngOnDestroy() {
    this.deleteListSubscribe.unsubscribe();
    this.deleteCardSubscribe.unsubscribe();
    this.dragulaDropSubscribe.unsubscribe();
    this.dragulaPositionSubscribe.unsubscribe();
    this.socket.emit('left', {retroId: this.retrospective.id, user: this.user});
    this.getNewMemberSubscribe.unsubscribe();
    this.getLeftMemberSubscribe.unsubscribe();
    this.getNewCardSubscribe.unsubscribe();
    this.getDeletedCardSubscribe.unsubscribe();
    this.getUpdatedCardSubscribe.unsubscribe();
    this.getUpvotedCardSubscribe.unsubscribe();
    this.getDownvotedCardSubscribe.unsubscribe();
    this.apiService.removeMember(this.retrospective.id, this.user.id);
    this.socket.disconnect();
    this.dragulaService.destroy('bag-list');
    this.dragulaService.destroy('bag-cards');
  }
}
