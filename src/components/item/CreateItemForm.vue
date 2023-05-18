<template>
    <div class="container mt-3">
        <h4>Add Item</h4>
        <form @submit.prevent="createItem" class="justify-content-center align-items-center flex-column">
            <div class="row m-3">
                <div class="col-md-4">
                    <input class="form-control" type="search" v-model="searchQuery" placeholder="Search product..."
                        @focus="showSearchList" @blur="hideSearchList">
                    <ul class="list-group mt-3" v-show="isFocused">
                        <li v-for="product in filteredProducts" :key="product.id" class="list-group-item"
                            @click="selectProduct(product)">{{ product.name }}
                        </li>
                    </ul>
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
                    <span v-if="priceError" class="error">{{ priceError }}</span>
                </div>
                <div class="col-md-1">
                    <button id="addItemBtn" class="btn btn-success" type="submit">+</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useProductsStore } from '../../stores/products';
import { useItemsStore } from '../../stores/items';
import { validatePrice } from '@/components/validation/productValidation';
import Swal from 'sweetalert2'

export default defineComponent({
    props: {
        invoiceId: {
            type: Number,
            required: true
        }
    },
    computed: {
        filteredProducts: {
            get() {
                return useProductsStore().filterProducts(this.searchQuery)
            }
        },
    },
    data() {
        return {
            item: {},
            product: {},
            isFocused: false,
            searchQuery: '',
            selectedProduct: null,
            priceError: "",
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
        showSearchList() {
            this.isFocused = true
        },
        hideSearchList() {
            setTimeout(() => this.isFocused = false, 100)
        },
        selectProduct(product) {
            this.priceError = ''
            this.selectedProduct = { ...product }
            this.isFocused = false;
            this.searchQuery = product.name
            this.item.productName = product.name;
            this.item.price = product.price;
            this.item.unit = product.unit
            this.item.quantity = 1
            this.item.taxRate = product.taxRate
            this.item.invoiceId = this.invoiceId
        },
        createItem() {
            if (!this.selectedProduct) {
                this.showErrorMessage('Select a product')
                return
            }
            if (!this.selectedProduct) {
                this.showErrorMessage('Invalid price')
                return
            }
            useItemsStore().createItem(this.item)
            this.searchQuery = ''
            this.product = {}
            this.item = {}
        },
        validatePrice() {
            this.priceError = validatePrice(this.item.price)
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
