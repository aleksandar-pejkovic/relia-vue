<template>
    <div class="container mt-3">
        <h1>Resetuj lozinku</h1>
        <form @submit.prevent="resetPassword" class="row justify-content-center align-items-center flex-column">
            <div class="col-md-6">
                <label class="form-label" for="email">Imejl:</label>
                <input class="form-control" type="email" id="email" v-model="email" @input="validateEmail" />
                <span v-if="emailError" class="error">{{ emailError }}</span>
            </div>
            <div>
                <router-link to="/" class="btn btn-secondary m-2">Otkaži</router-link>
                <button type="submit" class="btn btn-primary m-2">Pošalji link</button>
            </div>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <p v-if="successMessage">{{ successMessage }}</p>
        </form>
    </div>
</template>
  
<script>
import axios from "axios";
import { useBaseUrlStore } from "@/stores/baseUrl";
import { showInvalidRequestMessage } from '../helper/message'

export default {
    data() {
        return {
            email: "",
            errorMessage: "",
            successMessage: "",
            emailError: "",
        };
    },
    computed: {
        formError() {
            return this.emailError;
        },
    },
    methods: {
        resetPassword() {
            this.errorMessage = "";
            this.successMessage = "";
            if (this.formError) {
                showInvalidRequestMessage();
                return;
            }
            const baseUrl = useBaseUrlStore().baseUrl;
            axios
                .post(`${baseUrl}/api/password/reset`, null, {
                    params: {
                        email: this.email
                    }
                })
                .then((response) => {
                    this.successMessage = response.data;
                })
                .catch((error) => {
                    this.errorMessage = error.response.data;
                });
        },
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.email) {
                this.emailError = "Unesi imejl.";
            } else if (!emailRegex.test(this.email)) {
                this.emailError = "Nepravilan format imejla.";
            } else {
                this.emailError = "";
            }
        },
    },
};
</script>
  