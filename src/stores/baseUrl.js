import { defineStore } from 'pinia'

export const useBaseUrlStore = defineStore('baseUrl', {
  state: () => ({
    // baseUrl: 'http://localhost:8080'
    baseUrl: 'https://relia-bill-f3851f572214.herokuapp.com/'
  }),
  actions: {
    getUrl(endpoint) {
      return `${this.baseUrl}/${endpoint}`
    }
  }
})
