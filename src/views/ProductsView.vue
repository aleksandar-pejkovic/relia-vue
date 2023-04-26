<template>
    <div class="main">
        <div>
            <h1>Products</h1>
            <DataTable url="companies" :fields="fields" :headers="headers"></DataTable>
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
            fields: ['Name', 'City', 'Email', 'Phone'],
            headers: ['name', 'city', 'email', 'phone']
        }
    }
}
</script>
  
