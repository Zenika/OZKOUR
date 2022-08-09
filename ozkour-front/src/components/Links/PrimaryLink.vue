<script setup>
defineProps({
  link: {
    type : String,
    required:true
  }
})

</script>

<template>
  <router-link
    :to="link"
    class="navigation-link"
  >
    <slot />
  </router-link>
</template>

<style lang="scss" scoped>
  .navigation-link{
    @include primary-link;
    text-transform: uppercase;
    &:hover{
        @include primary-link-hover;
    }
  }
</style>