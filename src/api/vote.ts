import { ICreateVotePayload, IDeleteVotePayload, IUpdateVotePayload } from '@/interfaces/vote';
import axiosInstance from '@/api/axiosInstance';

const context = '/votes';

const voteAPI = {
  create(payload: ICreateVotePayload) {
    return axiosInstance.post(context, payload);
  },
  update(payload: IUpdateVotePayload) {
    return axiosInstance.patch(`${context}/${payload.id}`, {
      is_upvoted: payload.is_upvoted
    });
  },
  delete(payload: IDeleteVotePayload) {
    return axiosInstance.delete(`${context}/${payload.id}`);
  }
};

export default voteAPI;
