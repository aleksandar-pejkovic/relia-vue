<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-md-10">
                <h1 clas>Partners</h1>
            </div>
            <div class="col-md-2">
                <button @click="openCustomerModal" type="button" class="btn btn-success m-2" data-bs-toggle="modal"
                    data-bs-target="#customerModal">
                    Add Partner
                </button>
            </div>
        </div>
        <div class="row m-2">
            <SearchCustomers class="col-md-7" @company-selected="viewCompany" ref="searchCompanies" />
        </div>
        <div class="row">
            <ReadCustomers ref="readCustomers" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReadCustomers from '../components/customer/ReadCustomers.vue';
import { useCompaniesStore } from '../stores/companies';
import SearchCustomers from '../components/customer/SearchCustomers.vue';

export default defineComponent({
    components: {
        ReadCustomers,
        SearchCustomers
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
