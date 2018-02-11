<template>

<div class="dashboard">
  <AppHeader class="dashboard__header"/>
  <main class="dashboard__content"></main>
</div>

</template>

<script>
import AppHeader from '../common/AppHeader';

export default {
  name: 'Dashboard',
  data: () => ({}),
  components: {
    AppHeader,
  },
};

</script>

<style lang="scss">

.dashboard {
  &__header {
    height: 40px;
    position: fixed;
    top: 0;
    width: 100%;
  }

  &__content {
    padding-top: 40px;
    display: flex;
    flex-flow: column nowrap;
  }
}

</style>
