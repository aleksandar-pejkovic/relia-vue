<template>
    <div class="main-2 main-login container mt-3">
        <h2>Registracija</h2>
        <form @submit.prevent="register" class="row justify-content-center align-items-center flex-column">
            <div class="col-md-6">
                <label for="username" class="form-label">Korisničko ime:</label>
                <input type="text" class="form-control" id="username" v-model="user.username" @input="validateUsername">
                <span v-if="usernameError" class="error">{{ usernameError }}</span>
            </div>
            <div class="col-md-6">
                <label for="email" class="form-label">Imejl:</label>
                <input type="email" class="form-control" id="email" v-model="user.email" @input="validateEmail">
                <span v-if="emailError" class="error">{{ emailError }}</span>
            </div>
            <div class="col-md-6">
                <label for="name" class="form-label">Ime i prezime:</label>
                <input type="text" class="form-control" id="name" v-model="user.name" @input="validateName">
                <span v-if="nameError" class="error">{{ nameError }}</span>
            </div>
            <div class="col-md-6">
                <label for="password" class="form-label">Lozinka:</label>
                <input type="password" class="form-control" id="password" v-model="user.password" @input="validatePassword">
                <span v-if="passwordError" class="error">{{ passwordError }}</span>
            </div>
            <div class="col-md-6">
                <label for="repeatPassword" class="form-label">Ponovi lozinku:</label>
                <input type="password" class="form-control" id="repeatPassword" v-model="repeatPassword"
                    @input="validateRepeatPassword">
                <span v-if="repeatPasswordError" class="error">{{ repeatPasswordError }}</span>
            </div>
            <div class="col-12">
                <div v-if="loading" class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div v-else>
                    <router-link to="/" class="btn btn-secondary m-2">Otkaži</router-link>
                    <button class="btn btn-primary" type="submit">Registruj se</button>
                </div>
            </div>
        </form>
    </div>
</template>

 
<script>
import { defineComponent } from 'vue'
import { useBaseUrlStore } from '../stores/baseUrl';
import axios from 'axios'
import { showInvalidRequestMessage, showErrorMessage, showSuccessMessage } from '../components/helper/message'

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
                showInvalidRequestMessage()
                return;
            }
            this.loading = true
            const baseUrlStore = useBaseUrlStore()
            const url = baseUrlStore.baseUrl + '/api/users/register'
            try {
                await axios.post(
                    url,
                    this.user,
                    { headers: { "Content-Type": "application/json" } }
                );
                this.loading = false;
                showSuccessMessage('Uspešna registracija!', 'Tvoj nalog je spreman za prijavu.')
                this.$router.push('/login')
            } catch (error) {
                this.loading = false;
                showErrorMessage(error)
            }
        },
        validateUsername() {
            const usernameRegex = /^[a-zA-Z0-9_-]{3,35}$/;
            if (!this.user.username) {
                this.usernameError = 'Username is required.';
            } else if (!usernameRegex.test(this.user.username)) {
                this.usernameError = 'Korisničko ime može imati 3-35 karaktera.';
            } else {
                this.usernameError = '';
            }
        },
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(this.user.email);
            if (!this.user.email) {
                this.emailError = 'Imejl je neophodan.'
            } else if (!isValidEmail) {
                this.emailError = 'Imejl neispravan.';
            } else {
                this.emailError = '';
            }
        },
        validateName() {
            const nameRegex = /^[A-ZČĆŠĐŽ][a-zA-ZčćšđžČĆŠĐŽ]*([ -][A-ZČĆŠĐŽ][a-zA-ZčćšđžČĆŠĐŽ]*){1,49}$/;
            const isValidName = nameRegex.test(this.user.name)
            if (!isValidName) {
                this.nameError = 'Ime neispravno'
            } else {
                this.nameError = ''
            }
        },
        validatePassword() {
            const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
            const isValidPassword = passwordRegex.test(this.user.password)
            if (!this.user.password) {
                this.passwordError = 'Lozinka je neophodna.';
            } else if (!isValidPassword) {
                this.passwordError = 'Lozinka može biti 6-12 karaktera i mora imate veliko slovo, malo svlovo, specijalni znak i broj.';
            } else {
                this.passwordError = '';
                this.validateRepeatPassword()
            }
        },
        validateRepeatPassword() {
            if (!this.repeatPassword) {
                this.repeatPasswordError = 'Ponovi lozinku.';
            } else if (this.repeatPassword !== this.user.password) {
                this.repeatPasswordError = 'Lozinke se ne podudaraju.';
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
