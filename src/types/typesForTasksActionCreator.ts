import {TaskType} from "../todolistItems/TodolistItems";
import {AddTodolistActionType, RemoveTodolistActionType} from "../state/todolist-reducer";
import {TasksStateType} from "../components/todolist/Todolist";

export type ActionsType =
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


export const initialState: TasksStateType = {
    todos: {},
    addedNow: 0,
    addedTotal: 0,
    deletedTotal: 0
};