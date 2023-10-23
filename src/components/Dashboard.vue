<template>
    <table class="bg-slate-200 text-sm w-full text-left rounded">
        <thead class="uppercase text-gray-700 font-bold">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Product Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3  hidden md:block">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-4 lg:px-6 py-3" colspan="2">
                    Action
                </th>
            </tr>
        </thead>
        <tbody v-for="(product,index) in products" :key="product.id">
            <tr class=" border-b bg-slate-300 hover:bg-slate-400 duration-200 ">
                <th scope="row" class="px-6 py-3 font-medium text-gray-700 whitespace-nowrap ">
                    {{ index }}
                </th>
                <td class="px-6 py-3">
                    {{ product.name }}
                </td>
                <td class="px-6 py-3">
                    {{ product.price }}
                </td>
                <td class="px-6 py-3 hidden md:block">
                    {{ product.description }}
                </td>
                <td class="px-4 lg:px-6 py-3">
                    {{ product.category }}
                </td>
                <td class="px-2 lg:px-6 py-3">
                    <button class="bg-amber-500 text-white hover:bg-amber-600 duration-300 px-3 py-2 rounded cursor-pointer"
                    @click="editProduct(product.id)"
                    >
                        edit
                    </button>
                </td>
                <td class="px-2 lg:px-6 py-3">
                    <button class="bg-red-600 text-white hover:bg-red-700 duration-300 px-3 py-2 rounded cursor-pointer"
                    @click="deleteProduct(product.id)"
                    >
                        remove
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/config';
import { collection, onSnapshot, doc, deleteDoc, query, orderBy } from 'firebase/firestore';

const emit = defineEmits(['edit']);

const products = ref([]);
const colRef = collection(db,'productCollection');
onMounted(()=>{
    onSnapshot(colRef, (snap) => {
    const getProducts = snap.docs.map((doc)=>{
        return { id:doc.id, ...doc.data() };
    });
    products.value = getProducts;
    });
});

//delete product
const deleteProduct = async(id) => {
    const docRef = doc(db,'productCollection',id);
    await deleteDoc(docRef);
}

//edit product
const editProduct = (id) => {
    emit('edit',id);
};

</script>

<style scoped>

</style>