<template>
  <HeaderDefault />
  <router-view />
</template>

<script>

import HeaderDefault from './components/Header-Default.vue'
export default {
  name: 'App',
  components: {
    HeaderDefault,
  }
}
</script>

<style lang="scss">
  body {
    @include body;
    margin: 0;
    padding: 25px 50px;
    box-sizing: border-box;
    background: #1E1E1E;
  }
</style>
