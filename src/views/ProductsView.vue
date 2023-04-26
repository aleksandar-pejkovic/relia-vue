<template>
    <div class="main">
        <div>
            <h1>Products</h1>
            <DataTable url="companies" :headers="headers"></DataTable>
        </div>
    </div>
</template>
  
<script>
import DataTable from '../components/DataTable.vue';

export default {
    components: {
        DataTable
    },
    data() {
        return {
            headers: ['Name', 'City', 'Email']
        }
    }
}
</script>
  
