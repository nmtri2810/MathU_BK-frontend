import axiosInstance from './axiosInstance';

const context = '/tags';

const tagAPI = {
  list() {
    return axiosInstance.get(context);
  }
};

export default tagAPI;
