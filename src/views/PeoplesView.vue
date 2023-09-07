<script setup lang="ts">
import { onBeforeMount, onUpdated, ref } from 'vue';
import type { Ref } from 'vue'
import { useStore } from '../store'
import type { Person } from '../store/state'
import { MutationType } from '../store/mutations';
import { ActionTypes } from '../store/actions'

const peoplesList = ref<Person[]>([]);
const peoplesSearchList = ref<Person[]>([]);
const peoplesFavoriteList = ref<Person[]>([]);
const loading: Ref <boolean> = ref(true);
const activePage: Ref <number> = ref(1);
const search: Ref <string> = ref('');
const store = useStore()

async function getPeoples(){
    loading.value = true;
    peoplesList.value = [];

    await store.dispatch(ActionTypes.GetAllPeoples, activePage.value)
    peoplesList.value = store.getters.peoplesList

    loading.value = false;
}

async function setActivePagination(page: number){
    if (page < 10){
        loading.value = true;
        activePage.value = page;

        await getPeoples();
    }
}

async function searchPerson(){
    peoplesSearchList.value = [];

    await store.dispatch(ActionTypes.GetSearchPeoples, search.value);
    peoplesSearchList.value = store.getters.searchPeoplesList;
}


function addFavorite(item: Person){
    if (!findFavorite(item.id)){
        store.commit(MutationType.PushFavoritesPerson, item);
        localStorage.setItem(`favorites_list`, JSON.stringify(store.getters.favoritePeople));
    } else {
        store.commit(MutationType.DeleteFavoritesPerson, item);
        localStorage.setItem(`favorites_list`, JSON.stringify(store.getters.favoritePeople));
    }
}

onBeforeMount(async () => { 
    await getPeoples();
    store.dispatch(ActionTypes.GetFavoritesPeoples, undefined);
})

function findFavorite(personID: number){
    const ind = store.getters.favoritePeople.findIndex((el) => el.id === personID);
    if (ind !== -1) {
        return true;
    } else {
        return false;
    }
}

</script>

<template>

    <!-- По-хорошему таблицу в отдельный компонент вынести (так как есть реиспользуемость на других страницах),
    Но задание достаточно большое, поэтому, чтобы не терять времени, сделала так -->
    <div class="table">

        <div class="search">

            <div class="search__container">
                <input type="text" v-model="search" @input="searchPerson()">
                <img src="../assets/img/search.svg">
            </div>

            <div class="search__dropdawn" v-if="search"> 
                <RouterLink v-for="person in peoplesSearchList" :key="person.id" :to="'/peoples/' + person.id" class="dropdawn__item">{{ person.name }}</RouterLink>
            </div>

            <RouterLink class="search__btn" to="/">Back</RouterLink>

        </div>

        <div class="table__header">
            <div class="header__item">{{ 'Name' }}</div>
            <div class="header__item">{{ 'Height' }}</div>
            <div class="header__item">{{ 'Mass' }}</div>
            <div class="header__item">{{ 'Hair color' }}</div>
            <div class="header__item">{{ 'Add favorite' }}</div>
        </div>

        <div class="table__content">
            <div class="spin" v-if="loading"></div>

            <div class="content__row" v-for="person in peoplesList" :key="person.id">
                <div class="row__item">{{ person.name }}</div>
                <div class="row__item">{{ person.height }}</div>
                <div class="row__item">{{ person.mass }}</div>
                <div class="row__item">{{ person.hair_color }}</div>

                <div class="row__item">
                    <button class="btn-add" :class="{'inactive' :findFavorite(person.id)}" @click="addFavorite(person)">{{ 'Favorite' }}</button>
                </div>

            </div>

        </div>

        <div class="table__pagination" v-if="!loading">
            <div v-for="page in 9" :key="page" class="pagination__item" :class="{'active': page == activePage}" @click="setActivePagination(page)">{{ page }}</div>
            <div class="pagination__item" @click="setActivePagination(activePage + 1)">{{ '>' }}</div>
        </div>

    </div>

</template>

<style lang="scss" scoped>
.table{
    width: 900px;

    .search{
        display: flex;
        margin-bottom: 20px;

        &__btn{
            color: var(--vt-grey);
            text-decoration: none;
            font-size: 18px;
            transition: 0.3s;
            margin-left: auto;

            &:hover{
                color: var(--vt-blue-400);
            }
        }

        &__container{
            border: 1px solid var(--vt-grey);
            width: 300px;
            border-radius: 40px;
            overflow: hidden;
            display: flex;

            input{
                width: 85%;
                padding: 10px 20px;
                border: none;
                outline: none;
            }
        }
        
        &__dropdawn{
            background-color: var(--vt-c-white);
            border-radius: 5px;
            position: absolute;
            width: 300px;
            top: 10%;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 10px rgba(0,0,0,0.2); 

            .dropdawn__item{
                text-decoration: none;
                color: var(--vt-blue-500);
                margin: 10px;
                padding: 10px;
                border-radius: 5px;
                transition: 0.3s;

                &:hover{
                    background-color: var(--vt-c-white-mute);
                }
            }
        }
    }

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

        @keyframes spinner {
            0% {
                transform: translate3d(-50%, -50%, 0) rotate(0deg);
            }
            100% {
                transform: translate3d(-50%, -50%, 0) rotate(360deg);
            }
        }

        .spin::before {
            animation: 1.5s linear infinite spinner;
            animation-play-state: inherit;
            border: solid 5px var(--vt-grey);
            border-bottom-color: var(--vt-blue-500);
            border-radius: 50%;
            position: absolute;
            top: 25%;
            left: 50%;
            content: "";
            height: 40px;
            width: 40px;
            transform: translate3d(-50%, -50%, 0);
            will-change: transform;
        }

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

     &__pagination{
        display: flex;
        margin-top: 30px;

        .pagination__item{
            width: 44px;
            height: 44px;
            padding: 9px 0;
            text-align: center;
            margin-right: 10px;
            border-radius: 10px;
            background-color: var(--vt-c-white-soft);
            transition: 0.3s;

            &:hover{
                cursor: pointer;
                background-color: var(--vt-c-white-mute);
            }

            &.active{
                background-color: var(--vt-blue-300);
                color: var(--vt-c-white);
            }
        }
    }
}

</style>