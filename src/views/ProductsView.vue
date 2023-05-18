<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-md-10">
                <h1 clas>Products</h1>
            </div>
            <div class="col-md-2">
                <button @click="openProductModal" type="button" class="btn btn-success m-2" data-bs-toggle="modal"
                    data-bs-target="#productModal">
                    Add Product
                </button>
            </div>
        </div>
        <div class="row m-2">
            <SearchProducts class="col-md-7" @product-selected="viewProduct" ref="searchProducts" />
            <UploadProductsFromAFile class="col-md-5" />
        </div>
        <div class="row">
            <ReadProducts ref="readProducts" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReadProducts from '../components/product/ReadProducts.vue';
import { useProductsStore } from '@/stores/products';
import UploadProductsFromAFile from '../components/product/UploadProductsFromAFile.vue';
import SearchProducts from '../components/product/SearchProducts.vue';

export default defineComponent({
    components: {
        ReadProducts,
        UploadProductsFromAFile,
        SearchProducts
    },
    methods: {
        openProductModal() {
            useProductsStore().clearEditProduct()
        },
        viewProduct(product) {
            this.$refs.searchProducts.searchQuery = ''
            this.$refs.readProducts.viewProduct(product)
        }
    }
})
</script>
