import React, {ChangeEvent, useState} from 'react';
import s from "/src/components/manipulationsWithTasks/editableSpanStyle.module.scss"
import {Button} from "../button/Button";
import {Icon} from "../svg/SvgLoader";
import PencilEditTodoOrTaskIcon from '/src/img/PencilEditTodoOrTaskIcon.svg'

type EditableSpanProps = {
    valueTitleTodoOrTask: string
    handleOnChangeTitleTodoOrTasks: (valueTitleItem: string) => void
}

export const InputTaskOrTodoListEditing: React.FC<EditableSpanProps> = (props) => {
    const {valueTitleTodoOrTask, handleOnChangeTitleTodoOrTasks} = props
    const [isEditModeTasksOrTodolist, setIsEditModeTasksOrTodolist] = useState(false);
    const [valueTaskOrTodolistText, setValueTaskOrTodolistText] = useState(valueTitleTodoOrTask);

    const handleToggleEdit = () => {
        setIsEditModeTasksOrTodolist(true);
        setValueTaskOrTodolistText(valueTitleTodoOrTask);
    }
    const handleToggleViewMode = () => {
        setIsEditModeTasksOrTodolist(false);
        handleOnChangeTitleTodoOrTasks(valueTaskOrTodolistText);
    }
    const handleChangeEditInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValueTaskOrTodolistText(e.currentTarget.value)
    }
    const handleSetIsActivationEditingMode = () => {
        setIsEditModeTasksOrTodolist(true)
    }
    return (
        <>
            {isEditModeTasksOrTodolist
                ? <input value={valueTaskOrTodolistText} onChange={handleChangeEditInputValue} autoFocus
                         onBlur={handleToggleViewMode}/>
                : <span onDoubleClick={handleToggleEdit}
                        className={s.editTaskOrTodoTitle}>{valueTitleTodoOrTask}</span>
            }
            <Button onClick={handleSetIsActivationEditingMode} buttonSize={"small"} buttonVariant={"icons"}>
                <Icon Svg={PencilEditTodoOrTaskIcon} width={15} height={15}/>
            </Button>
        </>
    );
}
