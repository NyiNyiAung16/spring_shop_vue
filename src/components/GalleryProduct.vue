<template>
    <div>
        <h3 class="text-4xl text-white text-center underline mb-7">Gallery Product</h3>
        <div class="grid grid-rows-1 grid-cols-12 items-center gap-4">
            <div  v-for="fakeProduct in someProducts" :key="fakeProduct.id"  class="mx-9 col-span-4 border rounded bg-white" style="max-height: 500px;max-width: 400px;">
                <div class="flex flex-col justify-between">
                    <img class="mx-auto  h-auto" :src="fakeProduct.image" alt="productImage" style="max-height: 200px;">
                    <div class="text-gray-900 ml-2"> 
                        <h4>{{ fakeProduct.title }}</h4>
                        <p>{{ fakeProduct.price }}</p>
                    </div>
                    <a :href="`/products/details/${fakeProduct.id}`" class="block  bg-blue-600 hover:bg-blue-700 duration-300 px-3 py-2 mx-auto border-0 rounded mb-2">Read More</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed,ref } from 'vue';

    const response = await fetch('https://fakestoreapi.com/products');
    const fakeProducts = await response.json();
    const someProducts = fakeProducts.splice(0,8);

</script>

<style scoped>

</style>