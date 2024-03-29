import React, {ChangeEvent, useState} from 'react';
import s from "/src/components/manipulationsWithTasks/editableSpanStyle.module.scss"
import {Button} from "../button/Button";
import {Icon} from "../svg/SvgLoader";
import PencilIcon from '/src/img/PencilEdit.svg'

type EditableSpanProps = {
    valueTitleItem: string
    handleOnChangeValueTitleTodoOrTasks: (valueTitleItem: string) => void
}

export const EditableSpanValueTaskOrTodolist:React.FC<EditableSpanProps>=(props)=> {
    const {valueTitleItem,handleOnChangeValueTitleTodoOrTasks}=props
    const [isActivationModeEditingValueTasksOrTodolist , setIsActivationModeEditingValueTasksOrTodolist ] = useState(false);
    const [itemValueTaskOrTodolistText, setItemValueTaskOrTodolistText] = useState(valueTitleItem);

    const handleToggleEdit = () => {
        setIsActivationModeEditingValueTasksOrTodolist (true);
        setItemValueTaskOrTodolistText(valueTitleItem);
    }
    const handleToggleViewMode = () => {
        setIsActivationModeEditingValueTasksOrTodolist (false);
        handleOnChangeValueTitleTodoOrTasks(itemValueTaskOrTodolistText);
    }
    const handleChangeEditTaskOrTodoText = (e: ChangeEvent<HTMLInputElement>) => {
        setItemValueTaskOrTodolistText(e.currentTarget.value)
    }
    const activationEditingModeValueTaskOrTodoText   = () => {
        setIsActivationModeEditingValueTasksOrTodolist (true)
    }
    return (
        <>
            {isActivationModeEditingValueTasksOrTodolist
                ? <input value={itemValueTaskOrTodolistText} onChange={handleChangeEditTaskOrTodoText} autoFocus onBlur={handleToggleViewMode}/>
                : <span onDoubleClick={handleToggleEdit} className={s.editTaskOrTodoTitle}>{valueTitleItem}</span>
            }
            <Button onClick={activationEditingModeValueTaskOrTodoText  } buttonSize={"small"} buttonVariations={"icons"}>
                <Icon Svg={PencilIcon} width={15} height={15}/>
            </Button>
        </>
    );
}
