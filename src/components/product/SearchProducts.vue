<template>
    <div>
        <input class="form-control m-2" type="search" v-model="searchQuery" placeholder="Pretraži proizvode..."
            @focus="showSearchList" @blur="hideSearchList">
        <ul class="list-group mt-2" v-show="isFocused">
            <li v-for="product in filteredProducts" :key="product.id" class="list-group-item"
                @click="selectProduct(product)">{{ product.name }}
            </li>
        </ul>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { useProductsStore } from '../../stores/products';

export default defineComponent({
    data() {
        return {
            isFocused: false,
            searchQuery: '',
        }
    },
    computed: {
        filteredProducts: {
            get() {
                return useProductsStore().filterProducts(this.searchQuery)
            }
        },
    },
    methods: {
        showSearchList() {
            this.isFocused = true
        },
        hideSearchList() {
            setTimeout(() => this.isFocused = false, 100)
        },
        selectProduct(product) {
            this.searchQuery = product.name
            this.$emit('product-selected', product);
        },
    },
})
</script>
  