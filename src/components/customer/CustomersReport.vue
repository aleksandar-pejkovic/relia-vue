<template>
    <div v-if="generatingReport" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Generisanje izveštaja...</span>
    </div>
    <div v-else class="container row">
        <select v-model="sortBy" class="form-select m-2">
            <option value="REVENUE">Promet</option>
            <option value="DEBT">Dugovanje</option>
            <option value="PAYMENTS">Uplate</option>
            <option value="NAME">Naziv</option>
        </select>
        <button type="button" class="btn btn-gold btn-primary m-2" @click="downloadCustomersReport">Izveštaj</button>
    </div>
</template>
  
<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { useBaseUrlStore } from '@/stores/baseUrl';
import { saveAs } from 'file-saver';

export default defineComponent({
    data() {
        return {
            sortBy: 'REVENUE',
            generatingReport: false
        };
    },
    methods: {
        downloadCustomersReport() {
            this.generatingReport = true
            const authStore = useAuthenticationStore();
            axios.get(`${useBaseUrlStore().baseUrl}/api/pdf/companies-report`, {
                responseType: 'blob',
                params: {
                    sortBy: this.sortBy
                },
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            }).then(response => {
                saveAs(response.data, `companies-report.pdf`)
                this.generatingReport = false
            })
        },
    },
})
</script>

<style scoped>
.container {
    align-items: center;
    justify-content: end;
}

h6 {
    width: 80px;
    margin: 0;
}

.form-select {
    width: 130px;
}
</style>
