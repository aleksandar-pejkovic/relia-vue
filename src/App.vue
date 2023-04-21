<script setup>
import { RouterLink, RouterView } from 'vue-router'
import PaladinLogoVue from './components/icons/PaladinLogo.vue'

</script>

<script>
import { computed } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'

export default {
  setup() {
    const authenticationStore = useAuthenticationStore()

    // Compute whether the user is logged in or not
    const loggedIn = computed(() => authenticationStore.isAuthenticated)

    return {
      loggedIn
    }
  }
}
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/customers">Customers</RouterLink>
    <RouterLink to="/invoices">Invoices</RouterLink>
    <RouterLink to="/products">Products</RouterLink>
    <RouterLink v-if="!loggedIn" to="/login">Login</RouterLink>
    <RouterLink v-if="!loggedIn" to="/register">Register</RouterLink>
    <RouterLink v-if="loggedIn" to="/logout">Logout</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  width: 100%;
  height: 7vh;
  font-size: large;
  background-color: royalblue;
  display: flex;
  align-items: center;
}

nav a {
  color: ivory;
  padding: 0 1rem;
}

nav a:hover {
  color: gold;
  transform: scale(1.5);
  transition: 500ms;
}

.active {
  color: aqua;
}

@media (min-width: 1024px) {}
</style>
