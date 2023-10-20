<template>
    <div class="main container mt-2">
        <div class="row">
            <div class="col-md-5">
                <h1>Partneri</h1>
            </div>
            <div class="col-md-5">
                <CustomersReport />
            </div>
            <div class="col-md-2">
                <button @click="openCustomerModal" type="button" class="btn btn-gold btn-primary m-2" data-bs-toggle="modal"
                    data-bs-target="#customerModal">
                    Dodaj
                </button>
            </div>
        </div>
        <div class="row m-3">
            <SearchCustomers class="col-md-6 mt-3" @company-selected="viewCompany" ref="searchCompanies" />
        </div>
        <div class="row">
            <ReadCustomers ref="readCustomers" />
        </div>
    </div>
    <CustomerModal ref="modal" />
</template>

<script>
import { defineComponent } from 'vue';
import ReadCustomers from '@/components/customer/ReadCustomers.vue';
import CustomerModal from '@/components/customer/CustomerModal.vue';
import { useCompaniesStore } from '../stores/companies';
import SearchCustomers from '../components/customer/SearchCustomers.vue';
import CustomersReport from '../components/customer/CustomersReport.vue';

export default defineComponent({
    beforeUnmount() {
        this.$refs.modal.$refs.closeBtn.click()
    },
    components: {
        ReadCustomers,
        SearchCustomers,
        CustomersReport,
        CustomerModal
    },
    methods: {
        openCustomerModal() {
            useCompaniesStore().clearEditCompany()
        },
        viewCompany(company) {
            this.$refs.searchCompanies.searchQuery = ''
            this.$refs.readCustomers.viewCompany(company)
        }
    }
})
</script>
