import { OK, UNAUTHORIZED } from 'http-status-codes';

const AUTH_URI = '/auth';
const USER_URI = '/auth/user';

export const VALID_CRED = { email: 'fake@email.com', password: 'fakePass' };

export const ON_SUCCESS_USER = {
  status: OK,
  data: {
    success: true,
    user: {
      id: 'fakeId',
      firstname: 'Fname',
      lastname: 'Lname',
      role: 'admin',
    },
  },
};

export const ON_LOGIN_SUCCESS = {
  status: OK,
  data: {
    success: true,
    token: 'falseToken',
  },
};

export const ON_INVALID_CRED = {
  status: UNAUTHORIZED,
  data: { success: false, data: 'Wrong email/password' },
};

export const ON_UNAUTH_USER = {
  status: UNAUTHORIZED,
  data: { success: false, data: 'Unauthorized' },
};

export function postHelper(uri, data, config) {
  const validCreds = data &&
    data.email &&
    data.password &&
    data.email === VALID_CRED.email &&
    data.password === VALID_CRED.password;

  const goodToken = config && config.headers && config.headers.Authorization === `Bearer ${ON_LOGIN_SUCCESS.data.token}`;

  switch (uri) {
    case AUTH_URI:
      if (validCreds) return Promise.resolve(ON_LOGIN_SUCCESS);
      return Promise.resolve(ON_INVALID_CRED);
    case USER_URI:
      if (goodToken) return Promise.resolve(ON_SUCCESS_USER);
      return Promise.resolve(ON_UNAUTH_USER);
    default:
      return Promise.resolve({ status: 500 });
  }
}
