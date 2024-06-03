import { VoteableTypes } from '@/constants/enum';
import { ITimestamp } from '.';

export interface IVote extends ITimestamp {
  id: number;
  is_upvoted: boolean;
  user_id: number;
  voteable_id: number;
  voteable_type: VoteableTypes;
}
