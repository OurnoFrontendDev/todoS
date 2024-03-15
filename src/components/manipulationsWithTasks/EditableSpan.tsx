import React, {ChangeEvent, useState} from 'react';
import s from "/src/components/manipulationsWithTasks/EditableSpan.module.scss"
import {UniversalButton} from "../button/UniversalButton";
import {Icon} from "../svg/SvgLoader";
import Pencil from '/src/img/PencilEdit.svg'

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <>
            {editMode
                ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
                : <span onDoubleClick={activateEditMode} className={s.editTasktitle}>{props.value}</span>
            }
            <UniversalButton callBack={() => setEditMode(true)} size={"small"} level={"icons"}>
                <Icon Svg={Pencil} width={15} height={15}/>
            </UniversalButton>
        </>
    );
}
