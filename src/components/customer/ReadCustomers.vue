<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-dark table-hover">
                <thead>
                    <tr>
                        <th @click="sortList('name')" class="col-2 clickable">
                            Naziv
                            <i v-if="sortBy === 'name' && sortAsc" class="arrow-up"></i>
                            <i v-if="sortBy === 'name' && !sortAsc" class="arrow-down"></i>
                        </th>
                        <th @click="sortList('city')" class="col-2 clickable">
                            Mesto
                            <i v-if="sortBy === 'city' && sortAsc" class="arrow-up"></i>
                            <i v-if="sortBy === 'city' && !sortAsc" class="arrow-down"></i>
                        </th>
                        <th class="col-2">Adresa</th>
                        <th class="col-2">PIB</th>
                        <th class="col-2">Direktor</th>
                        <th class="col-2">Telefon</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in customers" :key="customer.id" @click="openCustomerModal(customer)"
                        data-bs-toggle="modal" data-bs-target="#customerModal">
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            {{ customer.city }}
                        </td>
                        <td>
                            {{ customer.street }}
                        </td>
                        <td>
                            {{ customer.taxNumber }}
                        </td>
                        <td>
                            {{ customer.director }}
                        </td>
                        <td>
                            {{ customer.phone }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-3" v-for="customer in customers" :key="customer.id">
                    <div @click="openCustomerModal(customer)" data-bs-toggle="modal" data-bs-target="#customerModal"
                        class="card mt-2 side-borders">
                        <div class="card-body p-3">
                            <div class="mb-2">
                                <div class="fw-bold mt-2">{{ customer.name }}</div>
                                <div class="mt-2">{{ customer.city }}</div>
                                <div class="mt-2">Direktor: {{ customer.director }}</div>
                                <div class="mt-2">{{ customer.phone }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @previous-page="previousPage" @next-page="nextPage"
        @go-to-page="goToPage" />
    <button hidden ref="openModalBtn" type="button" data-bs-toggle="modal" data-bs-target="#customerModal"></button>
</template>

<script>
import { defineComponent } from 'vue';
import { useCompaniesStore } from '@/stores/companies'
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
    components: { Pagination },
    computed: {
        customers: {
            get() {
                const start = (this.currentPage - 1) * this.pageSize;
                const end = start + this.pageSize;
                return useCompaniesStore().companies?.slice(start, end)
            },
            set(value) {
                useCompaniesStore().companies = { ...value };
            }
        },
        totalPages() {
            return Math.ceil(useCompaniesStore().companies?.length / this.pageSize)
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
        handleResize() {
            this.isSmallScreen = window.innerWidth <= 768;
        },
        openCustomerModal(customer) {
            const companiesStore = useCompaniesStore()
            companiesStore.editCompany = customer
            localStorage.setItem('editCompany', JSON.stringify(customer))
        },
        viewCompany(company) {
            this.openCustomerModal(company)
            this.$refs.openModalBtn.click()
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

            const companiesStore = useCompaniesStore();
            if (sortBy === 'name') {
                if (this.sortAsc) {
                    companiesStore.sortByNameAsc();
                } else {
                    companiesStore.sortByNameDesc();
                }
            } else if (sortBy === 'city') {
                if (this.sortAsc) {
                    companiesStore.sortByCityAsc();
                } else {
                    companiesStore.sortByCityDesc();
                }
            }
        },
    },
})
</script>
