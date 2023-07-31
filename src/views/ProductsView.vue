<template>
    <div class="main container mt-2">
        <div class="row">
            <div class="col-md-5">
                <h1 clas>Proizvodi</h1>
            </div>
            <div class="col-md-5">
                <ProductsReport />
            </div>
            <div class="col-md-2">
                <button @click="openProductModal" type="button" class="btn btn-success m-2" data-bs-toggle="modal"
                    data-bs-target="#productModal">
                    Dodaj
                </button>
            </div>
        </div>
        <div class="row m-3">
            <SearchProducts class="col-md-5 mt-3" @product-selected="viewProduct" ref="searchProducts" />
            <UploadProductsFromAFile class="col-md-6 mt-3" />
        </div>
        <div class="row">
            <ReadProducts ref="readProducts" />
        </div>
    </div>
    <ProductModal ref="modal" />
</template>

<script>
import { defineComponent } from 'vue';
import ReadProducts from '../components/product/ReadProducts.vue';
import ProductModal from '../components/product/ProductModal.vue';
import { useProductsStore } from '@/stores/products';
import UploadProductsFromAFile from '../components/product/UploadProductsFromAFile.vue';
import SearchProducts from '../components/product/SearchProducts.vue';
import ProductsReport from '../components/product/ProductsReport.vue';

export default defineComponent({
    beforeUnmount() {
        this.$refs.modal.$refs.closeBtn.click()
    },
    components: {
        ReadProducts,
        UploadProductsFromAFile,
        SearchProducts,
        ProductsReport,
        ProductModal
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
