import { I18nKeys } from '@/locales/i18nKeys';
import { TFunction } from 'i18next';

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

export const Role = {
  Admin: 1,
  Moderator: 2,
  User: 3,
  Guest: 0
};

export const NavLabel = {
  HOME: 'Home',
  QUESTIONS: 'Questions',
  TAGS: 'Tags',
  SAVES: 'Saves',
  USERS: 'Users',
  SPACER: 'Spacer'
};

export const QuestionFilterValues = {
  NEWEST: 'newest',
  OLDEST: 'oldest'
};

export const getQuestionFilterOptions = (t: TFunction) => [
  { label: t(I18nKeys.GLOBAL.NEWEST), value: 'newest' },
  { label: t(I18nKeys.GLOBAL.OLDEST), value: 'oldest' }
];

export const AppLanguages = {
  ENGLISH: 'en',
  VIETNAMESE: 'vi'
};

export const I18nNamespaces = {
  GLOBAL: 'global'
};

export const ItemsPerPage = ['5', '10', '15'];

export const PerpageOptions = ItemsPerPage.map((value) => ({ label: value, value }));
