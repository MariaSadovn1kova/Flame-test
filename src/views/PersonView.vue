
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import type { Ref } from 'vue'
import { useRoute } from "vue-router";

import { useStore } from '../store'
import type { Person } from '../store/state'

let defaultPerson: Person = {
    id: 1,
    name: '',
    height: 1, 
    mass: 1,
    hair_color: ''
}

const activePerson: Ref <Person> = ref(defaultPerson);
const route = useRoute();
const idPerson = ref(Number(route.params.id));

async function getPerson(){
    const res = await fetch('https://swapi.dev/api/people/' + idPerson.value + '/');
    const data = await res.json();

    let person: Person = {
        id: Number(data.url.replace(/[^0-9]/g,"")),
        name: data.name,
        height: data.height, 
        mass: data.mass,
        hair_color: data.hair_color
    }

    activePerson.value = person;
}

onBeforeMount(async () => { 
    await getPerson();
})
</script>

<template>
    <div class="person-table">

        <div class="headline">{{ 'Character: ' + activePerson.name }}</div>

        <div class="person-table__header">
            <div class="header__item">{{ 'Name' }}</div>
            <div class="header__item">{{ 'Height' }}</div>
            <div class="header__item">{{ 'Mass' }}</div>
            <div class="header__item">{{ 'Hair color' }}</div>
        </div>

        <div class="person-table__content">
            <div class="content__item">{{ activePerson.name }}</div>
            <div class="content__item">{{ activePerson.height }}</div>
            <div class="content__item">{{ activePerson.mass }}</div>
            <div class="content__item">{{ activePerson.hair_color }}</div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.person-table{
    width: 900px;
    height: 250px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    padding: 30px 20px; 

    .headline{
        font-size: 40px;
    }

    &__header{
        margin-top: 20px;
        display: flex;
        
        .header__item{
            width: 25%;
        }
    }

    &__content{
        display: flex;
        margin-top: 10px;

        .content__item{
            width: 25%;
            color: var(--vt-blue-400);
            font-size: 25px;
        }
    }
}
</style>