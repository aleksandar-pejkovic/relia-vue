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
                <router-link to="/" class="btn btn-secondary btn-lg m-2">Cancel</router-link>
                <div v-if="loading" class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <button class="btn btn-primary m-2" type="submit">Login</button>
            </div>
        </form>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'
import { useCompaniesStore } from '@/stores/companies'
import { useProductsStore } from '@/stores/products'
import { useUserStore } from '@/stores/user'
import Swal from 'sweetalert2'
import { useInvoicesStore } from '@/stores/invoices'

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

                await authStore.login(this.username, this.password)
                await userStore.fetchUser()
                await companiesStore.fetchCompanies()
                await companiesStore.fetchOwnCompany()
                await productsStore.fetchProducts()
                await invoicesStore.fetchInvoices()

                this.loading = false
                this.$router.push("/dashboard");
                await this.showSuccessMessage();
            }
            catch (error) {
                this.loading = false
                Swal.fire({
                    title: "Login unsuccessful!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        },
        async showSuccessMessage() {
            await Swal.fire({
                title: "Welcome!",
                text: "You successfully logged in to your account.",
                icon: "success",
                confirmButtonText: "OK",
            });
        },
        async showErrorMessage() {
            await Swal.fire({
                title: "Login unsuccessful!",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        },
    },
})
</script>

<style></style>
