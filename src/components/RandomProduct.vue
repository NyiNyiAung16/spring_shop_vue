<template>
    <div class="my-12">
        <div class="grid grid-rows-1 grid-cols-12 gap-2">
            <div  v-for="product in randomData" :key="product.id"  class="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 border rounded bg-white mb-3 mx-3 sm:mx-0">
                <div class="flex flex-col justify-between ">
                    <img class="mx-auto" :src="product.photoUrl" alt="productImage" style="max-height: 170px;" loading="lazy">
                    <div class="text-gray-900 ml-2"> 
                        <h4 class="text-sm">{{ product.name }}</h4>
                        <p class="text-yellow-400">${{ product.price }}</p>
                    </div>
                    <RouterLink :to="`/products/details/${product.id}`" class="block  bg-blue-600 hover:bg-blue-700 duration-300 px-3 py-2 mx-auto border-0 rounded mb-2">Read More</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const products = ref([]);
const colRef = collection(db,'productCollection');
const res = await getDocs(colRef);
const getProducts = res.docs.map((doc)=>{
    return { id:doc.id, ...doc.data()};
});
products.value = getProducts;
const numberOfProducts = 4;

function getRandomProductsFromArray(array, count) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
}

const randomData = getRandomProductsFromArray(products.value, numberOfProducts);

</script>

<style scoped>

</style>