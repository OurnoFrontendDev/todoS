import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from "/src/components/manipulationsWithTasks/inputStyle.module.scss"
import classNames from "classnames";
type InputSize = "extraLarge" | "large" | "small"
type UniversalInputProps = {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string
    errorText?: string
    isError?: boolean
    isShaking?: boolean
    className?: string
    size: InputSize
}

export const Input: React.FC<UniversalInputProps> = (props) => {
    const inputSizeToClassNameMap: Record<UniversalInputProps["size"], string> = {
        extraLarge: s.extraLargeInput,
        large: s.largeInput,
        small: s.smallInput
    }
    const classNamesInput= classNames(props.className, s.input, inputSizeToClassNameMap[props.size])
    return (
        <div><input
            type="text"
            value={props.value}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            placeholder={props.placeholder}
            className={classNamesInput}
        />
        </div>
    );
};

