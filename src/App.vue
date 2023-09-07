<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <div class="container">
    <RouterView />
  </div>

</template>

<style lang="scss" scoped> 
.container{
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding-top: 40px;
}
</style>
