import { Card } from './card';

export class List {
  id?: number;
  title?: string;
  order?: number;
  cards?: Card[];
  retroId?: number;
}
