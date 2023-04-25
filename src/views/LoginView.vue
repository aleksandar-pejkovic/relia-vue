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
import axios from 'axios'

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
            try {
                const data = await this.authenticate();
                await this.updateStore(data);
                await this.showSuccessMessage();
                this.$router.push("/");
            } catch (error) {
                Swal.fire({
                    title: 'Login unsuccessful!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        async authenticate() {
            const baseUrlStore = useBaseUrlStore();
            const url = baseUrlStore.getUrl("auth/login");
            const authHeader = "Basic " + btoa(this.username + ":" + this.password);
            const response = await axios.post(url, null, {
                headers: {
                    Authorization: authHeader
                }
            });
            const data = response.data;
            return data;
        },
        async updateStore(data) {
            const token = await data;
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
