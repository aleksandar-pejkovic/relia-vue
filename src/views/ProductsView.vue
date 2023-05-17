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
        <UploadProductsFromAFile class="m-2" />
        <div class="row">
            <ReadProducts />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReadProducts from '../components/product/ReadProducts.vue';
import { useProductsStore } from '@/stores/products'; 
import UploadProductsFromAFile from '../components/product/UploadProductsFromAFile.vue';

export default defineComponent({
    components: {
    ReadProducts,
    UploadProductsFromAFile
},
    methods: {
        openProductModal() {
            useProductsStore().clearEditProduct()
        },
    }
})
</script>
