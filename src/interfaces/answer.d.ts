import { ITimestamp } from '.';

export interface IAnswer extends ITimestamp {
  id: number;
  content: string;
  is_accepted: boolean;
  question_id: number;
  user_id: number;
}
