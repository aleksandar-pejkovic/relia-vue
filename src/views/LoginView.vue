<template>
    <div class="main-login main-2 container mt-3">
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
                    <router-link to="/" class="btn btn-secondary m-2">Cancel</router-link>
                    <button class="btn btn-primary m-2" type="submit">Login</button>
                </div>
                <div>
                    <router-link to="/reset-password">Reset password</router-link>
                </div>
            </div>
        </form>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { showSuccessMessage } from '../components/helper/message'
import { useAuthenticationStore } from '@/stores/authentication'
import { useBaseUrlStore } from '@/stores/baseUrl'
import { useCompaniesStore } from '@/stores/companies'
import { useProductsStore } from '@/stores/products'
import { useUserStore } from '@/stores/user'
import { useInvoicesStore } from '@/stores/invoices'
import { useItemsStore } from '@/stores/items'
import axios from 'axios'

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
                const baseUrlStore = useBaseUrlStore()
                const companiesStore = useCompaniesStore()

                await authStore.login(this.username, this.password)

                const response = await axios.get(`${baseUrlStore.baseUrl}/api/auth/data`, {
                    headers: { Authorization: `Bearer ${authStore.token}` }
                })
                const dataMap = response.data

                await this.setUsersData(dataMap)

                showSuccessMessage(`Welcome ${authStore.username}!`, "Nice to see you!");
                if (companiesStore.ownCompany) {
                    this.$router.push("/dashboard");
                } else if (authStore.token) {
                    showSuccessMessage('Enter your company data', 'You can create it later or update it at any time')
                    this.$router.push('/my-company')
                }
            } catch (error) {
            }
            this.loading = false
        },
        async setUsersData(dataMap) {
            const userStore = useUserStore()
            const companiesStore = useCompaniesStore()
            const productsStore = useProductsStore()
            const invoicesStore = useInvoicesStore()
            const itemsStore = useItemsStore()

            const user = dataMap.user;
            const ownCompany = dataMap.ownCompany;
            const companies = dataMap.companies;
            const invoices = dataMap.invoices;
            const products = dataMap.products;
            const items = dataMap.items;

            userStore.setUser(user)
            companiesStore.setOwnCompany(ownCompany)
            companiesStore.setCompanies(companies)
            invoicesStore.setInvoices(invoices)
            productsStore.setProducts(products)
            itemsStore.setItems(items)
        },
    },
})
</script>
