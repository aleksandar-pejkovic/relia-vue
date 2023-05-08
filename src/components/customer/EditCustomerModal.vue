<template>
    <!-- Modal -->
    <div class="modal fade" id="editCustomerModal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ customer.name }}</h1>
                    <button @click="cancelEditing" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        ref="closeBtn">Close</button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateCustomer">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="customer.name"
                                        :readonly="readOnly" @input="validateName">
                                    <span v-if="nameError" class="error">{{ nameError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" id="city" v-model="customer.city"
                                        :readonly="readOnly" @input="validateCity">
                                    <span v-if="cityError" class="error">{{ cityError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="zip">Zip number</label>
                                    <input type="text" class="form-control" id="zip" v-model="customer.zip"
                                        :readonly="readOnly" @input="validateZip">
                                    <span v-if="zipError" class="error">{{ zipError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input type="text" class="form-control" id="address" v-model="customer.street"
                                        :readonly="readOnly" @input="validateAddress">
                                    <span v-if="addressError" class="error">{{ addressError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="regNum">Registration number</label>
                                    <input type="text" class="form-control" id="regNum"
                                        v-model="customer.registrationNumber" :readonly="readOnly"
                                        @input="validateRegistrationNumber">
                                    <span v-if="regNumError" class="error">{{ regNumError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="taxNum">Tax number</label>
                                    <input type="text" class="form-control" id="taxNum" v-model="customer.taxNumber"
                                        :readonly="readOnly" @input="validateTaxNumber">
                                    <span v-if="taxNumError" class="error">{{ taxNumError }}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="bankAcc">Bank account</label>
                                    <input type="text" class="form-control" id="bankAcc" v-model="customer.bankAccount"
                                        :readonly="readOnly" @input="validateBankAccount">
                                    <span v-if="bankAccError" class="error">{{ bankAccError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input type="text" class="form-control" id="phone" v-model="customer.phone"
                                        :readonly="readOnly" @input="validatePhoneNumber">
                                    <span v-if="phoneError" class="error">{{ phoneError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" v-model="customer.email"
                                        :readonly="readOnly" @input="validateEmail">
                                    <span v-if="emailError" class="error">{{ emailError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="website">Website</label>
                                    <input type="text" class="form-control" id="website" v-model="customer.website"
                                        :readonly="readOnly" @input="validateWebsite">
                                    <span v-if="websiteError" class="error">{{ websiteError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="director">Director</label>
                                    <input type="text" class="form-control" id="director" v-model="customer.director"
                                        :readonly="readOnly" @input="validateDirector">
                                    <span v-if="directorError" class="error">{{ directorError }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="!readOnly">
                            <button @click="cancelEditing" type="button" class="btn btn-secondary m-2">Cancel</button>
                            <button type="submit" class="btn btn-success m-2">Update</button>
                        </div>
                        <div v-else>
                            <button @click="deleteCustomer" type="button" class="btn btn-danger m-2">Delete</button>
                            <button @click="enableEditing" type="button" class="btn btn-primary m-2">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCompaniesStore } from '@/stores/companies'
import Swal from 'sweetalert2'
import {
    validateName, validateCity, validateZip, validateAddress,
    validateRegistrationNumber, validateTaxNumber, validateBankAccount,
    validatePhoneNumber, validateEmail, validateWebsite, validateDirector
} from '@/components/validation/companyValidation';

export default defineComponent({
    computed: {
        customer: {
            get() {
                return { ...useCompaniesStore().editCompany };
            },
            set(value) {
                useCompaniesStore().editCompany = { ...value };
            }
        },
    },
    data() {
        return {
            readOnly: true,
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
        cancelEditing() {
            this.customer = { ...useCompaniesStore().editCompany };
            this.readOnly = true;
            this.resetErrors()
        },
        enableEditing() {
            this.readOnly = false;
        },
        async updateCustomer() {
            if (!this.validateInputs()) {
                Swal.fire({
                    title: 'Validation failed!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            const companiesStore = useCompaniesStore()
            await companiesStore.updateCompany(this.customer)
            this.readOnly = true;
            this.$refs.closeBtn.click()
        },
        async deleteCustomer() {
            const companiesStore = useCompaniesStore()
            await companiesStore.deleteCompany(this.customer)
            this.$refs.closeBtn.click()
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
            this.nameError = validateName(this.customer.name);
        },

        // Function to validate city
        validateCity: function () {
            this.cityError = validateCity(this.customer.city);
        },

        // Function to validate zip number
        validateZip: function () {
            this.zipError = validateZip(this.customer.zip);
        },

        // Function to validate address
        validateAddress: function () {
            this.addressError = validateAddress(this.customer.street);
        },

        // Function to validate registration number
        validateRegistrationNumber: function () {
            this.regNumError = validateRegistrationNumber(this.customer.registrationNumber);
        },

        // Function to validate tax number
        validateTaxNumber: function () {
            this.taxNumError = validateTaxNumber(this.customer.taxNumber);
        },

        // Function to validate bank account
        validateBankAccount: function () {
            this.bankAccError = validateBankAccount(this.customer.bankAccount);
        },

        // Function to validate phone number
        validatePhoneNumber: function () {
            this.phoneError = validatePhoneNumber(this.customer.phone);
        },

        // Function to validate email
        validateEmail: function () {
            this.emailError = validateEmail(this.customer.email);
        },

        // Function to validate website
        validateWebsite: function () {
            this.websiteError = validateWebsite(this.customer.website);
        },

        validateDirector: function () {
            this.directorError = validateDirector(this.customer.director);
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
