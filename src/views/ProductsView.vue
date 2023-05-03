<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-md-10">
                <h1 clas>Products</h1>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#createProductModal">
                    Add Product
                </button>
                <CreateProductModal @product-created="reloadProducts" />
            </div>
        </div>
        <div class="row">
            <ReadProducts ref="products" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import CreateProductModal from "../components/product/CreateProductModal.vue";
import ReadProducts from '../components/product/ReadProducts.vue';

export default defineComponent({
    components: {
        CreateProductModal, ReadProducts
    },
    methods: {
        reloadCustomers() {
            this.$refs.products.readProducts()
        },
    }
})
</script>
