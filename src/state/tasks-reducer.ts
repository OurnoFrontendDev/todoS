import {v1} from 'uuid';
import {TasksStateType, TaskType, TypesTasksActionCreator} from "../types/actionType/types";

export const initialState: TasksStateType = {
    todos: {},
    addedNow: 0,
    addedTasksTotal: Number(localStorage.getItem("addedTotalTasks")),
    deletedTasksTotal: Number(localStorage.getItem("deletedTotalTasks"))
};

export const tasksReducer = (state: TasksStateType = initialState, action: TypesTasksActionCreator): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const updatedTodos = state.todos[action.todolistId].filter(el => el.id !== action.taskId);

            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.todolistId]: updatedTodos,
                },

                deletedTasksTotal: state.deletedTasksTotal ? state.deletedTasksTotal + 1 : 1,
                addedNow: state.addedNow ? state.addedNow - 1 : 0
            };
        }
        case 'ADD-TASKS': {
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            const updatedAddedTotal = state.addedTasksTotal ? state.addedTasksTotal + 1 : 1;
            localStorage.setItem('addedTotalTasks', JSON.stringify(updatedAddedTotal));
            return {
                ...state,
                todos: {...state.todos, [action.todolistId]: [...state.todos[action.todolistId], newTask]},
                addedNow: state.addedNow ? state.addedNow + 1 : 1,
                addedTasksTotal: state.addedTasksTotal ? state.addedTasksTotal + 1 : 1,
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
                addedTasksTotal: 0,
                deletedTasksTotal: state.deletedTasksTotal ? state.deletedTasksTotal + 1 : 1,
            };
        }
        case "INIT-TASKS": {
            return {
                todos: action.payload,
                addedTasksTotal: state.addedTasksTotal,
                addedNow: state.addedNow,
                deletedTasksTotal: state.deletedTasksTotal,
            }
        }
        default:
            return state;
    }
}



