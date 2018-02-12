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
      <div class="login__action">
        <Spinner class="login__spinner"
          v-bind:active="isLoggingIn"/>
        <input class="btn login__btn"
          :disabled="cantLogin"
          type="submit" value="Login">
      </div>
    </form>
  </div>
</div>

</template>

<script>
import auth from '@/modules/auth/auth.service';
import Spinner from '@/components/common/Spinner';

/** @constant {Regex} EMAIL_REGEX - 99% success regular expression for validating emails */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default {
  name: 'Login',
  components: {
    Spinner,
  },
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
@import '../../assets/scss/helpers/main';

.login {

  @include bp-min-md {
    border: 1px solid rgba(0,0,0,.25);
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.19),0 3px 11px 0 rgba(0,0,0,0.11);
  }

  &__inner {
      padding: 5px;

      @include bp-min-sm {
          padding: 10px;
      }

      @include bp-min-md {
          padding: 15px;
      }
  }

  &__input,
  &__label {
      width: 300px;
      padding: 4px;

      @include bp-min-sm {
          padding: 12px 4px;
          width: 310px;
      }

      @include bp-min-md {
          width: 400px;
      }
  }

  &__input {
      margin: 0;
  }

  &__label {
      padding: 2px 5px;

      @include bp-min-sm {
          padding: 4px 5px;
      }
  }

  &__action {
    position: relative;
    margin: 16px 0;

    @include bp-min-md {
        margin: 22px 0;
        width: 350px;
    }
  }

  &__btn {
      width: 250px;
  }

  &__spinner {
    position: absolute;
    margin: 8px;
    top: 0;
    left: 0;
  }
}
</style>
