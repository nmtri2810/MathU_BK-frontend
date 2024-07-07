import i18n from '@/locales/i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import { z } from 'zod';

const MessagesValidate = {
  answer: {
    min: i18n.t(I18nKeys.VALIDATION_MSG.MIN_LENGTH, {
      field: i18n.t(I18nKeys.GLOBAL.ANSWER),
      length: 15
    })
  }
};

export const CreateAnswerSchema = z.object({
  answer: z.string().min(15, {
    message: MessagesValidate.answer.min
  })
});
