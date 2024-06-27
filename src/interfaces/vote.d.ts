import { VoteableTypes } from '@/constants/enum';
import { IAction, IResponse, ITimestamp } from '.';

export interface IVote extends ITimestamp {
  id: number;
  is_upvoted: boolean;
  user_id: number;
  voteable_id: number;
  voteable_type: VoteableTypes;
}

export interface ICreateVotePayload {
  is_upvoted: boolean;
  user_id: number;
  voteable_id: number; // question or answer id
  voteable_type: VoteableTypes;
}

export interface IVoteState {
  one: IVote | null;
  oneLoading: boolean;
  status: string;
}

export interface IUpdateVotePayload {
  id: number;
  is_upvoted: boolean;
}

export interface IDeleteVotePayload {
  id: number;
}

export type TCreateVoteAction = IAction<ICreateVotePayload>;
export type TCreateVoteResponse = IResponse<IVote>;

export type TUpdateVoteAction = IAction<IUpdateVotePayload>;
export type TUpdateVoteResponse = IResponse<IVote>;

export type TDeleteVoteAction = IAction<IDeleteVotePayload>;
export type TDeleteVoteResponse = IResponse<IVote>;
