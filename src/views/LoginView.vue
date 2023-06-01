<template>
    <div class="container mt-3">
        <h2>Login</h2>
        <form @submit.prevent="login" class="row justify-content-center align-items-center flex-column">
            <div class="col-md-6">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="col-md-6">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="col-12">
                <div v-if="loading" class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div v-else>
                    <router-link to="/" class="btn btn-secondary btn-lg m-2">Cancel</router-link>
                    <button class="btn btn-primary m-2" type="submit">Login</button>
                </div>
            </div>
        </form>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { showSuccessMessage } from '../components/helper/message'
import { useAuthenticationStore } from '@/stores/authentication'
import { useCompaniesStore } from '@/stores/companies'
import { useProductsStore } from '@/stores/products'
import { useUserStore } from '@/stores/user'
import { useInvoicesStore } from '@/stores/invoices'
import { useItemsStore } from '@/stores/items'

export default defineComponent({
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
            loading: false
        };
    },
    methods: {
        async login() {
            this.loading = true
            try {
                const authStore = useAuthenticationStore()
                const userStore = useUserStore()
                const companiesStore = useCompaniesStore()
                const productsStore = useProductsStore()
                const invoicesStore = useInvoicesStore()
                const itemsStore = useItemsStore()

                await authStore.login(this.username, this.password)
                await userStore.fetchUser()
                await companiesStore.fetchOwnCompany()
                await companiesStore.fetchCompanies()
                await invoicesStore.fetchInvoices()
                await productsStore.fetchProducts()
                await itemsStore.fetchAllItems()
                this.loading = false

                if (companiesStore.ownCompany) {
                    this.$router.push("/dashboard");
                } else if (authStore.token) {
                    showSuccessMessage('Enter your company data', 'You can create it later or update it at any time')
                    this.$router.push('/my-company')
                }
            } catch (error) {
                this.loading = false
            }
        },
    },
})
</script>

<style></style>
