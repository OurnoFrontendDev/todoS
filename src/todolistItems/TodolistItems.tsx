import React, {ChangeEvent, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../state/store';
import {Icon} from '../components/svg/SvgLoader';
import DeletingTodoOrTaskIcon from '/src/img/DeletingTodoOrTaskIcon.svg';
import style from '/src/todolistItems/todolistItem.module.scss';
import {InputTaskOrTodoListEditing} from "../components/manipulationsWithTasks/InputTaskOrTodoListEditing";
import {Button} from "../components/button/Button";
import {TodosListHeaderControls} from "../components/header/TodosListHeaderControls";
import {Checkbox} from "../components/checkbox/Checkbox";
import {FilterValuesType} from "../components/header/FilterSelectTaskStatus";
import classNames from "classnames";
import {addTask, changeTaskStatus, changeTaskTitle, removeTask} from "../state/actions";


type TodolistItems = {
    todolistId: string;
    todoTitleValue: string;
    changeFilterTasksStatus: (value: FilterValuesType, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
    filterTasksStatus: FilterValuesType;
};

export function TodolistItems(props: TodolistItems) {
    const {
        todolistId,
        todoTitleValue,
        removeTodolist,
        changeTodolistTitle,
        filterTasksStatus
    } = props

    const dispatch = useDispatch();
    const tasks = useAppSelector(state => state.tasks.todos[todolistId]);

    const [titleTasks, setTitleTasks] = useState("")

    const handleAddTask = (titleTasks: string) => {
        dispatch(addTask(titleTasks, todolistId));
    };

    const handeRemoveTodolist = () => {
        removeTodolist(todolistId);
    };

    const handleChangeTodoListTitle = (titleTasks: string) => {
        changeTodolistTitle(todolistId, titleTasks);
    };

    const handleRemoveTask = (taskId: string) => () => {
        dispatch(removeTask(taskId, todolistId));
    };

    const handleSwitchingTaskStatus = (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatus(taskId, e.currentTarget.checked, todolistId));
    }

    const handleChangeTaskTitle = (taskId: string) => (newValue: string) => {
        dispatch(changeTaskTitle(taskId, newValue, todolistId));
    }

    const filterTasksForTodolist = useMemo(() => {
        let filteredTasks = tasks;
        if (filterTasksStatus === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone);
        }
        if (filterTasksStatus === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone);
        }
        return filteredTasks;
    }, [tasks, filterTasksStatus]);

    return (
        <div className={style.todoItemContainer}>
            <div className={style.todoItemHeader}>
                <div className={style.todolistsItemsIcons}>
                    <InputTaskOrTodoListEditing valueTitleTodoOrTask={todoTitleValue}
                                                handleOnChangeTitleTodoOrTasks={handleChangeTodoListTitle}/>
                    <Button onClick={handeRemoveTodolist} buttonSize={'small'} buttonVariant={'icons'}>
                        <Icon Svg={DeletingTodoOrTaskIcon} width={18} height={18}/>
                    </Button>
                </div>
            </div>
            <div>
                <TodosListHeaderControls addTodoOrTodoList={handleAddTask} buttonSize={'small'}
                                         inputPlaceholder={'Write your task'} buttonVariant={'secondary'}
                                         titleValueAddItemTodoOrTasks={titleTasks}
                                         setTitleValueAddItemTodoOrTasks={setTitleTasks}
                                         inputSizeAddTodoOrTask={"small"}/>
            </div>
            <div className={style.todolistsItems}>
                {filterTasksForTodolist.map(task => {
                    const taskStyles = classNames(
                        style.tasksContainer,
                        {
                            [style.completedTask]: task.isDone
                        }
                    );
                    return (
                        (
                            <div key={task.id} className={taskStyles}>
                                <div className={style.todolistsItemsIcons}>
                                    <Checkbox checked={task.isDone}
                                              onChange={handleSwitchingTaskStatus(task.id)}/>
                                    <div className={style.editTask}>
                                        <InputTaskOrTodoListEditing valueTitleTodoOrTask={task.title}
                                                                    handleOnChangeTitleTodoOrTasks={handleChangeTaskTitle(task.id)}/>
                                        <Button onClick={handleRemoveTask(task.id)} buttonSize={'small'}
                                                buttonVariant={'icons'}>
                                            <Icon Svg={DeletingTodoOrTaskIcon} width={18} height={18}/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                })}
            </div>
        </div>
    );
}
