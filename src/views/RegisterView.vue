<template>
    <div class="login">
        <h2>Register</h2>
        <form @submit.prevent="register">
            <label>
                Username:
                <input type="text" v-model="username" @input="validateUsername">
                <span v-if="usernameError" class="error">{{ usernameError }}</span>
            </label>
            <label>
                Email:
                <input type="email" v-model="email" @input="validateEmail">
                <span v-if="emailError" class="error">{{ emailError }}</span>
            </label>
            <label>
                Full Name:
                <input type="text" v-model="name" @input="validateName">
                <span v-if="nameError" class="error">{{ nameError }}</span>
            </label>
            <label>
                Password:
                <input type="password" v-model="password" @input="validatePassword">
                <span v-if="passwordError" class="error">{{ passwordError }}</span>
            </label>
            <label>
                Repeat Password:
                <input type="password" v-model="repeatPassword" @input="validateRepeatPassword">
                <span v-if="repeatPasswordError" class="error">{{ repeatPasswordError }}</span>
            </label>
            <button class="submit-button" type="submit">Register</button>
        </form>
    </div>
</template>

 
<script>
import { defineComponent } from 'vue'
import Swal from 'sweetalert2'
import { useBaseUrlStore } from '@/stores/baseUrl'
import axios from 'axios'

export default defineComponent({
    name: "Register",
    data() {
        return {
            username: "",
            password: "",
            email: "",
            name: "",
            repeatPassword: "",
            usernameError: "",
            passwordError: "",
            emailError: "",
            nameError: "",
            repeatPasswordError: ""
        };
    },
    computed: {
        formError() {
            return (
                this.usernameError ||
                this.emailError ||
                this.nameError ||
                this.passwordError ||
                this.repeatPasswordError
            );
        },
    },
    methods: {
        async register() {
            this.loading = true
            if (this.formError) {
                Swal.fire({
                    title: 'Registration unsuccessful!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            const baseUrlStore = useBaseUrlStore()
            const url = baseUrlStore.getUrl('users/register')
            try {
                const response = await axios.post(url, {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    name: this.name,
                },
                    {
                        "Content-Type": "application/json",
                        "Origin": "http://localhost:5173"
                    }
                );
                this.loading = false;
                Swal.fire({
                    title: 'Registration successful!',
                    text: 'You can now login to your account.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    this.$router.push('/login')
                })
            } catch (error) {
                Swal.fire({
                    title: 'Registration unsuccessful!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        validateUsername() {
            const usernameRegex = /^[a-zA-Z0-9_-]{3,35}$/;
            if (!this.username) {
                this.usernameError = 'Username is required.';
            } else if (!usernameRegex.test(this.username)) {
                this.usernameError = 'Username must be 3-35 characters long and can only contain letters, numbers, underscores, and hyphens.';
            } else {
                this.usernameError = '';
            }
        },
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(this.email);
            if (!this.email) {
                this.emailError = 'Email is required.'
            } else if (!isValidEmail) {
                this.emailError = 'Please enter a valid email address.';
            } else {
                this.emailError = '';
            }
        },
        validateName() {
            const nameRegex = /^[A-Z][a-zA-Z]*([ \u002D][A-Z][a-zA-Z]*)*$/;
            const isValidName = nameRegex.test(this.name)
            if (!isValidName) {
                this.nameError = 'Please enter a valid name'
            } else {
                this.nameError = ''
            }
        },
        validatePassword() {
            const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
            const isValidPassword = passwordRegex.test(this.password)
            if (!this.password) {
                this.passwordError = 'Password is required.';
            } else if (!isValidPassword) {
                this.passwordError = 'Password must be 6-12 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.';
            } else {
                this.passwordError = '';
                this.validateRepeatPassword()
            }
        },
        validateRepeatPassword() {
            if (!this.repeatPassword) {
                this.repeatPasswordError = 'Please repeat your password.';
            } else if (this.repeatPassword !== this.password) {
                this.repeatPasswordError = 'Passwords do not match.';
            } else {
                this.repeatPasswordError = '';
            }
        },
    },
    watch: {
        username: 'validateUsername',
        email: 'validateEmail',
        name: 'validateName',
        password: 'validatePassword',
        repeatPassword: 'validateRepeatPassword'
    },
})
</script>
  
<style src="../assets/login.css"></style>
