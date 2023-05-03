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
                    <tr v-for="product in products" :key="product.id" @click="openEditProductModal(product)"
                        data-bs-toggle="modal" data-bs-target="#editProductModal">
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
                            <button @click="openEditProductModal(product)" type="button" class="btn btn-primary"
                                data-bs-toggle="modal" data-bs-target="#editProductModal">
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
                    <div @click="openEditProductModal(product)" data-bs-toggle="modal" data-bs-target="#editProductModal"
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
    <EditProductModal @cancel-editing="readProducts" :product="productToEdit" />
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios'
import { useAuthenticationStore } from '../../stores/authentication'
import { useBaseUrlStore } from '../../stores/baseUrl'
import EditProductModal from './EditProductModal.vue';

export default defineComponent({
    data() {
        return {
            products: [],
            productToEdit: {},
            isSmallScreen: window.innerWidth <= 768,
        };
    },
    created() {
        window.addEventListener("resize", this.handleResize);
        this.readProducts();
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.isSmallScreen = window.innerWidth <= 768;
        },
        readProducts() {
            const baseUrlStore = useBaseUrlStore();
            const authenticationStore = useAuthenticationStore();
            const url = baseUrlStore.getUrl("products");
            const token = authenticationStore.token;
            axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(response => response.data)
                .then(data => this.products = data)
                .catch(error => console.error(error));
        },
        openEditProductModal(product) {
            this.productToEdit = product
        }
    },
    components: { EditProductModal }
})
</script>

<style scoped>
thead {
    background-color: darkslateblue;
    color: wheat;
}

th {
    width: 250px;
    max-width: 300px;
}

td,
.card {
    cursor: pointer;
}

.card {
    color: darkslateblue;
}
</style>

