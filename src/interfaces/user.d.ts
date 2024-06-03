import { ITimestamp } from '.';

export interface IUser extends ITimestamp {
  id: number;
  email: string;
  username: string;
  avatar_url: string;
  reputation: number;
  role_id: number;
}
