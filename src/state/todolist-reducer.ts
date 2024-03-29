import {v1} from 'uuid';
import  {TodolistType} from "../components/todolist/Todolist";
import {FilterValuesType} from "../components/header/FilterSelectTaskStatusProps";
import {
    AddTodolistActionType,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleActionType,
    RemoveTodolistActionType, typesForTodosActionCreator
} from "../types/types";



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
            return action.payload
        }
        default:
            return state;
    }
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
export const changeTodolistFilter = (filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter}
}
export const initTodoList = (payload:TodolistType[]) => {
    return {
        type: "INIT_TODO_LIST",
        payload: payload
    };
};


