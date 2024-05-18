export enum Path {
  HOME_CLIENT = '/',
  LOGIN = '/login',
  SIGN_UP = '/signup',
  NOT_FOUND = '*',
  UNAUTHORIZED = '/unauthorized'
}

const baseURL = '/admin/';
export enum AdminPath {
  HOME_ADMIN = `${baseURL}`
}
