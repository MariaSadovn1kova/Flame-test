<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useStore } from '../store'
import type { Person } from '../store/state'
import { MutationType } from '../store/mutations';
import { ActionTypes } from '../store/actions'

const favorites = ref(JSON.parse(localStorage.getItem(`favorites_list`)))
const store = useStore()

function clearFavorites(){
  localStorage.clear();
  favorites.value = JSON.parse(localStorage.getItem(`favorites_list`));
}

function deleteFavorites(item: Person){
  store.commit(MutationType.DeleteFavoritesPerson, item);
  localStorage.setItem(`favorites_list`, JSON.stringify(store.getters.favoritePeople));
  favorites.value = JSON.parse(localStorage.getItem(`favorites_list`));
}

onBeforeMount(async () => { 
  store.dispatch(ActionTypes.GetFavoritesPeoples, null);
})
</script>


<template>

  <div class="table">

    <div class="btn-container">
      <RouterLink class="btn-container__item" to="/">Back</RouterLink>
    </div>

    <div class="table__header">
      <div class="header__item">{{ 'Name' }}</div>
      <div class="header__item">{{ 'Height' }}</div>
      <div class="header__item">{{ 'Mass' }}</div>
      <div class="header__item">{{ 'Hair color' }}</div>
      <div class="header__item">{{ 'Add favorite' }}</div>
    </div>

    <div class="table__content">

      <div class="content__row" v-for="person in favorites" :key="person.id">
        <div class="row__item">{{ person.name }}</div>
        <div class="row__item">{{ person.height }}</div>
        <div class="row__item">{{ person.mass }}</div>
        <div class="row__item">{{ person.hair_color }}</div>

        <div class="row__item">
            <button class="btn-add" @click="deleteFavorites(person)">{{ 'Delete' }}</button>
        </div>
      </div>

    </div>

    <div class="btn-container">
      <button class="btn-container__item btn-remove" @click="clearFavorites()">Очистить список</button>
    </div>

  </div>

</template>

<style lang="scss" scoped>
.table{
  width: 900px;

  &__header{
    display: flex;
    width: 100%;
    padding: 10px;
    background-color: var(--vt-blue-500);
    color: var(--vt-c-white);
    border-radius: 5px;

    .header__item{
        width: 20%;
        text-align: center;
    }
  }

  &__content{
    margin-top: 10px;

    .content__row{
      display: flex;
      border-radius: 5px;
      background-color: var(--vt-c-white-soft);
      margin-bottom: 10px;
      transition: 0.3s;

      &:hover{
          background-color: var(--vt-c-white-mute);
      }

      .row__item{
        width: 20%;
        padding: 20px;
        text-align: center;

        .btn-add{
            padding: 5px 10px;
            background-color: var(--vt-blue-300);
            color: var(--vt-c-white);
            border: none;
            border-radius: 5px;
            transition: 0.3s;

            &.inactive{
                background-color: var(--vt-c-white-soft);
                color: var(--vt-blue-500);
            }

            &:hover{
                background-color: var(--vt-blue-400);
                color: var(--vt-c-white);
                cursor: pointer;
            }
        }
      }
    }
  }
  .btn-container{
    display: flex;

    &__item{
      color: var(--vt-grey);
      text-decoration: none;
      font-size: 18px;
      transition: 0.3s;
      margin-left: auto;
      margin-bottom: 30px;
      &:hover{
        color: var(--vt-blue-400);
      }
    }
    
    .btn-remove{
      padding: 20px 50px;
      background-color: var(--vt-blue-300);
      color: var(--vt-c-white);
      border: none;
      font-size: 15px;
      border-radius: 5px;
      transition: 0.3s;
      margin-top: 30px;

      &:hover{
        background-color: var(--vt-blue-400);
        color: var(--vt-c-white);
        cursor: pointer;
      }
    }
  }
}
</style>