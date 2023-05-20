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
        sortByCreationDateAsc() {
            this.invoices.sort((a, b) => a.creationDate.localeCompare(b.creationDate));
        },
        sortByCreationDateDesc() {
            this.invoices.sort((a, b) => b.creationDate.localeCompare(a.creationDate));
        },
        sortByDueDateAsc() {
            this.invoices.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
        },
        sortByDueDateDesc() {
            this.invoices.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
        },
        sortByTotalAsc() {
            this.invoices.sort((a, b) => a.total - b.total);
        },
        sortByTotalDesc() {
            this.invoices.sort((a, b) => b.total - a.total);
        },
        reduceTotal(item) {
            this.editInvoice.total -= item.total
            this.invoices.map(invoice => invoice.id === item.invoiceId ? this.editInvoice : invoice);
            localStorage.setItem('invoices', JSON.stringify(this.invoices))
        },
        increaseTotal(item) {
            this.editInvoice.total += item.total
            this.invoices.map(invoice => invoice.id === item.invoiceId ? this.editInvoice : invoice);
            localStorage.setItem('invoices', JSON.stringify(this.invoices))
        },
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
                this.editInvoice = response.data
                localStorage.setItem('editInvoice', JSON.stringify(this.editInvoice))
                this.invoices.push(this.editInvoice);
                localStorage.setItem('invoices', JSON.stringify(this.invoices))
            } catch (error) {
                this.error = 'Failed to create invoice.';
            }
        },
        async updateInvoice(invoiceData) {
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
                    localStorage.setItem('invoices', JSON.stringify(this.invoices))
                }
            } catch (error) {
                console.error(error)
            }
        },
        async deleteInvoice(invoiceId) {
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
