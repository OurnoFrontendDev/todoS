import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, useAppSelector} from '../../state/store';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from '../../state/todolists-reducer';
import {Counter} from '../counterTasks/Counter';
import {HeaderStand} from '../header/HeaderStand';
import {TaskType, TodolistItems} from '../../todolistItems/TodolistItems';
import style from './todolistStyle.module.scss';
import {DeleteTasksToggle} from '../toggle/DeleteTasksToggle';
import DetectiveLight from '../../img/DetectiveLight.svg';
import DetectiveDark from '../../img/DetectiveDark.svg';
import {Icon} from '../svg/SvgLoader';
import useTheme from '../../hooks/useTheme';
import {ModalError} from "../modals/modalError/ModalError";

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

const Todolist = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks.todos)
    const [modalActiveAddTask, setModalActiveAddTask] = useState(false) //модалка добавления тасок
    const [errorModal, setErrorModal] = useState(false)//модалка Ошибки
    const [titleValue,setTitleValue]=useState("")
    console.log("Todolist ERROR",errorModal)
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
    console.log("TITLE",titleValue)

    useEffect(() => {
        todolists.length && localStorage.setItem("todoLists", JSON.stringify(todolists))
        todolists.length && localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [todolists, tasks]);
    const [isShake, setIsShake] = useState(false);
    const {isDark} = useTheme();


    function changeFilter(value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(value));
    }

    function removeTodolist(id: string) {
        dispatch(removeTodolistAC(id));
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatch(changeTodolistTitleAC(id, title));
    }

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title));
    }

    return (
        <div className={`${style.container} ${isDark ? style.containerDark : style.container}`}>
            <Counter/>
            <div className={style.header__block}>
                <div className={style.text}>TODO LIST</div>
                <div className={style.headerContent}>
                    <DeleteTasksToggle Toggle={setIsShake} modalActiveAddTask={modalActiveAddTask} setModalActiveAddTask={setModalActiveAddTask} errorModal={errorModal} setErrorModal={setErrorModal} titleValue={titleValue}/>
                    <ModalError errorModal={errorModal} setErrorModal={setErrorModal}>
                        <h1>Write your Title</h1>
                    </ModalError>
                    <HeaderStand
                        addItem={addTodolist}
                        changeFilter={changeFilter}
                        withSelect
                        size={'large'}
                        withSwitchTheme
                        isShake={isShake}
                        Toggle={setIsShake}
                        modalActiveAddTask={modalActiveAddTask}
                        setModalActiveAddTask={setModalActiveAddTask}
                        placeholder={'Search note...'}
                        level={'primary'}
                        setErrorModal={setErrorModal}
                        titleValue={titleValue}
                        setTitleValue={setTitleValue}

                    />
                </div>
            </div>
            {!todolists.length && (
                <div>
                    <Icon Svg={isDark ? DetectiveDark : DetectiveLight} width={200} height={180}/>
                    <div className={style.textContainer}>Empty...</div>
                </div>
            )}
            <div className={style.todoFlexContainer}>
                {todolists.map(tl => (
                    <TodolistItems
                        todolistId={tl.id}
                        title={tl.title}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        titleValue={titleValue}
                        setTitleValue={setTitleValue}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todolist;