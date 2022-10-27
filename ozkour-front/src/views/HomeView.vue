<script setup>
import PrimaryLink from '@/components/Links/PrimaryLink'
</script>

<template>
  <h1>Generateur de Visuel</h1>
  <div id="btn-container">
    <PrimaryLink
      link="/talk"
    >
      Talk
    </PrimaryLink>
    <PrimaryLink
      link="/training"
    >
      Training
    </PrimaryLink>
  </div>
</template>

<style lang="scss" scoped>

  h1{
      @include title-1;
      font-size: 300%;
  }
  #btn-container{
      @include buttons-container
  }
</style>
