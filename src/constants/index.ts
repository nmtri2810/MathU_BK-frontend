export * from './messages';

export const PasswordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

export const ApiStatus = {
  REQUESTING: 'REQUESTING',
  GET_SUCCEED: 'GET_SUCCEED',
  GET_FAILED: 'GET_FAILED',
  POST_SUCCEED: 'POST_SUCCEED',
  POST_FAILED: 'POST_FAILED',
  PATCH_SUCCEED: 'PATCH_SUCCEED',
  PATCH_FAILED: 'PATCH_FAILED',
  DELETE_SUCCEED: 'DELETE_SUCCEED',
  DELETE_FAILED: 'DELETE_FAILED'
};

export enum Path {
  HOME_ADMIN = '/admin/',
  HOME_CLIENT = '/',
  LOGIN = '/login',
  NOT_FOUND = '*'
}

export enum Role {
  ADMIN = 1,
  MODERATOR = 2,
  USER = 3
}
