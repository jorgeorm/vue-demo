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
axios.defaults.timeout = 2000;

/** @constant {axios} http - Axios instance for http request without authorization */
export const http = axios.create();


/**
 * Gets an axios instance for http request with authorization
 * @return {axios}
 */
export const signHttp = () => axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
  },
});
