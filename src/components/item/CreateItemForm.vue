<template>
    <div class="container">
        <form @submit.prevent="createItem" class="justify-content-center align-items-center flex-column">
            <div class="row m-3">
                <div class="col-md-4">
                    <SearchProducts class="m-2" @product-selected="selectProduct" ref="searchProducts" />
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="number" step="any" min="1" max="1000000" class="form-control m-2" id="quantity"
                            placeholder="Količina" v-model="item.quantity" @input="formatQuantity">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <input type="number" step="any" min="0" max="100000000" class="form-control m-2" id="price"
                            placeholder="Cena" v-model="item.price" @input="formatPrice">
                    </div>
                </div>
                <div class="col-md-1">
                    <div v-if="loading" class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-else>
                        <button id="addItemBtn" class="btn btn-outline-success m-2" type="submit">+</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useItemsStore } from '../../stores/items';
import { useProductsStore } from '@/stores/products';
import SearchProducts from '../product/SearchProducts.vue';
import Swal from 'sweetalert2'

export default defineComponent({
    components: {
        SearchProducts
    },
    props: {
        invoiceId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            item: {},
            product: {},
            selectedProduct: {},
            loading: false
        }
    },
    methods: {
        formatPrice() {
            const priceString = this.item.price.toString();
            const decimalIndex = priceString.indexOf('.');
            if (decimalIndex !== -1 && priceString.substring(decimalIndex + 1).length > 2) {
                this.item.price = Number(this.item.price).toFixed(2);
            }
        },
        formatQuantity() {
            const quantityString = this.item.quantity.toString();
            const decimalIndex = quantityString.indexOf('.');
            if (decimalIndex !== -1 && quantityString.substring(decimalIndex + 1).length > 3) {
                this.item.quantity = Number(this.item.quantity).toFixed(3);
            }
        },
        selectProduct(product) {
            this.selectedProduct = { ...product }
            this.item.productName = product.name;
            this.item.price = product.price;
            this.item.unit = product.unit
            this.item.quantity = 1
            this.item.taxRate = product.taxRate
            this.item.invoiceId = this.invoiceId
        },
        async createItem() {
            if (!this.selectedProduct.id) {
                this.showErrorMessage('Izaberi proizvod')
                return
            }
            if (!this.item.quantity) {
                this.showErrorMessage('Nevažeća količina')
                return
            } if (this.item.price < 0) {
                this.showErrorMessage('Nevažeća cena')
                return
            }
            this.loading = true
            await useItemsStore().createItem(this.item)
            await useProductsStore().registerSale(this.selectedProduct, this.item.quantity)
            this.loading = false
            this.searchQuery = ''
            this.product = {}
            this.item = {}
            this.selectedProduct = {}
            this.$refs.searchProducts.searchQuery = ''
        },
        showErrorMessage(msg) {
            Swal.fire({
                title: msg,
                text: "",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }
})
</script>

<style scoped>
#addItemBtn {
    width: 50px;
}
</style>
