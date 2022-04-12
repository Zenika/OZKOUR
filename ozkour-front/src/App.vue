<template>
  <HeaderDefault/>
  <router-view></router-view>
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

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #1E1E1E;
  color: #FFFFFF;
  font-family: 'Open Sans', sans-serif;
}

</style>
