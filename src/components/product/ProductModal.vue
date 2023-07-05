<template>
    <!-- Modal -->
    <div class="modal fade" id="productModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Product</h1>
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
                                <div v-if="productExists" class="form-group">
                                    <label for="inStock">In stock</label>
                                    <input type="text" class="form-control" id="inStock" v-model="product.inStock"
                                        :readonly="readOnly" @input="validateUnit">
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
                                        :disabled="readOnly">
                                        <option value="0">0%</option>
                                        <option value="10">10%</option>
                                        <option value="20">20%</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <div v-if="readOnly" class="form-control" readonly>
                                        {{ Number(product.price).toLocaleString(
                                            'sr-RS',
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })
                                        }}
                                    </div>
                                    <input v-else type="number" step="any" min="0" max="100000000" class="form-control"
                                        id="price" v-model="product.price" @input="formatPrice">
                                </div>
                                <div v-if="productExists" class="form-group">
                                    <label for="unitsSold">Units Sold</label>
                                    <input type="text" class="form-control" id="unitsSold" v-model="product.unitsSold"
                                        readonly>
                                </div>
                            </div>
                        </div>
                        <ConditionalButtons @reset-errors="resetErrors" @cancel-editing="cancelEditing"
                            @enable-editing="enableEditing" @create="createProduct" @update="updateProduct"
                            @delete="deleteProduct" :object="product" :readOnly="readOnly" :objectExists="productExists"
                            :loading="loading" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useProductsStore } from '@/stores/products';
import { showInvalidRequestMessage } from '../helper/message'
import ConditionalButtons from '../conditional/ConditionalButtons.vue';
import { validateName, validateUnit, validatePlu, validateDescription, validatePrice } from '@/components/validation/productValidation';

export default defineComponent({
    components: {
        ConditionalButtons,
    },
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
            priceError: "",
        }
    },
    methods: {
        formatPrice() {
            const priceString = this.product.price.toString();
            const decimalIndex = priceString.indexOf('.');
            if (decimalIndex !== -1 && priceString.substring(decimalIndex + 1).length > 2) {
                this.product.price = Number(this.product.price).toFixed(2);
            }
        },
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
                showInvalidRequestMessage()
                return;
            }
            this.loading = true
            const productStore = useProductsStore()
            await productStore.updateProduct(this.product)
            this.loading = false
            this.$refs.closeBtn.click()
        },
        async deleteProduct() {
            this.loading = true
            const productStore = useProductsStore()
            await productStore.deleteProduct(this.product.id)
            this.loading = false
            this.$refs.closeBtn.click()
            alert(`Product ${this.product.name} deleted`)
        },
        async createProduct() {
            if (!this.validateInputs()) {
                showInvalidRequestMessage()
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
