<template>
    <div class="container mt-3">
        <h1>Update Password</h1>
        <form @submit.prevent="updatePassword" class="row justify-content-center align-items-center flex-column">
            <div class="col-md-6">
                <label class="form-label" for="newPassword">New Password:</label>
                <input class="form-control" type="password" id="newPassword" v-model="newPassword" />
                <span v-if="passwordError" class="error">{{ passwordError }}</span>
            </div>
            <div class="col-md-6">
                <label for="repeatPassword" class="form-label">Repeat Password:</label>
                <input type="password" class="form-control" id="repeatPassword" v-model="repeatPassword"
                    @input="validateRepeatPassword">
                <span v-if="repeatPasswordError" class="error">{{ repeatPasswordError }}</span>
            </div>
            <div>
                <router-link to="/" class="btn btn-secondary m-2">Cancel</router-link>
                <button type="submit" class="btn btn-primary m-2">Update Password</button>
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
                .put(`${baseUrl}/api/users/update-password`, null, {
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
            } else if (this.repeatPassword !== this.newPassword) {
                this.repeatPasswordError = 'Passwords do not match.';
            } else {
                this.repeatPasswordError = '';
            }
        },
    }
};
</script>
  