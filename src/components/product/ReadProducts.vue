<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="col-2">Name</th>
                        <th class="col-2">City</th>
                        <th class="col-2">Address</th>
                        <th class="col-2">Tax number</th>
                        <th class="col-2">Director</th>
                        <th class="col-2">Phone</th>
                        <th class="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in customers" :key="customer.id" @click="openEditCustomerModal(customer)"
                        data-bs-toggle="modal" data-bs-target="#editCustomerModal">
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            {{ customer.city }}
                        </td>
                        <td>
                            {{ customer.street }}
                        </td>
                        <td>
                            {{ customer.taxNumber }}
                        </td>
                        <td>
                            {{ customer.director }}
                        </td>
                        <td>
                            {{ customer.phone }}
                        </td>
                        <td>
                            <button @click="openEditCustomerModal(customer)" type="button" class="btn btn-primary"
                                data-bs-toggle="modal" data-bs-target="#editCustomerModal">
                                View
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-3" v-for="customer in customers" :key="customer.id">
                    <div @click="openEditCustomerModal(customer)" data-bs-toggle="modal" data-bs-target="#editCustomerModal"
                        class="card mt-2">
                        <div class="card-body p-3">
                            <div class="mb-2">
                                <div class="fw-bold">{{ customer.name }}</div>
                                <div>City: {{ customer.city }}</div>
                                <div>Director: {{ customer.director }}</div>
                                <div>Phone: {{ customer.phone }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <EditCustomerModal @cancel-editing="fetchData" :customer="customerToEdit" />
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios'
import { useAuthenticationStore } from '../../stores/authentication'
import { useBaseUrlStore } from '../../stores/baseUrl'
import EditCustomerModal from './EditCustomerModal.vue';

export default defineComponent({
    data() {
        return {
            customers: [],
            customerToEdit: {},
            isSmallScreen: window.innerWidth <= 768,
        };
    },
    created() {
        window.addEventListener("resize", this.handleResize);
        this.fetchData();
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.isSmallScreen = window.innerWidth <= 768;
        },
        fetchData() {
            const baseUrlStore = useBaseUrlStore();
            const authenticationStore = useAuthenticationStore();
            const url = baseUrlStore.getUrl("companies");
            const token = authenticationStore.token;
            axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(response => response.data)
                .then(data => this.customers = data)
                .catch(error => console.error(error));
        },
        openEditCustomerModal(customer) {
            this.customerToEdit = customer
        }
    },
    components: { EditCustomerModal }
})
</script>

<style scoped>
thead {
    background-color: darkslateblue;
    color: wheat;
}

th {
    width: 250px;
    max-width: 300px;
}

td,
.card {
    cursor: pointer;
}

.card {
    color: darkslateblue;
}
</style>

