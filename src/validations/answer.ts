import { MessagesValidate } from '@/constants';
import { z } from 'zod';

export const CreateAnswerSchema = z.object({
  answer: z.string().min(15, {
    message: MessagesValidate.minLength('Answer', 15)
  })
});
