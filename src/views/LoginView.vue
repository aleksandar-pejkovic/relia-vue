<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <label>
                Username:
                <input type="text" v-model="username">
            </label>
            <label>
                Password:
                <input type="password" v-model="password">
            </label>
            <button class="submit-button" type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'
import { useBaseUrlStore } from '@/stores/baseUrl'
import Swal from 'sweetalert2'

export default defineComponent({
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
    async login() {
        const response = await this.authenticate();
        if (response.ok) {
            await this.updateStore(response);
            await this.showSuccessMessage();
            this.$router.push("/");
        } else {
            await this.showErrorMessage();
            console.error("login error");
        }
    },
    async authenticate() {
        const baseUrlStore = useBaseUrlStore();
        const url = baseUrlStore.getUrl("auth/login");
        const authHeader = "Basic " + btoa(this.username + ":" + this.password);
        return fetch(url, {
            method: "POST",
            headers: {
                Authorization: authHeader,
            },
        });
    },
    async updateStore(response) {
        const token = await response.text();
        const authenticationStore = useAuthenticationStore();
        authenticationStore.setToken(token);
        authenticationStore.setUsername(this.username);
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
            text: "Wrong credentials!",
            icon: "error",
            confirmButtonText: "OK",
        });
    },
},
})
</script>

<style src="../assets/login.css"></style>
