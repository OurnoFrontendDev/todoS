// InputComponent.tsx

import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "/src/components/manipulationsWithTasks/inputStyle.module.scss"
import classNames from "classnames";

type UniversalInputProps = {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string
    errorText?: string
    isError?: boolean
    isShaking?: boolean
    className?: string
    size: "extraLarge" | "large" | "small"
}

const InputComponent: React.FC<UniversalInputProps> = (props) => {
    const inputSizeToClassNameMap: Record<UniversalInputProps["size"], string> = {
        extraLarge: s.extraLargeInput,
        large: s.largeInput,
        small: s.smallInput
    }
    return (
        <div><input
            type="text"
            value={props.value}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            placeholder={props.placeholder}
            className={classNames(props.className, s.input, inputSizeToClassNameMap[props.size])}
        />
        </div>
    );
};
export default InputComponent;
