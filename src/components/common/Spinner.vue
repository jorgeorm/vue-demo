<template>

  <div class="spinner" v-show="active">
    <div class="spinner__clip clip" v-bind:style="spinnerStyle">
    </div>
  </div>

</template>

<script>
export default {
  name: 'Spinner',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '20px',
    },
    radius: {
      type: String,
      default: '100%',
    },
  },
  computed: {
    spinnerStyle() {
      return {
        height: this.size,
        width: this.size,
        borderRadius: this.radius,
      };
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/helpers/animations';

.spiner {
  text-align: center;
}

.clip {
  border-width: 2px;
  border-style: solid;
  border-color: #f2f2f2 #f2f2f2 transparent;
  background: transparent;

  @include animation(clipDelay 0.75s 0s infinite linear);
  @include animation-fill-mode(both);
}

@include keyframes(clipDelay) {
  0% { @include transform(rotate(0deg) scale(1)); }
  50% { @include transform(rotate(180deg) scale(0.8)); }
  100% { @include transform(rotate(360deg) scale(1)); }
}

</style>
