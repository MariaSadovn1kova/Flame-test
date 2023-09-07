export type Person = {
    id: number,
    name: string,
    height: number, 
    mass: number,
    hair_color: string
}

export type State = {
    loading: boolean,
    activePage: number,
    peoplesList: Person[]
}

export const state: State = {
    loading: true,
    activePage: 1,
    peoplesList: []
}