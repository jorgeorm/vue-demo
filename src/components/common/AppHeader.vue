<template>
  <header class="header">
    <div class="header__inner">
      <a class="btn header__logout-btn" v-on:click.stop="onLogout">Log out</a>
    </div>
  </header>
</template>

<script>
import auth from '@/modules/auth/auth.service';

export default {
  name: 'AppHeader',
  data: () => ({}),
  methods: {
    onLogout() {
      auth.logOut();
      this.$router.replace({ name: 'login' });
    },
  },
};
</script>

<style lang="scss">

.header {
    box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);

    &__inner {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: stretch;
      align-content: center;
    }

    &__logout-btn {
      align-self: end;
    }
}

</style>
