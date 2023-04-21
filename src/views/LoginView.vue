<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <label>
                Username:
                <input type="text" v-model="username">
            </label>
            <label>
                Password:
                <input type="password" v-model="password">
            </label>
            <button class="submit-button" type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'

export default defineComponent({
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async login() {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                const authenticationStore = useAuthenticationStore();
                authenticationStore.setToken(data.jwt);
                authenticationStore.setUsername(this.username)
                this.$router.push("/");
            } else {
                console.error(data.message);
            }
        },
    },
})
</script>
  
<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

h2 {
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    margin: 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #0066cc;
    color: #0066cc;
}


form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
}

.submit-button {
    background-color: #0080ff;
    color: #fff;
    border: none;
    padding: 12px 24px;
    font-size: 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.submit-button:hover {
    background-color: #0066cc;
    transform: translateY(-2px);
}

.submit-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 128, 255, 0.4);
}

/* Label styles */
label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #333;
}

/* Input styles */
input {
    display: block;
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #555;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input:focus {
    outline: none;
    border-color: #2684FF;
    box-shadow: 0 0 0 0.2rem rgba(38, 132, 255, 0.25);
}
</style>
