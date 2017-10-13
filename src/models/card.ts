import { List } from './list';
import { Annotation } from './annotation';

export class Card {
  id: number;
  listId?: number;
  description: string;
  votes: number;
  userId: number;
  list?: List;
  annotation?: Annotation;
}
