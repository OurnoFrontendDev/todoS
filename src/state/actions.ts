import {
    AddTodolistActionType, ChangeTodolistFilterActionType,
    ChangeTodolistTitleActionType,
    RemoveTodolistActionType, TasksStateType, TodolistType
} from "../types/actionType/types";
import {v1} from "uuid";
import {FilterValuesType} from "../components/FilterSelectTaskStatus";

export const removeTask = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTask = (title: string, todolistId: string) => {
    return {type: 'ADD-TASKS', title, todolistId}
}
export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId }
}
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const deleteAllTasks = () => {
    return {type: 'DELETE-ALL-TASKS'}
}
export const initTasks = (payload: TasksStateType) => {
    return {type: "INIT-TASKS", payload: payload}
}
export const removeTodolist = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolist = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitle = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilter = (filter?: FilterValuesType): ChangeTodolistFilterActionType => {
    const actualFilter = filter ?? 'all';
    return {type: 'CHANGE-TODOLIST-FILTER', filter: actualFilter}
}
export const initTodoList = (payload: TodolistType[]) => {
    return {
        type: 'INIT-TODO-LIST',
        payload: payload
    };
};