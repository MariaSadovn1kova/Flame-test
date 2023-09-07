import type { ActionContext, ActionTree } from 'vuex'
import { MutationType, type Mutations } from './mutations'
import type { State, Person } from './state'

export enum ActionTypes {
    GetAllPeoples = 'GET_ALL_PEOPLES',
    GetSearchPeoples = 'GET_SEARCH_PEOPLES',
    GetFavoritesPeoples = 'GET_FAVORITES_PEOPLES'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K, 
        payload: Parameters<Mutations[K]> [1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.GetAllPeoples](context: ActionAugments, page: Number): void
    [ActionTypes.GetSearchPeoples](context: ActionAugments, str: String): void
    [ActionTypes.GetFavoritesPeoples](context: ActionAugments): void
}


export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GetAllPeoples]({ commit }, page: Number){
        commit(MutationType.ClearPeopleList)

        const res = await fetch('https://swapi.dev/api/people/?page=' + page);
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
    },
    async [ActionTypes.GetSearchPeoples]({ commit }, str: String){
        commit(MutationType.ClearSearchList)

        const res = await fetch('https://swapi.dev/api/people/?search=' + str)
        const data = await res.json()
    
        for (let i = 0; i < data.results.length; i++){
    
            let person: Person = {
                // Вообще странно, что апишка не отдает id отдельным параметром
                // Поэтому пришлось сделать фокус с регуляркой
                id: Number(data.results[i].url.replace(/[^0-9]/g,"")),
                name: data.results[i].name,
                height: data.results[i].height, 
                mass: data.results[i].mass,
                hair_color: data.results[i].hair_color
            }
    
            commit(MutationType.PushSearchPerson, person)
        }
    },
    [ActionTypes.GetFavoritesPeoples]({ commit }){
        commit(MutationType.ClearFavoritesList)

        const data = JSON.parse(localStorage.getItem(`favorites_list`) || '')
    
        for (let i = 0; i < data.length; i++){
    
            let person: Person = {
                id: data[i].id,
                name: data[i].name,
                height: data[i].height, 
                mass: data[i].mass,
                hair_color: data[i].hair_color
            }
            commit(MutationType.PushFavoritesPerson, person)
        }
    },
}