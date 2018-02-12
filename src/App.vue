<template>
  <div id="app">
    <div class="app__inner">
      <Notification class="app__notification"/>
      <router-view/>
      <!-- <AppFooter class="app__footer" v-once/> -->
    </div>
  </div>
</template>

<script>
import Notification from '@/components/common/Notification';

export default {
  name: 'App',
  components: {
    Notification,
  },
};
</script>

<style lang="scss">
@import 'assets/scss/helpers/main';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  &__inner {
    position: relative;
    height: 100vh;
  }

  &__notification {
    height: 30px;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &__login,
  &__dashboard {
    width: 100%;
    height: 100vh;
  }

  &__login {
    @include bp-min-sm {
      width: 350px;
      margin: auto;
    }

    @include bp-min-md {
      width: 500px;
      height: auto;
    }
  }

  &__footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__modak-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
