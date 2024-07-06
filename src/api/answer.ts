import axiosInstance from '@/api/axiosInstance';
import { IUpdateAnswerPayload, TCreateAnswerAPIPayload } from '@/interfaces/answer';

const context = '/answers';

const answerAPI = {
  create(payload: TCreateAnswerAPIPayload) {
    return axiosInstance.post(context, payload);
  },
  update(payload: Omit<IUpdateAnswerPayload, 'callback'>) {
    return axiosInstance.patch(`${context}/${payload.id}?question_id=${payload.question_id}`, {
      content: payload.content,
      is_accepted: payload.is_accepted
    });
  }
  // delete(payload: IDeleteAnswerPayload) {
  //   return axiosInstance.delete(`${context}/${payload.id}`);
  // }
};

export default answerAPI;
