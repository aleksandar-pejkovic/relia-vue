<template>
    <div class="login">
        <h2>Register</h2>
        <form @submit.prevent="register">
            <label>
                Username:
                <input type="text" v-model="username">
            </label>
            <label>
                Email:
                <input type="email" v-model="email">
            </label>
            <label>
                Full Name:
                <input type="text" v-model="name">
            </label>
            <label>
                Password:
                <input type="password" v-model="password">
            </label>
            <label>
                Repeat Password:
                <input type="password">
            </label>
            <button class="submit-button" type="submit">Register</button>
        </form>
    </div>
</template>

 
<script>
import { defineComponent } from 'vue'
import Swal from 'sweetalert2'

export default defineComponent({
    name: "Register",
    data() {
        return {
            username: "",
            password: "",
            email: "",
            name: ""
        };
    },
    methods: {
        async register() {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    name: this.name,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: 'Registration successful!',
                    text: 'You can now login to your account.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    this.$router.push('/login')
                })
            } else {
                console.error(data.message);
            }
        },
    },
})
</script>
  
<style src="../assets/login.css"></style>
