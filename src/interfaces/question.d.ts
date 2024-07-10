import { NavigateFunction } from 'react-router-dom';
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

export interface IQuestionBEResponse extends IQuestion {
  votes: IVote[];
  answers: IAnswer[];
  tags: ITag[];
  user: IUser;
  _count: IListQuestionDataCount;
}

export interface IListQuestionDataResponse {
  list: IQuestionBEResponse[];
  meta: IPaginationMetaResponse;
}

export interface IQuestionState {
  list: IQuestionBEResponse[] | null;
  meta: IPaginationMetaResponse;
  keyword: string;
  listLoading: boolean;
  one: IQuestionBEResponse | null;
  oneLoading: boolean;
  status: string;
}

export interface ICreateQuestionPayload {
  title: string;
  description: string;
  user_id: number;
  tag_ids: number[];
  navigate: NavigateFunction;
}

export type TCreateQuestionAPIPayload = Omit<ICreateQuestionPayload, 'navigate'>;

export interface IGetQuestionPayload {
  id: number;
}

export interface IDeleteQuestionPayload {
  id: number;

  navigate: NavigateFunction;
}

export interface IUpdateQuestionPayload {
  id: number;
  title?: string;
  description?: string;
  tag_ids?: number[];
}

export type TListQuestionAction = IAction<IListQuestionPayload>;
export type TListQuestionResponse = IResponse<IListQuestionDataResponse>;

export type TCreateQuestionAction = IAction<ICreateQuestionPayload>;
export type TCreateQuestionResponse = IResponse<IQuestionBEResponse>;

export type TGetQuestionAction = IAction<IGetQuestionPayload>;
export type TGetQuestionResponse = IResponse<IQuestionBEResponse>;

export type TDeleteQuestionAction = IAction<IDeleteQuestionPayload>;
export type TDeleteQuestionResponse = IResponse<IQuestionBEResponse>;

export type TUpdateQuestionAction = IAction<IUpdateQuestionPayload>;
export type TUpdateQuestionResponse = IResponse<IQuestionBEResponse>;
