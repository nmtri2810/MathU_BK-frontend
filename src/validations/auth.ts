import { PasswordValidation } from '@/constants';
import i18n from '@/locales/i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import { z } from 'zod';

const MessagesValidate = {
  email: {
    required: i18n.t(I18nKeys.VALIDATION_MSG.IS_REQUIRED, { field: i18n.t(I18nKeys.GLOBAL.EMAIL) }),
    max: i18n.t(I18nKeys.VALIDATION_MSG.MAX_LENGTH, { field: i18n.t(I18nKeys.GLOBAL.EMAIL), length: 50 }),
    invalid: i18n.t(I18nKeys.VALIDATION_MSG.INVALID, { field: i18n.t(I18nKeys.GLOBAL.EMAIL) })
  },
  password: {
    required: i18n.t(I18nKeys.VALIDATION_MSG.IS_REQUIRED, { field: i18n.t(I18nKeys.GLOBAL.PASSWORD) }),
    max: i18n.t(I18nKeys.VALIDATION_MSG.MAX_LENGTH, { field: i18n.t(I18nKeys.GLOBAL.PASSWORD), length: 50 }),
    invalid: i18n.t(I18nKeys.VALIDATION_MSG.INVALID, { field: i18n.t(I18nKeys.GLOBAL.PASSWORD) })
  },
  password_confirmation: {
    required: i18n.t(I18nKeys.VALIDATION_MSG.IS_REQUIRED, {
      field: i18n.t(I18nKeys.SIGNUP_SCREEN.PASSWORD_CONFIRMATION)
    }),
    not_match: i18n.t(I18nKeys.SIGNUP_SCREEN.PASSWORD_CONFIRMATION_INVALID)
  },
  username: {
    required: i18n.t(I18nKeys.VALIDATION_MSG.IS_REQUIRED, { field: i18n.t(I18nKeys.GLOBAL.USERNAME) }),
    max: i18n.t(I18nKeys.VALIDATION_MSG.MAX_LENGTH, { field: i18n.t(I18nKeys.GLOBAL.USERNAME), length: 50 })
  }
};

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: MessagesValidate.email.required })
    .max(50, { message: MessagesValidate.email.max })
    .email(MessagesValidate.email.invalid),
  password: z
    .string()
    .min(1, { message: MessagesValidate.password.required })
    .max(50, { message: MessagesValidate.password.max })
    .regex(PasswordValidation, { message: MessagesValidate.password.invalid })
});

export const SignupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: MessagesValidate.email.required })
      .max(50, { message: MessagesValidate.email.max })
      .email(MessagesValidate.email.invalid),
    password: z
      .string()
      .min(1, { message: MessagesValidate.password.required })
      .max(50, { message: MessagesValidate.password.max })
      .regex(PasswordValidation, { message: MessagesValidate.password.invalid }),
    passwordConfirmation: z.string().min(1, { message: MessagesValidate.password_confirmation.required }),
    username: z
      .string()
      .min(1, { message: MessagesValidate.username.required })
      .max(50, { message: MessagesValidate.username.max })
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: MessagesValidate.password_confirmation.not_match,
    path: ['passwordConfirmation']
  });
