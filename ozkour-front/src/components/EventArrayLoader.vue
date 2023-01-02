<template>
  <div
    class="loading-container"
  >
    <div class="loading">
      <div class="spinner">
        <div class="head" />
      </div>
    </div>
  </div>
</template>

<style>
.loading-container {
    display:grid;
    justify-content:center;
    margin:1.5em;
    left:48.5%;
    top:50%;
  }

  .loading {
    border-radius:50%;
    width:3em;
    height:3em;
    transform-origin:center;
    animation: rotate 1s linear infinite;
  }

  .spinner {
    width: 4em;
    height: 4em;
    left: -1.1em;
    top: -1.1em;

    border-top: 1em solid #ffffffac;
    position:relative;
    border-right: 1em solid transparent;
    border-radius: 50%;
  }

  .head {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin-left: 3.45em;
    margin-top: -0.37em;
    background-color: #ffffffff;
  }

  @keyframes rotate{
    to{
      transform:rotate(360deg);
    }
  }
</style>
