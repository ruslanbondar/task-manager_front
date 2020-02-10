import * as axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3001/",
  // withCredentials: true,
  headers: {}
});

export const userAPI = {
  async getUsers() {
    const res = await instance.get("users");
    return res.data;
  },
  async getLoggedInUser() {
    const res = await instance.get("users/me");
    return res.data;
  },
  async postUser(data) {
    const res = await instance.post("users", data);
    return res.data;
  },
  async loginUser(data) {
    const res = await instance.post("users/login", data);
    // const token = localStorage.getItem("user-token");
    // if (token) {
    //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // }
    // localStorage["user-token"] = res.data.token;
    // axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    // delete axios.defaults.headers.common["Authorization"];
    // localStorage.removeItem("user-token");
    // axios.defaults.headers.common["Content-Type"] = "application/json";

    return res.data.token;
    // const formData = new FormData();
    // for (const key in data) {
    //   formData.append(key, data[key]);
    // }
    // return await instance.post('users/login', formData, {
    //   headers: {
    //     'Access-Control-Allow-Origin': 'include',
    //   },
    // });
  },
  async updateUser(data) {
    const res = await instance.patch("users/single", data);
    return res.data;
  },
  async deleteUser(id) {
    const res = await instance.delete("users/single", id);
    return res.data;
  }
};
