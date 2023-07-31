<template>
    <div class="container main mt-3">
        <div v-if="invoice.invoiceNumber">
            <h3 class="m-3" id="staticBackdropLabel">{{ invoice.documentType }} {{
                invoice.invoiceNumber }} - {{ invoice.companyName }}</h3>
        </div>
        <div v-if="hasItems">
            <InvoicePdfButton :id="invoice.id" :invoice="invoice" />
            <SendInvoiceToClient :id="invoice.id" :invoice="invoice" />
            <Payment @payment-added="updateInvoiceStatus" urlSufix="invoiceId" :id="invoice.id" />
        </div>
        <form>
            <div class="row">
                <div class="col-md-6">
                    <div v-if="!invoice.id > 0" class="form-group">
                        <label for="documentType">Firma</label>
                        <SearchCustomers @company-selected="selectCompany" />
                    </div>
                    <div class="form-group">
                        <label for="creationDate">Datum kreiranja</label>
                        <input type="date" class="form-control" id="creationDate" v-model="invoice.creationDate"
                            :readonly="readOnly">
                    </div>
                    <div class="form-group">
                        <label for="dueDate">Datum dospeća</label>
                        <input type="date" class="form-control" id="dueDate" v-model="invoice.dueDate" :readonly="readOnly">
                    </div>
                </div>
                <div class="col-md-6">
                    <div v-if="!invoice.id > 0" class="form-group">
                        <label for="invoiceNumber">Broj dokumenta</label>
                        <input type="text" class="form-control" id="invoiceNumber" v-model="invoice.invoiceNumber"
                            :readonly="readOnly" @input="validateInvoiceNumber">
                        <span v-if="invoiceNumberError" class="error">{{ invoiceNumberError }}</span>
                    </div>
                    <div v-if="!invoice.id > 0" class="form-group">
                        <label for="documentType">Vrsta dokumenta</label>
                        <select class="form-control" id="documentType" v-model="invoice.documentType" :disabled="readOnly">
                            <option value="Faktura">Faktura</option>
                            <option value="Profaktura">Profaktura</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="invoiceStatus">Status</label>
                        <select class="form-control" id="invoiceStatus" v-model="invoice.invoiceStatus"
                            :disabled="readOnly">
                            <option value="Neizmireno">Neizmireno</option>
                            <option value="Delimično izmireno">Delimično izmireno</option>
                            <option value="Plaćeno">Plaćeno</option>
                        </select>
                    </div>
                    <div v-if="invoice.id > 0" class="form-group">
                        <label for="total">Ukupno</label>
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
            <ConditionalButtons class="mt-3" @reset-errors="resetErrors" @cancel-editing="cancelEditing"
                @enable-editing="enableEditing" @create="createInvoice" @update="updateInvoice" @delete="deleteInvoice"
                :object="invoice" :readOnly="readOnly" :objectExists="invoiceExists" :loading="loading" />
        </form>
        <div v-if="invoice.id > 0">
            <CreateItemForm :invoiceId="invoice.id" />
            <ReadItems />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/stores/invoices'
import { useCompaniesStore } from '@/stores/companies';
import { useItemsStore } from '@/stores/items';
import ConditionalButtons from '@/components/conditional/ConditionalButtons.vue';
import { showInvalidRequestMessage } from '@/components/helper/message'
import CreateItemForm from '@/components/item/CreateItemForm.vue';
import ReadItems from '@/components/item/ReadItems.vue';
import InvoicePdfButton from '@/components/InvoicePdfButton.vue'
import SendInvoiceToClient from '@/components/SendInvoiceToClient.vue'
import SearchCustomers from '@/components/customer/SearchCustomers.vue';
import { validateInvoiceNumber } from '@/components/validation/invoiceValidation'
import Payment from '@/components/payment/Payment.vue'

export default defineComponent({
    components: {
        ConditionalButtons, CreateItemForm, ReadItems, InvoicePdfButton, SearchCustomers, SendInvoiceToClient, Payment
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
            generatingInvoice: false,
            tempInvoice: {},
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
            invoicesStore.editInvoice = { ...this.invoice }
            localStorage.setItem('editInvoice', JSON.stringify(invoicesStore.editInvoice))
            this.loading = false
            this.readOnlyCondition = true
        },
        async deleteInvoice() {
            this.loading = true
            const invoicesStore = useInvoicesStore()
            await invoicesStore.deleteInvoice(this.invoice.id)
            this.loading = false
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
        updateInvoiceStatus() {
            const invoicesStore = useInvoicesStore()
            this.invoice = { ...invoicesStore.editInvoice };
        },
    },
})
</script>

<style scoped>
@media screen and (max-width: 768px) {
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
