<template>
    <CreateCustomer></CreateCustomer>
    <ListCustomers></ListCustomers>
</template>
  
  
<script>
import CreateCustomer from "../components/customer/CreateCustomer.vue";
import ListCustomers from "../components/customer/ListCustomers.vue"
export default {
    components: { CreateCustomer, ListCustomers }
};
</script>
  