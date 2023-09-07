<script setup lang="ts">

</script>

<template>

  <nav class="navigation">
    <RouterLink class="navigation__item" to="/peoples">Peoples</RouterLink>
    <RouterLink class="navigation__item" to="/favorites">Favorites</RouterLink>
  </nav>

</template>

<style lang="scss" scoped> 
.navigation{
  height: 500px;
  width: 500px;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0,0,0,0.2); 

  &__item{
    background: var(--vt-blue-300);
    margin-bottom: 20px;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    color: var(--vt-c-white);
    border-radius: 10px;
    transition: 0.4s;
    font-weight: bold;

    &:hover{
      background: var(--vt-blue-400);
    }
  }
}
</style>
