import { OK } from 'http-status-codes';

import { http, axios } from '@/modules/network';

/** @const {String} AUTH - AUTH URI */
const AUTH = '/auth';

/**
 * Gets an axios instance for http request with authorization
 * @param {String} [token=localStorage.getItem('auth-token')] - Token to be used
 * @return {axios}
 */
function signHttp(token = localStorage.getItem('auth-token')) {
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * @module authService - Handles Authentication operations
 */
export default {

  /**
  * Logs in a user in to the backend
  * @param {object} creds
  * @param {string} creds.email User's email
  * @param {string} creds.password User's password
  *
  * @return {Promise<User>}
  */
  async login({ email, password } = {}) {
    if (typeof email === 'undefined' || email === '' ||
      typeof password === 'undefined' || password === '') throw new TypeError('credentials not present');

    try {
      const { data, status } = await http.post(AUTH, { email, password });

      if (status !== OK || !data.success) return false;

      localStorage.setItem('authToken', data.token);

      return true;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Tells if a user is logged in
   * @returns {boolean}
   */
  get isLoggedIn() {
    const token = localStorage.getItem('authToken');
    return typeof token !== 'undefined' && token !== null && token !== '';
  },

  /**
   * Get's active user instance
   * @return {User}
   */
  async currentUser() {
    const userEndpoint = `${AUTH}/user`;
    if (!this.isLoggedIn) throw new TypeError('User is not logged in');

    try {
      const signedHttp = signHttp();
      const { data, status } = await signedHttp.post(userEndpoint);

      if (status !== OK || !data.success) return undefined;
      return data.user;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Runs log out of the app
   */
  logOut() {
    localStorage.removeItem('authToken');
  },
};
