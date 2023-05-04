<template>
    <!-- Modal -->
    <div v-if="product" class="modal fade" id="editProductModal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ product.name }}</h1>
                    <button @click="cancelEditing" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        ref="closeBtn">Close</button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateProduct">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="plu">PLU</label>
                                    <input type="number" class="form-control" id="plu" v-model="product.plu"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="product.name"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="unit">Unit</label>
                                    <input type="text" class="form-control" id="unit" v-model="product.unit"
                                        :readonly="readOnly">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <input type="text" class="form-control" id="description" v-model="product.description"
                                        :readonly="readOnly">
                                </div>
                                <div class="form-group">
                                    <label for="taxRate">Tax rate</label>
                                    <select class="form-control" id="taxRate" v-model="product.taxRate"
                                        :readonly="readOnly">
                                        <option value="0">0%</option>
                                        <option value="10">10%</option>
                                        <option value="20">20%</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <input @input="validatePrice" type="text" class="form-control" id="price"
                                        v-model="product.price" :readonly="readOnly">
                                    <span v-if="priceError" class="error">{{ priceError }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="!readOnly">
                            <button @click="cancelEditing" type="button" class="btn btn-secondary m-2">Cancel</button>
                            <button type="submit" class="btn btn-success m-2">Update</button>
                        </div>
                        <div v-else>
                            <button @click="deleteProduct" type="button" class="btn btn-danger m-2">Delete</button>
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
        product: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            readOnly: true,
            url: useBaseUrlStore().getUrl('products'),
            token: useAuthenticationStore().token,
            priceError: '',
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
        loadProduct() {
            axios.get(this.url + `/${this.product.id}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            }).then(response => response.data)
                .then(data => this.product = data)
                .catch(error => console.error(error));
        },
        updateProduct() {
            const name = this.product.name
            axios.put(this.url, this.product, {
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
                    text: 'Product was successfully updated',
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
                    title: 'Update unsuccessful!',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        },
        deleteProduct() {
            const name = this.product.name
            axios.delete(this.url + '/' + this.product.id, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            }).then(() => {
                this.$emit('cancel-editing')
                this.$refs.closeBtn.click()
                Swal.fire({
                    title: `${name} deleted`,
                    text: 'Product was successfully deleted',
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
                    title: 'Delete unsuccessful!',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        },
        validatePrice: function () {
            const price = parseFloat(this.product.price);
            if (isNaN(price)) {
                this.priceError = "Please enter a valid price";
            } else {
                const minPrice = 0;
                const maxPrice = 100000000.00;
                if (price < minPrice || price > maxPrice) {
                    this.priceError = `Please enter a price between ${minPrice.toFixed(2)} and ${maxPrice.toFixed(2)}`;
                } else {
                    this.priceError = "";
                }
            }
        },
    },
    emits: ['cancel-editing']
})
</script>
