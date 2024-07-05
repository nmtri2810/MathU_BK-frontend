import { IAction, IResponse, ITimestamp } from '.';

export interface IVote extends ITimestamp {
  id: number;
  is_upvoted: boolean;
  user_id: number;
  question_id: number;
  answer_id: number;
}

export interface ICreateVotePayload {
  is_upvoted: boolean;
  user_id: number;
  question_id?: number;
  answer_id?: number;
  callback: () => void;
}

export interface IVoteState {
  one: IVote | null;
  oneLoading: boolean;
  status: string;
}

export interface IUpdateVotePayload {
  id: number;
  is_upvoted: boolean;
  callback: () => void;
}

export interface IDeleteVotePayload {
  id: number;
  callback: () => void;
}

export type TCreateVoteAction = IAction<ICreateVotePayload>;
export type TCreateVoteResponse = IResponse<IVote>;

export type TUpdateVoteAction = IAction<IUpdateVotePayload>;
export type TUpdateVoteResponse = IResponse<IVote>;

export type TDeleteVoteAction = IAction<IDeleteVotePayload>;
export type TDeleteVoteResponse = IResponse<IVote>;
