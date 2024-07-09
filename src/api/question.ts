import {
  IDeleteQuestionPayload,
  IGetQuestionPayload,
  IListQuestionPayload,
  IUpdateQuestionPayload,
  TCreateQuestionAPIPayload
} from '@/interfaces/question';
import axiosInstance from './axiosInstance';
import queryString from 'query-string';

const context = '/questions';

const questionAPI = {
  list(payload: IListQuestionPayload) {
    const url = `${context}?${queryString.stringify(payload)}`;
    return axiosInstance.get(url);
  },
  create(payload: TCreateQuestionAPIPayload) {
    return axiosInstance.post(context, payload);
  },
  get(payload: IGetQuestionPayload) {
    return axiosInstance.get(`${context}/${payload.id}`);
  },
  delete(payload: Omit<IDeleteQuestionPayload, 'navigate'>) {
    return axiosInstance.delete(`${context}/${payload.id}`);
  },
  update(payload: IUpdateQuestionPayload) {
    return axiosInstance.patch(context, payload);
  }
};

export default questionAPI;
