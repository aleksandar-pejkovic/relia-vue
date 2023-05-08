<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-md-10">
                <h1 clas>Customers</h1>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#createCustomerModal">
                    Add customer
                </button>
                <CreateCustomerModal />
            </div>
        </div>
        <div class="row">
            <ReadCustomers />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import CreateCustomerModal from "../components/customer/CreateCustomerModal.vue";
import ReadCustomers from '../components/customer/ReadCustomers.vue';

export default defineComponent({
    components: {
        CreateCustomerModal, ReadCustomers
    },
})
</script>
