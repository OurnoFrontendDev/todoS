import {TodolistType, typesForTodosActionCreator} from "../types/actionType/types";

const initialState: Array<TodolistType> = []
export const todolistReducer = (state: TodolistType[] = initialState, action: typesForTodosActionCreator): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]

        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => ({...el, filter: action.filter}))
        }
        case 'INIT-TODO-LIST': {
            console.log("INIT-TODO-LIST",action.payload)
            return action.payload
        }
        default:
            return state;
    }
}



