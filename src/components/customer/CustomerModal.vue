<template>
    <!-- Modal -->
    <div class="modal fade" id="customerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5" id="staticBackdropLabel">Firma</h2>
                    <button @click="cancelEditing" type="button" class="btn btn-dark btn-secondary" data-bs-dismiss="modal"
                        ref="closeBtn">Zatvori</button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Naziv</label>
                                    <input type="text" class="form-control" id="name" v-model="customer.name"
                                        :readonly="readOnly" @input="validateName">
                                    <span v-if="nameError" class="error">{{ nameError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="city">Mesto</label>
                                    <input type="text" class="form-control" id="city" v-model="customer.city"
                                        :readonly="readOnly" @input="validateCity">
                                    <span v-if="cityError" class="error">{{ cityError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="zip">Poštanski broj</label>
                                    <input type="text" class="form-control" id="zip" v-model="customer.zip"
                                        :readonly="readOnly" @input="validateZip">
                                    <span v-if="zipError" class="error">{{ zipError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="address">Adresa</label>
                                    <input type="text" class="form-control" id="address" v-model="customer.street"
                                        :readonly="readOnly" @input="validateAddress">
                                    <span v-if="addressError" class="error">{{ addressError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="regNum">Matični broj</label>
                                    <input type="text" class="form-control" id="regNum"
                                        v-model="customer.registrationNumber" :readonly="readOnly"
                                        @input="validateRegistrationNumber">
                                    <span v-if="regNumError" class="error">{{ regNumError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="taxNum">PIB</label>
                                    <input type="text" class="form-control" id="taxNum" v-model="customer.taxNumber"
                                        :readonly="readOnly" @input="validateTaxNumber">
                                    <span v-if="taxNumError" class="error">{{ taxNumError }}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="bankAcc">Tekući račun</label>
                                    <input type="text" class="form-control" id="bankAcc" v-model="customer.bankAccount"
                                        :readonly="readOnly" @input="validateBankAccount">
                                    <span v-if="bankAccError" class="error">{{ bankAccError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Telefon</label>
                                    <input type="text" class="form-control" id="phone" v-model="customer.phone"
                                        :readonly="readOnly" @input="validatePhoneNumber">
                                    <span v-if="phoneError" class="error">{{ phoneError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="email">Imejl</label>
                                    <input type="email" class="form-control" id="email" v-model="customer.email"
                                        :readonly="readOnly" @input="validateEmail">
                                    <span v-if="emailError" class="error">{{ emailError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="website">Internet stranica</label>
                                    <input type="text" class="form-control" id="website" v-model="customer.website"
                                        :readonly="readOnly" @input="validateWebsite">
                                    <span v-if="websiteError" class="error">{{ websiteError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="director">Direktor</label>
                                    <input type="text" class="form-control" id="director" v-model="customer.director"
                                        :readonly="readOnly" @input="validateDirector">
                                    <span v-if="directorError" class="error">{{ directorError }}</span>
                                </div>
                            </div>
                        </div>
                        <ConditionalButtons @reset-errors="resetErrors" @cancel-editing="cancelEditing"
                            @enable-editing="enableEditing" @create="createCustomer" @update="updateCustomer"
                            @delete="deleteCustomer" :object="customer" :readOnly="readOnly" :objectExists="companyExists"
                            :loading="loading" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCompaniesStore } from '@/stores/companies'
import { showErrorMessage, showSuccessMessage, showInvalidRequestMessage } from '../helper/message'
import {
    validateName, validateCity, validateZip, validateAddress,
    validateRegistrationNumber, validateTaxNumber, validateBankAccount,
    validatePhoneNumber, validateEmail, validateWebsite, validateDirector
} from '@/components/validation/companyValidation';
import ConditionalButtons from '../conditional/ConditionalButtons.vue';
import { useInvoicesStore } from '@/stores/invoices'

export default defineComponent({
    components: {
        ConditionalButtons
    },
    computed: {
        customer: {
            get() {
                return { ...useCompaniesStore().editCompany };
            },
            set(value) {
                useCompaniesStore().editCompany = { ...value };
            }
        },
        companyExists() {
            return this.customer.id > 0
        },
        readOnly() {
            return this.companyExists && this.readOnlyCondition
        }
    },
    data() {
        return {
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
        cancelEditing() {
            this.customer = { ...useCompaniesStore().editCompany };
            this.readOnlyCondition = true;
            this.resetErrors()
        },
        enableEditing() {
            this.readOnlyCondition = false;
        },
        async updateCustomer() {
            if (!this.validateInputs()) {
                showInvalidRequestMessage()
                return;
            }
            this.loading = true
            const companiesStore = useCompaniesStore()
            await companiesStore.updateCompany(this.customer)
            this.loading = false
            this.$refs.closeBtn.click()
        },
        async deleteCustomer() {
            this.loading = true
            const companiesStore = useCompaniesStore()
            await companiesStore.deleteCompany(this.customer)
            await useInvoicesStore().fetchInvoices()
            this.loading = false
            this.$refs.closeBtn.click()
            alert(`Firma ${this.customer.name} obrisana`)
        },
        async createCustomer() {
            if (!this.validateInputs()) {
                showInvalidRequestMessage()
                return;
            }
            this.loading = true
            const companiesStore = useCompaniesStore()
            await companiesStore.createCompany(this.customer)
            this.loading = false
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
        validateName() {
            this.nameError = validateName(this.customer.name);
        },

        // Function to validate city
        validateCity() {
            this.cityError = validateCity(this.customer.city);
        },

        // Function to validate zip number
        validateZip() {
            this.zipError = validateZip(this.customer.zip);
        },

        // Function to validate address
        validateAddress() {
            this.addressError = validateAddress(this.customer.street);
        },

        // Function to validate registration number
        validateRegistrationNumber() {
            this.regNumError = validateRegistrationNumber(this.customer.registrationNumber);
        },

        // Function to validate tax number
        validateTaxNumber() {
            this.taxNumError = validateTaxNumber(this.customer.taxNumber);
        },

        // Function to validate bank account
        validateBankAccount() {
            this.bankAccError = validateBankAccount(this.customer.bankAccount);
        },

        // Function to validate phone number
        validatePhoneNumber() {
            this.phoneError = validatePhoneNumber(this.customer.phone);
        },

        // Function to validate email
        validateEmail() {
            this.emailError = validateEmail(this.customer.email);
        },

        // Function to validate website
        validateWebsite() {
            this.websiteError = validateWebsite(this.customer.website);
        },

        validateDirector() {
            this.directorError = validateDirector(this.customer.director);
        },
        // Function to validate all inputs
        validateInputs() {
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
