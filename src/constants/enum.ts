export enum Path {
  HOME_CLIENT = '/',
  LOGIN = '/login',
  SIGN_UP = '/signup',
  NOT_FOUND = '*',
  UNAUTHORIZED = '/unauthorized',
  QUESTIONS = '/questions',
  ASK_QUESTIONS = '/questions/ask',
  DETAIL_QUESTIONS = '/questions/:id/:title',
  TAGS = '/tags',
  SAVES = '/saves',
  USERS = '/users',
  HELP = '/help',
  HOW_TO_QUESTION = '/help/how-to-question',
  HOW_TO_ANSWER = '/help/how-to-answer',
  WRITE_MATH_FORMULA = '/help/write-math-formula'
}

const baseURL = '/admin/';
export enum AdminPath {
  HOME_ADMIN = `${baseURL}`
}
