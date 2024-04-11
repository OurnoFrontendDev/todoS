import {TodolistType, TypesTodosActionCreator} from "../types/actionType/types";

const initialState: Array<TodolistType> = []
export const todolistReducer = (state: TodolistType[] = initialState, action: TypesTodosActionCreator): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todoList => todoList.id != action.id)
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
            return action.payload
        }
        default:
            return state;
    }
}



