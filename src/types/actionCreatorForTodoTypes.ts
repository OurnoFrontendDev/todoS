import {FilterValuesType} from "../components/header/FilterSelectTaskStatusProps";
import {TodolistType} from "../components/todolist/Todolist";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const INIT_TODO_LIST = 'INIT-TODO-LIST'
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
export type initialTodoListType = {
    type: typeof INIT_TODO_LIST
    payload: TodolistType[]
}

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | initialTodoListType
