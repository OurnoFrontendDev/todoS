import React, {ChangeEvent, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {Icon} from '../components/svg/SvgLoader';
import trash from '/src/img/trasher.svg';
import s from '/src/todolistItems/todolistItem.module.scss';
import {FilterValuesType} from "../components/todolist/Todolist";
import {EditableSpan} from "../components/manipulationsWithTasks/EditableSpan";
import {Button} from "../components/button/Button";
import {HeaderControls} from "../components/header/HeaderControls";
import {CheckBox} from "../checkBox/CheckBox";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};
type TodolistItems = {
    todolistId: string;
    titleTodo: string;
    changeFilterTasksStatus: (value: FilterValuesType, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
    filterTasksStatus: FilterValuesType;
};

export function TodolistItems(props: TodolistItems) {
    const dispatch = useDispatch();
    const tasks = useAppSelector(state => state.tasks.todos[props.todolistId]);
    const [titleTasks, setTitleTasks] = useState("")
    const handleAddTask = (titleTasks: string) => {
        dispatch(addTaskAC(titleTasks, props.todolistId));
    };
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId);
    };
    const changeTodolistTitle = (titleTasks: string) => {
        props.changeTodolistTitle(props.todolistId, titleTasks);
    };

    const removeTaskACHandler = (taskId: string) => {
        dispatch(removeTaskAC(taskId, props.todolistId));
    };

    const toggleTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatusAC(taskId, newIsDoneValue, props.todolistId));
    };

    const changeTaskTitle = (taskId: string, newValue: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, props.todolistId));
    };
    const filterTasksForTodolist = useMemo(() => {
        let filteredTasks = tasks;
        if (props.filterTasksStatus === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone);
        }
        if (props.filterTasksStatus === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone);
        }
        return filteredTasks;
    }, [tasks, props.filterTasksStatus]);
    const handleDeleteTask =(taskId:string)=>{
        removeTaskACHandler(taskId)
    }
    return (
        <div className={s.todoItemContainer}>
            <div className={s.todoItemHeader}>
                <div className={s.todolistsItemsIcons}>
                    <EditableSpan valueTitleItem={props.titleTodo} onChange={changeTodolistTitle}/>
                    <Button onClick={removeTodolist} size={'small'} variant={'icons'}>
                        <Icon Svg={trash} width={18} height={18}/>
                    </Button>
                </div>
            </div>
            <div>
                <HeaderControls addItem={handleAddTask} size={'small'} placeholder={'Write your task'} variant={'secondary'} titleValueAddItem={titleTasks} setTitleValueAddItem={setTitleTasks}/>
            </div>
            <div className={s.todolistsItems}>
                {filterTasksForTodolist.map(task => (
                    <div key={task.id} className={`${s.tasksContainer} ${task.isDone ? s.completedTask : ""}`}>
                        <div className={s.todolistsItemsIcons}>
                            <CheckBox checked={task.isDone}
                                      onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTaskStatus(task.id, e.currentTarget.checked)}/>
                            <div className={s.editTask}>
                                <EditableSpan valueTitleItem={task.title}
                                              onChange={(newValue: string) => changeTaskTitle(task.id, newValue)}/>
                                <Button onClick={() => handleDeleteTask(task.id)} size={'small'} variant={'icons'}>
                                    <Icon Svg={trash} width={18} height={18}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
