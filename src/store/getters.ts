import type { GetterTree } from 'vuex'
import type { Person, State } from './state'

export type Getters = {
    peoplesList(state: State): Person []
}

export const getters: GetterTree <State, State> & Getters = {
    peoplesList(state){
        return state.peoplesList
    }
}