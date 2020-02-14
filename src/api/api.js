import * as axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const userAPI = {
  async getUsers() {
    const res = await axios.get("users");
    return res.data;
  },
  async getLoggedInUser() {
    const res = await axios.get("users/me");
    return res.data;
  },
  async postUser(data) {
    const res = await axios.post("users", data);
    return res.data;
  },
  async loginUser(data) {
    const res = await axios.post("users/login", data);
    localStorage["user-token"] = res.data.token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    return res.data;
  },
  async logoutUser() {
    const res = await axios.post('users/logout');
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user-token");
    return res.data;
  },
  async updateUser(data) {
    const res = await axios.patch("users/me", data);
    return res.data;
  },
  async deleteUser() {
    const res = await axios.delete("users/me");
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user-token");
    return res.data;
  },
  async addPhoto(newData) {
    const formData = new FormData();
    for (const key in newData) {
      formData.append(key, newData[key]);
    }
    return await axios.post('users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  async getPhoto() {
    const res = await axios.get(`users/me/avatar`);
    return res.data;
  }
};

export const taskAPI = {
  async getTasks(page, done, date, skip) {
    const res = await axios.get(`tasks?limit=7&skip=${skip}&sortBy=createdAt:${date}&page=${page}&completed=${done}`);
    return res.data;
  },
  async getTasksById(id) {
    const res = await axios.get(`tasks?id=${id}`);
    return res.data;
  },
  async postTask(newData) {
    const res = await axios.post('tasks', newData);
    return res.data;
  },
  async updateTask(newData, id) {
    const res = await axios.patch(`tasks/${id}`, newData);
    return res.data;
  },
  async deleteTask(id) {
    const res = await axios.delete(`tasks/${id}`);
    return res.data;
  }
};
