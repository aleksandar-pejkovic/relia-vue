import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),
    getters: {
        getUser() {
            const user = localStorage.getItem('user')
            return user ? JSON.parse(user) : null
        }
    },
    actions: {
        setUser(user) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        clear() {
            this.user = null
            localStorage.removeItem('user')
        }
    },
})