<script setup>

</script>

<template>
  <RouterView v-slot="{Component}">
      <div v-if="Component">
        <component :is="Component"/>
      </div>
      <div v-else>
          <Teleport to="body" >
            <p class="text-center text-4xl text-red-500 mt-10">404 not found</p>
          </Teleport>
      </div>
  </RouterView>
    
</template>

<style>
  body{
    padding: 0;
    margin: 0;
  }

  a.router-link-active{
    color:  rgb(24, 234, 150);
    transition: all 0.5s;
  }
</style>
