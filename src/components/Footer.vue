<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p>
                        Email:
                        <a href="mailto:info.reliabill@gmail.com">info.reliabill@gmail.com</a>
                    </p>
                    <p>
                        Phone:
                        <a href="tel:+381659170989">+381 65 917 09 89</a>
                    </p>
                </div>
                <div class="col-md-6">
                    <p>Developed by Aleksandar Pejkovic</p>
                    <p>
                        Website:
                        <a href="https://aleksandarpejkovic.com" target="_blank">www.aleksandarpejkovic.com</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<style scoped>
.footer {
    background-color: #ddd;
    color: #333;
    padding: 20px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

a {
    color: #333;
}

@media (max-width: 768px),
(max-height: 928px) {
    .footer {
        position: relative;
        margin-top: 20px;
        width: auto;
        height: auto;
    }
}
</style>
  