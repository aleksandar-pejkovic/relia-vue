<template>
    <button class="btn btn-outline-success m-2" data-bs-toggle="modal" data-bs-target="#paymentsModal">Uplate</button>

    <div class="modal" id="paymentsModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Uplate</h5>
                    <button @click="reset" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        ref="closeBtn">Zatvori</button>
                </div>
                <div class="modal-body">
                    <!-- Payment form -->
                    <form @submit.prevent="addPayment" class="row">
                        <div class="form-group col">
                            <input type="datetime-local" class="form-control" id="paymentDate"
                                v-model="payment.paymentDate">
                        </div>
                        <div class="form-group col">
                            <input type="number" class="form-control" id="paymentAmount" min="0" max="1000000000000"
                                v-model="payment.amount" @input="formatAmount">
                        </div>
                        <button type="submit" class="addBtn btn btn-success col-1" :disabled="addPaymentBtnDisabled">{{
                            addPaymentBtnText }}</button>
                    </form>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th class="col-5">Datum</th>
                                    <th class="col-6">Iznos</th>
                                    <th class="col-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="payment in payments" :key="payment.id">
                                    <td>{{ formatDate(payment.paymentDate) }}</td>
                                    <td>
                                        {{ Number(payment.amount).toLocaleString(
                                            'sr-RS',
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })
                                        }}
                                    </td>
                                    <td>
                                        <button @click="deletePayment(payment.id)" type="button" id="removePaymentBtn"
                                            class="btn btn-outline-danger">-</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useBaseUrlStore } from '@/stores/baseUrl';
import { useAuthenticationStore } from '@/stores/authentication';
import { useInvoicesStore } from '@/stores/invoices';
import axios from 'axios'

export default {
    props: {
        urlSufix: String,
        id: Number,
    },
    emits: ['payment-added'],
    data() {
        return {
            payment: {},
            payments: [],
            addPaymentBtnText: 'Dodaj uplatu',
            addPaymentBtnDisabled: false
        };
    },
    mounted() {
        this.payment.amount = 0
        this.payment.invoiceId = this.id
        this.fetchPayments()
    },
    beforeUnmount() {
        this.$refs.closeBtn.click()
    },
    methods: {
        formatAmount() {
            const priceString = this.payment.amount.toString();
            const decimalIndex = priceString.indexOf('.');
            if (decimalIndex !== -1 && priceString.substring(decimalIndex + 1).length > 2) {
                this.payment.amount = Number(this.payment.amount).toFixed(2);
            }
        },
        addPayment() {
            this.addPaymentBtnText = 'U toku...'
            this.addPaymentBtnDisabled = true
            const baseUrl = useBaseUrlStore()
            const authStore = useAuthenticationStore()

            axios.post(`${baseUrl.baseUrl}/api/payments`, this.payment, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            }).then(async () => {
                this.fetchPayments()
                await useInvoicesStore().fetchInvoices()
                await useInvoicesStore().updateEditInvoice(this.id)
                this.$emit('payment-added')
                this.addPaymentBtnText = 'Dodaj uplatu'
                this.addPaymentBtnDisabled = false
            }).catch(() => {
                alert("Failed to create payment")
            })
        },
        async deletePayment(id) {
            if (window.confirm("Are you sure?")) {
                const baseUrl = useBaseUrlStore()
                const authStore = useAuthenticationStore()
                try {
                    await axios.delete(`${baseUrl.baseUrl}/api/payments/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${authStore.token}`
                        }
                    })
                    this.fetchPayments()
                    await useInvoicesStore().fetchInvoices()
                    await useInvoicesStore().updateEditInvoice(this.id)
                    this.$emit('payment-added')
                } catch (error) {
                    console.log(error)
                    alert(`Failed to remove Payment with id:${id}`)
                }
            }
        },
        fetchPayments() {
            const baseUrl = useBaseUrlStore()
            const authStore = useAuthenticationStore()
            axios.get(`${baseUrl.baseUrl}/api/payments/${this.urlSufix}/${this.id}`, {
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            }).then(response => {
                this.payments = response.data
            }).catch(error => {
                console.log('Error fetching payments:', error)
            })
        },
        reset() {
            this.payment.amount = 0
            this.payment.paymentDate = null
        },
        formatDate(date) {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };
            return new Intl.DateTimeFormat('sr-RS', options).format(new Date(date));
        },
    }
};
</script>
  
<style scoped>
.addBtn {
    height: 50%;
    margin: auto;
}

#removePaymentBtn {
    width: 50px;
}
</style>
