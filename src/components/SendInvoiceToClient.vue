<template>
    <button v-if="hasOwnCompany" type="button" class="btn btn-outline-primary m-2" @click="sendInvoiceToClient"
        :disabled="disabled">{{ btnText }}</button>
    <!-- <div v-if="message" class="alert alert-success" role="alert">
        {{ message }}
    </div> -->
</template>
  
<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { useBaseUrlStore } from '../stores/baseUrl';
import { useCompaniesStore } from '../stores/companies';

export default defineComponent({
    props: {
        id: {
            type: Number,
            required: true,
        },
        invoice: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            message: '',
            btnText: 'Send to client',
            disabled: false,
        };
    },
    computed: {
        hasOwnCompany() {
            return useCompaniesStore().ownCompany != null;
        },
    },
    methods: {
        async sendInvoiceToClient() {
            this.message = 'Sending...'
            this.btnText = 'Sending...'
            this.disabled = true
            const authStore = useAuthenticationStore();
            try {
                const response = await axios.get(
                    `${useBaseUrlStore().baseUrl}/api/pdf/invoice/${this.id}/send`,
                    {
                        headers: {
                            'Authorization': `Bearer ${authStore.token}`,
                        },
                    }
                );
                console.log(response.data);
                this.message = 'Invoice sent successfully';
                this.btnText = 'Success!'
            } catch (error) {
                console.error(error);
                this.message = 'Something went wrong';
                this.btnText = 'Error!'
            } finally {
                setTimeout(() => {
                    this.message = ''
                    this.btnText = 'Send to client'
                    this.disabled = false
                }, 4000)
            }
        },
    },
});
</script>
  