<template>
  <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ReliaBill</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li v-if="loggedIn" class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li  v-if="loggedIn" class="nav-item">
            <RouterLink class="nav-link" to="/customers">Customers</RouterLink>
          </li>
          <li v-if="loggedIn" class="nav-item">
            <RouterLink class="nav-link" to="/invoices">Invoices</RouterLink>
          </li>
          <li v-if="loggedIn" class="nav-item">
            <RouterLink class="nav-link" to="/products">Products</RouterLink>
          </li>
          <li v-if="!loggedIn" class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
          <li v-if="!loggedIn" class="nav-item">
            <RouterLink class="nav-link" to="/register">Register</RouterLink>
          </li>
          <li v-if="loggedIn" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              {{ username }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/profile">Profile</RouterLink>
              </li>
              <li>
                <a class="dropdown-item" @click="logout">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'

export default {
  setup() {
    const authenticationStore = useAuthenticationStore()

    // Compute whether the user is logged in or not
    const loggedIn = computed(() => authenticationStore.isAuthenticated)
    const username = computed(() => authenticationStore.getUsername)

    return {
      loggedIn,
      username
    }
  },
  methods: {
    logout() {
      console.log('Logging out...')
      const authenticationStore = useAuthenticationStore()
      authenticationStore.removeToken()
      authenticationStore.removeUsername()
      this.$router.push("/login")
    }
  }
}
</script>
