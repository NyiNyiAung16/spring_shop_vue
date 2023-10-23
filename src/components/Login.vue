<template>
    <div>
        <form class="container bg-gray-700 px-3 py-2 border-0 rounded" @submit.prevent="LoginForm">
            <h3 class="text-2xl text-center text-blue-600 font-bold ">Login</h3>
            <label class="lable mb-1 block text-gray-400 text-lg">Email</label>
            <input type="email" class="input mb-2" placeholder="Enter your email" v-model="email">
            <label class="lable mb-1 block text-gray-400 text-lg">Password</label>
            <input type="password" class="input mb-2" placeholder="Enter your password" v-model="password">
            <p class="text-center text-red-500 my-1">{{ error }}</p>
            <button class="px-3 py-2 block mx-auto bg-blue-600 text-white border-0 rounded">Login</button>
            <p class="text-center text-gray-300 text-lg mt-2">Don't have a account! <span class="underline text-blue-400 cursor-pointer" @click="$emit('signin')">Sign in </span>here.</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Login from '../composables/Login';
defineEmits(['signin']);

const email = ref('');
const password = ref('');
const router = useRouter();
let {error,loginUser} = Login();
const LoginForm = async() => {
    const res = await loginUser(email.value,password.value);
    email.value = '';
    password.value = '';
    if(res){
        router.push('/');
    }
}


</script>
