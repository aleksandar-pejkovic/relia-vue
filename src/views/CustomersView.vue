<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-md-10">
                <h1 clas>Customers</h1>
            </div>
            <div class="col-md-2">
                <button @click="openCustomerModal" type="button" class="btn btn-success m-2" data-bs-toggle="modal"
                    data-bs-target="#customerModal">
                    Add customer
                </button>
            </div>
        </div>
        <div class="row">
            <ReadCustomers />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReadCustomers from '../components/customer/ReadCustomers.vue';
import { useCompaniesStore } from '../stores/companies';

export default defineComponent({
    components: {
        ReadCustomers
    },
    methods: {
        openCustomerModal() {
            useCompaniesStore().clearEditCompany()
        }
    }
})
</script>
