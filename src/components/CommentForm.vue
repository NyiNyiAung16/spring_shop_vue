<template>
    <div class="max-w-md mx-auto" ref="commentForm">
        <h3 class="text-white text-2xl my-3 font-medium">Ask a Question</h3>
        <form @submit.prevent="AddComment">
            <textarea cols="30" rows="5" class="w-full rounded outline-none px-3 pt-2" placeholder="Enter your message" v-model="comment"></textarea>
            <p ref="error" class="text-red-600 mb-1"></p>
            <button type="submit" class="w-20 py-2 border-0 rounded bg-yellow-400 hover:bg-yellow-500 duration-200 ">
                <span ref="span">Submit</span>
            </button>
        </form>
    </div>
    <div>
        <QuestionComments :productId="props.id"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { db,auth } from '../firebase/config'
import { collection,addDoc, serverTimestamp } from 'firebase/firestore'
import QuestionComments from './QuestionComments.vue';

const props = defineProps({
    id:String
});

const comment = ref('');
const span = ref(null);
const error = ref(null);
const router = useRouter();
const colRef = collection(db,'commentCollection');
const AddComment = async() => {
    if(!auth.currentUser){
        router.push({name:'createAccount'});
    }else{
        if(comment.value.length <= 0){
        error.value.innerText = 'Message field is required!!!';
        setTimeout(()=>{
            error.value.innerText = ''
        },2000)
        }
        if(comment.value.length > 0){
            const user = auth.currentUser;
            const data = {
                uid:user.uid,
                productId:props.id,
                name:user.displayName,
                photo:user.photoURL,
                message:comment.value,
                created_at:serverTimestamp()
            };
            span.value.innerText = '';
            span.value.classList.add('spin');
            await addDoc(colRef,data);
            span.value.innerText = 'Submit';
            span.value.classList.remove('spin');
            comment.value = '';
        }
    }
};


</script>

<style scoped>

</style>