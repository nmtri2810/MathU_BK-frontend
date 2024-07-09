import i18n from '@/locales/i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import { z } from 'zod';

const MessagesValidate = {
  title: {
    required: i18n.t(I18nKeys.VALIDATION_MSG.IS_REQUIRED, {
      field: i18n.t(I18nKeys.GLOBAL.TITLE)
    }),
    max: i18n.t(I18nKeys.VALIDATION_MSG.MAX_LENGTH, {
      field: i18n.t(I18nKeys.GLOBAL.TITLE),
      length: 150
    })
  },
  body: {
    required: i18n.t(I18nKeys.VALIDATION_MSG.IS_REQUIRED, {
      field: i18n.t(I18nKeys.GLOBAL.BODY)
    }),
    min: i18n.t(I18nKeys.VALIDATION_MSG.MIN_LENGTH, {
      field: i18n.t(I18nKeys.GLOBAL.BODY),
      length: 50
    }),
    max: i18n.t(I18nKeys.VALIDATION_MSG.MAX_LENGTH, {
      field: i18n.t(I18nKeys.GLOBAL.BODY),
      length: 300
    }) // not use
  },
  tag: {
    required: i18n.t(I18nKeys.VALIDATION_MSG.IS_REQUIRED, {
      field: i18n.t(I18nKeys.GLOBAL.TAG)
    }),
    min: i18n.t(I18nKeys.VALIDATION_MSG.MIN_LENGTH_ARR, {
      field: i18n.t(I18nKeys.GLOBAL.TAG),
      length: 1
    }),
    max: i18n.t(I18nKeys.VALIDATION_MSG.MAX_LENGTH_ARR, {
      field: i18n.t(I18nKeys.GLOBAL.TAG),
      length: 5
    })
  }
};

const tagsSelectSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional()
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(1, { message: MessagesValidate.title.required })
    .max(150, { message: MessagesValidate.title.max }),
  body: z.string({ required_error: MessagesValidate.body.required }).min(50, { message: MessagesValidate.body.min }),
  tags: z
    .array(tagsSelectSchema, { required_error: MessagesValidate.tag.required })
    .min(1, { message: MessagesValidate.tag.min })
    .max(5, { message: MessagesValidate.tag.max })
});
