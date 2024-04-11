import React, {ChangeEvent, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../state/store';
import {Icon} from '../svg/SvgLoader';
import DeletingTodoOrTaskIcon from '/src/img/DeletingTodoOrTaskIcon.svg';
import style from '/src/components/todolistItems/styles.module.scss';
import {InputTaskOrTodoListEditing} from "../InputTaskOrTodoListEditing";
import {Button} from "../button";
import {TodosListHeaderControls} from "../todosListHeaderControls";
import {FilterValuesType} from "../FilterSelectTaskStatus";
import {addTask, changeTaskStatus, changeTaskTitle, removeTask} from "../../state/actions";
import {Task} from "../task";

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

    const handleChangeTodoListTitle = (listTitle: string) => {
        changeTodolistTitle(todolistId, listTitle);
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

    const handleFilterTasksForTodolist = useMemo(() => {
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
        <div className={style.container}>
            <div className={style.todoItemHeader}>
                <div className={style.todoListsItemsHeader}>
                    <InputTaskOrTodoListEditing valueTitleTodoOrTask={todoTitleValue}
                                                handleOnChangeTitleTodoOrTasks={handleChangeTodoListTitle}/>
                    <Button onClick={handeRemoveTodolist} size={'small'} variant={'icons'}>
                        <Icon Svg={DeletingTodoOrTaskIcon} width={18} height={18}/>
                    </Button>
                </div>
            </div>
            <div>
                <TodosListHeaderControls addTodoOrTodoList={handleAddTask} buttonSize={'small'}
                                         placeholderAddingTaskOrTodo={'Write your task'} buttonVariant={'secondary'}
                                         titleAddItemTodoOrTasks={titleTasks}
                                         setTitleAddItemTodoOrTasks={setTitleTasks}
                                         inputAddingTaskOrTodo={"small"}/>
            </div>
            <div className={style.todolistsItems}>
                {handleFilterTasksForTodolist.map(task => {

                    return (
                        <div>
                            <Task handleTaskCheckboxOnChange={handleSwitchingTaskStatus(task.id)}
                                  {...task}
                                  handleChangeTaskTitle={handleChangeTaskTitle(task.id)}
                                  handleRemoveTask={handleRemoveTask(task.id)}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
