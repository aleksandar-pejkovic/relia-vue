<template>
    <div class="container mt-3">
        <h4>Add Item</h4>
        <form @submit.prevent="createItem" class="justify-content-center align-items-center flex-column">
            <div class="row m-3">
                <div class="col-md-4">
                    <SearchProducts @product-selected="selectProduct" ref="searchProducts" />
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="number" step="any" min="1" max="1000000" class="form-control" id="quantity"
                            placeholder="Quantity" v-model="item.quantity" @input="formatQuantity">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <input type="number" step="any" min="0" max="100000000" class="form-control" id="price"
                            placeholder="Price" v-model="item.price" @input="formatPrice">
                    </div>
                </div>
                <div class="col-md-1">
                    <div v-if="loading" class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-else>
                        <button id="addItemBtn" class="btn btn-success" type="submit">+</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useItemsStore } from '../../stores/items';
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
            selectedProduct: null,
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
            if (!this.selectedProduct) {
                this.showErrorMessage('Select a product')
                return
            }
            if (this.item.quantity < 1) {
                this.showErrorMessage('Invalid quantity')
                return
            } if (this.item.price < 0) {
                this.showErrorMessage('Invalid price')
                return
            }
            this.loading = true
            await useItemsStore().createItem(this.item)
            this.loading = false
            this.searchQuery = ''
            this.product = {}
            this.item = {}
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
    height: 100%;
}
</style>
