import React, {ChangeEvent} from 'react';
import style from './styles.module.scss';

type CheckboxProps = {
    checked: boolean
    children?: React.ReactNode
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox(props: CheckboxProps) {
    const {checked, children, onChange} = props
    return (
        <label className={style.container}>
            <input
                type="checkbox"
                className={style.checkbox}
                checked={checked}
                onChange={onChange}
            />
            <span>{children}</span>
        </label>
    );
}

