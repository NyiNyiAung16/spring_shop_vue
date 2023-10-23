<template>
    <div v-if="toggle">
        <Register @login="toggle = !toggle"/>
    </div>
    <div v-else>
        <Login @signin="toggle = !toggle"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'

const toggle = ref(false);
</script>
