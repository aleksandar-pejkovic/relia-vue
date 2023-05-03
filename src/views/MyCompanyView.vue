<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">My company</h5>
            </div>
            <div class="card-body">
                <div v-if="!existingCompany" class="container mt-2">
                    <form @submit.prevent="createOwnCompany">
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
                        <div v-if="loading" class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <button v-else type="submit" class="btn btn-success m-2"
                            :class="{ 'disabled': !validateInputs }">Create</button>
                    </form>
                </div>
                <div v-else class="container mt-2">
                    <form @submit.prevent="updateOwnCompany">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="existingCompany.name"
                                        :readonly="readOnly" @input="validateName2">
                                    <span v-if="nameError" class="error">{{ nameError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" id="city" v-model="existingCompany.city"
                                        :readonly="readOnly" @input="validateCity2">
                                    <span v-if="cityError" class="error">{{ cityError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="zip">Zip number</label>
                                    <input type="text" class="form-control" id="zip" v-model="existingCompany.zip"
                                        :readonly="readOnly" @input="validateZip2">
                                    <span v-if="zipError" class="error">{{ zipError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input type="text" class="form-control" id="address" v-model="existingCompany.street"
                                        :readonly="readOnly" @input="validateAddress2">
                                    <span v-if="addressError" class="error">{{ addressError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="regNum">Registration number</label>
                                    <input type="text" class="form-control" id="regNum"
                                        v-model="existingCompany.registrationNumber" :readonly="readOnly"
                                        @input="validateRegistrationNumber2">
                                    <span v-if="regNumError" class="error">{{ regNumError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="taxNum">Tax number</label>
                                    <input type="text" class="form-control" id="taxNum" v-model="existingCompany.taxNumber"
                                        :readonly="readOnly" @input="validateTaxNumber2">
                                    <span v-if="taxNumError" class="error">{{ taxNumError }}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="bankAcc">Bank account</label>
                                    <input type="text" class="form-control" id="bankAcc"
                                        v-model="existingCompany.bankAccount" :readonly="readOnly"
                                        @input="validateBankAccount2">
                                    <span v-if="bankAccError" class="error">{{ bankAccError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input type="text" class="form-control" id="phone" v-model="existingCompany.phone"
                                        :readonly="readOnly" @input="validatePhoneNumber2">
                                    <span v-if="phoneError" class="error">{{ phoneError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" v-model="existingCompany.email"
                                        :readonly="readOnly" @input="validateEmail2">
                                    <span v-if="emailError" class="error">{{ emailError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="website">Website</label>
                                    <input type="text" class="form-control" id="website" v-model="existingCompany.website"
                                        :readonly="readOnly" @input="validateWebsite2">
                                    <span v-if="websiteError" class="error">{{ websiteError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="director">Director</label>
                                    <input type="text" class="form-control" id="director" v-model="existingCompany.director"
                                        :readonly="readOnly" @input="validateDirector2">
                                    <span v-if="directorError" class="error">{{ directorError }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="!readOnly">
                            <button @click="cancelEditing" type="button" class="btn btn-secondary m-2">Cancel</button>
                            <span class="visually-hidden">Loading...</span>
                            <button type="submit" class="btn btn-success m-2"
                                :class="{ 'disabled': !validateInputs2 }">Update</button>
                        </div>
                        <div v-else>
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
import { useAuthenticationStore } from '@/stores/authentication'
import { useBaseUrlStore } from '@/stores/baseUrl'
import axios from 'axios';
import Swal from 'sweetalert2'

export default defineComponent({
    mounted() {
        this.loadOwnCompany()
    },
    data() {
        return {
            readOnly: true,
            url: useBaseUrlStore().getUrl('companies'),
            token: useAuthenticationStore().token,
            existingCompany: null,
            company: {
                name: '',
                city: '',
                zip: '',
                street: '',
                registrationNumber: '',
                taxNumber: '',
                bankAccount: '',
                phone: '',
                email: '',
                website: '',
                director: ''
            },
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
        createOwnCompany() {
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
                axios.post(
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
                Object.keys(this.company).forEach(key => {
                    this.company[key] = ''
                });
                this.resetErrors()
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
                let errorMessages = null
                if (error.response && error.response.data) {
                    errorMessages = Object.values(error.response.data).join("\n");
                } else {
                    errorMessages = error.message
                }
                Swal.fire({
                    title: 'Registration unsuccessful!',
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
        async loadOwnCompany() {
            try {
                const response = await axios.get(this.url + `/own`, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.data;
                this.existingCompany = await data;
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Handle 404 error here
                    console.error("Company not found");
                } else {
                    // Handle other errors here
                    console.error(error);
                }
            }
        },
        updateOwnCompany() {
            if (!this.validateInputs2()) {
                Swal.fire({
                    title: 'Creating company unsuccessful!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            this.loading = true
            axios.put(this.url, this.existingCompany, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            }).then(() => {
                this.readOnly = true;
                this.loading = false
                this.resetErrors()
                Swal.fire({
                    title: `Company updated`,
                    text: 'Company was successfully updated',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }).catch(error => {
                this.resetErrors()
                this.loading = false
                console.error(error);
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
            const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
            if (!regex.test(this.company.name)) {
                this.nameError = "Please enter a valid name";
            } else {
                this.nameError = "";
            }
        },

        // Function to validate city
        validateCity: function () {
            const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
            if (!regex.test(this.company.city)) {
                this.cityError = "Please enter a valid city";
            } else {
                this.cityError = "";
            }
        },

        // Function to validate zip number
        validateZip: function () {
            const regex = /^[0-9]{5}$/; // Only allows 5 digits
            if (!regex.test(this.company.zip)) {
                this.zipError = "Please enter a valid zip number";
            } else {
                this.zipError = "";
            }
        },

        // Function to validate address
        validateAddress: function () {
            const regex = /^[a-zA-Z0-9\s]*$/; // Allows letters, numbers, and spaces
            if (!regex.test(this.company.street)) {
                this.addressError = "Please enter a valid address";
            } else {
                this.addressError = "";
            }
        },

        // Function to validate registration number
        validateRegistrationNumber: function () {
            const regex = /^[0-9]{8}$/; // Only allows 8 digits
            if (!regex.test(this.company.registrationNumber)) {
                this.regNumError = "Please enter a valid registration number";
            } else {
                this.regNumError = "";
            }
        },

        // Function to validate tax number
        validateTaxNumber: function () {
            const regex = /^[0-9]{9}$/; // Only allows 9 digits
            if (!regex.test(this.company.taxNumber)) {
                this.taxNumError = "Please enter a valid tax number";
            } else {
                this.taxNumError = "";
            }
        },

        // Function to validate bank account
        validateBankAccount: function () {
            const regex = /^(?:\d{3})-(?:0*(\d{1,13})|\1)-(\d{2})$/; // Only allows 12 digits
            if (!regex.test(this.company.bankAccount)) {
                this.bankAccError = "Please enter a valid bank account number";
            } else {
                this.bankAccError = "";
            }
        },

        // Function to validate phone number
        validatePhoneNumber: function () {
            const regex = /^([+\d{1,3}])?[\d\-/]{6,15}$/;
            if (!regex.test(this.company.phone)) {
                this.phoneError = "Please enter a valid phone number";
            } else {
                this.phoneError = "";
            }
        },

        // Function to validate email
        validateEmail: function () {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Checks if input is in email format
            if (!regex.test(this.company.email)) {
                this.emailError = "Please enter a valid email address";
            } else {
                this.emailError = "";
            }
        },

        // Function to validate website
        validateWebsite: function () {
            const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/?[a-zA-Z0-9-]*$/; // Checks if input is in website format
            if (!regex.test(this.company.website)) {
                this.websiteError = "Please enter a valid website address";
            } else {
                this.websiteError = "";
            }
        },

        validateDirector: function () {
            const regex = /^[a-zA-Z\s]*$/; // Checks if input is in website format
            if (!regex.test(this.company.director)) {
                this.directorError = "Please enter a valid director name";
            } else {
                this.directorError = "";
            }
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
        // Function to validate company name
        validateName2: function () {
            const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
            if (!regex.test(this.existingCompany.name)) {
                this.nameError = "Please enter a valid name";
            } else {
                this.nameError = "";
            }
        },

        // Function to validate city
        validateCity2: function () {
            const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
            if (!regex.test(this.existingCompany.city)) {
                this.cityError = "Please enter a valid city";
            } else {
                this.cityError = "";
            }
        },

        // Function to validate zip number
        validateZip2: function () {
            const regex = /^[0-9]{5}$/; // Only allows 5 digits
            if (!regex.test(this.existingCompany.zip)) {
                this.zipError = "Please enter a valid zip number";
            } else {
                this.zipError = "";
            }
        },

        // Function to validate address
        validateAddress2: function () {
            const regex = /^[a-zA-Z0-9\s]*$/; // Allows letters, numbers, and spaces
            if (!regex.test(this.existingCompany.street)) {
                this.addressError = "Please enter a valid address";
            } else {
                this.addressError = "";
            }
        },

        // Function to validate registration number
        validateRegistrationNumber2: function () {
            const regex = /^[0-9]{8}$/; // Only allows 8 digits
            if (!regex.test(this.existingCompany.registrationNumber)) {
                this.regNumError = "Please enter a valid registration number";
            } else {
                this.regNumError = "";
            }
        },

        // Function to validate tax number
        validateTaxNumber2: function () {
            const regex = /^[0-9]{9}$/; // Only allows 9 digits
            if (!regex.test(this.existingCompany.taxNumber)) {
                this.taxNumError = "Please enter a valid tax number";
            } else {
                this.taxNumError = "";
            }
        },

        // Function to validate bank account
        validateBankAccount2: function () {
            const regex = /^(?:\d{3})-(?:0*(\d{1,13})|\1)-(\d{2})$/; // Only allows 12 digits
            if (!regex.test(this.existingCompany.bankAccount)) {
                this.bankAccError = "Please enter a valid bank account number";
            } else {
                this.bankAccError = "";
            }
        },

        // Function to validate phone number
        validatePhoneNumber2: function () {
            const regex = /^([+\d{1,3}])?[\d\-/]{6,15}$/;
            if (!regex.test(this.existingCompany.phone)) {
                this.phoneError = "Please enter a valid phone number";
            } else {
                this.phoneError = "";
            }
        },

        // Function to validate email
        validateEmail2: function () {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Checks if input is in email format
            if (!regex.test(this.existingCompany.email)) {
                this.emailError = "Please enter a valid email address";
            } else {
                this.emailError = "";
            }
        },

        // Function to validate website
        validateWebsite2: function () {
            const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/?[a-zA-Z0-9-]*$/; // Checks if input is in website format
            if (!regex.test(this.existingCompany.website)) {
                this.websiteError = "Please enter a valid website address";
            } else {
                this.websiteError = "";
            }
        },

        validateDirector2: function () {
            const regex = /^[a-zA-Z\s]*$/; // Checks if input is in website format
            if (!regex.test(this.existingCompany.director)) {
                this.directorError = "Please enter a valid director name";
            } else {
                this.directorError = "";
            }
        },
        // Function to validate all inputs
        validateInputs2: function () {
            this.validateName2();
            this.validateCity2();
            this.validateZip2();
            this.validateAddress2();
            this.validateRegistrationNumber2();
            this.validateTaxNumber2();
            this.validateBankAccount2();
            this.validatePhoneNumber2();
            this.validateEmail2();
            this.validateWebsite2();
            this.validateDirector2();
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
