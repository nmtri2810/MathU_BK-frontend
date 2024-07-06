import { ICreateVotePayload, IDeleteVotePayload, IUpdateVotePayload } from '@/interfaces/vote';
import axiosInstance from '@/api/axiosInstance';

const context = '/votes';

const voteAPI = {
  create(payload: Omit<ICreateVotePayload, 'callback'>) {
    return axiosInstance.post(context, payload);
  },
  update(payload: Omit<IUpdateVotePayload, 'callback'>) {
    return axiosInstance.patch(`${context}/${payload.id}`, {
      is_upvoted: payload.is_upvoted
    });
  },
  delete(payload: Omit<IDeleteVotePayload, 'callback'>) {
    return axiosInstance.delete(`${context}/${payload.id}`);
  }
};

export default voteAPI;
