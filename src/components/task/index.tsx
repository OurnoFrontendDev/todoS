import React, {ChangeEvent, FC} from 'react';
import style from "../task/styles.module.scss";
import {Checkbox} from "../checkbox";
import {InputTaskOrTodoListEditing} from "../InputTaskOrTodoListEditing";
import {Button} from "../button";
import {Icon} from "../svg/SvgLoader";
import DeletingTodoOrTaskIcon from "../../img/DeletingTodoOrTaskIcon.svg";

type TaskProps = {
    checked: boolean
    handleTaskCheckboxOnChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleChangeTaskTitle: (newValue: string) => void
    valueTitleTodoOrTask: string
    handleRemoveTask: () => void
}
export const Task: FC<TaskProps> = (props) => {
    const {checked, handleTaskCheckboxOnChange, valueTitleTodoOrTask, handleChangeTaskTitle, handleRemoveTask} = props
    return (
        <div className={style.todolistsItemsIcons}>
            <Checkbox checked={checked} onChange={handleTaskCheckboxOnChange}/>
            <div className={style.editTask}>
                <InputTaskOrTodoListEditing valueTitleTodoOrTask={valueTitleTodoOrTask}
                                            handleOnChangeTitleTodoOrTasks={handleChangeTaskTitle}/>
                <Button onClick={handleRemoveTask} buttonSize={'small'} buttonVariant={'icons'}>
                    <Icon Svg={DeletingTodoOrTaskIcon} width={18} height={18}/>
                </Button>
            </div>
        </div>
    );
};

