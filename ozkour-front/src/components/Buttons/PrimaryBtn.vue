<template>
  <button
    type="button"
    class="primary-btn"
  >
    <slot />
  </button>
</template>

<style scoped>
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
        cursor: pointer;
    }
    .primary-btn:hover {
        background: black;
        color: white;
    }
</style>