import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from "../components/todolist/Todolist";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const INIT_TODO_LIST = 'INIT-TODO-LIST'
export type RemoveTodolistActionType = {
    type: typeof REMOVE_TODOLIST,
    id: string
}
export type AddTodolistActionType = {
    type: typeof ADD_TODOLIST,
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: typeof CHANGE_TODOLIST_TITLE,
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: typeof CHANGE_TODOLIST_FILTER,
    filter: FilterValuesType
}
type initialTodoListType = {
    type: typeof INIT_TODO_LIST
    payload: TodolistType[]
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | initialTodoListType


const initialState: Array<TodolistType> = []
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): Array<TodolistType> => {
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
            return action.payload
        }
        default:
            return state;
    }
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter}
}

