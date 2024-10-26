import axios from "axios";
import { URL } from "../../src/api/AuthURL";

export const Bearer = "Bearer ";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
      window.location.assign("/login");
    } else {
      return Promise.reject(error);
    }
  }
);

export default {
  post: (url, data) => {
    return axios.post(URL + url, data);
  },

  postWithToken: (url, data) => {
    return axios({
      method: "post",
      data: data,
      url: URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem("A##KEY"),
      },
    });
  },

  getWithParams: (url, params) => {
    return axios({
      method: "get",
      params,
      url: URL + url,
    });
  },

  getWithToken: (url) => {
    return axios({
      method: "get",
      url: URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem("A##KEY"),
      },
    });
  },

  putWithToken: (url, data) => {
    return axios({
      method: "put",
      data: data,
      url: URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem("A##KEY"),
      },
    });
  },

  deleteWithToken: (url, params) => {
    return axios({
      method: "delete",
      params,
      url: URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem("A##KEY"),
      },
    });
  },
};
