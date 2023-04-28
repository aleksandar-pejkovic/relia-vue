<template>
    <!-- Modal -->
    <div class="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Customer {{ company.name }}</h1>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeBtn">Close</button>
                </div>
                <div class="modal-body">
                    <EditCustomerForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import EditCustomerForm from './EditCustomerForm.vue';

export default defineComponent({
    components: {
        EditCustomerForm
    },
    props: {
        company: {
            id: '',
            name: '',
            city: '',
            zip: '',
            street: '',
            registrationNumber: '',
            taxNumber: '',
            bankAccount: '',
            phone: '',
            email: '',
            website: '',
            director: ''
        }
    }
})
</script>
