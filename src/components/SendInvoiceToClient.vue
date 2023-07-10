<template>
    <button v-if="hasOwnCompany" type="button" class="btn btn-outline-success m-2" @click="sendInvoiceToClient">Send to
        client</button>
    <div v-if="message" class="alert alert-success" role="alert">
        {{ message }}
    </div>
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
        };
    },
    computed: {
        hasOwnCompany() {
            return useCompaniesStore().ownCompany != null;
        },
    },
    methods: {
        async sendInvoiceToClient() {
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
            } catch (error) {
                console.error(error);
                this.message = 'Something went wrong';
            } finally {
                setTimeout(() => {
                    this.message = ''
                }, 5000)
            }
        },
    },
});
</script>
  