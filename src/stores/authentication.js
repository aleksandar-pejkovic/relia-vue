import { defineStore } from 'pinia';

export const useAuthenticationStore = defineStore({
  id: 'authentication',
  state: () => ({
    token: localStorage.getItem('token') || null,
    username: null
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.token !== null;
    },
  },
  actions: {
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
