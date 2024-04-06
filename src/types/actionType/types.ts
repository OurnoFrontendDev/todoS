import {FilterValuesType} from "../../components/FilterSelectTaskStatus";
import {
    ADD_TASKS,
    ADD_TODOLIST, CHANGE_TASK_STATUS, CHANGE_TASK_TITLE,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE, DELETE_ALL_TASKS, INIT_TASKS,
    INIT_TODO_LIST, REMOVE_TASKS,
    REMOVE_TODOLIST
} from "../../state/constans";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type typesForTasksActionCreator =
    removeTaskActionCreatorType
    | addTasksActionCreatorType
    | changeTaskStatusActionCreatorType
    | DeleteAllTasksActionCreatorType
    | changeTaskTitleActionCreatorType
    | initialTasksType
    | RemoveTodolistActionType
    | AddTodolistActionType

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
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type CounterType = {
    addedNow?: number;
    addedTotal?: number;
    deletedTotal?: number;
};

export type TasksStateType = {
    todos: {
        [key: string]: TaskType[];
    };
} & CounterType;
