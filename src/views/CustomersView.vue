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
                <CreateCustomer @customer-created="reloadCustomers" />
            </div>
        </div>
        <div class="row">
            <ReadCustomers ref="customers" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import CreateCustomer from "../components/customer/CreateCustomer.vue";
import ReadCustomers from '../components/customer/ReadCustomers.vue';

export default defineComponent({
    components: {
        CreateCustomer, ReadCustomers
    },
    data() {
        return {
            values: ['Name', 'Tax number', 'Director', 'Address', 'City', 'Phone'],
            keys: ['name', 'taxNumber', 'director', 'street', 'city', 'phone']
        }
    },
    computed: {
        itemsWithKeys() {
            return this.keys.map((key, index) => {
                return { key: key, value: this.values[index] };
            });
        }
    },
    methods: {
        reloadCustomers() {
            this.$refs.customers.fetchData()
        },
    }
})
</script>

<style>
th {
    width: 250px;
}
</style>
