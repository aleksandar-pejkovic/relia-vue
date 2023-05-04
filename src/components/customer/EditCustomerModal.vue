<template>
    <!-- Modal -->
    <div v-if="customer" class="modal fade" id="editCustomerModal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ customer.name }}</h1>
                    <button @click="cancelEditing" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        ref="closeBtn">Close</button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateCustomer">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="customer.name"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" id="city" v-model="customer.city"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="zip">Zip number</label>
                                    <input type="text" class="form-control" id="zip" v-model="customer.zip"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input type="text" class="form-control" id="address" v-model="customer.street"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="regNum">Registration number</label>
                                    <input type="text" class="form-control" id="regNum"
                                        v-model="customer.registrationNumber" :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="taxNum">Tax number</label>
                                    <input type="text" class="form-control" id="taxNum" v-model="customer.taxNumber"
                                        :readonly="readOnly">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="bankAcc">Bank account</label>
                                    <input type="text" class="form-control" id="bankAcc" v-model="customer.bankAccount"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input type="text" class="form-control" id="phone" v-model="customer.phone"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" v-model="customer.email"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="website">Website</label>
                                    <input type="text" class="form-control" id="website" v-model="customer.website"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="director">Director</label>
                                    <input type="text" class="form-control" id="director" v-model="customer.director"
                                        :readonly="readOnly">
                                </div>
                            </div>
                        </div>
                        <div v-if="!readOnly">
                            <button @click="cancelEditing" type="button" class="btn btn-secondary m-2">Cancel</button>
                            <button type="submit" class="btn btn-success m-2">Update</button>
                        </div>
                        <div v-else>
                            <button @click="deleteCustomer" type="button" class="btn btn-danger m-2">Delete</button>
                            <button @click="enableEditing" type="button" class="btn btn-primary m-2">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication'
import { useBaseUrlStore } from '@/stores/baseUrl'
import axios from 'axios';
import Swal from 'sweetalert2'

export default defineComponent({
    props: {
        customer: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            readOnly: true,
            url: useBaseUrlStore().getUrl('companies'),
            token: useAuthenticationStore().token
        }
    },
    methods: {
        cancelEditing() {
            this.$emit('cancel-editing')
            this.readOnly = true;
        },
        enableEditing() {
            this.readOnly = false;
        },
        loadCustomer() {
            axios.get(this.url + `/${this.customer.id}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            }).then(response => response.data)
                .then(data => this.customer = data)
                .catch(error => {
                    console.error(error);
                    let errorMessages = error.message;
                    if (error.response && error.response.data) {
                        errorMessages = error.response.data.error || error.response.data.message || errorMessages;
                    }
                    Swal.fire({
                        title: error,
                        text: errorMessages,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        },
        updateCustomer() {
            const name = this.customer.name
            axios.put(this.url + `/${this.customer.id}`, this.customer, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            }).then(() => {
                this.$emit('cancel-editing')
                this.readOnly = true;
                this.$refs.closeBtn.click()
                Swal.fire({
                    title: `${name} updated`,
                    text: 'Customer was successfully updated',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }).catch(error => {
                console.error(error);
                let errorMessages = error.message;
                if (error.response && error.response.data) {
                    errorMessages = error.response.data.error || error.response.data.message || errorMessages;
                }
                Swal.fire({
                    title: 'Update customer unsuccessful!',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        },
        deleteCustomer() {
            const name = this.customer.name
            axios.delete(this.url + `/${this.customer.id}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            }).then(() => {
                this.$emit('cancel-editing')
                this.$refs.closeBtn.click()
                Swal.fire({
                    title: `${name} deleted`,
                    text: 'Customer was successfully deleted',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }).catch(error => {
                console.error(error);
                let errorMessages = error.message;
                if (error.response && error.response.data) {
                    errorMessages = error.response.data.error || error.response.data.message || errorMessages;
                }
                Swal.fire({
                    title: 'Delete customer unsuccessful!',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        }
    },
    emits: ['cancel-editing']
})
</script>
