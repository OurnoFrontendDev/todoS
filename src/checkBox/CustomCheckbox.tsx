import React, {ChangeEvent} from 'react';
import style from './CheckBox.module.scss';

type CustomCheckboxProps = {
    checked: boolean
    children?:React.ReactNode
    onChangeHandler:(e: ChangeEvent<HTMLInputElement>)=>void
}

export function CustomCheckbox(props: CustomCheckboxProps) {
    return (
        <label className={style.checkboxWrapper}>
            <input
                type="checkbox"
                className={style.checkboxElement}
                checked={props.checked}
                onChange={props.onChangeHandler}
            />
            <p>{props.children}</p>
        </label>
    );
}

