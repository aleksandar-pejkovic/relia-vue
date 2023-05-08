<template>
    <!-- Modal -->
    <div class="modal fade" id="createCustomerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Create Customer</h1>
                    <button @click="reset()" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        ref="closeBtn">Close</button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="createCompany">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="company.name"
                                        @input="validateName">
                                    <span v-if="nameError" class="error">{{ nameError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" id="city" v-model="company.city"
                                        @input="validateCity">
                                    <span v-if="cityError" class="error">{{ cityError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="zip">Zip number</label>
                                    <input type="text" class="form-control" id="zip" v-model="company.zip"
                                        @input="validateZip">
                                    <span v-if="zipError" class="error">{{ zipError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input type="text" class="form-control" id="address" v-model="company.street"
                                        @input="validateAddress">
                                    <span v-if="addressError" class="error">{{ addressError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="regNum">Registration number</label>
                                    <input type="text" class="form-control" id="regNum" v-model="company.registrationNumber"
                                        @input="validateRegistrationNumber">
                                    <span v-if="regNumError" class="error">{{ regNumError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="taxNum">Tax number</label>
                                    <input type="text" class="form-control" id="taxNum" v-model="company.taxNumber"
                                        @input="validateTaxNumber">
                                    <span v-if="taxNumError" class="error">{{ taxNumError }}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="bankAcc">Bank account</label>
                                    <input type="text" class="form-control" id="bankAcc" v-model="company.bankAccount"
                                        @input="validateBankAccount">
                                    <span v-if="bankAccError" class="error">{{ bankAccError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input type="text" class="form-control" id="phone" v-model="company.phone"
                                        @input="validatePhoneNumber">
                                    <span v-if="phoneError" class="error">{{ phoneError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" v-model="company.email"
                                        @input="validateEmail">
                                    <span v-if="emailError" class="error">{{ emailError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="website">Website</label>
                                    <input type="text" class="form-control" id="website" v-model="company.website"
                                        @input="validateWebsite">
                                    <span v-if="websiteError" class="error">{{ websiteError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="director">Director</label>
                                    <input type="text" class="form-control" id="director" v-model="company.director"
                                        @input="validateDirector">
                                    <span v-if="directorError" class="error">{{ directorError }}</span>
                                </div>
                            </div>
                        </div>
                        <button @click="reset()" type="reset" class="btn btn-secondary m-2">Reset</button>
                        <div v-if="loading" class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <button v-else type="submit" class="btn btn-success m-2"
                            :class="{ 'disabled': !validateInputs }">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useCompaniesStore } from '@/stores/companies'
import Swal from 'sweetalert2'
import {
    validateName, validateCity, validateZip, validateAddress,
    validateRegistrationNumber, validateTaxNumber, validateBankAccount,
    validatePhoneNumber, validateEmail, validateWebsite, validateDirector
} from '@/components/validation/companyValidation';

export default defineComponent({
    data() {
        return {
            company: {},
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
        async createCompany() {
            if (!this.validateInputs()) {
                Swal.fire({
                    title: 'Validation failed!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            this.loading = true
            const companiesStore = useCompaniesStore()
            await companiesStore.createCompany(this.company)
            this.loading = false
            this.company = {}
            this.$refs.closeBtn.click()
        },
        reset() {
            this.company = {}
            this.resetErrors()
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
