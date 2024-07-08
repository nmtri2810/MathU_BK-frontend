import { ICheckQuesDupPayload } from '@/interfaces/openai';
import axiosInstance from './axiosInstance';

const context = '/openai';

const openaiAPI = {
  checkQuesDup(payload: ICheckQuesDupPayload) {
    return axiosInstance.post(`${context}/check-duplicate-questions`, payload);
  }
};

export default openaiAPI;
