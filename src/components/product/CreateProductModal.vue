<template>
    <!-- Modal -->
    <div class="modal fade" id="createProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Create Product</h1>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeBtn">Close</button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="createProduct">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="plu">PLU</label>
                                    <input type="number" class="form-control" id="plu" v-model="product.plu"
                                        @input="validatePlu" placeholder="0">
                                    <span v-if="pluError" class="error">{{ pluError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="product.name"
                                        @input="validateName">
                                    <span v-if="nameError" class="error">{{ nameError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="unit">Unit</label>
                                    <input type="text" class="form-control" id="unit" v-model="product.unit"
                                        @input="validateUnit">
                                    <span v-if="unitError" class="error">{{ unitError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <input type="text" class="form-control" id="description" v-model="product.description"
                                        @input="validateDescription">
                                    <span v-if="descriptionError" class="error">{{ descriptionError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="taxRate">Tax rate</label>
                                    <select class="form-control" id="taxRate" v-model="product.taxRate">
                                        <option value="0">0%</option>
                                        <option value="10">10%</option>
                                        <option value="20">20%</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <input type="text" class="form-control" id="price" v-model="product.price"
                                        @input="validatePrice">
                                    <span v-if="priceError" class="error">{{ priceError }}</span>
                                </div>
                            </div>
                        </div>
                        <button type="reset" class="btn btn-secondary m-2">Reset</button>
                        <div v-if="loading" class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <button v-else type="submit" class="btn btn-success m-2"
                            :class="{ 'disabled': !validateInputs }">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Swal from 'sweetalert2'
import { useBaseUrlStore } from '@/stores/baseUrl'
import { useAuthenticationStore } from '@/stores/authentication'
import axios from 'axios'

export default defineComponent({
    data() {
        return {
            product: {
                plu: '',
                name: '',
                unit: '',
                description: '',
                taxRate: 20,
                price: Number(0).toFixed(2),
            },
            pluError: '',
            nameError: '',
            unitError: '',
            descriptionError: '',
            priceError: '',
            loading: false
        }
    },
    methods: {
        async createProduct() {
            if (!this.validateInputs()) {
                Swal.fire({
                    title: 'Creating product unsuccessful!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            this.loading = true
            const baseUrlStore = useBaseUrlStore()
            const url = baseUrlStore.getUrl('products')
            const token = `Bearer ${useAuthenticationStore().token}`
            try {
                await axios.post(
                    url,
                    this.product,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token
                        }
                    }
                );
                this.loading = false
                const name = this.product.name
                this.product = {}
                this.product.taxRate = 20
                this.product.price = Number(0).toFixed(2)
                this.$refs.closeBtn.click()
                this.$emit('product-created')
                Swal.fire({
                    title: `${name} was created`,
                    text: 'You can find it on Products page.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } catch (error) {
                this.loading = false;
                let errorMessages = error.message;
                if (error.response && error.response.data) {
                    errorMessages = error.response.data.error || error.response.data.message || errorMessages;
                }
                Swal.fire({
                    title: 'Create product unsuccessful!',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        // Function to validate product name
        validateName: function () {
            const regex = /^[a-zA-Z0-9\s-]{2,50}/; // Only allows letters and spaces
            if (!regex.test(this.product.name)) {
                this.nameError = "Please enter a valid name";
            } else {
                this.nameError = "";
            }
        },

        validateUnit: function () {
            if (this.product.unit.length > 5) {
                this.unitError = "Unit can be up to 5 characters long";
            } else {
                this.unitError = "";
            }
        },

        validatePlu: function () {
            if (this.product.plu < 0 || this.product.plu > 10000) {
                this.pluError = "Plu must be a number between 0 and 10000";
            } else {
                this.pluError = "";
            }
        },

        validateDescription: function () {
            const regex = /^[a-zA-Z0-9ČĆŠĐŽčćšđž,.!? \u0027-]{1,300}/;
            if (!regex.test(this.product.description)) {
                this.descriptionError = "Please enter a valid description";
            } else {
                this.descriptionError = "";
            }
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

        // Function to validate all inputs
        validateInputs: function () {
            this.validateName();
            this.validateUnit();
            this.validatePlu();
            this.validateDescription();
            this.validatePrice();
            // Check if there are any errors
            const errors = [this.nameError, this.pluError, this.descriptionError, this.priceError];
            if (errors.every((error) => error === "")) {
                return true
            } else {
                return false
            }
        }
    },
    // Usage:
    // Call validateInputs() function on submit button click event or any other relevant event.

    emits: ['product-created']
})
</script>
