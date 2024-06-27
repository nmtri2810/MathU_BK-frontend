export enum Path {
  HOME_CLIENT = '/',
  LOGIN = '/login',
  SIGN_UP = '/signup',
  NOT_FOUND = '*',
  UNAUTHORIZED = '/unauthorized',
  QUESTIONS = '/questions',
  ASK_QUESTIONS = '/questions/ask',
  TAGS = '/tags',
  SAVES = '/saves',
  USERS = '/users'
}

const baseURL = '/admin/';
export enum AdminPath {
  HOME_ADMIN = `${baseURL}`
}

export enum VoteableTypes {
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER'
}
