<template>
    <div v-if="!isSmallScreen">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th v-for="header in headers" :key="header">{{ header.value }}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in data" :key="index">
                        <td v-for="(header, index) in headers" :key="index" @click="openModal(item)">
                            {{ item[header.key] }}
                        </td>
                        <td>
                            <button @click="openModal(item)" type="button" class="btn btn-primary">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-3" v-for="(item, index) in data" :key="index">
                    <div class="card mt-2">
                        <div class="card-body p-3" @click="openModal(item)">
                            <div v-for="(header, index) in headers" :key="index" class="mb-2">
                                <div class="fw-bold">{{ header.value }}</div>
                                <div>{{ item[header.key] }}</div>
                            </div>
                            <button type="button" class="btn btn-primary">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios'
import { useAuthenticationStore } from '../../stores/authentication'
import { useBaseUrlStore } from '../../stores/baseUrl'

export default defineComponent({
    props: {
        url: {
            type: String,
            required: true
        },
        headers: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            data: [],
            isSmallScreen: window.innerWidth <= 768,
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.fetchData()
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.isSmallScreen = window.innerWidth <= 768;
        },
        fetchData() {
            const baseUrlStore = useBaseUrlStore()
            const authenticationStore = useAuthenticationStore()
            const url = baseUrlStore.getUrl(this.url)
            const token = authenticationStore.token
            axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(response => response.data)
                .then(data => this.data = data)
                .catch(error => console.error(error))
        },
        openModal(item) {
            this.$emit('edit-modal', item)
        },
    },
    emits: ['edit-modal']
})
</script>

<style scoped>
thead {
    background-color: darkslateblue;
    color: wheat;
}

td,
.card {
    cursor: pointer;
}

.card {
    color: darkslateblue;
}
</style>

