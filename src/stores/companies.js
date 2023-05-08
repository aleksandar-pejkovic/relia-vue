import { defineStore } from 'pinia'
import { useAuthenticationStore } from '@/stores/authentication'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useCompaniesStore = defineStore({
    id: 'companies',
    state: () => ({
        companies: JSON.parse(localStorage.getItem('companies')) || null,
        ownCompany: JSON.parse(localStorage.getItem('ownCompany')) || null,
        editCompany: JSON.parse(localStorage.getItem('editCompany')) || {},
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
                Swal.fire({
                    title: `${companyData.name} updated`,
                    text: 'Customer was successfully updated',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } catch (error) {
                console.error(error)
                let errorMessages = error.message;
                if (error.response && error.response.data) {
                    errorMessages = error.response.data.error || error.response.data.message || errorMessages;
                }
                Swal.fire({
                    title: 'Update customer unsuccessful!',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
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
        async deleteCompany(company) {
            try {
                const authStore = useAuthenticationStore();
                await axios.delete(`http://localhost:8080/api/companies/${company.id}`, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                });
                this.companies = this.companies.filter(c => c.id !== company.id);
                localStorage.setItem('companies', JSON.stringify(this.companies));
            } catch (error) {
                console.error(error);
            }
        },
        reset() {
            this.companies = null
            this.ownCompany = null
            localStorage.removeItem('companies')
            localStorage.removeItem('ownCompany')
        }
    },
})
