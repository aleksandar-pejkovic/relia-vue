import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import axios from 'axios'

export const useCompaniesStore = defineStore({
    id: 'companies',
    state: () => ({
        companies: JSON.parse(localStorage.getItem('companies')) || null,
        ownCompany: JSON.parse(localStorage.getItem('ownCompany')) || null,
    }),
    actions: {
        async fetchCompanies() {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.get('http://localhost:8080/api/companies', {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.companies = response.data
                localStorage.setItem('companies', JSON.stringify(this.companies));
            } catch (error) {
                console.error(error)
            }
        },
        async fetchOwnCompany() {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.get('http://localhost:8080/api/companies/own', {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.ownCompany = response.data
                localStorage.setItem('ownCompany', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
            }
        },
        async createCompany(companyData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.post('http://localhost:8080/api/companies/client', companyData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.companies.push(response.data)
                localStorage.setItem('companies', JSON.stringify(this.companies));
            } catch (error) {
                console.error(error)
            }
        },
        async createOwnCompany(companyData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.post('http://localhost:8080/api/companies/own', companyData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.ownCompany = response.data
                localStorage.setItem('ownCompany', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
            }
        },
        async updateCompany(companyData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.put(`http://localhost:8080/api/companies`, companyData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                const index = this.companies.findIndex(company => company.id === companyData.id)
                if (index >= 0) {
                    this.companies[index] = response.data
                    localStorage.setItem('companies', JSON.stringify(this.companies));
                }
            } catch (error) {
                console.error(error)
            }
        },
        async updateOwnCompany(companyData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.put(`http://localhost:8080/api/companies`, companyData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.ownCompany = response.data
                localStorage.setItem('ownCompany', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
            }
        },
        async deleteCompany(companyId) {
            try {
                const authStore = useAuthenticationStore()
                await axios.delete(`http://localhost:8080/api/companies/${companyId}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.companies = this.companies.filter(company => company.id !== companyId)
                localStorage.setItem('companies', JSON.stringify(this.companies))
            } catch (error) {
                console.error(error)
            }
        },
        reset() {
            this.companies = null
            this.ownCompany = null
            localStorage.removeItem('companies')
            localStorage.removeItem('ownCompany')
        }
    }
})
