<template>
  <div
    v-if="isAuthenticated"
    class="auth-container"
  >
    <img
      :src="user.picture"
      alt=""
      class="auth-container__img auth-container__img--profile"
    >
    <span>{{ user.name }}</span>
    <img
      id="imgLogout"
      class="auth-container__img"
      alt="se déconnecter"
      role="button"
      tabindex="0"
      src="../assets/images/logout.png"
      @keyup.enter="doLogout"
      @click="doLogout"
    >
  </div>
  <div
    v-else
    id="header-user"
  >
    <img
      id="imgLogin"
      class="auth-container__img"
      alt="se connecter"
      role="button"
      tabindex="0"
      src="../assets/images/login.png"
      @keyup.enter="login"
      @click="login"
    >
  </div>
</template>
<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0()

const login = () => {
  loginWithRedirect()
}

const doLogout = () => {
  logout({ returnTo: window.location.origin })
}
</script>
<style lang="scss">
  .auth-container{
      display: flex;
      align-items: center;
      gap:20px;

    &__img{
      width: 2rem;
      height: 2rem;
      cursor: pointer;

      &--profile{
        border-radius:50%;
        cursor: initial;
      }
    }
  }
  span{
    @include body;
      height:100px;
      line-height : 100px;
      font-weight: 600;
      display: inline-block;
  }
</style>
