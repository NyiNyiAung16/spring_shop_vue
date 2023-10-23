<template>
    <div class=" bg-gray-600 px-3 py-3 justify-between flex items-center sticky top-0 shadow-sm">
        <div>
            <h3 class="text-2xl uppercase font-bold text-white"><span class="text-yellow-500">Spring</span> <span class="text-blue-500">Shop</span></h3>
        </div>
        <input type="checkbox" class="hidden" id="check">
        <label for="check" class="block md:hidden">
            <font-awesome-icon icon="bars" class="text-slate-200 hover:text-slate-400 duration-200 text-2xl cursor-pointer" />
        </label>
        <div class="middleNav" >
            <div class="flex items-center gap-3 text-white">
                <RouterLink to="/" class="hover:text-gray-300 hover:translate-x-1 md:hover:translate-x-0 duration-200">Home</RouterLink>
                <Categories @category="category" class="hover:translate-x-1 md:hover:translate-x-0 duration-200"/>
                <RouterLink to="/products" class="hover:text-gray-300 hover:translate-x-1 md:hover:translate-x-0 duration-200">Products</RouterLink>
                <!-- addtocart icon -->
                <div class="relative mr-3 cursor-pointer mt-4 md:mt-0" @click="showCartToggle = !showCartToggle">
                    <font-awesome-icon icon="cart-shopping" size="lg" />
                    <span class="bg-red-500 px-2 border-0 rounded-md absolute" style="top: -50%;left: 40%;">{{cartNumber}}</span>
                </div>
            </div>
        </div>
       
    </div>
    
    <Suspense>
            <CartProducts :showCart="showCartToggle" @cartProductLength="cartProductLength" @closeCart="showCartToggle = !showCartToggle"/>
    </Suspense>

</template>

<script setup>
import { ref } from 'vue';
import CartProducts from '@/components/CartProducts.vue';
import Categories from './Categories.vue';
const props = defineProps({
    showProducts:Boolean
});
const cartNumber = ref(0);
const showCartToggle = ref(false);
const emit = defineEmits(['cartToggle','category']);

const cartProductLength = (length) => {
    cartNumber.value = length;
}

const category = (cat) => {
    emit('category',cat);
} 

</script>

<style scoped>

</style>