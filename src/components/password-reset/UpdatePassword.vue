<template>
    <div class="container mt-3">
        <h1>Ažuriranje lozinke</h1>
        <form @submit.prevent="updatePassword" class="row justify-content-center align-items-center flex-column">
            <div class="col-md-6">
                <label class="form-label" for="newPassword">Nova lozinka:</label>
                <input class="form-control" type="password" id="newPassword" v-model="newPassword" />
                <span v-if="passwordError" class="error">{{ passwordError }}</span>
            </div>
            <div class="col-md-6">
                <label for="repeatPassword" class="form-label">Ponovi lozinku:</label>
                <input type="password" class="form-control" id="repeatPassword" v-model="repeatPassword"
                    @input="validateRepeatPassword">
                <span v-if="repeatPasswordError" class="error">{{ repeatPasswordError }}</span>
            </div>
            <div>
                <router-link to="/" class="btn btn-secondary m-2">Otkaži</router-link>
                <button type="submit" class="btn btn-primary m-2">Ažuriraj lozinku</button>
            </div>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <p v-if="successMessage">{{ successMessage }}</p>
        </form>
    </div>
</template>
  
<script>
import axios from "axios";
import { useBaseUrlStore } from "@/stores/baseUrl";
import { showInvalidRequestMessage } from '../helper/message';

export default {
    props: {
        token: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            newPassword: "",
            repeatPassword: "",
            errorMessage: "",
            successMessage: "",
            passwordError: "",
            repeatPasswordError: ""
        };
    },
    methods: {
        updatePassword() {
            this.errorMessage = "";
            this.successMessage = "";
            if (this.passwordError || this.repeatPasswordError) {
                showInvalidRequestMessage();
                return;
            }
            const baseUrl = useBaseUrlStore().baseUrl;
            axios
                .put(`${baseUrl}/api/password/update`, null, {
                    params: {
                        token: this.token,
                        newPassword: this.newPassword
                    }
                })
                .then((response) => {
                    this.successMessage = response.data;
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 500)
                })
                .catch((error) => {
                    this.errorMessage = error.response.data;
                });
        },
        validatePassword() {
            const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
            const isValidPassword = passwordRegex.test(this.newPassword)
            if (!this.newPassword) {
                this.passwordError = 'Lozinka je neophodna.';
            } else if (!isValidPassword) {
                this.passwordError = 'Lozinka mora imati između 6-12 karaktera i sadržati veliko slovo, malo slovo, broj i znak.';
            } else {
                this.passwordError = '';
                this.validateRepeatPassword()
            }
        },
        validateRepeatPassword() {
            if (!this.repeatPassword) {
                this.repeatPasswordError = 'Ponovi lozinku.';
            } else if (this.repeatPassword !== this.newPassword) {
                this.repeatPasswordError = 'Lozinke se ne podudaraju.';
            } else {
                this.repeatPasswordError = '';
            }
        },
    }
};
</script>
  