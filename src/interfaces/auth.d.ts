import { NavigateFunction } from 'react-router-dom';
import { IAction, IResponse } from '.';
import { IRole } from '@/interfaces/role';

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
  role: IRole;
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

export interface ILogoutRequestPayload {
  navigate: NavigateFunction;
}

export type ILoginAction = IAction<ILoginRequestPayload>;
export type ILoginResponse = IResponse<ILoginDataResponse>;

export type ILogoutAction = IAction<ILogoutRequestPayload>;
export type ILogoutResponse = IResponse<null>;
