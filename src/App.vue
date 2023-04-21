<script>
import { RouterLink, RouterView } from 'vue-router'
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
  },
  methods: {
    logout() {
      // perform logout logic, e.g. clear user session, redirect to login page
      console.log('Logging out...')
      const authenticationStore = useAuthenticationStore()
      authenticationStore.removeToken()
      authenticationStore.removeUsername()
      this.$router.push("/")
    }
  }
}
</script>

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
          <li class="nav-item">
            <RouterLink class="nav-link" v-if="loggedIn" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" v-if="loggedIn" to="/customers">Customers</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" v-if="loggedIn" to="/invoices">Invoices</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" v-if="loggedIn" to="/products">Products</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" v-if="!loggedIn" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" v-if="!loggedIn" to="/register">Register</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a v-if="loggedIn" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
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

@media (min-width: 1024px) {}</style>
