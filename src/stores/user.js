import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),
    actions: {
        async fetchUser() {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.get('http://localhost:8080/api/users/current', {
                    headers: { Authorization: `Bearer ${authStore.token}` }
                })

                // Update the store's state with the user data
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
                throw new Error('Failed to fetch user data')
            }
        },
        async createUser(userData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.post('http://localhost:8080/api/users/register', userData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
            }
        },
        async updateUser(userData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.put(`http://localhost:8080/api/users`, userData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
            }
        },
        async deleteUser(userId) {
            try {
                const authStore = useAuthenticationStore()
                await axios.delete(`http://localhost:8080/api/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.user = null
                localStorage.removeItem('user')
            } catch (error) {
                console.error(error)
            }
        },
        reset() {
            this.user = null
            localStorage.removeItem('user')
        }
    },
})
