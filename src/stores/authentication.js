import { defineStore } from 'pinia';
import axios from 'axios'

export const useAuthenticationStore = defineStore({
  id: 'authentication',
  state: () => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.token !== null;
    },
    getUsername: (state => {
      return state.username;
    })
  },
  actions: {
    async login(username, password) {
      try {
        const authHeader = "Basic " + btoa(username + ":" + password);
        const response = await axios.post('http://localhost:8080/api/auth/login', null, {
          headers: {
            Authorization: authHeader
          }
        })
        const token = response.data

        // Update the store's state with the response data
        this.setToken(token)
        this.setUsername(username)
      } catch (error) {
        console.error(error)
        throw new Error('Login failed')
      }
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    removeToken() {
      this.token = null;
      localStorage.removeItem('token');
    },
    setUsername(username) {
      this.username = username
      localStorage.setItem('username', username);
    },
    removeUsername() {
      this.username = null;
      localStorage.removeItem('username');
    }
  },
});
