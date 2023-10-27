<template>
    <div class="relative">
        <input type="checkbox" class="hidden" id="catgCheck">
        <label for="catgCheck" class="px-3 py-2 border-0 rounded bg-transparent hover:text-gray-300 duration-200 cursor-pointer">Categories</label>
        <ul class="dropdown md:absolute bg-gray-500 px-3 py-1 border-0 rounded md:left-0">
            <li class="mb-1 hover:text-gray-200 hover:translate-x-1 duration-200" 
            v-for="category in categories"
            :key="category"
            >
                <p class="cursor-pointer" @click="$emit('category',category)">{{category}}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['category']);
const categories = ref(['All',"men's clothing","shoes",'furniture','electronics']);

</script>


<style scoped>


@media screen and (max-width:768px) {
    .dropdown{
        display: block;
        max-width: 140px;
        padding: 0;
        height: 0;
        overflow: hidden;
        transition: all 0.5s ease-in;
    }

    #catgCheck:checked ~ .dropdown{
        height: 150px;
        padding: 5px 15px;
    }
}

@media screen and (min-width:768px) {
    .dropdown{
        display: block;
        width: 150px;
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition: all 0.5s ease-in;
    }

    #catgCheck:checked ~ .dropdown{
        max-height: 200px;
        padding: 5px 15px;
    }
}


</style>