<template>
    <div class="main container mt-3">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Moja firma</h5>
            </div>
            <div class="card-body">
                <div class="container mt-2">
                    <form>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Naziv</label>
                                    <input type="text" class="form-control" id="name" v-model="company.name"
                                        :readonly="readOnly" @input="validateName">
                                    <span v-if="nameError" class="error">{{ nameError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="city">Mesto</label>
                                    <input type="text" class="form-control" id="city" v-model="company.city"
                                        :readonly="readOnly" @input="validateCity">
                                    <span v-if="cityError" class="error">{{ cityError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="zip">Poštanski broj</label>
                                    <input type="text" class="form-control" id="zip" v-model="company.zip"
                                        :readonly="readOnly" @input="validateZip">
                                    <span v-if="zipError" class="error">{{ zipError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="address">Adresa</label>
                                    <input type="text" class="form-control" id="address" v-model="company.street"
                                        :readonly="readOnly" @input="validateAddress">
                                    <span v-if="addressError" class="error">{{ addressError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="regNum">Matični broj</label>
                                    <input type="text" class="form-control" id="regNum" v-model="company.registrationNumber"
                                        :readonly="readOnly" @input="validateRegistrationNumber">
                                    <span v-if="regNumError" class="error">{{ regNumError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="taxNum">PIB</label>
                                    <input type="text" class="form-control" id="taxNum" v-model="company.taxNumber"
                                        :readonly="readOnly" @input="validateTaxNumber">
                                    <span v-if="taxNumError" class="error">{{ taxNumError }}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="bankAcc">Tekući račun</label>
                                    <input type="text" class="form-control" id="bankAcc" v-model="company.bankAccount"
                                        :readonly="readOnly" @input="validateBankAccount">
                                    <span v-if="bankAccError" class="error">{{ bankAccError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Telefon</label>
                                    <input type="text" class="form-control" id="phone" v-model="company.phone"
                                        :readonly="readOnly" @input="validatePhoneNumber">
                                    <span v-if="phoneError" class="error">{{ phoneError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="email">Imejl</label>
                                    <input type="email" class="form-control" id="email" v-model="company.email"
                                        :readonly="readOnly" @input="validateEmail">
                                    <span v-if="emailError" class="error">{{ emailError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="website">Internet stranica</label>
                                    <input type="text" class="form-control" id="website" v-model="company.website"
                                        :readonly="readOnly" @input="validateWebsite">
                                    <span v-if="websiteError" class="error">{{ websiteError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="director">Direktor</label>
                                    <input type="text" class="form-control" id="director" v-model="company.director"
                                        :readonly="readOnly" @input="validateDirector">
                                    <span v-if="directorError" class="error">{{ directorError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="vat-status-input">PDV status</label>
                                    <br />
                                    <input class="form-check-input checkbox-lg" type="checkbox" id="vat-status-input"
                                        v-model="company.vatStatus" :disabled="readOnly">
                                </div>
                            </div>
                        </div>
                        <div v-if="!companyExists">
                            <div v-if="loading" class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <div v-else>
                                <button @click.prevent="createOwnCompany" type="submit"
                                    class="btn btn-success m-2">Kreiraj</button>
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="!readOnly">
                                <div v-if="loading" class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div v-else>
                                    <button @click="cancelEditing" type="button"
                                        class="btn btn-dark btn-outline-secondary m-2">Otkaži</button>
                                    <button @click.prevent="updateOwnCompany" type="submit"
                                        class="btn btn-dark btn-outline-success m-2">Ažuriraj</button>
                                </div>
                            </div>
                            <div v-else>
                                <button @click="startEditing" type="button" class="btn btn-dark btn-outline-primary m-2">Izmeni</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, watch } from 'vue';
import { useCompaniesStore } from '@/stores/companies';
import { showErrorMessage, showSuccessMessage, showInvalidRequestMessage } from '../components/helper/message'
import {
    validateName, validateCity, validateZip, validateAddress,
    validateRegistrationNumber, validateTaxNumber, validateBankAccount,
    validatePhoneNumber, validateEmail, validateWebsite, validateDirector
} from '@/components/validation/companyValidation';

export default defineComponent({
    mounted() {
        const companiesStore = useCompaniesStore()
        this.company = { ...companiesStore.ownCompany }

        watch(() => companiesStore.ownCompany, (newOwnCompany) => {
            this.company = { ...newOwnCompany }; // create a new object with the same properties as newUser
        });
    },
    computed: {
        companyExists() {
            return this.company.id > 0
        },
        readOnly() {
            return this.companyExists && this.readOnlyCondition
        }
    },
    data() {
        return {
            company: {},
            readOnlyCondition: true,
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
        async createOwnCompany() {
            if (!this.validateInputs()) {
                showInvalidRequestMessage()
                return;
            }
            this.loading = true
            try {
                const companiesStore = useCompaniesStore()
                await companiesStore.createOwnCompany(this.company)
                this.company = { ...companiesStore.ownCompany }
                this.loading = false
                this.readOnlyCondition = true
            } catch (error) {
                this.loading = false;
                this.resetErrors()
            }
        },
        cancelEditing() {
            this.readOnlyCondition = true;
            this.resetErrors()
            this.company = { ...this.temp };
        },
        startEditing() {
            this.readOnlyCondition = false;
            this.temp = { ...this.company };
        },
        async updateOwnCompany() {
            if (!this.validateInputs()) {
                showInvalidRequestMessage()
                return;
            }
            this.loading = true;
            try {
                const companiesStore = useCompaniesStore();
                await companiesStore.updateOwnCompany(this.company);
                this.loading = false;
                this.readOnlyCondition = true;
                this.resetErrors()
            } catch (error) {
                this.loading = false;
            }
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

<style scoped>
.checkbox-lg {
    transform: scale(1.5);
    margin: 15px;
}
</style>
