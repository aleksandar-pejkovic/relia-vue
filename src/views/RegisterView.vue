<template>
    <div class="login">
        <h2>Register</h2>
        <form @submit.prevent="register">
            <label>
                Username:
                <input type="text" v-model="user.username" @input="validateUsername">
                <span v-if="usernameError" class="error">{{ usernameError }}</span>
            </label>
            <label>
                Email:
                <input type="email" v-model="user.email" @input="validateEmail">
                <span v-if="emailError" class="error">{{ emailError }}</span>
            </label>
            <label>
                Full Name:
                <input type="text" v-model="user.name" @input="validateName" autocomplete="off">
                <span v-if="nameError" class="error">{{ nameError }}</span>
            </label>
            <label>Password:
                <input type="password" v-model="user.password" @input="validatePassword">
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
            user: {
                username: "",
                password: "",
                email: "",
                name: "",
            },
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
                await axios.post(
                    url,
                    this.user,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
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
            if (!this.user.username) {
                this.usernameError = 'Username is required.';
            } else if (!usernameRegex.test(this.user.username)) {
                this.usernameError = 'Username must be 3-35 characters long and can only contain letters, numbers, underscores, and hyphens.';
            } else {
                this.usernameError = '';
            }
        },
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(this.user.email);
            if (!this.user.email) {
                this.emailError = 'Email is required.'
            } else if (!isValidEmail) {
                this.emailError = 'Please enter a valid email address.';
            } else {
                this.emailError = '';
            }
        },
        validateName() {
            const nameRegex = /^[A-Z][a-zA-Z]*([ \u002D][A-Z][a-zA-Z]*)*$/;
            const isValidName = nameRegex.test(this.user.name)
            if (!isValidName) {
                this.nameError = 'Please enter a valid name'
            } else {
                this.nameError = ''
            }
        },
        validatePassword() {
            const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
            const isValidPassword = passwordRegex.test(this.user.password)
            if (!this.user.password) {
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
            } else if (this.repeatPassword !== this.user.password) {
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
