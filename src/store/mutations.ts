import type { MutationTree } from 'vuex'
import type { State, Person } from './state'

export enum MutationType {
    PushPerson = 'GET_ALL_PEOPLES',
    GetOnePerson = 'GET_ONE_PERSON',
    SetLoading = 'SET_LOADING'
}

export type Mutations = {
    [MutationType.PushPerson] (state: State): void,
    [MutationType.SetLoading] (state: State, value: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {

    [MutationType.PushPerson](state: State, item: Person){
        state.peoplesList.push(item)
    }, 
    [MutationType.SetLoading](state: State, value: boolean){
        state.loading = value
    }

}