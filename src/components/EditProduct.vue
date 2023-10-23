<template>
    <form class=" flex flex-col gap-2" @submit.prevent="updateProduct">
        <label class="productLabel">Product Name</label>
        <input class="w-full rounded p-2 outline-none" type="text" v-model="name" placeholder="Enter your product name">
        <label class="productLabel">Product Price</label>
        <input class="w-full rounded p-2 outline-none" type="text" v-model="price" placeholder="Enter your product price">
        <label class="productLabel">Product Photo</label>
        <label for="photo" class="cursor-pointer bg-white text-gray-500 px-1 py-2 rounded" ref="label">Choose Photo</label>
        <input type="file" id="photo" class="hidden" accept="image/*" ref="photo" @change="file">
        <label class="productLabel">Product Description</label>
        <textarea class="w-full rounded p-2 outline-none" cols="30" rows="4" v-model="description" placeholder="Enter your product description"></textarea>
        <label class="productLabel">Product Category</label>
        <select class="w-full rounded p-2 outline-none text-gray-700" v-model="category">
            <option value="choose" disabled>Choose a category</option>
            <option>men's clothing</option>
            <option>shoes</option>
            <option>electronics</option>
            <option>furniture</option>
        </select>
        <button type="submit" class="bg-blue-500 text-white text-lg hover:bg-blue-700 duration-200 px-1 py-2 border-0 rounded w-28">
            <span ref="span">Edit</span>
        </button>
    </form>         

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db, storage } from '../firebase/config';
import { uploadBytes, ref as storageReference, getDownloadURL } from 'firebase/storage';
import { getDoc, doc, updateDoc,serverTimestamp } from 'firebase/firestore';

const props = defineProps({
    id:String
});
const emit = defineEmits(['finishedEdit']);

//create product
const photo = ref(null);
const label = ref(null);
const span = ref(null);

//get doc
const colRef = doc(db,'productCollection',props.id);
const res = await getDoc(colRef);
const product = res.data();

const name = ref('');
const price = ref('');
const description = ref('');
const category = ref('');
const url = ref('');

onMounted(()=>{
    name.value = product.name;
    price.value = product.price;
    description.value = product.description;
    category.value = product.category;
})

const file = () => {
   const name = photo.value.files[0].name;
   label.value.innerText = name;
}

const updateProduct = async() => {
    span.value.innerText = '';
    span.value.classList.add('spin');
    //update image
    const imgPath = photo.value.files[0].name;
    const file = photo.value.files[0];
    const storageRef = storageReference(storage,'productsImages/'+ imgPath);
    const res = await uploadBytes(storageRef,file);
    if(res){
        const getUrl = await getDownloadURL(storageRef);
        url.value = getUrl;
    }
    const data = {
        name:name.value,
        price:price.value,
        description:description.value,
        category:category.value,
        photoUrl:url.value,
        createdAt:serverTimestamp()
    };
    await updateDoc(colRef,data);
    span.value.innerText = 'Edit';
    span.value.classList.remove('spin');
    emit('finishedEdit');
}

</script>

<style scoped>

</style>