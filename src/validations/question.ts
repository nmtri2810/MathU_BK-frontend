import { MessagesValidate } from '@/constants';
import { z } from 'zod';

const tagsSelectSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional()
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: MessagesValidate.isRequired('Title')
    })
    .max(150, {
      message: MessagesValidate.maxLength('Title', 150)
    }),
  body: z
    .string({ required_error: MessagesValidate.isRequired('Body') })
    .min(20, {
      message: MessagesValidate.minLength('Body', 20)
    })
    .max(300, {
      message: MessagesValidate.maxLength('Body', 300)
    }),
  tags: z
    .array(tagsSelectSchema, { required_error: MessagesValidate.isRequired(`Tag`) })
    .min(1, { message: MessagesValidate.isRequired(`Tag`) })
});
