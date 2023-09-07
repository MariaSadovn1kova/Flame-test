import { createStore, createLogger, Store as VuexStore, type DispatchOptions, type CommitOptions} from 'vuex'
import { state, type State } from './state'
import { mutations, type Mutations } from './mutations'
import { actions, type Actions } from './actions'
import { getters, type Getters} from './getters'

export const store = createStore<State>({
    state, 
    mutations, 
    actions, 
    getters
})

export function useStore(){
    return store as Store
}

export type Store = Omit<
    VuexStore<State>,
    'getters' | 'commit' | 'dispatch'
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K, 
        payload: P, 
        options?: CommitOptions
    ) : ReturnType<Mutations[K]>
} & {
    dispatch<K extends keyof Actions>(
        key: K, 
        payload: Parameters<Actions[K]>[1], 
        options?: DispatchOptions
    ) : ReturnType<Actions[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}