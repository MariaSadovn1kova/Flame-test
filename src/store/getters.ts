import type { GetterTree } from 'vuex'
import type { Person, State } from './state'

export type Getters = {
    peoplesList(state: State): Person []
    searchPeoplesList(state: State): Person []
    favoritePeople(state: State): Person[]
}

export const getters: GetterTree <State, State> & Getters = {
    peoplesList(state: State){
        return state.peoplesList
    },
    searchPeoplesList(state: State){
        return state.searchPeoplesList
    },
    favoritePeople(state: State){
        return state.favoritePeople
    },
}