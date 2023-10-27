<template>
    <div>
        <h3 class="text-4xl text-white text-center underline mb-7 mt-2">Products</h3>
        <div class="grid grid-rows-1 grid-cols-12 productContainer" ref="mainDiv">
            <div  v-for="product in filterProducts" :key="product.id"  class="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-11 border rounded bg-white flex flex-col justify-between mb-3 ml-10 sm:mx-2">
                <img class="mx-auto pt-2" :src="product.photoUrl" alt="productImage" style="max-height: 120px;background: white;" loading="lazy">
                <div class="text-gray-900 ml-2 mt-1"> 
                    <h5>{{ product.name }}</h5>
                    <p class="text-yellow-500 mb-1">${{ product.price }}</p>
                    <p class="underline text-red-400 cursor-pointer" @click="category(product.category)">{{ product.category }}</p>
                </div>
                <RouterLink :to="`/products/details/${product.id}`" class="block  bg-blue-600 hover:bg-blue-700 duration-300 px-3 py-2 mx-auto border-0 rounded mb-2 cursor-pointer">Read More</RouterLink>
            </div>
        </div>
        <div class="d-block text-center my-5">
            <button ref="loader" ></button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch,onMounted,onUnmounted } from 'vue';
import { db } from '../firebase/config';
import { collection, getDocs,query,limit,startAfter,orderBy } from 'firebase/firestore';

const props = defineProps({
    cate:String
});

let Products = ref([]);
let getProducts = ref([]);
let latestDoc = ref(null);
let loader = ref(null);
let filterProducts = ref([]);

async function getLimitProducts(quantity){
    const colRef = collection(db,'productCollection');
    const q = query(colRef,orderBy('createdAt'),startAfter(latestDoc.value || 0),limit(quantity));
    let res = await getDocs(q);
    getProducts.value = res.docs.map((doc)=>{
        return {id:doc.id, ...doc.data()}
    });
    getProducts.value.forEach((p)=>Products.value.push(p));
    filterProducts.value = Products.value;
    latestDoc.value = res.docs[res.docs.length - 1];
    if(res.empty){
        window.removeEventListener('scroll',handleScroll);
    }
    return res; 
};


const category = (cat) => {
    filterProducts.value = Products.value.filter((p)=>{
        return p.category === cat;
    });
};

watch(props,()=>{
    if(props.cate === 'All'){
        filterProducts.value = Products.value;
    }else{
        filterProducts.value = Products.value.filter((p)=>{ return p.category === props.cate });
    }
},{immediate:true}) 


//scroll fetch
const mainDiv = ref(null);
await getLimitProducts(8);
onMounted(async()=>{
    window.addEventListener('scroll',handleScroll);
});

onUnmounted(()=>window.removeEventListener('scroll',handleScroll));

async function handleScroll(){
    const windowHeight =  window.innerHeight - 63.4;
    if(mainDiv.value.getBoundingClientRect().bottom <= windowHeight){
        loader.value.classList.add('loader');
       let res = await getLimitProducts(8);
       if(res){
        loader.value.classList.remove('loader');
      }
    }
}

        
</script>

<style scoped>
.loader {
  --d:19px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #766DF4;
  box-shadow: 
    calc(1*var(--d))      calc(0*var(--d))     0 0,
    calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
    calc(0*var(--d))      calc(1*var(--d))     0 2px,
    calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
    calc(-1*var(--d))     calc(0*var(--d))     0 4px,
    calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
    calc(0*var(--d))      calc(-1*var(--d))    0 6px;
  animation: s7 1s infinite steps(8);
}

@keyframes s7 {
  100% {transform: rotate(1turn)}
}
</style>