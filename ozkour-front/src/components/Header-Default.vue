<template>
  <header>
    <div id="header">
      <div id="header-logo">
        <a
          href="/"
        >
          <img
            id="logoZenika"
            alt="Zenika logo"
            src="../assets/images/logoZenika.png"
          >
        </a>      
      </div>  
      <AuthenticationDefault />
    </div>
  </header>
</template>

<script setup>
import AuthenticationDefault from "@/components/AuthenticationDefault.vue";
</script>

<style lang="scss" scoped>

  #logoZenika{
      max-width: 80%;
      max-height: 80%;
  }
  #imgLogout{
      max-width: 50%;
      max-height: 50%;
      cursor: pointer;
  }
  #header{
      display:flex;
      align-items:center;
      justify-content: space-between;
  }   
  #header-user{
      height:100px;
      line-height : 100px;
      width: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 2%;
      gap:5%;
  }
  div#header-logo{
      width: 15%;
  }
  img{
      display: inline;
  }
  span{
    @include body;
      height:100px;
      line-height : 100px;       
      font-weight: 600;
      display: inline-block;
  }
</style>