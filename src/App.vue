<template>
  <Navbar v-if="loggedIn"></Navbar>
  <RouterView />
  <Footer v-if="loggedIn"></Footer>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'
import { useAuthenticationStore } from './stores/authentication'

export default {
  computed: {
    loggedIn() {
      return useAuthenticationStore().isAuthenticated
    }
  },
  components: {
    Navbar,
    Footer,
  }
}
</script>
