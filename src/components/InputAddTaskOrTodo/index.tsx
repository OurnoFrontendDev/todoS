import React, {ChangeEvent, KeyboardEvent} from 'react';
import style from "./styles.module.scss"
import classNames from "classnames";

export type InputSize = "extraLarge" | "large" | "small"
type InputProps = {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string
    className?: string
    size: InputSize
}

export const InputAddTaskOrTodo: React.FC<InputProps> = (props) => {
    const { size, className, ...restProps } = props;

    const inputSizeToClassNameMap: Record<InputProps["size"], string> = {
        extraLarge: style.container__extraLarge,
        large: style.container__large,
        small: style.container__small
    }
    const classNameInput = classNames(className, style.container, inputSizeToClassNameMap[size])
    return (
        <input {...restProps} className={classNameInput} />
    );
};

