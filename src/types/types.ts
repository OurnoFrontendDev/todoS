import {TaskType} from "../todolistItems/TodolistItems";
import {FilterValuesType} from "../components/header/FilterSelectTaskStatusProps";
import {TodolistType} from "../components/todolist/Todolist";

export type typesForTasksActionCreator =
    removeTaskActionCreatorType
    | addTasksActionCreatorType
    | changeTaskStatusActionCreatorType
    | DeleteAllTasksActionCreatorType
    | changeTaskTitleActionCreatorType
    | initialTasksType
    | RemoveTodolistActionType
    | AddTodolistActionType

export const REMOVE_TASKS = "REMOVE-TASK"
export const ADD_TASKS = "ADD-TASKS"
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
export const DELETE_ALL_TASKS = 'DELETE-ALL-TASKS'
export const INIT_TASKS = 'INIT-TASKS'

export type initialTasksType = {
    type: typeof INIT_TASKS
    payload: { todos: TaskType[]; }
}
export type addTasksActionCreatorType = {
    type: typeof ADD_TASKS
    title: string
    todolistId: string
}
export type removeTaskActionCreatorType = {
    type: typeof REMOVE_TASKS
    taskId: string
    todolistId: string
}
export type changeTaskStatusActionCreatorType = {
    type: typeof CHANGE_TASK_STATUS
    taskId: string
    isDone: boolean
    todolistId: string
}
export type DeleteAllTasksActionCreatorType = {
    type: typeof DELETE_ALL_TASKS
}
export type  changeTaskTitleActionCreatorType = {
    type: typeof CHANGE_TASK_TITLE
    taskId: string
    title: string
    todolistId: string
}
export type typesForTodosActionCreator =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | initialTodoListType

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