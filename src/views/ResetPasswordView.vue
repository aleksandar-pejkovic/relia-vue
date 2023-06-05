<template>
    <div class="container mt-3">
        <h1>Reset Password</h1>
        <form @submit.prevent="resetPassword" class="row justify-content-center align-items-center flex-column">
            <div class="col-md-6">
                <label class="form-label" for="username">Username:</label>
                <input class="form-control" type="text" id="username" v-model="username" @input="validateUsername" />
                <span v-if="usernameError" class="error">{{ usernameError }}</span>
            </div>
            <div class="col-md-6">
                <label class="form-label" for="oldPassword">Old Password:</label>
                <input class="form-control" type="password" id="oldPassword" v-model="oldPassword"
                    @input="validateOldPassword" />
                <span v-if="oldPasswordError" class="error">{{ oldPasswordError }}</span>
            </div>
            <div class="col-md-6">
                <label class="form-label" for="newPassword">New Password:</label>
                <input class="form-control" type="password" id="newPassword" v-model="newPassword"
                    @input="validatePassword" />
                <span v-if="passwordError" class="error">{{ passwordError }}</span>
            </div>
            <div class="col-md-6">
                <label for="repeatPassword" class="form-label">Repeat Password:</label>
                <input type="password" class="form-control" id="repeatPassword" v-model="repeatPassword"
                    @input="validateRepeatPassword" />
                <span v-if="repeatPasswordError" class="error">{{ repeatPasswordError }}</span>
            </div>
            <div>
                <router-link to="/" class="btn btn-secondary btn-lg m-2">Cancel</router-link>
                <button type="submit" class="btn btn-primary btn-lg m-2">Reset Password</button>
            </div>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <p v-if="successMessage">{{ successMessage }}</p>
        </form>
    </div>
</template>
  
<script>
import axios from "axios";
import { useBaseUrlStore } from "../stores/baseUrl";
import { showInvalidRequestMessage } from '../components/helper/message'

export default {
    data() {
        return {
            username: "",
            oldPassword: "",
            newPassword: "",
            repeatPassword: "",
            errorMessage: "",
            successMessage: "",
            usernameError: "",
            oldPasswordError: "",
            passwordError: "",
            repeatPasswordError: ""
        };
    },
    computed: {
        formError() {
            return (
                this.usernameError ||
                this.oldPasswordError ||
                this.passwordError ||
                this.repeatPasswordError
            );
        },
    },
    methods: {
        resetPassword() {
            this.errorMessage = "";
            this.successMessage = "";
            if (this.formError) {
                showInvalidRequestMessage()
                return;
            }
            const baseUrl = useBaseUrlStore().baseUrl
            axios
                .put(`${baseUrl}/api/users/reset-password`, null, {
                    params: {
                        username: this.username,
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword,
                    },
                })
                .then((response) => {
                    this.successMessage = response.data;
                })
                .catch((error) => {
                    this.errorMessage = error.response.data;
                });
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
        validateOldPassword() {
            const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
            const isValidPassword = passwordRegex.test(this.oldPassword)
            if (!this.oldPassword) {
                this.oldPasswordError = 'Password is required.';
            } else if (!isValidPassword) {
                this.oldPasswordError = 'Password must be 6-12 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.';
            } else {
                this.oldPasswordError = '';
            }
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
    },
};
</script>
  