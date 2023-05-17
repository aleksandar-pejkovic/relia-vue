<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="col-5">Name</th>
                        <th class="col-2">Tax rate</th>
                        <th class="col-3">Price</th>
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
    <Pagination />
    <ProductModal />
</template>

<script>
import { defineComponent } from 'vue';
import { useProductsStore } from '@/stores/products'; 
import ProductModal from './ProductModal.vue';
import Pagination from '../Pagination.vue';

export default defineComponent({
    computed: {
        products: {
            get() {
                return { ...useProductsStore().products };
            },
            set(value) {
                useProductsStore().products = { ...value };
            }
        },
    },
    data() {
        return {
            isSmallScreen: window.innerWidth <= 768,
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
        }
    },
    components: { ProductModal, Pagination }
})
</script>
