import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, useAppSelector} from '../../state/store';
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle, initTodoList,
    removeTodolist
} from '../../state/todolist-reducer';
import {TodosCounter} from '../todosCounter/TodosCounter';
import {TaskType, TodolistItems} from '../../todolistItems/TodolistItems';
import style from './todolistStyles.module.scss';
import {DeleteTasksToggle} from '../toggle/DeleteTasksToggle';
import DetectiveLight from '../../img/DetectiveLight.svg';
import DetectiveDark from '../../img/DetectiveDark.svg';
import {Icon} from '../svg/SvgLoader';
import {useTheme} from '../../hooks/useTheme';
import {ModalError} from "../modals/modalError/ModalError";
import {TodosListHeaderControls} from "../header/TodosListHeaderControlsProps";
import classNames from "classnames";
import {FilterValuesType} from "../header/FilterSelectTaskStatusProps";
import {initTasks} from "../../state/tasks-reducer";


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

export const Todolist = () => {
    const dispatch = useDispatch();
    const todoLists = useSelector<RootState, TodolistType[]>(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks.todos)

    const [modalActiveAddTask, setModalActiveAddTask] = useState<boolean | undefined>(false)
    const [isErrorModalActive, setIsErrorModalActive] = useState(false)

    const [titleValueAddItemTaskOrTodo, setTitleValueAddItemTaskOrTodo] = useState("")

    const [isStartShakeElementsInputOrToggle, setIsStartShakeElementsInputOrToggle] = useState(false);

    const {isDark} = useTheme();
    useEffect(() => {

        const savedTodoLists = localStorage.getItem("todoLists")
        const savedTasks = localStorage.getItem("tasks")
        if (savedTodoLists) {
            const parsedSavedTodolist: TodolistType[] = JSON.parse(savedTodoLists)
            if (parsedSavedTodolist.length) {
                dispatch(initTodoList(parsedSavedTodolist))
            }
            if (savedTasks) {
                const parsedSavedTasks: TasksStateType = JSON.parse(savedTasks)
                if (Object.keys(parsedSavedTasks).length) {
                    dispatch(initTasks(parsedSavedTasks))
                }
            }
        }
    }, []);
    useEffect(() => {
        todoLists.length && localStorage.setItem("todoLists", JSON.stringify(todoLists))
        todoLists.length && localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [todoLists, tasks]);


    function handleChangeValueFilterTodo(value: FilterValuesType) {
        dispatch(changeTodolistFilter(value));
    }

    function handleRemoveTodolist(id: string) {
        dispatch(removeTodolist(id));
    }

    function handleChangeTodolistTitle(id: string, title: string) {
        dispatch(changeTodolistTitle(id, title));
    }

    function handleAddTodolist(title: string) {
        dispatch(addTodolist(title));
    }

    const containerTodo = classNames(style.container, {
        [style.containerDark]: isDark,
    })
    return (
        <div className={containerTodo}>
            <TodosCounter/>
            <div className={style.header__block}>
                <div className={style.text}>TODO LIST</div>
                <div className={style.headerContent}>
                    <DeleteTasksToggle toggleIsShackingToggle={setIsStartShakeElementsInputOrToggle}
                                       setIsModalShowActiveAddTask={setModalActiveAddTask}
                                       setIsErrorShowModal={setIsErrorModalActive}
                                       titleValueInputForCondition={titleValueAddItemTaskOrTodo}/>
                    <ModalError isErrorModalActive={isErrorModalActive} setIsErrorModalActive={setIsErrorModalActive}>
                        <h1>Enter values to create a Todolist</h1>
                    </ModalError>
                    <TodosListHeaderControls
                        addItemTodoOrTasks={handleAddTodolist}
                        handleChangeValueFilterTodo={handleChangeValueFilterTodo}
                        withFilterSelectTaskStatus
                        ButtonSize={'large'}
                        withSwitchTheme
                        isShake={isStartShakeElementsInputOrToggle}
                        setIsStartShakeElementsInputOrToggle={setIsStartShakeElementsInputOrToggle}
                        isModalVisibleAddTask={modalActiveAddTask}
                        setIsModalVisibleAddTask={setModalActiveAddTask}
                        placeholderForInputElements={'Search note...'}
                        ButtonVariations={'primary'}
                        titleValueAddItem={titleValueAddItemTaskOrTodo}
                        setTitleValueAddItem={setTitleValueAddItemTaskOrTodo}
                        inputSize={"large"}
                    />
                </div>
            </div>
            {!todoLists.length && (
                <div>
                    <Icon Svg={isDark ? DetectiveDark : DetectiveLight} width={200} height={180}/>
                    <div className={style.textContainer}>Empty...</div>
                </div>
            )}
            <div className={style.todoContainer}>
                {todoLists.map(tl => (
                    <TodolistItems
                        todolistId={tl.id}
                        titleValueTodo={tl.title}
                        changeFilterTasksStatus={handleChangeValueFilterTodo}
                        filterTasksStatus={tl.filter}
                        removeTodolist={handleRemoveTodolist}
                        changeTodolistTitle={handleChangeTodolistTitle}
                    />
                ))}
            </div>
        </div>
    );
};

