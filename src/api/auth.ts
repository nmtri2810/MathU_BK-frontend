import axiosInstance from '@/api/axiosInstance';
import { ILoginGoogleRequestPayload, ILoginRequestPayload, ISignupRequestPayload } from '@/interfaces/auth';

const context = '/auth';

const authAPI = {
  login(payload: ILoginRequestPayload) {
    return axiosInstance.post(`${context}/login`, payload);
  },
  logout() {
    return axiosInstance.get(`${context}/logout`);
  },
  signup(payload: ISignupRequestPayload) {
    return axiosInstance.post(`${context}/register`, payload);
  },
  loginGoogle(payload: ILoginGoogleRequestPayload) {
    return axiosInstance.post(`${context}/google`, payload);
  }
};

export default authAPI;
