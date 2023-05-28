import { defineStore } from 'pinia'

export const useBaseUrlStore = defineStore('baseUrl', {
  state: () => ({
    // baseUrl: 'http://localhost:8080'
    baseUrl: 'https://reliabill-production.up.railway.app'
  }),
  actions: {
    getUrl(endpoint) {
      return `${this.baseUrl}/${endpoint}`
    }
  }
})
