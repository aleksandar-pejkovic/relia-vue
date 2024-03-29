import { defineStore } from 'pinia';
import { useAuthenticationStore } from '@/stores/authentication';
import axios from 'axios';
import { useInvoicesStore } from './invoices';
import { useBaseUrlStore } from './baseUrl';
import { showErrorMessage, showSuccessMessage } from '../components/helper/message'

export const useItemsStore = defineStore({
    id: 'items',
    state: () => ({
        items: JSON.parse(localStorage.getItem('items')) || null,
        itemsByInvoice: JSON.parse(localStorage.getItem('itemsByInvoice')) || null,
    }),
    actions: {
        filterItemsByInvoiceId(invoiceId) {
            this.itemsByInvoice = this.items.filter((item) =>
                item.invoiceId === invoiceId
            );
            localStorage.setItem('itemsByInvoice', JSON.stringify(this.itemsByInvoice));
        },
        async fetchAllItems() {
            try {
                const authStore = useAuthenticationStore();
                if (!authStore.token) {
                    return
                }
                const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/items`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                });
                this.items = response.data;
                localStorage.setItem('items', JSON.stringify(this.items));
            } catch (error) {
                console.error(error);
            }
        },
        async fetchItemsByInvoiceId(invoiceId) {
            try {
                const authStore = useAuthenticationStore();
                const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/items/invoice/${invoiceId}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                });
                this.items = response.data;
                localStorage.setItem('items', JSON.stringify(this.items));
            } catch (error) {
                console.error(error);
            }
        },
        async createItem(itemData) {
            const authStore = useAuthenticationStore();
            try {
                const response = await axios.post(`${useBaseUrlStore().baseUrl}/api/items`, itemData, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                this.items.push(response.data);
                localStorage.setItem('items', JSON.stringify(this.items));
                this.filterItemsByInvoiceId(response.data.invoiceId)
                useInvoicesStore().increaseTotal(response.data)
            } catch (error) {
                console.error(error);
                showErrorMessage(error)
            }
        },
        async updateItem(itemData) {
            try {
                const authStore = useAuthenticationStore();
                const response = await axios.put(`${useBaseUrlStore().baseUrl}/api/items`, itemData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                });
                const index = this.items.findIndex(item => item.id === itemData.id);
                if (index >= 0) {
                    this.items[index] = response.data;
                    localStorage.setItem('items', JSON.stringify(this.items));
                    this.filterItemsByInvoiceId(response.data.invoiceId)
                }
            } catch (error) {
                console.error(error);
                showErrorMessage(error)
            }
        },
        async deleteItem(item) {
            try {
                const authStore = useAuthenticationStore();
                await axios.delete(`${useBaseUrlStore().baseUrl}/api/items/${item.id}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                });
                this.items = this.items.filter(i => i.id !== item.id);
                localStorage.setItem('items', JSON.stringify(this.items));
                this.filterItemsByInvoiceId(item.invoiceId)
                useInvoicesStore().reduceTotal(item)
            } catch (error) {
                console.error(error);
                showErrorMessage(error)
            }
        },
        setItems(items) {
            this.items = items
            localStorage.setItem('items', JSON.stringify(items));
        },
        reset() {
            this.items = null;
            localStorage.removeItem('items');
            this.clearItemsByInvoice()
        },
        clearItemsByInvoice() {
            this.itemsByInvoice = null;
            localStorage.removeItem('itemsByInvoice');
        }
    }
});
