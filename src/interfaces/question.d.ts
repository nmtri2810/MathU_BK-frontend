import { IAction, IPaginationMetaResponse, IPaginationPayload, IResponse, ITimestamp } from '.';
import { IAnswer } from './answer';
import { ITag } from './tag';
import { IUser } from './user';
import { IVote } from './vote';

export interface IListQuestionPayload extends IPaginationPayload {}

export interface IQuestion extends ITimestamp {
  id: number;
  title: string;
  description: string;
  user_id: number;
}

export interface IListQuestionDataCount {
  votes: number;
  answers: number;
  tags: number;
}

export interface IListQuestion extends IQuestion {
  votes: IVote[];
  answers: IAnswer[];
  tags: ITag[];
  user: IUser;
  _count: IListQuestionDataCount;
}

export interface IListQuestionDataResponse {
  list: IListQuestion[];
  meta: IPaginationMetaResponse;
}

export interface IQuestionState {
  list: IListQuestion[] | null;
  meta: IPaginationMetaResponse;
  keyword: string;
  listLoading: boolean;
  status: string;
}

export type IListQuestionAction = IAction<IListQuestionPayload>;
export type IListQuestionResponse = IResponse<IListQuestionDataResponse>;
