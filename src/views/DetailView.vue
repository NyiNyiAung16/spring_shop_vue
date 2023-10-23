<template>
<div class="relative">
    <ProductNav @cartToggle="showCart = !showCart"/>
    <div :class="{bg:showCart}">
        <Suspense >
            <Detail :id="props.id"/>
            <template #fallback>
                <div class="flex gap-2 justify-center items-center bg-blue-500 mx-auto my-2 px-3 py-2 border-0 rounded" style="width: 140px;">
                    <span class="loading w-10 h-10 block"></span>
                    <button class="block text-white">Processing...</button>
                </div>
            </template>
        </Suspense>
        
        <CommentForm :id="props.id"/>

        <Suspense >
            <RandomProduct/>
        </Suspense>
    </div>
</div>
</template>

<script setup>
import Detail from '@/components/Detail.vue'
import ProductNav from '@/components/ProductNav.vue'
import RandomProduct from '@/components/RandomProduct.vue'
import { ref } from 'vue'
import CommentForm from '../components/CommentForm.vue';

const props = defineProps({
    id:String
});
let showCart = ref(false);

</script>

<style scoped>
.bg{
    opacity: 0.4;
    transition: opacity 0.5s ease-in;
}
</style>