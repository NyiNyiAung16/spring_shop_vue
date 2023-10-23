<template>
<div class="fixed right-0">
    <div class="flex justify-end" v-if="props.showCart">
        <div :class="{CartContainer:props.showCart}" v-if="CartProducts">
            <div class="flex justify-between md:justify-end">
                <font-awesome-icon icon="fa-solid fa-xmark" class="block md:hidden text-2xl text-gray-600 hover:text-red-500 duration-150 cursor-pointer" @click="$emit('closeCart')" />
                <p><span class="font-bold">Total:</span> <span class="text-yellow-500">${{ price }}</span></p>
            </div>
            <div class="main" v-for="CartProduct in CartProducts" :key="CartProduct.id">
                <img :src="CartProduct.photoUrl" alt="">
                <div class="ps-11">
                    <p>{{ CartProduct.name }}</p>
                    <span class="text-yellow-400">${{ CartProduct.price }}</span>
                </div>
                <div class="flex justify-end gap-3 pe-3">
                    <button class="px-2 py-1 bg-red-400 border-0 rounded" @click="deleteProduct(CartProduct.Uid)" >Remove</button>
                    <RouterLink :to="`/products/details/${CartProduct.id}`" class="block px-2 py-1 bg-blue-400 border-0 rounded" >Detail</RouterLink>
                </div>
            </div>
        </div>
    </div>
</div>


    
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { db } from '../firebase/config';
import { collection,onSnapshot,doc, deleteDoc } from 'firebase/firestore';
import { RouterLink } from 'vue-router';
const props = defineProps({
    showCart:Boolean
})

const emit = defineEmits(['cartProductLength','closeCart']);

let CartProducts = ref([]);
let price = ref(0);


const colRef = collection(db,'cartCollection');
onMounted(()=>{
    onSnapshot(colRef,(snap)=>{
        CartProducts.value = snap.docs.map((doc)=>{
            return {Uid:doc.id,...doc.data()};
        });
        emit('cartProductLength',CartProducts.value.length);
        price.value = 0;
        totalPrice(CartProducts.value);
    });    
});

function totalPrice(products){
    products.forEach((p)=>{
        price.value += parseInt(p.price);
    });
};



const deleteProduct = async (id) => {
    const document = doc(db,'cartCollection',id);
    await deleteDoc(document);
};




</script>

<style scoped>
.CartContainer{
    width: 340px;
    height: 100vh;
    overflow-y: scroll;
    position: absolute;
    background-color: white;
    padding: 20px;
    border-radius: 5px 0 0 5px;
    animation: cart 1.7s cubic-bezier(0.215, 0.610, 0.355, 1);
}
@keyframes cart {
    from{ transform: translateX(100%) };
    to{ transform: translateX(0%) };
}

.CartContainer .main{
    max-width: 300px;
    height: auto;
    margin: 40px 0px;
    padding: 5px;
    background-color: #f4f4f4;
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;
    
}
.CartContainer .main:first-child{
    margin-top: 15px;
}
.CartContainer .main img{
    width: 12%;
    border-radius: 3px;
    position: absolute;
    left: 0;
    top: -20%;
}

.CartContainer::-webkit-scrollbar{
    width: 5px;
}
.CartContainer::-webkit-scrollbar-thumb{
    background-color: rgb(255, 191, 0);
}
.CartContainer::-webkit-scrollbar-thumb{
    border-radius: 5px;
}


@media screen and (max-width: 450px) {
    .CartContainer{
        width: 280px;
    }
}
</style>