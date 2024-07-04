import { IAction, IResponse, ITimestamp } from '.';
import { IUser } from './user';

export interface IAnswer extends ITimestamp {
  id: number;
  content: string;
  is_accepted: boolean;
  parent_id?: number;
  question_id: number;
  user_id: number;
  user: IUser;
  children: IAnswer[];
}

export interface IChildAnswer extends Omit<IAnswer, 'children'> {}

export interface ICreateAnswerPayload {
  content: string;
  parent_id?: number;
  question_id: number;
  user_id: number;
  callback: () => void;
}
export type TCreateAnswerAPIPayload = Omit<ICreateAnswerPayload, 'callback'>;

export interface IAnswerState {
  one: IAnswer | null;
  oneLoading: boolean;
  status: string;
}

// export interface IUpdateAnswerPayload {
//   questionId: number;
//   id: number;

//   content: string;
//   is_accepted: boolean;
// }

export type TCreateAnswerAction = IAction<ICreateAnswerPayload>;
export type TCreateAnswerResponse = IResponse<IAnswer>;

// export type TUpdateAnswerAction = IAction<IUpdateAnswerPayload>;
// export type TUpdateAnswerResponse = IResponse<IAnswer>;
