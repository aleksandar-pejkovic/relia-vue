<template>
    <div v-if="visible" class="notification">
        <strong class="mr-auto">{{ title }}</strong>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            visible: false,
            title: '',
        };
    },
    methods: {
        showNotification(title) {
            this.title = title;
            this.visible = true;
            setTimeout(() => {
                this.hideNotification()
            }, 5000)
        },
        hideNotification() {
            this.visible = false;
            this.title = '';
        },
    },
});
</script>
  
<style>
.notification {
    position: absolute;
    top: 6%;
    right: 30%;
    display: block;
    width: 300px;
    margin-bottom: 20px;
    padding: 15px;
    background-color: darkslateblue;
    color: wheat;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    animation: slideInRight 2s forwards;
}

@keyframes slideInRight {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.notification-header strong {
    font-weight: bold;
}
</style>
  