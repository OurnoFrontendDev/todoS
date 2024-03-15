import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TaskType} from "../todolistItems/TodolistItems";
import {TasksStateType} from "../components/todolist/Todolist";

type ActionsType =
    removeTaskAC
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | DeleteAllTasksACType
    | RemoveTodolistActionType
    | AddTodolistActionType

const initialState: TasksStateType = {
    todos: {},
    addedNow: 0,
    addedTotal: 0,
    deletedTotal: 0
};
// todos: {
//     [todolistId1]: [
//         {id: v1(), title: 'Note#1', isDone: true},
//         {id: v1(), title: 'Note #2', isDone: true},
//     ],
//         [todolistId2]: [
//         {id: v1(), title: 'Note#1', isDone: true},
//         {id: v1(), title: 'Note #2', isDone: true},
//     ],
// },
// addedNow: 0,
//     addedTotal: 0,
//     deletedTotal: 0,

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
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            const updatedAddedTotal = state.addedTotal ? state.addedTotal + 1 : 1;
            localStorage.setItem('addedTotal', JSON.stringify(updatedAddedTotal)); return {...state,
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
                newState.todos[todolistId] = [];});
            return {
                ...newState,
                addedNow: 0,
                addedTotal: 0,
                deletedTotal: state.deletedTotal ? state.deletedTotal + 1 : 1,
            };
        }
        case "INIT-TASKS":{
            return {todos:action.payload}
        }
        default:
            return state;
    }
}

type removeTaskAC = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId} as const
}
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}

type DeleteAllTasksACType = ReturnType<typeof deleteAllTasks>
export const deleteAllTasks = () => {
    return {type: 'DELETE-ALL-TASKS'} as const
}

