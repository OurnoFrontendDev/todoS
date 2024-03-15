import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {EditableSpan} from '../components/manipulationsWithTasks/EditableSpan';
import {HeaderStand} from '../components/header/HeaderStand';
import {UniversalButton} from '../components/button/UniversalButton';
import {CustomCheckbox} from '../checkBox/CustomCheckbox';
import {Icon} from '../components/svg/SvgLoader';
import trash from '/src/img/trasher.svg';
import s from '/src/todolistItems/todolistItem.module.scss';
import {FilterValuesType} from "../components/todolist/Todolist";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    todolistId: string;
    title: string;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
    filter: FilterValuesType;
    titleValue: string
    setTitleValue: (titleValue: string) => void
};

export function TodolistItems(props: PropsType) {
    const dispatch = useDispatch();
    const tasks = useAppSelector(state => state.tasks.todos[props.todolistId]);
    const [title,setTitle]=useState("")
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todolistId));
    };
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId);
    };
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
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

    let tasksForTodolist = tasks;
    if (props.filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return (
        <div className={s.todoItemContainer}>
            <div className={s.todoItemHeader}>
                <div className={s.todolistsItemsIcons}>
                    <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                    <UniversalButton callBack={removeTodolist} size={'small'} level={'icons'}>
                        <Icon Svg={trash} width={18} height={18}/>
                    </UniversalButton>
                </div>
            </div>
            <div>
                <HeaderStand addItem={addTask} size={'small'} placeholder={'Write your task'} level={'secondary'}
                             titleValue={title} setTitleValue={setTitle}/>
            </div>
            <div className={s.todolistsItems}>
                {tasksForTodolist.map(task => (
                    <div key={task.id} style={{textDecoration: task.isDone ? 'line-through' : 'none'}}
                         className={s.tasksContainer}>
                        <div className={s.todolistsItemsIcons}>
                            <CustomCheckbox checked={task.isDone}
                                            onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => toggleTaskStatus(task.id, e.currentTarget.checked)}
                            />
                            <div className={s.editableContainer}>
                                <EditableSpan value={task.title}
                                              onChange={(newValue: string) => changeTaskTitle(task.id, newValue)}/>
                                <UniversalButton callBack={() => removeTaskACHandler(task.id)} size={'small'}
                                                 level={'icons'}>
                                    <Icon Svg={trash} width={18} height={18}/>
                                </UniversalButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
