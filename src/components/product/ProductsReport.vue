<template>
    <div v-if="generatingReport" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Generisanje izveštaja...</span>
    </div>
    <div v-else class="container row">
        <select v-model="sortBy" class="form-select m-2">
            <option value="REVENUE">Promet</option>
            <option value="UNITS_SOLD">Prodato jedinica</option>
            <option value="IN_STOCK">Stanje na zalihama</option>
            <option value="NAME">Naziv</option>
        </select>
        <button type="button" class="btn btn-outline-primary m-2" @click="downloadProductsReport">Izveštaj</button>
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
            generatingReport: false,
        };
    },
    methods: {
        downloadProductsReport() {
            this.generatingReport = true
            const authStore = useAuthenticationStore();
            axios.get(`${useBaseUrlStore().baseUrl}/api/pdf/products-report`, {
                responseType: 'blob',
                params: {
                    sortBy: this.sortBy
                },
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            }).then(response => {
                saveAs(response.data, `products-report.pdf`)
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
