'use strict';

import axios from "axios";
import {APP_URL} from "../store/env";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const JSON_TYPE = 'application/json';

export default {
  post(url, USER, data) {
    return axios({
                   method: 'post',
                   baseURL: APP_URL,
                   url,
                   data: data,
                   timeout: 20000,
                   withCredentials: true,
                   headers: {
                     Accept: JSON_TYPE,
                     'Content-Type': JSON_TYPE
                   },
                   auth: {
                     username: USER.username,
                     password: USER.password
                   }
                 }).then(
      function (response) {
        console.log(response);
        return response;
      })
  },
  get(url, USER, params) {
    return axios({
                   method: 'get',
                   baseURL: APP_URL,
                   url,
                   params,
                   withCredentials: true,
                   timeout: 10000,
                   headers: {
                     Accept: JSON_TYPE
                   },
                   auth: {
                     username: USER.username,
                     password: USER.password
                   }
                 }).then(
      function (response) {
        console.log(response);
        return response;
      })
  },
  put(url, USER, data)
  {
    return axios({
                   method: 'put',
                   baseURL: APP_URL,
                   url,
                   data,
                   withCredentials: true,
                   timeout: 20000,
                   headers: {
                     'Content-Type': JSON_TYPE
                   },
                   auth: {
                     username: USER.username,
                     password: USER.password
                   }
                 }).then(
      function (response) {
        console.log(response);
        return response;
      })
  },
  delete(url, USER, params)
  {
    return axios({
                   method: 'get',
                   baseURL: APP_URL,
                   url,
                   params,
                   withCredentials: true,
                   timeout: 10000,
                   headers: {
                     Accept: JSON_TYPE
                   },
                   auth: {
                     username: USER.username,
                     password: USER.password
                   }
                 }).then(
      function (response) {
        console.log(response);
        return response;
      })
  }
}
