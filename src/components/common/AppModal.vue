<template>

<transition name="modal">
  <div class="modal-mask">
    <div class="modal-mask__inner">
      <div class="modal-mask__container modal">
        <!-- ADD THIS IF YOU CHOOSE TO ADD A TITLE -->
        <div class="modal__header">
          <slot name="header">
            Modal
          </slot>
        </div>

        <!-- PLACE HERE MODAL MESSAGES -->
        <div class="modal__body">
          <slot name="body">
            Modal content
          </slot>
        </div>

        <!-- GENERALLY USED FOR ADDING BUTTONS AND ACTIONALBLES -->
        <div class="modal__footer">
          <slot name="footer">
            Here's the footer

            <button class="btn modal__btn" @click="$emit('close')">OK</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</transition>

</template>

<script>
export default {
  name: 'AppModal',
}
</script>

<style lang="scss">
// Modal mask Block: Used for setting the container for the modal so that displayes a layer above the app
.modal-mask {
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;

  &__inner {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
  }
}

// This is the modal itself
.modal {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;

  &__header {
    margin-top: 0;
  }

  &__body {
    margin: 20px 0;
  }

  &__footer {

  }

  &__button {
    float: right;
  }
}
</style>
