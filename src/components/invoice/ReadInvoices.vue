<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-dark table-hover">
                <thead>
                    <tr>
                        <th class="col-2">Dokument</th>
                        <th class="col-2">Firma</th>
                        <th @click="sortList('creationDate')" class="col-2 clickable">
                            Datum kreiranja
                            <i v-if="sortBy === 'creationDate' && sortAsc" class="arrow-up"></i>
                            <i v-if="sortBy === 'creationDate' && !sortAsc" class="arrow-down"></i>
                        </th>
                        <th @click="sortList('dueDate')" class="col-2 clickable">Datum dospeća
                            <i v-if="sortBy === 'dueDate' && sortAsc" class="arrow-up"></i>
                            <i v-if="sortBy === 'dueDate' && !sortAsc" class="arrow-down"></i>
                        </th>
                        <th class="col-2">
                            Status
                        </th>
                        <th @click="sortList('total')" class="col-2 clickable">
                            Ukupno
                            <i v-if="sortBy === 'total' && sortAsc" class="arrow-up"></i>
                            <i v-if="sortBy === 'total' && !sortAsc" class="arrow-down"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="invoice in invoices" :key="invoice.id" @click="openInvoiceModal(invoice)">
                        <td>
                            {{ invoice.documentType }} - {{ invoice.invoiceNumber }}
                        </td>
                        <td>
                            {{ invoice.companyName }}
                        </td>
                        <td>
                            {{ formatDate(invoice.creationDate) }}
                        </td>
                        <td>
                            {{ formatDate(invoice.dueDate) }}
                        </td>
                        <td>
                            {{ invoice.invoiceStatus }}
                        </td>
                        <td>
                            {{ Number(invoice.total).toLocaleString(
                                'sr-RS',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }}
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
                    <div @click="openInvoiceModal(invoice)" class="card mt-2 side-borders">
                        <div class="card-body p-3">
                            <div class="mb-2">
                                <div class="fw-bold mt-2">{{ invoice.documentType }} - {{ invoice.invoiceNumber }}</div>
                                <div class="mt-2">{{ invoice.companyName }}</div>
                                <div class="mt-2">{{ formatDate(invoice.creationDate) }}</div>
                                <div class="mt-2">Total: {{ Number(invoice.total).toLocaleString(
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
                </div>
            </div>
        </div>
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @previous-page="previousPage" @next-page="nextPage"
        @go-to-page="goToPage" />
</template>

<script>
import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/stores/invoices'
import { useItemsStore } from '@/stores/items';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
    components: { Pagination },
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
            sortBy: null,
            sortAsc: false,
        };
    },
    created() {
        window.addEventListener("resize", this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        formatDate(date) {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };
            return new Intl.DateTimeFormat('sr-RS', options).format(new Date(date));
        },
        handleResize() {
            this.isSmallScreen = window.innerWidth <= 768;
        },
        openInvoiceModal(invoice) {
            const invoicesStore = useInvoicesStore()
            invoicesStore.editInvoice = invoice
            localStorage.setItem('editInvoice', JSON.stringify(invoice))
            const itemsStore = useItemsStore()
            itemsStore.filterItemsByInvoiceId(invoice.id)
            this.$router.push('/invoice')
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
        sortList(sortBy) {
            if (this.sortBy === sortBy) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortBy = sortBy;
                this.sortAsc = true;
            }

            const invoicesStore = useInvoicesStore();
            if (sortBy === 'creationDate') {
                if (this.sortAsc) {
                    invoicesStore.sortByCreationDateAsc();
                } else {
                    invoicesStore.sortByCreationDateDesc();
                }
            } else if (sortBy === 'dueDate') {
                if (this.sortAsc) {
                    invoicesStore.sortByDueDateAsc();
                } else {
                    invoicesStore.sortByDueDateDesc();
                }
            } else if (sortBy === 'total') {
                if (this.sortAsc) {
                    invoicesStore.sortByTotalAsc();
                } else {
                    invoicesStore.sortByTotalDesc();
                }
            }
        },
    },
})
</script>
