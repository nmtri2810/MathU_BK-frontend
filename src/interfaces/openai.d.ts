import { IAction, IResponse } from '.';

export interface ICheckQuesDupPayload {
  messages: [
    {
      role: string;
      content: string;
    }
  ];
}

export interface ICheckQuesDupResponse {
  role: string;
  content: string;
}

export interface IOpenAIState {
  data: ICheckQuesDupResponse | null;
  loading: boolean;
  status: string;
}

export type TCheckQuesDupAction = IAction<ICheckQuesDupPayload>;
export type TCheckQuesDupResponse = IResponse<ICheckQuesDupResponse>;
