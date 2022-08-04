<script setup>
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
</script>

<template>
  <h1>Generateur de Visuel</h1>
  <div id="btn-container">
    <a
      href="./talkform"
    ><PrimaryBtn class="navigation-btn">Talk</PrimaryBtn></a>
    <a
      href="./"
    ><PrimaryBtn class="navigation-btn">Training</PrimaryBtn></a>
  </div>
</template>

<styl lang="scss" scoped>

  h1{
      @include title-1;
      font-size: 300%;
  }
  #btn-container{
      @include buttons-container
  }
  .navigation-btn{
    text-transform: uppercase;
  }
</styl>
