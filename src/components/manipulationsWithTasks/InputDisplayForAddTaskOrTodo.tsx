import React, {ChangeEvent, KeyboardEvent} from 'react';
import style from "./inputStyles.module.scss"
import classNames from "classnames";

export type InputSize = "extraLarge" | "large" | "small"
type InputProps = {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string
    className?: string
    inputSize: InputSize
}

export const InputDisplayForAddTaskOrTodo: React.FC<InputProps> = (props) => {
    const {
        value,
        onChange,
        onKeyDown,
        placeholder,
        className,
        inputSize
    } = props
    const inputSizeToClassNameMap: Record<InputProps["inputSize"], string> = {
        extraLarge: style.container__extraLarge,
        large: style.container__large,
        small: style.container__small
    }
    const classNamesInput = classNames(className, style.container, inputSizeToClassNameMap[inputSize])
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className={classNamesInput}
            />
        </div>
    );
};

