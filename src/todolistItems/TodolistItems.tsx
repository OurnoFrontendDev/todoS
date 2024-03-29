import React, {ChangeEvent, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../state/store';
import {addTask, changeTaskStatus, changeTaskTitle, removeTask} from '../state/tasks-reducer';
import {Icon} from '../components/svg/SvgLoader';
import TrashIcon from '/src/img/trasher.svg';
import style from '/src/todolistItems/todolistItem.module.scss';
import {EditableSpanValueTaskOrTodolist} from "../components/manipulationsWithTasks/EditableSpanValueTaskOrTodolist";
import {Button} from "../components/button/Button";
import {TodosListHeaderControls} from "../components/header/TodosListHeaderControlsProps";
import {Checkbox} from "../components/checkBox/Checkbox";
import {FilterValuesType} from "../components/header/FilterSelectTaskStatusProps";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};
type TodolistItems = {
    todolistId: string;
    titleValueTodo: string;
    changeFilterTasksStatus: (value: FilterValuesType, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
    filterTasksStatus: FilterValuesType;
};

export function TodolistItems(props: TodolistItems) {
    const {
        todolistId,
        titleValueTodo,
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
    const handleChangeTodolistTitle = (titleTasks: string) => {
        changeTodolistTitle(todolistId, titleTasks);
    };

    const handleRemoveTask = (taskId: string) => {
        dispatch(removeTask(taskId, todolistId));
    };

    const handleSwitchingTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatus(taskId, newIsDoneValue, todolistId));
    };

    const handleChangeTaskTitle = (taskId: string, newValue: string) => {
        dispatch(changeTaskTitle(taskId, newValue, todolistId));
    };
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
                    <EditableSpanValueTaskOrTodolist valueTitleItem={titleValueTodo}
                                                     handleOnChangeValueTitleTodoOrTasks={handleChangeTodolistTitle}/>
                    <Button onClick={handeRemoveTodolist} buttonSize={'small'} buttonVariations={'icons'}>
                        <Icon Svg={TrashIcon} width={18} height={18}/>
                    </Button>
                </div>
            </div>
            <div>
                <TodosListHeaderControls addItemTodoOrTasks={handleAddTask} ButtonSize={'small'}
                                         placeholderForInputElements={'Write your task'} ButtonVariations={'secondary'}
                                         titleValueAddItem={titleTasks} setTitleValueAddItem={setTitleTasks}
                                         inputSize={"small"}/>
            </div>
            <div className={style.todolistsItems}>
                {filterTasksForTodolist.map(task => (
                    <div key={task.id} className={`${style.tasksContainer} ${task.isDone ? style.completedTask : ""}`}>
                        <div className={style.todolistsItemsIcons}>
                            <Checkbox checked={task.isDone}
                                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleSwitchingTaskStatus(task.id, e.currentTarget.checked)}/>
                            <div className={style.editTask}>
                                <EditableSpanValueTaskOrTodolist valueTitleItem={task.title}
                                                                 handleOnChangeValueTitleTodoOrTasks={(newValue: string) => handleChangeTaskTitle(task.id, newValue)}/>
                                <Button onClick={() => handleRemoveTask(task.id)} buttonSize={'small'}
                                        buttonVariations={'icons'}>
                                    <Icon Svg={TrashIcon} width={18} height={18}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
