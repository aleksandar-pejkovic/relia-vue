import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import { useBaseUrlStore } from './baseUrl';
import { showErrorMessage, showSuccessMessage } from '../components/helper/message'
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
                if (!authStore.token) {
                    return
                }
                const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/products`, {
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
                const response = await axios.post(`${useBaseUrlStore().baseUrl}/api/products`, productData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.products.push(response.data)
                localStorage.setItem('products', JSON.stringify(this.products))
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        async updateProduct(productData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.put(`${useBaseUrlStore().baseUrl}/api/products`, productData, {
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
                showErrorMessage(error)
            }
        },
        async deleteProduct(productId) {
            try {
                const authStore = useAuthenticationStore()
                await axios.delete(`${useBaseUrlStore().baseUrl}/api/products/${productId}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.products = this.products.filter(product => product.id !== productId)
                localStorage.setItem('products', JSON.stringify(this.products))
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
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
