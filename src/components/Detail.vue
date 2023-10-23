<template>
    <div class="grid grid-rows-1 grid-cols-12 mx-5 my-10">
        <div class="space lg:col-span-3 md:col-span-12 col-span-12 lg:mx-0 md:max-w-sm w-80 border-0 mb-3 lg:mb-0" >
            <div class="flex flex-col justify-center gap-8 bg-white rounded">
                <img class="mx-auto h-32" :src="product.photoUrl" alt="productImage">
                <div class="text-gray-900 ml-2 py-5"> 
                    <h3 class="pb-3 text-md">{{ product.name }}</h3>
                    <p class="text-yellow-500">${{ product.price }}</p>
                </div>
            </div>
        </div>
        <div class="col-span-1"></div>
        <div class="lg:col-span-8 md:col-span-12 col-span-12 border-0 " >
            <div class="flex flex-col justify-center px-4 bg-slate-100 rounded">
                <h3 class="md:text-xl text-lg font-bold pb-2">{{ product.name }}</h3>
                <p class="text-yellow-500 md:text-lg text-md">${{ product.price }}</p>
                <div class="pt-4">
                    <label class="md:text-lg text-md font-bold">Description</label>
                    <p class="pt-1 text-md">{{ product.description }}</p>
                </div>
                <p class="pt-5 pb-2 text-md"> <span class="font-bold">Category</span> - {{ product.category }}</p>
                <button class="my-3 md:px-3 px-2 py-2 md:w-40 w-32 bg-blue-500 md:text-lg text-md border-0 rounded hover:text-blue-100 hover:bg-blue-700 duration-700" @click="AddToCart(product)">
                    <font-awesome-icon icon="fa-solid fa-shopping-cart"/>
                    Add to Cart
                </button>
            </div>
        </div>
    </div>    
    <div>
        <button class="block mx-auto px-4 py-3 text-md border-0 rounded bg-blue-500 hover:bg-blue-700 duration-200" @click="goBack">Go Back</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import user from '../composables/user';
import { watch,ref } from 'vue'
import { collection, addDoc,doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config';
    const props = defineProps({
        id:String
    });
    const router = useRouter();
    let product = ref(null);
    const colRef = doc(db,'productCollection',props.id);
    let getProduct = await getDoc(colRef,props.id);
    product.value = {id:getProduct.id,...getProduct.data() };

    watch(props, async()=>{
        const colRef = doc(db,'productCollection',props.id);
        let getProduct = await getDoc(colRef,props.id);
        product.value = { id:getProduct.id,...getProduct.data() };
    });

    const goBack = ()=>{
        router.push('/')
    };
    
    const ProductId = ref([]);
    const AddToCart = async (p) => {
        if(!user.value){
            router.push({name:'createAccount'});
        }
        if(!ProductId.value.includes(p.id)){
            const colRef = collection(db,'cartCollection');
            await addDoc(colRef,p);
        }
        ProductId.value.push(p.id);
    };
</script>

<style scoped>
.space{
    margin-left: 15px;
}

@media screen and (max-width: 1100px) {
    .space{
        margin: 5px auto;
    }
}
</style>