<template>
    <!-- Modal -->
    <div class="modal fade" id="invoiceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Invoice</h1>
                    <button @click="cancelEditing" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        ref="closeBtn">Close</button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-md-6">
                                <input class="form-control" type="text" v-model="searchQuery" placeholder="Search..."
                                    @focus="isFocused = true" @blur="isFocused = false">
                                <ul class="list-group mt-3" v-show="isFocused">
                                    <li v-for="company in filteredCompanies" :key="company.id" class="list-group-item"
                                        @click="selectedCompany = company">{{ company.name }}</li>
                                </ul>
                            </div>
                            <div class="col-md-6 mt-3">
                                <p v-if="selectedCompany">Selected Company: {{ selectedCompany.name }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="documentType">Document type</label>
                                    <select class="form-control" id="documentType" v-model="invoice.documentType"
                                        :readonly="readOnly">
                                        <option value="INVOICE">INVOICE</option>
                                        <option value="ESTIMATE">ESTIMATE</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="creationDate">Creation date</label>
                                    <input type="date" class="form-control" id="creationDate" v-model="invoice.creationDate"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="dueDate">Due date</label>
                                    <input type="date" class="form-control" id="dueDate" v-model="invoice.dueDate"
                                        :readonly="readOnly">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="invoiceNumber">Invoice number</label>
                                    <input type="text" class="form-control" id="invoiceNumber"
                                        v-model="invoice.invoiceNumber" :readonly="readOnly">
                                    <span v-if="invoiceNumberError" class="error">{{ invoiceNumberError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="invoiceStatus">Status</label>
                                    <select class="form-control" id="invoiceStatus" v-model="invoice.invoiceStatus"
                                        :readonly="readOnly">
                                        <option value="PENDING">PENDING</option>
                                        <option value="PARTIALLY_PAID">PARTIALLY PAID</option>
                                        <option value="PAID">PAID</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="total">Total</label>
                                    <input type="text" class="form-control" id="total" v-model="invoice.total" readonly>
                                </div>
                            </div>
                        </div>
                        <ConditionalButtons @reset-errors="resetErrors" @cancel-editing="cancelEditing"
                            @enable-editing="enableEditing" @create="createInvoice" @update="updateInvoice"
                            @delete="deleteInvoice" :object="invoice" :readOnly="readOnly" :objectExists="invoiceExists"
                            :loading="loading" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/stores/invoices'
import { useCompaniesStore } from '@/stores/companies';
import ConditionalButtons from '../conditional/ConditionalButtons.vue';
import Swal from 'sweetalert2'
// import {
//     validateName, validateCity, validateZip, validateAddress,
//     validateRegistrationNumber, validateTaxNumber, validateBankAccount,
//     validatePhoneNumber, validateEmail, validateWebsite, validateDirector
// } from '@/components/validation/invoiceValidation';

export default defineComponent({
    components: {
        ConditionalButtons
    },
    computed: {
        invoice: {
            get() {
                return { ...useInvoicesStore().editInvoice };
            },
            set(value) {
                useInvoicesStore().editInvoice = { ...value };
            }
        },
        filteredCompanies: {
            get() {
                return useCompaniesStore().filterCompanies(this.searchQuery)
            }
        },
        invoiceExists() {
            return this.invoice.id > 0
        },
        readOnly() {
            return this.invoiceExists && this.readOnlyCondition
        }
    },
    data() {
        return {
            isFocused: false,
            searchQuery: '',
            selectedCompany: null,
            readOnlyCondition: true,
            loading: false,
            invoiceNumberError: '',
        }
    },
    methods: {
        cancelEditing() {
            this.invoice = { ...useInvoicesStore().editInvoice };
            this.readOnlyCondition = true;
            this.resetErrors()
        },
        enableEditing() {
            this.readOnlyCondition = false;
        },
        async updateInvoice() {
            if (!this.validateInputs()) {
                Swal.fire({
                    title: 'Validation failed!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            const invoicesStore = useInvoicesStore()
            await invoicesStore.updateInvoice(this.invoice)
            this.$refs.closeBtn.click()
        },
        async deleteInvoice() {
            const invoicesStore = useInvoicesStore()
            await invoicesStore.deleteInvoice(this.invoice)
            this.$refs.closeBtn.click()
        },
        async createInvoice() {
            if (this.invoiceNumberError) {
                Swal.fire({
                    title: 'Validation failed!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            this.loading = true
            const invoicesStore = useInvoicesStore()
            await invoicesStore.createInvoice(this.invoice)
            this.loading = false
            this.$refs.closeBtn.click()
        },
        resetErrors() {
            this.invoiceNumberError = "";
        },
        // // Function to validate invoice name
        // validateName() {
        //     this.nameError = validateName(this.invoice.name);
        // },
    },
})
</script>

<style scoped>
.list-group {
    position: absolute;
    z-index: 999;
    width: 80%;
    border: solid;
}
.list-group-item {
    background-color: wheat;
    color: darkslateblue;
}
</style>
