<template>
    <!-- Modal -->
    <div class="modal fade" id="productModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ product.name }}</h1>
                    <button @click="cancelEditing" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        ref="closeBtn">Close</button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="plu">PLU</label>
                                    <input type="number" class="form-control" id="plu" v-model="product.plu"
                                        :readonly="readOnly" @input="validatePlu">
                                    <span v-if="pluError" class="error">{{ pluError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="product.name"
                                        :readonly="readOnly" @input="validateName">
                                    <span v-if="nameError" class="error">{{ nameError }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="unit">Unit</label>
                                    <input type="text" class="form-control" id="unit" v-model="product.unit"
                                        :readonly="readOnly" @input="validateUnit">
                                    <span v-if="unitError" class="error">{{ unitError }}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <input type="text" class="form-control" id="description" v-model="product.description"
                                        :readonly="readOnly" @input="validateDescription">
                                    <span v-if="descriptionError" class="error">{{ descriptionError }}</span>
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
                                    <input type="text" class="form-control" id="price" v-model="product.price"
                                        :readonly="readOnly" @input="validatePrice">
                                    <span v-if="priceError" class="error">{{ priceError }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- conditional buttons -->
                        <div v-if="!productExists">
                            <button @click="resetErrors" type="reset" class="btn btn-secondary m-2">Reset</button>
                            <div v-if="loading" class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <button @click.prevent="createProduct" v-else type="submit"
                                class="btn btn-success m-2">Create</button>
                        </div>
                        <div v-else>
                            <div v-if="!readOnly">
                                <button @click="cancelEditing" type="button" class="btn btn-secondary m-2">Cancel</button>
                                <button @click.prevent="updateProduct" type="submit"
                                    class="btn btn-success m-2">Update</button>
                            </div>
                            <div v-else>
                                <button @click.prevent="deleteProduct" type="button"
                                    class="btn btn-danger m-2">Delete</button>
                                <button @click="enableEditing" type="button" class="btn btn-primary m-2">Edit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useProductsStore } from '@/stores/products';
import Swal from 'sweetalert2'
import { validateName, validateUnit, validatePlu, validateDescription, validatePrice } from '@/components/validation/productValidation';

export default defineComponent({
    computed: {
        product: {
            get() {
                return { ...useProductsStore().editProduct };
            },
            set(value) {
                useProductsStore().editProduct = { ...value };
            }
        },
        productExists() {
            return this.product.id > 0
        },
        readOnly() {
            return this.productExists && this.readOnlyCondition
        }
    },
    data() {
        return {
            readOnlyCondition: true,
            loading: false,
            nameError: "",
            unitError: "",
            pluError: "",
            descriptionError: "",
            priceError: ""
        }
    },
    methods: {
        cancelEditing() {
            this.product = { ...useProductsStore().editProduct };
            this.readOnlyCondition = true;
            this.resetErrors()
        },
        enableEditing() {
            this.readOnlyCondition = false;
        },
        async updateProduct() {
            if (!this.validateInputs()) {
                Swal.fire({
                    title: 'Validation failed!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            const productStore = useProductsStore()
            await productStore.updateProduct(this.product)
            this.$refs.closeBtn.click()
        },
        async deleteProduct() {
            const productStore = useProductsStore()
            await productStore.deleteProduct(this.product.id)
            this.$refs.closeBtn.click()
        },
        async createProduct() {
            if (!this.validateInputs()) {
                Swal.fire({
                    title: 'Validation failed!',
                    text: 'Please fix the errors in the form.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            this.loading = true
            const productStore = useProductsStore()
            await productStore.createProduct(this.product)
            this.loading = false
            this.$refs.closeBtn.click()
        },
        resetErrors() {
            this.nameError = "";
            this.unitError = "";
            this.pluError = "";
            this.descriptionError = "";
            this.priceError = "";
        },
        // Function to validate product name
        validateName() {
            this.nameError = validateName(this.product.name)
        },
        validateUnit() {
            this.unitError = validateUnit(this.product.unit)
        },
        validatePlu() {
            this.pluError = validatePlu(this.product.plu)
        },
        validateDescription() {
            this.descriptionError = validateDescription(this.product.description)
        },
        validatePrice() {
            this.priceError = validatePrice(this.product.price)
        },
        // Function to validate all inputs
        validateInputs() {
            this.validateName();
            this.validateUnit();
            this.validatePlu();
            this.validateDescription();
            this.validatePrice();
            // Check if there are any errors
            const errors = [this.nameError, this.unitError, this.pluError, this.descriptionError, this.priceError];
            if (errors.every((error) => error === "")) {
                return true
            } else {
                return false
            }
        }
    },
})
</script>