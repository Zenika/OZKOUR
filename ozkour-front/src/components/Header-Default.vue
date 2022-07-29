<template>
  <header>
    <div id="header">
      <div id="header-logo">
        <a
          href="/"
          tabindex="1"
        >
          <img
            id="logoZenika"
            alt="Zenika logo"
            src="../assets/images/logoZenika.png"
          >
        </a>      
      </div>  
      <div id="header-user">
        <span>NOM Prénom</span>
        <img
          id="imgLogout"
          alt="image logout"
          src="../assets/images/logout.png"
          tabindex="2"
          @keyup.enter="test"
          @click="test"
        >
      </div>
    </div>
  </header>
</template>

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
      width:100%;
      display:flex;
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
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 2%;
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