import React, {ChangeEvent, useState} from 'react';
import s from "/src/components/manipulationsWithTasks/EditableSpan.module.scss"
import {Button} from "../button/Button";
import {Icon} from "../svg/SvgLoader";
import Pencil from '/src/img/PencilEdit.svg'

type EditableSpanPropsType = {
    valueTitleItem: string
    onChange: (valueTitleItem: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editModeActive, setEditModeActive] = useState(false);
    const [ValueItem, setValueItem] = useState(props.valueTitleItem);

    const handleToggleEdit = () => {
        setEditModeActive(true);
        setValueItem(props.valueTitleItem);
    }
    const handleToggleViewMode = () => {
        setEditModeActive(false);
        props.onChange(ValueItem);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValueItem(e.currentTarget.value)
    }
    const EditModeChange = () => {
        setEditModeActive(true)
    }

    return (
        <>
            {editModeActive
                ? <input value={ValueItem} onChange={changeTitle} autoFocus onBlur={handleToggleViewMode}/>
                : <span onDoubleClick={handleToggleEdit} className={s.editTasktitle}>{props.valueTitleItem}</span>
            }
            <Button onClick={EditModeChange} size={"small"} variant={"icons"}>
                <Icon Svg={Pencil} width={15} height={15}/>
            </Button>
        </>
    );
}
