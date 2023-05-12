import { defineStore } from 'pinia';
import { useAuthenticationStore } from '@/stores/authentication';
import axios from 'axios';

export const useItemsStore = defineStore({
    id: 'items',
    state: () => ({
        items: JSON.parse(localStorage.getItem('items')) || null,
        editItem: JSON.parse(localStorage.getItem('editItem')) || {},
    }),
    actions: {
        async fetchItems(invoiceId) {
            try {
                const authStore = useAuthenticationStore();
                const response = await axios.get(`http://localhost:8080/api/items/invoice/${invoiceId}`, {
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
                const response = await axios.post('http://localhost:8080/api/items', itemData, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                this.items.push(response.data);
                localStorage.setItem('items', JSON.stringify(this.items));
            } catch (error) {
                console.error(error);
            }
        },
        async updateItem(itemData) {
            try {
                const authStore = useAuthenticationStore();
                const response = await axios.put(`http://localhost:8080/api/items`, itemData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                });
                const index = this.items.findIndex(item => item.id === itemData.id);
                if (index >= 0) {
                    this.items[index] = response.data;
                    localStorage.setItem('items', JSON.stringify(this.items));
                }
            } catch (error) {
                console.error(error);
            }
        },
        async deleteItem(itemId) {
            try {
                const authStore = useAuthenticationStore();
                await axios.delete(`http://localhost:8080/api/items/${itemId}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                });
                this.items = this.items.filter(item => item.id !== itemId);
                localStorage.setItem('items', JSON.stringify(this.items));
            } catch (error) {
                console.error(error);
            }
        },
        reset() {
            this.items = null;
            localStorage.removeItem('items');
            this.clearEditItem();
        },
        clearEditItem() {
            this.editItem = {};
            localStorage.removeItem('editItem');
        }
    }
});
