import { defineStore } from 'pinia'

export const useBaseUrlStore = defineStore('baseUrl', {
  state: () => ({
    baseUrl: 'http://localhost:8080/api'
  }),
  actions: {
    getUrl(endpoint) {
      return `${this.baseUrl}/${endpoint}`
    }
  }
})
