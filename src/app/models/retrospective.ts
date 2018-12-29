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
  facilitator?: User;
  members?: User[];
  annotations?: Annotation[];
}
