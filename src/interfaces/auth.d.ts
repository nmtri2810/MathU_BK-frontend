import { IResponse } from '.';

export interface IAuthState {
  user: ILoginUser | null;
  tokens: ITokens | null;
  status: string;
  isLoading: boolean;
}

export interface ILoginRequestPayload {
  email: string;
  password: string;
}

export interface ILoginUser {
  id: number;
  role_id: number;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginDataResponse {
  user: ILoginUser;
  tokens: ITokens;
}

export type ILoginAction = IAction<ILoginRequestPayload>;
export type ILoginResponse = IResponse<ILoginDataResponse>;
