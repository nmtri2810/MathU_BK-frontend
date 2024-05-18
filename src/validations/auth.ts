import { MessagesValidate, PasswordValidation } from '@/constants';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: MessagesValidate.isRequired('Email')
    })
    .max(50, {
      message: MessagesValidate.maxLength('Email', 50)
    })
    .email(MessagesValidate.invalidData('Email', 'Wrong format email')),
  password: z
    .string()
    .min(1, {
      message: MessagesValidate.isRequired('Password')
    })
    .max(50, {
      message: MessagesValidate.maxLength('Password', 50)
    })
    .regex(PasswordValidation, {
      message: MessagesValidate.invalidData(
        'Password',
        'Must be at least 8 characters including numbers, uppercase letters, lowercase letters and special characters'
      )
    })
});

export const SignupSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: MessagesValidate.isRequired('Email')
      })
      .max(50, {
        message: MessagesValidate.maxLength('Email', 50)
      })
      .email(MessagesValidate.invalidData('Email', 'Wrong format email')),
    password: z
      .string()
      .min(1, {
        message: MessagesValidate.isRequired('Password')
      })
      .max(50, {
        message: MessagesValidate.maxLength('Password', 50)
      })
      .regex(PasswordValidation, {
        message: MessagesValidate.invalidData(
          'Password',
          'Must be at least 8 characters including numbers, uppercase letters, lowercase letters and special characters'
        )
      }),
    passwordConfirmation: z.string().min(1, {
      message: MessagesValidate.isRequired('Password confirmation')
    }),
    username: z
      .string()
      .min(1, {
        message: MessagesValidate.isRequired('Username')
      })
      .max(50, {
        message: MessagesValidate.maxLength('Username', 50)
      })
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: 'Passwords did not match',
    path: ['passwordConfirmation']
  });
