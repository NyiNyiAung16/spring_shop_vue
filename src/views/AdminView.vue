<template>
    <HomeNav/>
    <div  class="grid grid-rows-1 grid-cols-12 mt-7">
        <div class="lg:col-span-2 md:col-span-3 sm:col-span-5 col-span-5 rounded flex flex-col gap-2 ms-5">
            <div class="bg-slate-200  rounded flex flex-col gap-2 p-2 ms-5">
                <div class="flex items-center gap-2">
                    <font-awesome-icon icon="home" class="text-lg text-blue-600" />
                    <p class="hover:text-gray-600 duration-200 cursor-pointer" @click="toggle = true ,showEdit = true">Dashboard</p>
                </div>
                <div class="flex items-center gap-1">
                    <font-awesome-icon icon="pen-to-square" class="text-lg text-green-600" />
                    <p class="hover:text-gray-600 duration-200 cursor-pointer" @click="toggle = false">Create Product</p>
                </div>
            </div>
        </div>  
        <!-- <div class="col-span-1"></div> -->
        <div v-if="toggle" class="lg:col-span-10 md:col-span-12 sm:col-span-12 col-span-12 lg:mt-0 mt-5 me-2 ms-5 md:ms-1">
           <Suspense>
                <div v-if="toggleProduct">
                    <Dashboard @edit="edit"/>
                </div>
                <div v-else class="col-span-8 bg-slate-200 rounded p-2 lg:ms-10">
                    <EditProduct :id="editId" @finishedEdit="toggleProduct = true"/>
                </div>
                <template #fallback>
                    <span class="loading w-10 h-10 block mx-auto"></span>
                </template>
           </Suspense>
        </div>
        <div v-else class="lg:col-span-9 md:col-span-10 col-span-11 bg-slate-200 rounded p-2 ms-3 lg:ms-10 mt-3 lg:mt-0">
            <CreateProduct @finished="toggleProduct = true"/>
        </div>     
    </div>
        
    
</template>

<script setup>
import CreateProduct from '@/components/CreateProduct.vue';
import Dashboard from '@/components/Dashboard.vue';
import HomeNav from '../components/HomeNav.vue';
import { ref } from 'vue'
import EditProduct from '../components/EditProduct.vue';

const toggle = ref(true);
const toggleProduct = ref(true);
const editId = ref('');
const edit = (id) => {
    toggleProduct.value = false;
    editId.value = id;
}

</script>

<style scoped>

</style>