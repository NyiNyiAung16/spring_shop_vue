<template>
    <div>
      <HomeNav/>
        <HeroSection/>
        <About/>
        <Contact/>
    </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue';
import About from '@/components/About.vue'
import Contact from '@/components/Contact.vue'
import HomeNav from '@/components/HomeNav.vue'
import { watch } from 'vue'
import user from '../composables/user';
import { useRouter } from 'vue-router';

const router = useRouter();
watch(user, ()=>{
    router.push('/createAccount');
});

</script>

<style scoped>

</style>