import { User } from '@models/user';

export interface UserAuthToken {
  user: User;
  token: string;
}
