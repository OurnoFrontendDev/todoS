import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, useAppSelector} from '../../state/store';
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist
} from '../../state/todolists-reducer';
import {Counter} from '../counterTasks/Counter';
import {TaskType, TodolistItems} from '../../todolistItems/TodolistItems';
import style from './todolistStyle.module.scss';
import {DeleteTasksToggle} from '../toggle/DeleteTasksToggle';
import DetectiveLight from '../../img/DetectiveLight.svg';
import DetectiveDark from '../../img/DetectiveDark.svg';
import {Icon} from '../svg/SvgLoader';
import {useTheme} from '../../hooks/useTheme';
import {ModalError} from "../modals/modalError/ModalError";
import {HeaderControls} from "../header/HeaderControls";

export type FilterValuesType = 'all' | 'active' | 'completed';

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

export  const Todolist = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks.todos)
    const [modalActiveAddTask, setModalActiveAddTask] = useState<boolean|undefined>(false)
    const [errorModalActive, setErrorModalActive] = useState(false)
    const [titleValue,setTitleValue]=useState("")

    useEffect(() => {
        const savedTodoLists = localStorage.getItem("todoLists")
        const savedTasks = localStorage.getItem("tasks")
        if (savedTodoLists) {
            const parsedSavedTodolist: TodolistType[] = JSON.parse(savedTodoLists)
            if (parsedSavedTodolist.length) {
                dispatch({type: "INIT-TODO-LIST", payload: parsedSavedTodolist})
            }
            if (savedTasks) {
                const parsedSavedTasks: TasksStateType = JSON.parse(savedTasks)
                if (Object.keys(parsedSavedTasks).length) {
                    dispatch({type: "INIT-TASKS", payload: parsedSavedTasks})
                }
            }
        }
    }, []);
    useEffect(() => {
        todolists.length && localStorage.setItem("todoLists", JSON.stringify(todolists))
        todolists.length && localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [todolists, tasks]);
    const [isShake, setIsShake] = useState(false);
    const {isDark} = useTheme();


    function changeFilter(value: FilterValuesType) {
        dispatch(changeTodolistFilter(value));
    }

    function removeTodolists(id: string) {
        dispatch(removeTodolist(id));
    }

    function changeTodolistsTitle(id: string, title: string) {
        dispatch(changeTodolistTitle(id, title));
    }

    function addTodolists(title: string) {
        dispatch(addTodolist(title));
    }

    return (
        <div className={`${style.container} ${isDark ? style.containerDark : style.container}`}>
            <Counter/>
            <div className={style.header__block}>
                <div className={style.text}>TODO LIST</div>
                <div className={style.headerContent}>
                    <DeleteTasksToggle toggleActiveShackingInput={setIsShake} isModalShowActiveAddTask={modalActiveAddTask} setIsModalShowActiveAddTask={setModalActiveAddTask} isErrorShowModal={errorModalActive} setIsErrorShowModal={setErrorModalActive} titleValueInputForCondition={titleValue}/>
                    <ModalError errorModalActive={errorModalActive} setErrorModalActive={setErrorModalActive}>
                        <h1>Write your Title</h1>
                    </ModalError>
                    <HeaderControls
                        addItem={addTodolists}
                        changeFilterTasksStatus={changeFilter}
                        withSelectTasksStatus
                        size={'large'}
                        withSwitchTheme
                        isShake={isShake}
                        toggle={setIsShake}
                        isModalVisibleAddTask={modalActiveAddTask}
                        setIsModalVisibleAddTask={setModalActiveAddTask}
                        placeholder={'Search note...'}
                        variant={'primary'}
                        setWithErrorModal={setErrorModalActive}
                        titleValueAddItem={titleValue}
                        setTitleValueAddItem={setTitleValue}

                    />
                </div>
            </div>
            {!todolists.length && (
                <div>
                    <Icon Svg={isDark ? DetectiveDark : DetectiveLight} width={200} height={180}/>
                    <div className={style.textContainer}>Empty...</div>
                </div>
            )}
            <div className={style.todoContainer}>
                {todolists.map(tl => (
                    <TodolistItems
                        todolistId={tl.id}
                        titleTodo={tl.title}
                        changeFilterTasksStatus={changeFilter}
                        filterTasksStatus={tl.filter}
                        removeTodolist={removeTodolists}
                        changeTodolistTitle={changeTodolistsTitle}
                    />
                ))}
            </div>
        </div>
    );
};

