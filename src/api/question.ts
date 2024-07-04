import { IGetQuestionPayload, IListQuestionPayload, TCreateQuestionAPIPayload } from '@/interfaces/question';
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
  }
};

export default questionAPI;
