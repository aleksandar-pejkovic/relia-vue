<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col-md-10">
                <h1 clas>Invoices</h1>
            </div>
            <div class="col-md-2">
                <button @click="openInvoiceModal" type="button" class="btn btn-success m-2" data-bs-toggle="modal"
                    data-bs-target="#invoiceModal">
                    Add Invoice
                </button>
            </div>
        </div>
        <div class="row">
            <ReadInvoices />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReadInvoices from '../components/invoice/ReadInvoices.vue';
import { useInvoicesStore } from '@/stores/invoices';
import { useItemsStore } from '@/stores/items';

export default defineComponent({
    components: {
        ReadInvoices
    },
    methods: {
        openInvoiceModal() {
            useInvoicesStore().clearEditInvoice()
            useItemsStore().clearItemsByInvoice()
        },
    }
})
</script>
