<template>
    <div>
        <form class="container bg-gray-700 px-3 py-2 border-0 rounded" @submit.prevent="Register" >
            <h3 class="text-2xl text-center text-blue-600 font-bold ">Register</h3>
            <label class="lable mb-1 block text-gray-400 text-lg">Username</label>
            <input type="text" class="input mb-2" placeholder="Enter your name" v-model="displayName">
            <label class="lable mb-1 block text-gray-400 text-lg">Email</label>
            <input type="email" class="input mb-2" placeholder="Enter your email" v-model="email">
            <label class="lable mb-1 block text-gray-400 text-lg">Photo</label>
            <input type="file" class="bg-white w-full rounded mb-2 outline-none" ref="photo" accept="image/*">
            <label class="lable mb-1 block text-gray-400 text-lg">Password</label>
            <input type="password" class="input mb-2" placeholder="Enter your password" v-model="password">
            <p class="text-red-600 text-center my-1">{{ error }}</p>
            <button class=" px-3 py-2 block mx-auto bg-blue-600 text-white border-0 rounded" style="width: 100px;">
                <span ref="register">Register</span>
            </button>
            <p class="text-center text-gray-300 text-lg mt-2">Already have a account! <span class="underline text-blue-400 cursor-pointer" @click="$emit('login')">Login </span>here.</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from  'vue'
import signIn from '../composables/Signin'
import { useRouter } from 'vue-router';
import { storage } from '../firebase/config';
import { uploadBytes, getDownloadURL, ref as storageReference } from 'firebase/storage';
defineEmits(['login']);

const displayName = ref('');
const email = ref('');
const password = ref('');
const photo = ref(null);
const register = ref(null);
const router = useRouter();

let {error,registerUser} = signIn();
const Register = async() => {
    //add spin
    register.value.innerText = '';
    register.value.classList.add('spin');
    //store photo
    const name = photo.value.files[0].name;
    const file = photo.value.files[0];
    const storageRef = storageReference(storage,`registerPhoto/${name}`);
    await uploadBytes(storageRef,file);
    let getUrl = await getDownloadURL(storageRef);
    
    const url = ref(null);
    url.value = getUrl;
    console.log(url);
    //signin
    const res = await registerUser(email.value,password.value,displayName.value,url.value);
    displayName.value = '';
    email.value = '';
    password.value = '';
    register.value.innerText = 'Register';
    register.value.classList.remove('spin');
    if(res){
        router.push('/');
    }
}

</script>
