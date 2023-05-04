<template>
    <form>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" v-model="company.name" :readonly="readOnly"
                        @input="validateName">
                    <span v-if="nameError" class="error">{{ nameError }}</span>
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" v-model="company.city" :readonly="readOnly"
                        @input="validateCity">
                    <span v-if="cityError" class="error">{{ cityError }}</span>
                </div>
                <div class="form-group">
                    <label for="zip">Zip number</label>
                    <input type="text" class="form-control" id="zip" v-model="company.zip" :readonly="readOnly"
                        @input="validateZip">
                    <span v-if="zipError" class="error">{{ zipError }}</span>
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" v-model="company.street" :readonly="readOnly"
                        @input="validateAddress">
                    <span v-if="addressError" class="error">{{ addressError }}</span>
                </div>
                <div class="form-group">
                    <label for="regNum">Registration number</label>
                    <input type="text" class="form-control" id="regNum" v-model="company.registrationNumber"
                        :readonly="readOnly" @input="validateRegistrationNumber">
                    <span v-if="regNumError" class="error">{{ regNumError }}</span>
                </div>
                <div class="form-group">
                    <label for="taxNum">Tax number</label>
                    <input type="text" class="form-control" id="taxNum" v-model="company.taxNumber" :readonly="readOnly"
                        @input="validateTaxNumber">
                    <span v-if="taxNumError" class="error">{{ taxNumError }}</span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="bankAcc">Bank account</label>
                    <input type="text" class="form-control" id="bankAcc" v-model="company.bankAccount" :readonly="readOnly"
                        @input="validateBankAccount">
                    <span v-if="bankAccError" class="error">{{ bankAccError }}</span>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="text" class="form-control" id="phone" v-model="company.phone" :readonly="readOnly"
                        @input="validatePhoneNumber">
                    <span v-if="phoneError" class="error">{{ phoneError }}</span>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="company.email" :readonly="readOnly"
                        @input="validateEmail">
                    <span v-if="emailError" class="error">{{ emailError }}</span>
                </div>
                <div class="form-group">
                    <label for="website">Website</label>
                    <input type="text" class="form-control" id="website" v-model="company.website" :readonly="readOnly"
                        @input="validateWebsite">
                    <span v-if="websiteError" class="error">{{ websiteError }}</span>
                </div>
                <div class="form-group">
                    <label for="director">Director</label>
                    <input type="text" class="form-control" id="director" v-model="company.director" :readonly="readOnly"
                        @input="validateDirector">
                    <span v-if="directorError" class="error">{{ directorError }}</span>
                </div>
            </div>
        </div>
        <div v-if="!companyExists">
            <button @click.prevent="createOwnCompany" type="submit" class="btn btn-success m-2">Create</button>
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else>
            <div v-if="!readOnly">
                <button @click="cancelEditing" type="button" class="btn btn-secondary m-2">Cancel</button>
                <span class="visually-hidden">Loading...</span>
                <button @click.prevent="updateOwnCompany" type="submit" class="btn btn-success m-2">Update</button>
            </div>
            <div v-else>
                <button @click="enableEditing" type="button" class="btn btn-primary m-2">Edit</button>
            </div>
        </div>
    </form>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication'
import { useBaseUrlStore } from '@/stores/baseUrl'
import axios from 'axios';
import Swal from 'sweetalert2'
import {
    validateName, validateCity, validateZip, validateAddress,
    validateRegistrationNumber, validateTaxNumber, validateBankAccount,
    validatePhoneNumber, validateEmail, validateWebsite, validateDirector
} from './validation';

