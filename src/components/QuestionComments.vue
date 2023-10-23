<template>
    <div class="mt-10"></div>
    <div v-for="comment in comments" :key="comment.id" >
        <div v-if="props.productId === comment.productId" class="max-w-md mx-auto bg-white rounded p-3 mt-5">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <img :src="comment.photo" class="w-10 h-10 rounded-full" alt="commentimg">
                    <span>{{comment.name}}</span>
                </div>
                <div class="relative">
                    <div v-if="auth.currentUser.uid === comment.uid">
                        <font-awesome-icon icon="ellipsis-vertical" class="text-2xl text-gray-800 hover:text-gray-600 hover:duration-300 cursor-pointer" @click="showEditMenu(comment.id)" />
                    </div>
                    <div class="hidden absolute bg-gray-400 px-3 py-2 rounded" style="left: -23px;" :id="`menu${comment.id}`">
                        <font-awesome-icon icon="trash-can" class="text-white hover:text-red-500 duration-150 cursor-pointer" @click="deleteComment(comment.id)" />
                        <font-awesome-icon icon="pen" class="text-white hover:text-yellow-400 duration-150 cursor-pointer" 
                        @click="editComment(comment.id)" :id="`edit${comment.id}`"
                        />
                    </div>
                </div>
            </div>
            <div class="mt-5 mb-1">
                <p :id="`comment${comment.id}`">{{comment.message}}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { db,auth } from '../firebase/config';
import { collection,onSnapshot, query,orderBy, limit, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const props = defineProps({
    productId:String
});


const comments = ref([]);
const colRef = collection(db,'commentCollection');
const q = query(colRef,orderBy('message','desc'),limit(4));
onMounted(()=>{
    onSnapshot(q,(snap)=>{
       comments.value = snap.docs.map((doc)=>{
         return {id:doc.id , ...doc.data()};
       });
    });
});

const showEditMenu = (id) => {
    const menu = document.getElementById(`menu${id}`);
    menu.classList.toggle('hidden');
}

const deleteComment = async(id) => {
    //hide delete div
    const menu = document.getElementById(`menu${id}`);
    menu.classList.toggle('hidden');
    //delete
    const docRef = doc(db,'commentCollection',id);
    await deleteDoc(docRef);
}

const editComment = (id) => {
    //hide edit div
    const menu = document.getElementById(`menu${id}`);
    menu.classList.toggle('hidden');
    const edit = document.getElementById(`edit${id}`);
    edit.classList.add('hidden');
    //create new input element
    const comment = document.getElementById(`comment${id}`);
    const newInput = document.createElement('input');
    newInput.value = comment.innerText;
    newInput.className = 'w-full border-0 outline-none rounded bg-gray-200 p-2';
    newInput.selectionStart = comment.innerText.length;
    newInput.selectionEnd = comment.innerText.length;
    newInput.setAttribute('autofocus','');
    comment.replaceWith(newInput);
    //add event listener
    newInput.addEventListener('keyup',async(e)=>{
        if(e.key === 'Enter'){
            comment.innerText = newInput.value;
            newInput.replaceWith(comment);
            const docRef = doc(db,'commentCollection',id);
            await updateDoc(docRef,{
                message:newInput.value
            });
            edit.classList.remove('hidden');
        }
    });
}


</script>

<style scoped>

</style>