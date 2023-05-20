import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import axios from 'axios'

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        products: JSON.parse(localStorage.getItem('products')) || null,
        editProduct: JSON.parse(localStorage.getItem('editProduct')) || {},
    }),
    actions: {
        sortByNameAsc() {
            this.products.sort((a, b) => a.name.localeCompare(b.name));
        },
        sortByNameDesc() {
            this.products.sort((a, b) => b.name.localeCompare(a.name));
        },
        sortByPriceAsc() {
            this.products.sort((a, b) => a.price - b.price);
        },
        sortByPriceDesc() {
            this.products.sort((a, b) => b.price - a.price);
        },
        sortByPluAsc() {
            this.products.sort((a, b) => a.plu - b.plu);
        },
        sortByPluDesc() {
            this.products.sort((a, b) => b.plu - a.plu);
        },
        filterProducts(searchInput) {
            if (!searchInput) {
                return this.products;
            }
            const searchQuery = searchInput.toLowerCase();
            return this.products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery)
            );
        },
        async fetchProducts() {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.get('http://localhost:8080/api/products', {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.products = response.data
                localStorage.setItem('products', JSON.stringify(this.products))
            } catch (error) {
                console.error(error)
            }
        },
        async createProduct(productData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.post('http://localhost:8080/api/products', productData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.products.push(response.data)
                localStorage.setItem('products', JSON.stringify(this.products))
            } catch (error) {
                console.error(error)
            }
        },
        async updateProduct(productData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.put(`http://localhost:8080/api/products`, productData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                const index = this.products.findIndex(product => product.id === productData.id)
                if (index >= 0) {
                    this.products[index] = response.data
                    localStorage.setItem('products', JSON.stringify(this.products))
                }
            } catch (error) {
                console.error(error)
            }
        },
        async deleteProduct(productId) {
            try {
                const authStore = useAuthenticationStore()
                await axios.delete(`http://localhost:8080/api/products/${productId}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.products = this.products.filter(product => product.id !== productId)
                localStorage.setItem('products', JSON.stringify(this.products))
            } catch (error) {
                console.error(error)
            }
        },
        reset() {
            this.products = null
            localStorage.removeItem('products')
            this.clearEditProduct()
        },
        clearEditProduct() {
            this.editProduct = {}
            localStorage.removeItem('editProduct')
        }
    }
})
