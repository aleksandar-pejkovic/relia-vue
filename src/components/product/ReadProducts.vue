<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th @click="sortList('plu')" class="col-1 clickable">
                            Plu
                            <i v-if="sortBy === 'plu' && sortAsc" class="arrow-up"></i>
                            <i v-if="sortBy === 'plu' && !sortAsc" class="arrow-down"></i>
                        </th>
                        <th @click="sortList('name')" class="col-3 clickable">
                            Naziv
                            <i v-if="sortBy === 'name' && sortAsc" class="arrow-up"></i>
                            <i v-if="sortBy === 'name' && !sortAsc" class="arrow-down"></i>
                        </th>
                        <th class="col-2">
                            Stanje na zalihama
                        </th>
                        <th class="col-2">
                            Poreska stopa
                        </th>
                        <th @click="sortList('price')" class="col-2 clickable">
                            Cena
                            <i v-if="sortBy === 'price' && sortAsc" class="arrow-up"></i>
                            <i v-if="sortBy === 'price' && !sortAsc" class="arrow-down"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id" @click="openProductModal(product)"
                        data-bs-toggle="modal" data-bs-target="#productModal">
                        <td>{{ product.plu }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.inStock }}</td>
                        <td>{{ product.taxRate }}%</td>
                        <td>
                            {{ Number(product.price).toLocaleString(
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
                <div class="col-sm-6 col-md-4 col-lg-3" v-for="product in products" :key="product.id">
                    <div @click="openProductModal(product)" data-bs-toggle="modal" data-bs-target="#productModal"
                        class="card mt-2 side-borders">
                        <div class="card-body p-3">
                            <div class="mb-2">
                                <div class="fw-bold mt-2">{{ product.name }}</div>
                                <div class="mt-2">Poreska stopa: {{ product.taxRate }}%</div>
                                <div class="mt-2">
                                    Cena: {{ Number(product.price).toLocaleString(
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
    <button hidden ref="openModalBtn" type="button" data-bs-toggle="modal" data-bs-target="#productModal"></button>
</template>  

<script>
import { defineComponent } from 'vue';
import { useProductsStore } from '@/stores/products';
import Pagination from '../Pagination.vue';

export default defineComponent({
    components: { Pagination },
    computed: {
        products() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return useProductsStore().products?.slice(start, end)
        },
        totalPages() {
            return Math.ceil(useProductsStore().products?.length / this.pageSize)
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
        openProductModal(product) {
            const productStore = useProductsStore()
            productStore.editProduct = product
            localStorage.setItem('editProduct', JSON.stringify(product))
        },
        viewProduct(product) {
            this.openProductModal(product)
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

            const productsStore = useProductsStore();
            if (sortBy === 'name') {
                if (this.sortAsc) {
                    productsStore.sortByNameAsc();
                } else {
                    productsStore.sortByNameDesc();
                }
            } else if (sortBy === 'price') {
                if (this.sortAsc) {
                    productsStore.sortByPriceAsc();
                } else {
                    productsStore.sortByPriceDesc();
                }
            } else if (sortBy === 'plu') {
                if (this.sortAsc) {
                    productsStore.sortByPluAsc();
                } else {
                    productsStore.sortByPluDesc();
                }
            }
        },
    },
})
</script>
