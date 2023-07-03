import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import { useBaseUrlStore } from './baseUrl';
import axios from 'axios'
import { showErrorMessage, showSuccessMessage } from '../components/helper/message';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),
    actions: {
        async fetchUser() {
            try {
                const authStore = useAuthenticationStore()
                if (!authStore.token) {
                    return
                }
                const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/users/current`, {
                    headers: { Authorization: `Bearer ${authStore.token}` }
                })

                // Update the store's state with the user data
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
            }
        },
        async createUser(userData) {
            try {
                await axios.post(
                    `${useBaseUrlStore().baseUrl}/api/users/register`,
                    userData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                )
                showSuccessMessage('Regustration successfull', 'You can now sign in')
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
        setUser(user) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        reset() {
            this.user = null
            localStorage.removeItem('user')
        }
    },
})
