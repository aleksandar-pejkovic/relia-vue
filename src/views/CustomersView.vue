<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-md-9">
                <h1 clas>Customers</h1>
            </div>
            <div class="col-md-3">
                <CreateCustomer @customerCreated="reloadCustomers()" />
            </div>
        </div>
        <div class="mt-2">
            <Data url="companies" :headers="itemsWithKeys" ref="customers"></Data>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Data from '../components/data/Data.vue';
import CreateCustomer from "../components/customer/CreateCustomer.vue";

export default defineComponent({
    components: {
        Data, CreateCustomer
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
        }
    }
})
</script>

<style>
th {
    width: 250px;
}
</style>
