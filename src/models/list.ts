import { Card } from './card';

export class List {
  id?: number;
  title?: string;
  position?: number;
  cards?: Card[];
  retroId?: number;
}
