import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, useAppSelector} from '../../state/store';
import {TodosCounter} from '../todosCounter';
import {TodolistItems} from '../todolistItems';
import style from './styles.module.scss';
import {DeleteTasksToggle} from '../DeleteTasksToggle';
import DetectiveLight from '../../img/DarkModelIcon.svg';
import DetectiveDark from '../../img/DetectiveDark.svg';
import {Icon} from '../svg/SvgLoader';
import {useTheme} from '../../hooks/useTheme';
import {ModalError} from "../modalShowingError";
import {TodosListHeaderControls} from "../todosListHeaderControls";
import classNames from "classnames";
import {FilterValuesType} from "../FilterSelectTaskStatus";
import {TasksStateType, TodolistType} from "../../types/actionType/types";
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    initTasks, initTodoList,
    removeTodolist
} from "../../state/actions";

export const Todolist = () => {
    const dispatch = useDispatch();
    const todoLists = useSelector<RootState, TodolistType[]>(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks.todos)

    const {isDark} = useTheme();

    const [modalActiveAddTask, setModalActiveAddTask] = useState<boolean | undefined>(false)
    const [isErrorModalActive, setIsErrorModalActive] = useState(false)
    const [titleValueAddItemTaskOrTodo, setTitleValueAddItemTaskOrTodo] = useState("")
    const [isStartShakeElementsInputOrToggle, setIsStartShakeInputOrDeletingTasksToggle] = useState(false);

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

    function handleChangeValueFilterTodo(value?: FilterValuesType) {
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

    const classNameContainerTodo = classNames(style.container, {
        [style.containerDark]: isDark,
    })

    return (
        <div className={classNameContainerTodo}>
            <TodosCounter/>
            <div className={style.header}>
                <div className={style.text}>TODO LIST</div>
                <div className={style.headerContent}>
                    <DeleteTasksToggle
                        isStartShakeInputOrDeletingTasksToggle={setIsStartShakeInputOrDeletingTasksToggle}
                        setIsShowModalAddTask={setModalActiveAddTask}
                        setIsErrorShowingModalAddTodo={setIsErrorModalActive}
                        inputTitleAddTaskOrTodo={titleValueAddItemTaskOrTodo}/>
                    <ModalError isErrorModalActive={isErrorModalActive} setIsErrorModalActive={setIsErrorModalActive}>
                        <h2>Enter values to create a Todolist</h2>
                    </ModalError>
                    <TodosListHeaderControls
                        addTodoOrTodoList={handleAddTodolist}
                        handleChangeFilterTaskStatus={handleChangeValueFilterTodo}
                        withFilterSelectTaskStatus
                        buttonSize={'large'}
                        withSwitchTheme
                        isStartShakingInputOrToggle={isStartShakeElementsInputOrToggle}
                        setIsStartShakingInputOrToggle={setIsStartShakeInputOrDeletingTasksToggle}
                        isModalVisibleAddTask={modalActiveAddTask}
                        setIsModalVisibleAddTask={setModalActiveAddTask}
                        placeholderAddingTaskOrTodo={'Search note...'}
                        titleAddItemTodoOrTasks={titleValueAddItemTaskOrTodo}
                        setTitleAddItemTodoOrTasks={setTitleValueAddItemTaskOrTodo}
                        inputAddingTaskOrTodo={"large"}
                        buttonClassNameAddingTaskOrTodo={style.addTodoListButton}
                    />
                </div>
            </div>
            {!todoLists.length && (
                <div>
                    <Icon Svg={isDark ? DetectiveDark : DetectiveLight} width={200} height={180}/>
                    <div className={style.textContainerTodoList}>Empty...</div>
                </div>
            )}
            <div className={style.todoContainer}>
                {todoLists.map(todoList => (
                    <TodolistItems
                        todolistId={todoList.id}
                        todoTitleValue={todoList.title}
                        changeFilterTasksStatus={handleChangeValueFilterTodo}
                        filterTasksStatus={todoList.filter}
                        removeTodolist={handleRemoveTodolist}
                        changeTodolistTitle={handleChangeTodolistTitle}
                    />
                ))}
            </div>
        </div>
    );
};

