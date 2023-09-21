<script setup>
import HeaderDefault from './components/Header-Default.vue'
</script>

<template>
  <HeaderDefault />
  <router-view />
</template>

<style lang="scss">
body {
  @include body;
  margin: 0;
  padding: 25px 50px;
  box-sizing: border-box;
  background: #1e1e1e;
}
</style>
