<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th @click="sortByName" class="col-5 clickable">Name <i v-if="nameArrowUp" class="arrow-up"></i><i
                                v-else-if="nameArrowDown" class="arrow-down"></i></th>
                        <th class="col-2">Tax rate</th>
                        <th @click="sortByPrice" class="col-3 clickable">Price <i v-if="priceArrowUp"
                                class="arrow-up"></i><i v-else-if="priceArrowDown" class="arrow-down"></i></th>
                        <th class="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id" @click="openProductModal(product)"
                        data-bs-toggle="modal" data-bs-target="#productModal">
                        <td>
                            {{ product.name }}
                        </td>
                        <td>
                            {{ product.taxRate }}%
                        </td>
                        <td>
                            {{ Number(product.price).toFixed(2) }}
                        </td>
                        <td>
                            <button @click="openProductModal(product)" type="button" class="btn btn-primary"
                                data-bs-toggle="modal" data-bs-target="#productModal">
                                View
                            </button>
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
                        class="card mt-2">
                        <div class="card-body p-3">
                            <div class="mb-2">
                                <div class="fw-bold">{{ product.name }}</div>
                                <div>Tax rate: {{ product.taxRate }}%</div>
                                <div>Price: {{ Number(product.price).toFixed(2) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @previous-page="previousPage" @next-page="nextPage"
        @go-to-page="goToPage" />
    <ProductModal />
    <button hidden ref="openModalBtn" type="button" data-bs-toggle="modal" data-bs-target="#productModal"></button>
</template>

<script>
import { defineComponent } from 'vue';
import { useProductsStore } from '@/stores/products';
import ProductModal from './ProductModal.vue';
import Pagination from '../Pagination.vue';

export default defineComponent({
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
            sortedByNameAsc: false,
            sortedByPriceAsc: false,
            nameArrowUp: false,
            nameArrowDown: false,
            priceArrowUp: false,
            priceArrowDown: false,
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
        sortByName() {
            this.priceArrowDown = false
            this.priceArrowUp = false
            if (!this.sortedByNameAsc) {
                useProductsStore().sortByNameAsc()
                this.sortedByNameAsc = true
                this.nameArrowDown = false
                this.nameArrowUp = true
            } else {
                useProductsStore().sortByNameDesc()
                this.sortedByNameAsc = false
                this.nameArrowUp = false
                this.nameArrowDown = true
            }
        },
        sortByPrice() {
            this.nameArrowUp = false
            this.nameArrowDown = false
            if (!this.sortedByPriceAsc) {
                useProductsStore().sortByPriceAsc()
                this.sortedByPriceAsc = true
                this.priceArrowDown = false
                this.priceArrowUp = true
            } else {
                useProductsStore().sortByPriceDesc()
                this.sortedByPriceAsc = false
                this.priceArrowUp = false
                this.priceArrowDown = true
            }
        }
    },
    components: { ProductModal, Pagination }
})
</script>
