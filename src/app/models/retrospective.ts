import { User } from './user';
import { Annotation } from './annotation';

export class Retrospective {
  id: number;
  title: string;
  context: string;
  state: number;
  date: string;
  image: string;
  pin: string;
  facilitador?: User;
  members?: User[];
  annotation?: Annotation[];
}
