import * as axios from "axios";

export const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  // withCredentials: true,
  headers: {}
});

export const userAPI = {
  async getUsers() {
    const res = await instance.get('users');
    return res.data;
  },
  async getLoggedInUser() {
    const res = await instance.get('users/me');
    return res.data;
  },
  async postUser(data) {
    const res = await instance.post('users', data);
    return res.data;
  },
  async loginUser(data) {
    const res = await instance.post('users/login', data);
    return res.data;
  },
  async updateUser(data) {
    const res = await instance.patch('users/single', data);
    return res.data;
  },
  async deleteUser(id) {
    const res = await instance.delete('users/single', id);
    return res.data;
  },
};
