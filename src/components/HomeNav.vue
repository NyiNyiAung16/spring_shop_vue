<template>
    <div class="bg-gray-600 px-3 py-3 justify-between flex items-center relative">
        <div>
            <h3 class="text-2xl uppercase font-bold text-white"><span class="text-yellow-500">Spring</span> <span class="text-blue-500">Shop</span></h3>
        </div>
        <input type="checkbox" id="check" class="hidden">
        <label for="check" class="block md:hidden">
            <font-awesome-icon icon="bars" class="text-slate-200 hover:text-slate-400 duration-200 text-2xl cursor-pointer" />
        </label>
           
        <div class="middleNav " id="navLinks">
            <div class="navchild flex items-center gap-3 text-white">
                <RouterLink to="/" class="hover:text-gray-300 hover:translate-x-1 md:hover:translate-x-0 duration-200">Home</RouterLink>
                <a href="#about" class="hover:text-gray-300 hover:translate-x-1 md:hover:translate-x-0 duration-200">About</a>
                <a href="#contact" class="hover:text-gray-300 hover:translate-x-1 md:hover:translate-x-0 duration-200">Contact</a>    

                <RouterLink to="/products" class="hover:text-gray-300 hover:translate-x-1 md:hover:translate-x-0 duration-200">Products</RouterLink>
                <!-- auth section -->
                <div v-if="!user">
                    <RouterLink to="/createAccount" class="hover:text-gray-300 hover:translate-x-1 md:hover:translate-x-0 duration-200">Register</RouterLink>
                </div>
                <div v-if="user">
                    <button class="hover:text-gray-300 hover:translate-x-1 md:hover:translate-x-0 duration-200" @click="logoutNav">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {auth} from '../firebase/config';
import { signOut } from 'firebase/auth';
import user from '../composables/user';

const logoutNav = async() =>{
    await signOut(auth);
}
</script>

<style scoped>
</style>