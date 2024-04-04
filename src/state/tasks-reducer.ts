import {v1} from 'uuid';
import {TasksStateType, TaskType, typesForTasksActionCreator} from "../types/actionType/types";

export const initialState: TasksStateType = {
    todos: {},
    addedNow: 0,
    addedTotal: 0,
    deletedTotal: 0
};

export const tasksReducer = (state: TasksStateType = initialState, action: typesForTasksActionCreator): TasksStateType => {
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



