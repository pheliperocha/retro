import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {List} from "../models/list";

@Injectable()
export class RetrospectiveService {

  private deleteListSource = new Subject<List>();
  private changeListSource = new Subject<List>();

  deleteListSource$ = this.deleteListSource.asObservable();
  changeListSource$ = this.changeListSource.asObservable();

  deleteList(list: List) {
    this.deleteListSource.next(list);
  }

  changeList(list: List) {
    this.changeListSource.next(list);
  }
}
