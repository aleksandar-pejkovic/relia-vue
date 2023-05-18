<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="col-2">Document</th>
                        <th class="col-2">Partner</th>
                        <th class="col-2">Creation date</th>
                        <th class="col-2">Due date</th>
                        <th class="col-2">Total</th>
                        <th class="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="invoice in invoices" :key="invoice.id" @click="openInvoiceModal(invoice)"
                        data-bs-toggle="modal" data-bs-target="#invoiceModal">
                        <td>
                            {{ invoice.documentType }} - {{ invoice.invoiceNumber }}
                        </td>
                        <td>
                            {{ getCompanyName(invoice.companyId) }}
                        </td>
                        <td>
                            {{ invoice.creationDate }}
                        </td>
                        <td>
                            {{ invoice.dueDate }}
                        </td>
                        <td>
                            {{ Number(invoice.total).toFixed(2) }}
                        </td>
                        <td>
                            <button @click="openInvoiceModal(invoice)" data-bs-toggle="modal" data-bs-target="#invoiceModal"
                                class="btn btn-primary">View</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-3" v-for="invoice in invoices" :key="invoice.id">
                    <div @click="openInvoiceModal(invoice)" data-bs-toggle="modal" data-bs-target="#invoiceModal"
                        class="card mt-2">
                        <div class="card-body p-3">
                            <div class="mb-2">
                                <div class="fw-bold">{{ invoice.documentType }} - {{ invoice.invoiceNumber }}</div>
                                <div>Partner: {{ getCompanyName(invoice.companyId) }}</div>
                                <div>Creation date: {{ invoice.creationDate }}</div>
                                <div>Total: {{ Number(invoice.total).toFixed(2) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <InvoiceModal />
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @previous-page="previousPage" @next-page="nextPage"
        @go-to-page="goToPage" />
</template>

<script>
import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/stores/invoices'
import { useCompaniesStore } from '@/stores/companies'
import { useItemsStore } from '@/stores/items';
import InvoiceModal from './InvoiceModal.vue';
import Pagination from '../Pagination.vue';

export default defineComponent({
    components: { InvoiceModal, Pagination },
    computed: {
        invoices: {
            get() {
                const start = (this.currentPage - 1) * this.pageSize;
                const end = start + this.pageSize;
                return useInvoicesStore().invoices?.slice(start, end)
            },
            set(value) {
                useInvoicesStore().invoices = { ...value };
            }
        },
        totalPages() {
            return Math.ceil(useInvoicesStore().invoices?.length / this.pageSize)
        }
    },
    data() {
        return {
            isSmallScreen: window.innerWidth <= 768,
            currentPage: 1,
            pageSize: 10,
        };
    },
    created() {
        window.addEventListener("resize", this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.isSmallScreen = window.innerWidth <= 768;
        },
        getCompanyName(companyId) {
            const companiesStore = useCompaniesStore();
            const company = companiesStore.companies.find(
                (company) => company.id === companyId
            );
            return company ? company.name : "";
        },
        openInvoiceModal(invoice) {
            const invoicesStore = useInvoicesStore()
            invoicesStore.editInvoice = invoice
            localStorage.setItem('editInvoice', JSON.stringify(invoice))
            const itemsStore = useItemsStore()
            itemsStore.filterItemsByInvoiceId(invoice.id)
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
                this.currentPage = page;
            }
        },
    },
})
</script>
