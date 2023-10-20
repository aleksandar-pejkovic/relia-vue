<template>
    <footer class="footer" v-show="showFooter">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p>
                        <a href="mailto:info.reliabill@gmail.com">info.reliabill@gmail.com</a>
                    </p>
                    <p>
                        <a href="mailto:aleksandarpejkovic@hotmail.com">aleksandarpejkovic@hotmail.com</a>
                    </p>
                    <p>
                        <a href="tel:+381659170989">065 917 09 89</a>
                    </p>
                </div>
                <div class="col-md-6">
                    <p>Developed by Aleksandar Pejkovic</p>
                    <p>
                        <a href="https://aleksandarpejkovic.com" target="_blank">aleksandarpejkovic.com</a>
                    </p>
                    <div class="social-icons">
                        <a href="https://github.com/aleksandar-pejkovic/" target="_blank">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/aleksandar-pejkovic/" target="_blank">
                            <i class="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';

const showFooter = ref(true);

const hideFooter = () => {
    showFooter.value = false;
};
</script>
  
<style scoped>
.footer {
    background-color: #333;
    opacity: 0.8;
    padding: 30px;
    text-align: center;
    width: 100%;
}

.footer a:hover {
    color: goldenrod;
    transform: scale(2);
}

a {
    color: gold;
}

p {
    color: gold;
    padding: 10px;
}

.social-icons {
    margin-top: 20px;
}

.social-icons a {
    display: inline-block;
    margin-right: 10px;
    color: #ccc;
    font-size: 24px;
}

.social-icons a:hover {
    color: #fff;
}
</style>
  