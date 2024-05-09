import axiosInstance from '@/api/axiosInstance';
import { ILoginRequestPayload } from '@/interfaces/auth';

const context = '/auth';

const authAPI = {
  login(payload: ILoginRequestPayload) {
    return axiosInstance.post(`${context}/login`, payload);
  },
  logout() {
    return axiosInstance.get(`${context}/logout`);
  }
};

export default authAPI;
