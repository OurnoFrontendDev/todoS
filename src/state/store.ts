import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistReducer } from "./todolist-reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);
