<template>
    <div>
        <ProductNav  @category="category"/>
      <div>
          <Suspense>
          <Products :cate="cate" />
          <template #fallback>
            <div class="flex gap-2 justify-center items-center bg-blue-500 mx-auto my-4 px-3 py-2 border-0 rounded" style="width: 140px;">
                <span class="loading w-10 h-10 block"></span>
                <button class="block text-white">Processing...</button>
            </div>
          </template>
        </Suspense>
      </div>
    </div>
</template>

<script setup>
import Products from '@/components/Products.vue'
import ProductNav from '@/components/ProductNav.vue'
import { ref } from 'vue'

let cate = ref(null);
const category = (val) => {
  cate.value = val;
};



</script>

<style scoped>
</style>