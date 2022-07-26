<template>
  <button
    :disabled="disabled"
    type="button"
    :class="{ 'primary-btn': !disabled, 'primary-btn__disabled': disabled }"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: Boolean
})

</script>

<style lang="scss" scoped>
  .primary-btn{
      /* width: 15%; */
      background: linear-gradient(90deg, #EE2238 0%, #C21E65 100%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      color: #FFFFFF;
      font-size: 18px;
      font-weight: 800;
      border: none;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 30px;
      padding: 10px 30px;
      

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