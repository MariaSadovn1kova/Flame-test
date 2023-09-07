import type { ActionContext, ActionTree } from 'vuex'
import { MutationType, type Mutations } from './mutations'
import type { State, Person } from './state'

export enum ActionTypes {
    GetAllPeoples = 'GET_ALL_PEOPLES',
    SetLoading = 'SET_LOADING'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K, 
        payload: Parameters<Mutations[K]> [1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.GetAllPeoples](context: ActionAugments): void
}


export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GetAllPeoples]({ commit }){
        commit(MutationType.SetLoading, false)

        const res = await fetch('https://swapi.dev/api/people/?page=' + 1);
        const data = await res.json();

        for (let i = 0; i < data.results.length; i++){

            let person: Person = {
                id: Number(data.results[i].url.replace(/[^0-9]/g,"")),
                name: data.results[i].name,
                height: data.results[i].height, 
                mass: data.results[i].mass,
                hair_color: data.results[i].hair_color
            }
            commit(MutationType.PushPerson, person)
        }
    }
}