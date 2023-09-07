export type Person = {
    id: number,
    name: string,
    height: number, 
    mass: number,
    hair_color: string
}

export type State = {
    activePage: number,
    peoplesList: Person[],
    searchPeoplesList: Person[],
    favoritePeople: Person[]
}

export const state: State = {
    activePage: 1,
    peoplesList: [],
    searchPeoplesList: [],
    favoritePeople: []
}