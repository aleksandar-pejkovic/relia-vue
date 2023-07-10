<template>
    <!-- Modal -->
    <div class="modal fade" id="invoiceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 v-if="!invoice.id > 0" class="modal-title fs-5" id="staticBackdropLabel">Invoice</h1>
                    <h1 v-else class="modal-title fs-5" id="staticBackdropLabel">{{ invoice.documentType }} {{
                        invoice.invoiceNumber }} - {{ invoice.companyName }}</h1>
                    <button @click="cancelEditing" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        ref="closeBtn">Close</button>
                </div>
                <div>
                    <InvoicePdfButton v-if="hasItems" :id="invoice.id" :invoice="invoice" />
                    <SendInvoiceToClient v-if="hasItems" :id="invoice.id" :invoice="invoice" />
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-md-6">
                                <div v-if="!invoice.id > 0" class="form-group">
                                    <label for="documentType">Partner</label>
                                    <SearchCustomers @company-selected="selectCompany" />
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
                                <div v-if="!invoice.id > 0" class="form-group">
                                    <label for="invoiceNumber">Invoice number</label>
                                    <input type="text" class="form-control" id="invoiceNumber"
                                        v-model="invoice.invoiceNumber" :readonly="readOnly" @input="validateInvoiceNumber">
                                    <span v-if="invoiceNumberError" class="error">{{ invoiceNumberError }}</span>
                                </div>
                                <div v-if="!invoice.id > 0" class="form-group">
                                    <label for="documentType">Document type</label>
                                    <select class="form-control" id="documentType" v-model="invoice.documentType"
                                        :disabled="readOnly">
                                        <option value="INVOICE">INVOICE</option>
                                        <option value="ESTIMATE">ESTIMATE</option>
                                    </select>
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
                                <div v-if="invoice.id > 0" class="form-group">
                                    <label for="total">Total</label>
                                    <div class="form-control" readonly>
                                        {{ Number(invoice.total).toLocaleString(
                                            'sr-RS',
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ConditionalButtons @reset-errors="resetErrors" @cancel-editing="cancelEditing"
                            @enable-editing="enableEditing" @create="createInvoice" @update="updateInvoice"
                            @delete="deleteInvoice" :object="invoice" :readOnly="readOnly" :objectExists="invoiceExists"
                            :loading="loading" />
                    </form>
                    <div v-if="invoice.id > 0">
                        <CreateItemForm :invoiceId="invoice.id" />
                        <ReadItems />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/stores/invoices'
import { useCompaniesStore } from '@/stores/companies';
import { useItemsStore } from '@/stores/items';
import ConditionalButtons from '../conditional/ConditionalButtons.vue';
import { showInvalidRequestMessage } from '../helper/message'
import CreateItemForm from '../item/CreateItemForm.vue';
import ReadItems from '../item/ReadItems.vue';
import InvoicePdfButton from '@/components/InvoicePdfButton.vue'
import SendInvoiceToClient from '@/components/SendInvoiceToClient.vue'
import SearchCustomers from '../customer/SearchCustomers.vue';
import { validateInvoiceNumber } from '../validation/invoiceValidation'

export default defineComponent({
    components: {
        ConditionalButtons, CreateItemForm, ReadItems, InvoicePdfButton, SearchCustomers, SendInvoiceToClient
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
        },
        hasItems() {
            return useItemsStore().itemsByInvoice?.length > 0
        }
    },
    data() {
        return {
            isFocused: false,
            selectedCompany: null,
            readOnlyCondition: true,
            loading: false,
            invoiceNumberError: '',
        }
    },
    methods: {
        showSearchList() {
            this.isFocused = true
        },
        hideSearchList() {
            setTimeout(() => this.isFocused = false, 100)
        },
        selectCompany(company) {
            this.selectedCompany = company;
            this.isFocused = false;
            this.searchQuery = company.name
            this.invoice.companyId = company.id
        },
        cancelEditing() {
            this.invoice = { ...useInvoicesStore().editInvoice };
            this.readOnlyCondition = true;
            this.searchQuery = ''
            this.selectedCompany = null
            this.resetErrors()
        },
        enableEditing() {
            this.readOnlyCondition = false;
        },
        resetErrors() {
            this.invoiceNumberError = "";
            this.selectedCompany = null
            this.searchQuery = ''
            this.invoice.companyId = undefined
        },
        async updateInvoice() {
            this.loading = true
            const invoicesStore = useInvoicesStore()
            await invoicesStore.updateInvoice(this.invoice)
            this.loading = false
            this.$refs.closeBtn.click()
        },
        async deleteInvoice() {
            this.loading = true
            const invoicesStore = useInvoicesStore()
            await invoicesStore.deleteInvoice(this.invoice.id)
            this.loading = false
            this.$refs.closeBtn.click()
            alert(`Invoice ${this.invoice.invoiceNumber} deleted`)
        },
        async createInvoice() {
            if (this.invoiceNumberError
                || !this.invoice.companyId
                || !this.invoice.creationDate
                || !this.invoice.dueDate
                || !this.invoice.documentType
                || !this.invoice.invoiceStatus
            ) {
                showInvalidRequestMessage()
                return;
            }
            this.loading = true
            const invoicesStore = useInvoicesStore()
            await invoicesStore.createInvoice(this.invoice)
            this.loading = false
        },
        validateInvoiceNumber() {
            this.invoiceNumberError = validateInvoiceNumber(this.invoice.invoiceNumber);
        },
    },
})
</script>
