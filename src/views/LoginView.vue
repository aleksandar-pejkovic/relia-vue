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
            const baseUrlStore = useBaseUrlStore()
            const url = baseUrlStore.getUrl('auth/login')
            const authHeader = 'Basic ' + btoa(this.username + ':' + this.password)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": authHeader
                }
            });
            const responseData = response.clone();
            if (response.ok) {
                const token = await responseData.text()
                const authenticationStore = useAuthenticationStore();
                authenticationStore.setToken(token);
                authenticationStore.setUsername(this.username)
                Swal.fire({
                    title: 'Welcome!',
                    text: 'You successfully logged in to your account.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    this.$router.push("/")
                })
            } else {
                Swal.fire({
                    title: 'Login unsuccessful!',
                    text: 'Wrong credentials!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                console.error('login error');
            }
        },
    },
})
</script>

<style src="../assets/login.css"></style>
