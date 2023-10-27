<template>
    <form class=" flex flex-col gap-2" @submit.prevent="createProduct">
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
            <span ref="span">Create</span>
        </button>
    </form>         

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db,storage } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { uploadBytes, ref as storageReference, getDownloadURL} from 'firebase/storage'
const name = ref('');
const price = ref('');
const description = ref('');
const category = ref('choose');
const emit = defineEmits(['finished','hideCreateProduct']);

//create product
const photo = ref(null);
const label = ref(null);
const span = ref(null);
const colRef = collection(db,'productCollection');
const createProduct = async() => {
    //add photo data
    const photoPath = photo.value.files[0].name;
    const file =  photo.value.files[0];
    //style spin
    span.value.innerText = '';
    span.value.classList.add('spin');
    
    const storageRef = storageReference(storage,'productsPhoto/'+ photoPath);
    let res = await uploadBytes(storageRef,file);
    let url = ref(null);
    if(res){
        let getUrl = await getDownloadURL(storageRef);
        url.value = getUrl;
    }
    const data = {
        name:name.value,
        price:price.value,
        photoUrl: url.value,
        description:description.value,
        category:category.value
    };
    try{
        let res = await addDoc(colRef,data);
        //remove style
        span.value.innerText = 'Create';
        span.value.classList.remove('spin'); 
    }catch(err){
        console.log(err.message)
    }
    name.value = '';
    price.value = '';
    description.value = '';
    category.value = 'choose';
    emit('finished');
};

const file = () => {
    const photoPath = photo.value.files[0].name;
    label.value.innerText = 'File - ' + photoPath;
}


</script>

<style scoped>
.spin{
    display: block;
    margin: auto;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #fff;
    animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>