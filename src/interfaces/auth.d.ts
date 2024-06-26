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

export interface ISignupRequestPayload {
  email: string;
  password: string;
  username: string;
}

export interface ILoginGoogleRequestPayload {
  code: string;
}

export type TLoginAction = IAction<ILoginRequestPayload>;
export type TLoginResponse = IResponse<ILoginDataResponse>;

export type TLogoutAction = IAction<ILogoutRequestPayload>;

export type TSignupAction = IAction<ISignupRequestPayload>;
export type TSignupResponse = IResponse<ILoginDataResponse>;

export type TLoginGoogleAction = IAction<ILoginGoogleRequestPayload>;
