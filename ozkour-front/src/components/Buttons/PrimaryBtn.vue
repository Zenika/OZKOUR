<script setup>
defineProps({
  disabled: Boolean
})

</script>

<template>
  <button
    :disabled="disabled"
    type="button"
    :class="(disabled?'primary-btn__disabled':'primary-btn')"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  .primary-btn{
    @include primary-button;

    &__disabled{
      @extend .primary-btn;
      opacity: 0.65;
      cursor:not-allowed;
    }

    &:not(.primary-btn__disabled):hover {
      cursor: pointer;
      @include primary-button-hover;
    }
  }
</style>
