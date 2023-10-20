<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/dashboard">ReliaBill</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/dashboard">Radna tabla</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/invoices">Dokumenti</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/customers">Partneri</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/products">Proizvodi</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {{ username }}
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <RouterLink class="dropdown-item" to="/profile">Profil</RouterLink>
                            </li>
                            <li>
                                <RouterLink class="dropdown-item" to="/my-company">Moja firma</RouterLink>
                            </li>
                            <li>
                                <a class="dropdown-item" style="cursor: pointer" @click="logout">Odjavi se</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
  
<script>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'
import { useCompaniesStore } from '@/stores/companies'
import { useProductsStore } from '@/stores/products'
import { useUserStore } from '@/stores/user'
import Swal from 'sweetalert2'
import { useInvoicesStore } from '@/stores/invoices'
import { useItemsStore } from '@/stores/items'

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
            localStorage.clear()
            console.log('Logging out...')
            
            const authenticationStore = useAuthenticationStore()
            const userStore = useUserStore()
            const companiesStore = useCompaniesStore()
            const productsStore = useProductsStore()
            const invoicesStore = useInvoicesStore()
            const itemsStore = useItemsStore()

            authenticationStore.removeToken()
            authenticationStore.removeUsername()
            userStore.reset()
            companiesStore.reset()
            productsStore.reset()
            invoicesStore.reset()
            itemsStore.reset()

            this.$router.push("/")

            Swal.fire({
                title: 'Vidimo se!',
                text: 'Prijatan dan!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
    }
}
</script>

<style scoped>
nav {
    background-color: #343434;
}

nav * {
    font-weight: 600;
    color: white;
}

.dropdown-menu {
    background-color: #343434;
}

.dropdown-menu a:hover {
    color: #343434;
}

.dropdown-item {
    font-weight: 600;
    color: white;
}

.dropdown-item:hover {
    color: gold;
}

.nav-link:hover {
    color: gold;
}
</style>
