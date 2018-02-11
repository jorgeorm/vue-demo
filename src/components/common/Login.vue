<template>

<div class="login app__login">
  <div class="login__inner">
    <img src="@/assets/logo.png">

    <form v-on:submit.prevent="onLogin" class="login__form form">
      <div class="form__group login__group">
        <label class="label login__label" for="credEmail">Email</label>
        <input  class="form__input login__input"
          v-model="email"
          v-on:blur="validateEmail"
          type="email" name="credEmail" id="creds-email" autofocus>
      </div>
      <div class="form__group login__group">
        <label class="label login__label" for="credPassword">Password</label>
        <input class="form__input login__input"
          v-model="password"
          type="password" name="credPassword" id="creds-password">
      </div>
      <input class="btn login__btn"
        :disabled="cantLogin"
        type="submit" value="Login">
    </form>
  </div>
</div>

</template>

<script>
import auth from '../../modules/auth/auth.service';

/** @constant {Regex} EMAIL_REGEX - 99% success regular expression for validating emails */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default {
  name: 'Login',
  data: () => ({
    email: undefined,
    password: undefined,
    isLoggingIn: false,
    isEmailValid: false,
  }),
  computed: {
    cantLogin() {
      return !this.isEmailValid || this.isLoggingIn;
    },
  },
  methods: {
    onLogin() {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      this.isLoggingIn = true;

      auth.login(credentials)
        .then((success) => {
          if (success) this.$router.replace(this.$route.query.redirect || '/');
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
        })
        .finally(() => {
          this.isLoggingIn = false;
        });
    },
    validateEmail() {
      this.isEmailValid = EMAIL_REGEX.test(this.email);
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/helpers/breakpoints';

.login {

  @media screen and (min-width: $md-bp) {
    border: 1px solid rgba(0,0,0,.25);
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.19),0 3px 11px 0 rgba(0,0,0,0.11);
  }

  &__inner {
      padding: 5px;

      @media screen and (min-width: $sm-bp) {
          padding: 10px;
      }

      @media screen and (min-width: $md-bp) {
          padding: 15px;
      }
  }

  &__input,
  &__label {
      width: 300px;
      padding: 4px;

      @media screen and (min-width: $sm-bp) {
          padding: 12px 4px;
          width: 310px;
      }

      @media screen and (min-width: $md-bp) {
          width: 400px;
      }
  }

  &__input {
      margin: 0;
  }

  &__label {
      padding: 2px 5px;

      @media screen and (min-width: $sm-bp) {
          padding: 4px 5px;
      }
  }

  &__btn {
      width: 250px;
      margin: 16px 0;

      @media screen and (min-width: $md-bp) {
          margin: 22px 0;
          width: 350px;
      }
  }
}
</style>
