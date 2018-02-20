import AuthInjector from '@/modules/auth/auth.service';


import { postHelper, ON_LOGIN_SUCCESS, VALID_CRED } from './auth.test.config';

/**
 * Tests the auth.service that will be in charge to manage
 * the login/logout functionalities
 */
describe('Authentication Service', function () {
  this.authService = null;

  before(function () {
    this.authService = AuthInjector({
      'http-status-codes': {
        OK: 200,
      },
      '@/modules/network': {
        http: {
          post: (uri, data) => postHelper(uri, data),
        },
        axios: {
          create: config => ({
            post: (uri, data) => postHelper(uri, data, config),
          }),
        },
      },
    }).default;
  });

  describe('login', function () {
    it('should resolve true when credentials are valid', function (done) {
      this.authService.login(VALID_CRED)
        .then((status) => {
          status.should.equal(true);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should resolve false when credentials are invalid', function (done) {
      this.authService.login({ email: 'wrong@email.com', password: 'asdf' })
        .then((status) => {
          status.should.equal(false);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should throw error on missing credentials (email/password)', function (done) {
      const noCreds = this.authService.login();
      const noEmail = this.authService.login({ password: 'noemail' });
      const noPass = this.authService.login({ email: 'nopass@email' });

      let cases = [noCreds, noEmail, noPass];

      cases = cases.map(prom => prom.catch(err => Promise.resolve(err)));

      Promise.all(cases)
        .then((errors) => {
          errors.should.be.instanceOf(Array);
          errors.should.have.lengthOf(3);
          errors.forEach((err) => {
            err.should.be.instanceOf(TypeError);
            err.should.have.property('message');
            err.message.should.be.equal('credentials not present');
          });

          done();
        })
        .catch(err => done(err));
    });

    it('should store auth token when credentials valid', function (done) {
      this.authService.login(VALID_CRED)
        .then((status) => {
          if (status) {
            localStorage.getItem('authToken').should.be.eql(ON_LOGIN_SUCCESS.data.token);
            done();
          } else {
            done({ status });
          }
        })
        .catch((err) => { done(err); });
    });
  });

  describe('isLoggedIn', function () {
    xit('should return true if user is logged in');
    xit('should return false if user is not logged in');
  });

  describe('currentUser', function () {
    xit('should resolve user logged in from stored token');
    xit('should throw error if user is not logged in or there\'s no token');
    xit('should use token in the request');
  });

  describe('logout', function () {
    xit('should remove auth token from storage');
  });
});
