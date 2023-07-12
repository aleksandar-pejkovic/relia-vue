<template>
    <div>
        <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#paymentsModal">Payments</button>

        <div class="modal" id="paymentsModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Payments</h5>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            ref="closeBtn">Close</button>
                    </div>
                    <div class="modal-body">
                        <!-- Payment form -->
                        <form @submit.prevent="addPayment" class="row">
                            <div class="form-group col">
                                <input type="date" class="form-control" id="paymentDate" v-model="payment.paymentDate">
                            </div>
                            <div class="form-group col">
                                <input type="number" class="form-control" id="paymentAmount" v-model="payment.amount"
                                    @input="formatAmount">
                            </div>
                            <button type="submit" class="addBtn btn btn-success col-1">Add Payment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useBaseUrlStore } from '@/stores/baseUrl';
import axios from 'axios'

export default {
    props: {
        urlSufix: String,
        urlId: Number,
    },
    data() {
        return {
            payment: {},
        };
    },
    methods: {
        formatPrice() {
            const priceString = this.product.price.toString();
            const decimalIndex = priceString.indexOf('.');
            if (decimalIndex !== -1 && priceString.substring(decimalIndex + 1).length > 2) {
                this.product.price = Number(this.product.price).toFixed(2);
            }
        },
        addPayment() {
            // Here you can perform the logic to add the payment, for example, send an API request.
            // You can access the entered values from this.paymentAmount, this.paymentMethod, and this.paymentDate.

            // After adding the payment, you can hide the modal.
            this.hideModal();
        }
    }
};
</script>
  
<style scoped>
.addBtn {
    height: 50%;
    margin: auto;
}
</style>
