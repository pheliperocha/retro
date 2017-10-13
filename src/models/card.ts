import { List } from './list';

export class Card {
  id: number;
  listId?: number;
  description: string;
  votes: number;
  userId: number;
  list?: List;
}
