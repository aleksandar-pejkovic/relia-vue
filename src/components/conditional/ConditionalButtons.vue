<template>
    <!-- conditional buttons -->
    <div v-if="!objectExists">
        <div v-if="loading" class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Učitavanje...</span>
        </div>
        <div v-else>
            <button @click="resetErrors" type="reset" class="btn btn-outline-secondary m-2">Poništi</button>
            <button @click.prevent="create" type="submit" class="btn btn-outline-success m-2">Sačuvaj</button>
        </div>
    </div>
    <div v-else>
        <div v-if="!readOnly">
            <div v-if="loading" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Učitavanje...</span>
            </div>
            <div v-else>
                <button @click="cancelEditing" type="button" class="btn btn-outline-secondary m-2">Otkaži</button>
                <button @click.prevent="update" type="submit" class="btn btn-outline-success m-2">Ažuriraj</button>
            </div>
        </div>
        <div v-else>
            <div v-if="loading" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else>
                <button @click="deleteObject" type="button" class="btn btn-outline-danger m-2">Obriši</button>
                <button @click="enableEditing" type="button" class="btn btn-outline-primary m-2">Izmeni</button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        object: {
            type: Object,
            required: true
        },
        readOnly: {
            type: Boolean,
            required: true
        },
        objectExists: {
            type: Boolean,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        resetErrors() {
            this.$emit('reset-errors')
        },
        cancelEditing() {
            this.$emit('cancel-editing')
        },
        enableEditing() {
            this.$emit('enable-editing')
        },
        create() {
            this.$emit('create')
        },
        update() {
            this.$emit('update')
        },
        deleteObject() {
            if (window.confirm("Are you sure?")) {
                this.$emit('delete')
            }
        }
    },
    emits: ['reset-errors', 'cancel-editing', 'enable-editing', 'create', 'update', 'delete']
})
</script>