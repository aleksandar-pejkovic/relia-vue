<template>
    <div class="d-flex flex-column align-items-center">
        <h2>Register</h2>
        <form @submit.prevent="register" class="w-50">
            <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input type="text" class="form-control" id="username" v-model="user.username" @input="validateUsername">
                <span v-if="usernameError" class="error">{{ usernameError }}</span>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="user.email" @input="validateEmail">
                <span v-if="emailError" class="error">{{ emailError }}</span>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Full Name:</label>
                <input type="text" class="form-control" id="name" v-model="user.name" @input="validateName">
                <span v-if="nameError" class="error">{{ nameError }}</span>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" v-model="user.password" @input="validatePassword">
                <span v-if="passwordError" class="error">{{ passwordError }}</span>
            </div>
            <div class="mb-3">
                <label for="repeatPassword" class="form-label">Repeat Password:</label>
                <input type="password" class="form-control" id="repeatPassword" v-model="repeatPassword"
                    @input="validateRepeatPassword">
                <span v-if="repeatPasswordError" class="error">{{ repeatPasswordError }}</span>
            </div>
            <router-link to="/" class="btn btn-secondary btn-lg m-2">Cancel</router-link>
            <div v-if="loading" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <button class="btn btn-primary" type="submit">Register</button>
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
            loading: false,
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
            if (this.formError) {
                Swal.fire({
                    title: 'Registration unsuccessful!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            this.loading = true
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
                this.loading = false;
                let errorMessages = error.message;
                if (error.response && error.response.data) {
                    errorMessages = error.response.data.error || error.response.data.message || errorMessages;
                }
                Swal.fire({
                    title: 'Registration unsuccessful!',
                    text: errorMessages,
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
  
<style></style>
