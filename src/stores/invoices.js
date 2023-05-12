import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import axios from 'axios'

export const useInvoicesStore = defineStore({
    id: 'invoice',
    state: () => ({
        invoices: JSON.parse(localStorage.getItem('invoices')) || null,
        editInvoice: JSON.parse(localStorage.getItem('editInvoice')) || {},
    }),
    actions: {
        async fetchInvoices() {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.get('http://localhost:8080/api/invoices', {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.invoices = response.data
                localStorage.setItem('invoices', JSON.stringify(this.invoices))
            } catch (error) {
                console.error(error)
            }
        },
        async createInvoice(invoiceData) {
            const authStore = useAuthenticationStore();
            try {
                const response = await axios.post('http://localhost:8080/api/invoices', invoiceData, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                this.invoices.push(response.data);
                localStorage.setItem('invoices', JSON.stringify(this.invoices))
            } catch (error) {
                this.error = 'Failed to create invoice.';
            }
        },
        async updateProduct(invoiceData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.put(`http://localhost:8080/api/invoices`, invoiceData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                const index = this.invoices.findIndex(invoice => invoice.id === invoiceData.id)
                if (index >= 0) {
                    this.invoices[index] = response.data
                    localStorage.setItem('products', JSON.stringify(this.invoices))
                }
            } catch (error) {
                console.error(error)
            }
        },
        async deleteProduct(invoiceId) {
            try {
                const authStore = useAuthenticationStore()
                await axios.delete(`http://localhost:8080/api/invoices/${invoiceId}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.invoices = this.invoices.filter(invoice => invoice.id !== invoiceId)
                localStorage.setItem('invoices', JSON.stringify(this.invoices))
            } catch (error) {
                console.error(error)
            }
        },
        reset() {
            this.invoices = null
            localStorage.removeItem('invoices')
            this.clearEditInvoice()
        },
        clearEditInvoice() {
            this.editInvoice = {}
            localStorage.removeItem('editInvoice')
        }
    }
})
