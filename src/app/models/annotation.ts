import { User } from './user';

export class Annotation {
  id?: number;
  description?: string;
  cardId?: number;
  responsibles?: User[];
}
