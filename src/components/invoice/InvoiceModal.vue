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
                                <div class="form-group">
                                    <label for="taxRate">Document type</label>
                                    <select class="form-control" id="taxRate" v-model="invoice.documentType"
                                        :readonly="readOnly">
                                        <option value="INVOICE">Invoice</option>
                                        <option value="ESTIMATE">Estimate</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="zip">Creation date</label>
                                    <input type="date" class="form-control" id="zip" v-model="invoice.creationDate"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="address">Due date</label>
                                    <input type="date" class="form-control" id="address" v-model="invoice.dueDate"
                                        :readonly="readOnly">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Invoice number</label>
                                    <input type="text" class="form-control" id="name" v-model="invoice.invoiceNumber"
                                        :readonly="readOnly">
                                    <span v-if="invoiceNumberError" class="error">{{ invoiceNumberError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="taxRate">Status</label>
                                    <select class="form-control" id="taxRate" v-model="invoice.documentType"
                                        :readonly="readOnly">
                                        <option value="Pending">Pending</option>
                                        <option value="PARTIALLY_PAID">PARTIALLY PAID</option>
                                        <option value="PAID">PAID</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="taxNum">Total</label>
                                    <input type="text" class="form-control" id="taxNum" v-model="invoice.total" readonly>
                                </div>
                            </div>
                        </div>
                        <!-- conditional buttons -->
                        <div v-if="!invoiceExists">
                            <button @click="resetErrors" type="reset" class="btn btn-secondary m-2">Reset</button>
                            <div v-if="loading" class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <button @click.prevent="createInvoice" v-else type="submit"
                                class="btn btn-success m-2">Create</button>
                        </div>
                        <div v-else>
                            <div v-if="!readOnly">
                                <button @click="cancelEditing" type="button" class="btn btn-secondary m-2">Cancel</button>
                                <button @click.prevent="updateInvoice" type="submit"
                                    class="btn btn-success m-2">Update</button>
                            </div>
                            <div v-else>
                                <button @click.prevent="deleteInvoice" type="button"
                                    class="btn btn-danger m-2">Delete</button>
                                <button @click="enableEditing" type="button" class="btn btn-primary m-2">Edit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/stores/invoices'
import Swal from 'sweetalert2'
// import {
//     validateName, validateCity, validateZip, validateAddress,
//     validateRegistrationNumber, validateTaxNumber, validateBankAccount,
//     validatePhoneNumber, validateEmail, validateWebsite, validateDirector
// } from '@/components/validation/invoiceValidation';

export default defineComponent({
    computed: {
        invoice: {
            get() {
                return { ...useInvoicesStore().editInvoice };
            },
            set(value) {
                useInvoicesStore().editInvoice = { ...value };
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
