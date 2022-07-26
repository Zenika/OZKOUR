<script setup>
defineProps({
  disabled: Boolean
})

</script>

<template>
  <button
    :disabled="disabled"
    type="button"
    :class="{ 'primary-btn': !disabled, 'primary-btn__disabled': disabled }"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  .primary-btn{
    @include primary-button-hover;
    

    &__disabled{
      @extend .primary-btn;
      opacity: 0.65;
      cursor:not-allowed;
    }

    &:not(.primary-btn__disabled):hover {
      cursor: pointer;
    }   
  }
</style>