import { OK } from 'http-status-codes';

import { http, signHttp } from '../network';

/** @const {String} AUTH - AUTH URI */
const AUTH = '/auth';

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
      typeof password === 'undefined' || password === '') return false;

    try {
      const { data, status } = await http.post(AUTH, { email, password });

      if (status !== OK || !data.success) return false;

      localStorage.setItem('authToken', data.token);

      return true;
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
      throw err;
    }
  },

  /**
   * Tells if a user is logged in
   * @returns {boolean}
   */
  get isLoggedIn() {
    const token = localStorage.getItem('authToken');
    return typeof token !== 'undefined' && token;
  },

  /**
   * Get's active user instance
   * @return {User}
   */
  async currentUser() {
    const userEndpoint = `${AUTH}/user`;
    if (!this.isLoggedIn) return undefined;

    try {
      const authorized = signHttp();
      return await authorized.post(userEndpoint);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
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
