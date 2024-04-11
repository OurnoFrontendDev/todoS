import React, {ChangeEvent, FC} from 'react';
import style from "../task/styles.module.scss";
import {Checkbox} from "../checkbox";
import {InputTaskOrTodoListEditing} from "../InputTaskOrTodoListEditing";
import {Button} from "../button";
import {Icon} from "../svg/SvgLoader";
import DeletingTodoOrTaskIcon from "../../img/DeletingTodoOrTaskIcon.svg";
import {TaskType} from "../../types/actionType/types";
import classNames from "classnames";

type TaskProps = {
    handleTaskCheckboxOnChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleChangeTaskTitle: (newValue: string) => void
    handleRemoveTask: () => void
} & TaskType
export const Task: FC<TaskProps> = (props) => {
    const {handleTaskCheckboxOnChange, handleChangeTaskTitle, handleRemoveTask, isDone, title, id} = props
    const taskClassName = classNames(
        style.tasksContainer,
        {
            [style.completedTask]: isDone
        }
    );
    return (
        <div key={id} className={taskClassName}>
            <Checkbox checked={isDone} onChange={handleTaskCheckboxOnChange}/>
            <div className={style.editTask}>
                <InputTaskOrTodoListEditing valueTitleTodoOrTask={title}
                                            handleOnChangeTitleTodoOrTasks={handleChangeTaskTitle}/>
                <Button onClick={handleRemoveTask} size={'small'} variant={'icons'}>
                    <Icon Svg={DeletingTodoOrTaskIcon} width={18} height={18}/>
                </Button>
            </div>
        </div>
    );
};

