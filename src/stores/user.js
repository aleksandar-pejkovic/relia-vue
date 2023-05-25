import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import { useBaseUrlStore } from './baseUrl';
import axios from 'axios'
import { showErrorMessage } from '../components/helper/message';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),
    actions: {
        async fetchUser() {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/users/current`, {
                    headers: { Authorization: `Bearer ${authStore.token}` }
                })

                // Update the store's state with the user data
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        async createUser(userData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.post(`${useBaseUrlStore().baseUrl}/api/users/register`, userData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        async updateUser(userData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.put(`${useBaseUrlStore().baseUrl}/api/users`, userData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        async deleteUser(userId) {
            try {
                const authStore = useAuthenticationStore()
                await axios.delete(`${useBaseUrlStore().baseUrl}/api/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.user = null
                localStorage.removeItem('user')
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        reset() {
            this.user = null
            localStorage.removeItem('user')
        }
    },
})
