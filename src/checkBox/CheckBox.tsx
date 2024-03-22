import React, {ChangeEvent} from 'react';
import style from './CheckBox.module.scss';

type CustomCheckboxProps = {
    checked: boolean
    children?:React.ReactNode
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void
}

export function CheckBox(props: CustomCheckboxProps) {
    return (
        <label className={style.checkboxContainer}>
            <input
                type="checkbox"
                className={style.checkbox}
                checked={props.checked}
                onChange={props.onChange}
            />
            <span>{props.children}</span>
        </label>
    );
}

