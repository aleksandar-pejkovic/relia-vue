import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import axios from 'axios'

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        products: null
    }),
    actions: {
        async fetchProducts() {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.get('http://localhost:8080/api/products', {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.products = response.data
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
            } catch (error) {
                console.error(error)
            }
        }
    }
})
