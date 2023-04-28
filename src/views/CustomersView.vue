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
            <Data @edit-modal="openModal(item)" url="companies" :headers="itemsWithKeys" ref="customers"></Data>
        </div>
        <div class="mt-2">
            <!-- Button trigger modal -->
            <div type="button" data-bs-toggle="modal" data-bs-target="#editModal" ref="toggleEditModalBtn"></div>
            <EditCustomerModal :company="company" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Data from '../components/data/Data.vue';
import CreateCustomer from "../components/customer/CreateCustomer.vue";
import EditCustomerModal from '../components/customer/EditCustomerModal.vue';

export default defineComponent({
    components: {
        Data, CreateCustomer, EditCustomerModal
    },
    data() {
        return {
            values: ['Name', 'Tax number', 'Director', 'Address', 'City', 'Phone'],
            keys: ['name', 'taxNumber', 'director', 'street', 'city', 'phone'],
            company: {
                id: '',
                name: '',
                city: '',
                zip: '',
                street: '',
                registrationNumber: '',
                taxNumber: '',
                bankAccount: '',
                phone: '',
                email: '',
                website: '',
                director: ''
            }
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
            this.$refs.company.fetchData()
        },
        openModal(item) {
            this.customer = item
            this.$refs.toggleEditModalBtn.click()
        }
    }
})
</script>

<style>
th {
    width: 250px;
}
</style>