export default defineComponent({
    mounted() {
        this.loadOwnCompany()
    },
    data() {
        return {
            company: {},
            companyExists: true,
            readOnly: true,
            url: useBaseUrlStore().getUrl('companies'),
            token: useAuthenticationStore().token,
            loading: false,
            nameError: '',
            cityError: '',
            zipError: '',
            addressError: '',
            regNumError: '',
            taxNumError: '',
            bankAccError: '',
            phoneError: '',
            emailError: '',
            websiteError: '',
            directorError: '',
        }
    },
    methods: {
        async loadOwnCompany() {
            try {
                const response = await axios.get(this.url + `/own`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.data;
                this.company = await data;
                this.companyExists = true;
                this.readOnly = true
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Handle 404 error here
                    this.companyExists = false
                    this.readOnly = false
                    console.error("Company not found");
                } else {
                    // Handle other errors here
                    console.error(error);
                    let errorMessages = error.message;
                    if (error.response && error.response.data) {
                        errorMessages = error.response.data.error || error.response.data.message || errorMessages;
                    }
                    Swal.fire({
                        title: error,
                        text: errorMessages,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        },
        resetErrors() {
            this.nameError = "";
            this.cityError = "";
            this.zipError = "";
            this.addressError = "";
            this.regNumError = "";
            this.taxNumError = "";
            this.bankAccError = "";
            this.phoneError = "";
            this.emailError = "";
            this.websiteError = "";
            this.directorError = "";
        },
        async createOwnCompany() {
            if (!this.validateInputs()) {
                Swal.fire({
                    title: 'Creating company unsuccessful!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            this.loading = true
            try {
                await axios.post(
                    this.url + `/own`,
                    this.company,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.token}`,
                        }
                    }
                );
                this.loading = false
                this.loadOwnCompany()
                Swal.fire({
                    title: `Company was created!`,
                    text: `You can find it on 'My company' page.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } catch (error) {
                this.loading = false;
                this.resetErrors()
                this.loadOwnCompany()
                let errorMessages = error.message;
                if (error.response && error.response.data) {
                    errorMessages = error.response.data.error || error.response.data.message || errorMessages;
                }
                Swal.fire({
                    title: 'Request unsuccessful!',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        cancelEditing() {
            this.readOnly = true;
            this.resetErrors()
            this.loadOwnCompany()
        },
        enableEditing() {
            this.readOnly = false;
        },
        updateOwnCompany() {
            if (!this.validateInputs()) {
                Swal.fire({
                    title: 'Invalid request!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            this.loading = true
            axios.put(this.url, this.company, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            }).then(() => {
                this.readOnly = true;
                this.loading = false
                this.resetErrors()
                this.loadOwnCompany()
                Swal.fire({
                    title: `Company updated`,
                    text: 'Company was successfully updated',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }).catch(error => {
                this.resetErrors()
                this.loading = false
                this.loadOwnCompany()
                console.error(error);
                let errorMessages = error.message;
                if (error.response && error.response.data) {
                    errorMessages = error.response.data.error || error.response.data.message || errorMessages;
                }
                Swal.fire({
                    title: 'Update unsuccessful!',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        },
        // Function to validate company name
        validateName: function () {
            this.nameError = validateName(this.company.name);
        },

        // Function to validate city
        validateCity: function () {
            this.cityError = validateCity(this.company.city);
        },

        // Function to validate zip number
        validateZip: function () {
            this.zipError = validateZip(this.company.zip);
        },

        // Function to validate address
        validateAddress: function () {
            this.addressError = validateAddress(this.company.street);
        },

        // Function to validate registration number
        validateRegistrationNumber: function () {
            this.regNumError = validateRegistrationNumber(this.company.registrationNumber);
        },

        // Function to validate tax number
        validateTaxNumber: function () {
            this.taxNumError = validateTaxNumber(this.company.taxNumber);
        },

        // Function to validate bank account
        validateBankAccount: function () {
            this.bankAccError = validateBankAccount(this.company.bankAccount);
        },

        // Function to validate phone number
        validatePhoneNumber: function () {
            this.phoneError = validatePhoneNumber(this.company.phone);
        },

        // Function to validate email
        validateEmail: function () {
            this.emailError = validateEmail(this.company.email);
        },

        // Function to validate website
        validateWebsite: function () {
            this.websiteError = validateWebsite(this.company.website);
        },

        validateDirector: function () {
            this.directorError = validateDirector(this.company.director);
        },
        // Function to validate all inputs
        validateInputs: function () {
            this.validateName();
            this.validateCity();
            this.validateZip();
            this.validateAddress();
            this.validateRegistrationNumber();
            this.validateTaxNumber();
            this.validateBankAccount();
            this.validatePhoneNumber();
            this.validateEmail();
            this.validateWebsite();
            this.validateDirector();
            // Check if there are any errors
            const errors = [this.nameError, this.cityError, this.zipError, this.addressError, this.regNumError, this.taxNumError, this.bankAccError, this.phoneError, this.emailError, this.websiteError, this.directorError];
            if (errors.every((error) => error === "")) {
                return true
            } else {
                return false
            }
        },
    },
})

</script>
