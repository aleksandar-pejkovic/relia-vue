<template>
    <div class="row">
        <div class="col-md-6">
            <label for="documentType">Partner</label>
            <input class="form-control" type="search" :value="searchQuery" placeholder="Search..." @focus="handleFocus"
                @blur="handleBlur" :readonly="selectedCompany">
            <ul class="list-group mt-3" v-show="showList">
                <li v-for="company in filteredCompanies" :key="company.id" class="list-group-item"
                    @click="handleSelect(company)">{{ company.name }}
                </li>
                <li v-if="filteredCompanies.length === 0" class="list-group-item">
                    No match
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
export default defineComponent({
    props: {
        searchQuery: {
            type: String,
            required: true,
        },
        showList: {
            type: Boolean,
            required: true,
        },
        filteredCompanies: {
            type: Array,
            required: true,
        },
        selectedCompany: {
            type: Object,
            default: null,
        },
    },
    methods: {
        handleFocus() {
            this.$emit('focus');
        },
        handleBlur() {
            // Delay hiding the list to allow click to be executed first
            setTimeout(() => {
                this.$emit('blur');
            }, 100);
        },
        handleSelect(company) {
            this.$emit('select', company);
        },
    },
})
</script>
  