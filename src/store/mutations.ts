import type { MutationTree } from 'vuex'
import type { State, Person } from './state'

export enum MutationType {
    PushPerson = 'PUSH_PERSON',
    PushSearchPerson = 'PUSH_SEARCH_PERSON',
    PushFavoritesPerson = 'PUSH_FAVORITES_PERSON',
    DeleteFavoritesPerson = 'DELETE_FAVORITES_PERSON',
    SetFavoritesPerson = 'SET_FAVORITES_PERSON',
    ClearPeopleList = 'CLEAR_PEOPLE_LIST',
    ClearFavoritesList = 'CLEAR_FAVORITES_LIST',
    ClearSearchList = 'CLEAR_SEARCH_LIST'
}

export type Mutations = {
    [MutationType.PushPerson] (state: State, item: Person): void
    [MutationType.PushSearchPerson] (state: State, item: Person): void
    [MutationType.PushFavoritesPerson] (state: State, item: Person): void
    [MutationType.DeleteFavoritesPerson] (state: State, item: Person): void
    [MutationType.SetFavoritesPerson] (state: State, item: Person): void
    [MutationType.ClearPeopleList] (state: State): void
    [MutationType.ClearFavoritesList] (state: State): void
    [MutationType.ClearSearchList] (state: State): void
}

export const mutations: MutationTree<State> & Mutations = {

    [MutationType.PushPerson](state: State, item: Person){
        state.peoplesList.push(item)
    },
    [MutationType.PushSearchPerson](state: State, item: Person){
        state.searchPeoplesList.push(item)
    },    
    [MutationType.PushFavoritesPerson](state: State, item: Person){
        state.favoritePeople.push(item)
    },    
    [MutationType.DeleteFavoritesPerson](state: State, item: Person){
        const ind = state.favoritePeople.findIndex((el) => el.id === item.id);
        if (ind !== -1) {
            state.favoritePeople.splice(ind, 1)
        } 
    },
    [MutationType.SetFavoritesPerson](state: State, items: Person[]){
        state.favoritePeople = items
    },
    [MutationType.ClearPeopleList](state: State){
        state.peoplesList = []
    },
    [MutationType.ClearFavoritesList](state: State){
        state.favoritePeople = []
    },
    [MutationType.ClearSearchList](state: State){
        state.searchPeoplesList = []
    }

}