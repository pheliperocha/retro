import { List } from './list';
import { Annotation } from './annotation';
import { User } from './user';

export class Card {
  id?: number;
  listId?: number;
  description: string;
  votes?: number;
  voted?: number;
  user?: User;
  userId?: number;
  retroId?: number;
  list?: List;
  annotation?: Annotation[];
}
