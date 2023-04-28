<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">City</th>
                <th scope="col">Zip number</th>
                <th scope="col">Address</th>
                <th scope="col">Registration number</th>
                <th scope="col">Tax number</th>
                <th scope="col">Bank account</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Website</th>
                <th scope="col">Director</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(company, index) in companies" :key="index">
                <td>{{ company.name }}</td>
                <td>{{ company.city }}</td>
                <td>{{ company.zip }}</td>
                <td>{{ company.address }}</td>
                <td>{{ company.registrationNumber }}</td>
                <td>{{ company.taxNumber }}</td>
                <td>{{ company.bankAccount }}</td>
                <td>{{ company.phone }}</td>
                <td>{{ company.email }}</td>
                <td>{{ company.website }}</td>
                <td>{{ company.director }}</td>
                <td>
                    <button class="btn btn-primary" @click="openModal(company.id)">Edit</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="modal" tabindex="-1" role="dialog" v-show="showModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Company</h5>
                    <button type="button" class="close" @click="showModal = false">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Modal content goes here.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useBaseUrlStore } from '@/stores/baseUrl'
import { useAuthenticationStore } from '../../stores/authentication'

export default {
    data() {
        return {
            companies: [],
            fields: [
                { key: "id", label: "ID" },
                { key: "name", label: "Name" },
                { key: "director", label: "Director" },
                { key: "registrationNumber", label: "Registration Number" },
                { key: "taxNumber", label: "Tax Number" },
                { key: "bankAccount", label: "Bank Account" },
                { key: "street", label: "Street" },
                { key: "zip", label: "ZIP" },
                { key: "city", label: "City" },
                { key: "phone", label: "Phone" },
                { key: "email", label: "Email" },
                { key: "website", label: "Website" },
                { key: "actions", label: "Actions" },
            ],
            showModal: false,
        };
    },
    mounted() {
        this.fetchCompanies();
    },
    methods: {
        fetchCompanies() {
            const baseUrlStore = useBaseUrlStore();
            const authenticationStore = useAuthenticationStore();
            const url = baseUrlStore.getUrl("companies");
            axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${authenticationStore.token}`,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                this.companies = response.data;
            });
        },
        openModal(companyId) {
            // TODO: Implement logic to show modal for specific company
            this.showModal = true;
        },
    },
};
</script>
