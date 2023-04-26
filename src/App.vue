<template>
  <Navbar v-if="loggedIn"></Navbar>
  <RouterView />
</template>

<script>
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'
import { useAuthenticationStore } from './stores/authentication'

export default {
  computed: {
    loggedIn() {
      return useAuthenticationStore().isAuthenticated
    } 
  },
  components: {
    Navbar
  }
}
</script>
