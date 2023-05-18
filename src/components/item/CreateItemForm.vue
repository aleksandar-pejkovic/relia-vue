<template>
    <div class="container mt-3">
        <h4>Add Item</h4>
        <form @submit.prevent="createItem" class="justify-content-center align-items-center flex-column">
            <div class="row m-3">
                <div class="col-md-4">
                    <input class="form-control" type="search" v-model="searchQuery" placeholder="Search product..."
                        @focus="showSearchList" @blur="hideSearchList" >
                    <ul class="list-group mt-3" v-show="isFocused">
                        <li v-for="product in filteredProducts" :key="product.id" class="list-group-item"
                            @click="selectProduct(product)">{{ product.name }}
                        </li>
                    </ul>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="number" class="form-control" id="quantity" placeholder="Quantity"
                            v-model="item.quantity">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <input type="number" class="form-control" id="price" placeholder="Price" v-model="item.price">
                    </div>
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
        }
    },
    methods: {
        showSearchList() {
            this.isFocused = true
        },
        hideSearchList() {
            setTimeout(() => this.isFocused = false, 100)
        },
        selectProduct(product) {
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
            useItemsStore().createItem(this.item)
            this.searchQuery = ''
            this.product = {}
            this.item = {}
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
