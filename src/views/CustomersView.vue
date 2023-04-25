<template>
    <div class="container">
        <CreateCustomer @customerCreated="reloadCustomers()" />
        <ListCustomers ref="customers" />
    </div>
</template>

<script>
import CreateCustomer from "../components/customer/CreateCustomer.vue";
import ListCustomers from "../components/customer/ListCustomers.vue"
export default {
    components: { CreateCustomer, ListCustomers },
    methods: {
        reloadCustomers() {
            this.$refs.customers.fetchCompanies()
        }
    }
};
</script>
  