<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">My company</h5>
            </div>
            <div class="card-body">
                <div class="container mt-2">
                    <MyCompanyForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyCompanyForm from '../components/mycompany/MyCompanyForm.vue'
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        MyCompanyForm
    },
})
</script>
