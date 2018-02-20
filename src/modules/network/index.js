import axios from 'axios';

const API_ENDPOINTS = {
  production: 'https://www.superapi.com/api/',
  staging: 'https://stg.superapi.com/api',
  development: 'http://localhost:3000/api',
};

axios.defaults.baseURL = API_ENDPOINTS[process.env.NODE_ENV];
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.timeout = process.env === 'production' ? 1500 : 30000;

/** @constant {axios} http - Axios instance for http request without authorization */
const http = axios.create();

export default {
  http,
  axios,
};

