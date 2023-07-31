<template>
    <div>
        <input class="form-control" type="search" v-model="searchQuery" placeholder="Pretraži partnere..."
            @focus="showSearchList" @blur="hideSearchList">
        <ul class="list-group mt-3" v-show="isFocused">
            <li v-for="company in filteredCompanies" :key="company.id" class="list-group-item"
                @click="selectCompany(company)">{{ company.name }}</li>
        </ul>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { useCompaniesStore } from '@/stores/companies';

export default defineComponent({
    data() {
        return {
            isFocused: false,
            searchQuery: '',
        }
    },
    computed: {
        filteredCompanies() {
            return useCompaniesStore().filterCompanies(this.searchQuery);
        },
    },
    methods: {
        showSearchList() {
            this.isFocused = true;
        },
        hideSearchList() {
            setTimeout(() => {
                this.isFocused = false;
            }, 100);
        },
        selectCompany(company) {
            this.searchQuery = company.name;
            this.$emit('company-selected', company);
        },
    },
});
</script>
  