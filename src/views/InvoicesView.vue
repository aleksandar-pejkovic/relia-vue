<template>
    <div class="main container mt-2">
        <div class="row">
            <div class="col-md-10">
                <h1>Dokumenti</h1>
            </div>
            <div class="col-md-2">
                <button @click="openInvoiceModal" type="button" class="btn btn-gold btn-primary          m-2">
                    Dodaj
                </button>
            </div>
        </div>
        <div class="row mt-3">
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
            this.$router.push('/invoice')
        },
    }
})
</script>
