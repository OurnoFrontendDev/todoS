import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TaskType} from "../todolistItems/TodolistItems";
import {TasksStateType} from "../components/todolist/Todolist";
const REMOVE_TASKS = "REMOVE-TASK"
const ADD_TASKS = "ADD-TASKS"
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const DELETE_ALL_TASKS = 'DELETE-ALL-TASKS'
const INIT_TASKS = 'INIT-TASKS'

type initialTasksType = {
    type: typeof INIT_TASKS
    payload: { [key: string]: TaskType[]; }
}
type addTasksActionCreatorType = {
    type: typeof ADD_TASKS
    title: string
    todolistId: string
}
type removeTaskActionCreatorType = {
    type: typeof REMOVE_TASKS
    taskId: string
    todolistId: string
}
type changeTaskStatusActionCreatorType = {
    type: typeof CHANGE_TASK_STATUS
    taskId: string
    isDone: boolean
    todolistId: string
}
type DeleteAllTasksActionCreatorType = {
    type: typeof DELETE_ALL_TASKS
}
type  changeTaskTitleActionCreatorType = {
    type: typeof CHANGE_TASK_TITLE
    taskId: string
    title: string
    todolistId: string
}

type ActionsType =
    removeTaskActionCreatorType
    | addTasksActionCreatorType
    | changeTaskStatusActionCreatorType
    | DeleteAllTasksActionCreatorType
    | changeTaskTitleActionCreatorType
    | initialTasksType
    | RemoveTodolistActionType
    | AddTodolistActionType


const initialState: TasksStateType = {
    todos: {},
    addedNow: 0,
    addedTotal: 0,
    deletedTotal: 0
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const updatedTodos = state.todos[action.todolistId].filter(el => el.id !== action.taskId);
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.todolistId]: updatedTodos,
                },
                deletedTotal: state.deletedTotal ? state.deletedTotal + 1 : 1,
                addedNow: state.addedNow ? state.addedNow - 1 : 0
            };
        }
        case 'ADD-TASKS': {
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            const updatedAddedTotal = state.addedTotal ? state.addedTotal + 1 : 1;
            localStorage.setItem('addedTotal', JSON.stringify(updatedAddedTotal));
            return {
                ...state,
                todos: {...state.todos, [action.todolistId]: [...state.todos[action.todolistId], newTask]},
                addedNow: state.addedNow ? state.addedNow + 1 : 1,
                addedTotal: state.addedTotal ? state.addedTotal + 1 : 1,
            };
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.todolistId]: state.todos[action.todolistId].map(el => el.id === action.taskId ? {
                        ...el,
                        isDone: action.isDone,
                    } : el),
                },
            };
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.todolistId]: state.todos[action.todolistId].map(el => el.id === action.taskId ? {
                        ...el,
                        title: action.title,
                    } : el),
                },
            };
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, todos: {...state.todos, [action.todolistId]: [],}
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state.todos};
            delete copyState[action.id];
            return {
                ...state,
                todos: {
                    ...copyState
                }
            }
        }
        case 'DELETE-ALL-TASKS': {
            const newState = {...state};
            Object.keys(newState.todos).forEach(todolistId => {
                newState.todos[todolistId] = [];
            });
            return {
                ...newState,
                addedNow: 0,
                addedTotal: 0,
                deletedTotal: state.deletedTotal ? state.deletedTotal + 1 : 1,
            };
        }
        case "INIT-TASKS": {
            return {todos: action.payload}
        }
        default:
            return state;
    }
}


export const removeTask = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASKS', title, todolistId}
}
export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const deleteAllTasks = () => {
    return {type: 'DELETE-ALL-TASKS'}
}



