import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import { useBaseUrlStore } from './baseUrl';
import axios from 'axios'
import { showErrorMessage } from '../components/helper/message';

export const useCompaniesStore = defineStore({
    id: 'companies',
    state: () => ({
        companies: JSON.parse(localStorage.getItem('companies')) || null,
        ownCompany: JSON.parse(localStorage.getItem('ownCompany')) || null,
        editCompany: JSON.parse(localStorage.getItem('editCompany')) || {},
    }),
    actions: {
        sortByNameAsc() {
            this.companies.sort((a, b) => a.name.localeCompare(b.name));
        },
        sortByNameDesc() {
            this.companies.sort((a, b) => b.name.localeCompare(a.name));
        },
        sortByCityAsc() {
            this.companies.sort((a, b) => a.city.localeCompare(b.city));
        },
        sortByCityDesc() {
            this.companies.sort((a, b) => b.city.localeCompare(a.city));
        },
        filterCompanies(searchInput) {
            if (!searchInput) {
                return this.companies;
            }
            const searchQuery = searchInput.toLowerCase();
            return this.companies.filter((company) =>
                company.name.toLowerCase().includes(searchQuery)
            );
        },
        async fetchCompanies() {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/companies`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.companies = response.data
                localStorage.setItem('companies', JSON.stringify(this.companies));
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        async fetchOwnCompany() {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.get(`${useBaseUrlStore().baseUrl}/api/companies/own`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.ownCompany = response.data
                localStorage.setItem('ownCompany', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        async createCompany(companyData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.post(`${useBaseUrlStore().baseUrl}/api/companies/client`, companyData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.companies.push(response.data)
                localStorage.setItem('companies', JSON.stringify(this.companies));
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        async createOwnCompany(companyData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.post(`${useBaseUrlStore().baseUrl}/api/companies/own`, companyData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.ownCompany = response.data
                localStorage.setItem('ownCompany', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        async updateCompany(companyData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.put(`${useBaseUrlStore().baseUrl}/api/companies`, companyData, {
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
                showErrorMessage(error)
            }
        },
        async updateOwnCompany(companyData) {
            try {
                const authStore = useAuthenticationStore()
                const response = await axios.put(`${useBaseUrlStore().baseUrl}/api/companies`, companyData, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })
                this.ownCompany = response.data
                localStorage.setItem('ownCompany', JSON.stringify(response.data))
            } catch (error) {
                console.error(error)
                showErrorMessage(error)
            }
        },
        async deleteCompany(company) {
            try {
                const authStore = useAuthenticationStore();
                await axios.delete(`${useBaseUrlStore().baseUrl}/api/companies/${company.id}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                });
                this.companies = this.companies.filter(c => c.id !== company.id);
                localStorage.setItem('companies', JSON.stringify(this.companies));
            } catch (error) {
                console.error(error);
                showErrorMessage(error)
            }
        },
        reset() {
            this.companies = null
            this.ownCompany = null
            localStorage.removeItem('companies')
            localStorage.removeItem('ownCompany')
            this.clearEditCompany()
        },
        clearEditCompany() {
            this.editCompany = {}
            localStorage.removeItem('editCompany')
        }
    },
})
