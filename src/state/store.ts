import { applyMiddleware, combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

export type RootState = ReturnType<typeof rootReducer>;
// Используйте composeWithDevTools для использования расширения Redux DevTools
export const store = createStore(rootReducer);
