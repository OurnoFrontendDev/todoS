import React, {ChangeEvent, KeyboardEvent} from 'react';
import style from "./inputStyles.module.scss"
import classNames from "classnames";

export type InputSize = "extraLarge" | "large" | "small"
type InputProps = {
    value?: string;
    handleOnChangeValueTitleTodoOrTasksOfInput?: (event: ChangeEvent<HTMLInputElement>) => void;
    handleOnKeyDownValueTitleTodoOrTasksOfInput?: (event: KeyboardEvent<HTMLInputElement>) => void;
    placeholderForInput?: string
    className?: string
    inputSize: InputSize
}

export const InputDisplayForTaskOrTodo: React.FC<InputProps> = (props) => {
    const {
        value,
        handleOnChangeValueTitleTodoOrTasksOfInput,
        handleOnKeyDownValueTitleTodoOrTasksOfInput,
        placeholderForInput,
        className,
        inputSize
    } = props
    const inputSizeToClassNameMap: Record<InputProps["inputSize"], string> = {
        extraLarge: style.extraLargeInput,
        large: style.largeInput,
        small: style.smallInput
    }
    const classNamesInput = classNames(className, style.input, inputSizeToClassNameMap[inputSize])
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={handleOnChangeValueTitleTodoOrTasksOfInput}
                onKeyDown={handleOnKeyDownValueTitleTodoOrTasksOfInput}
                placeholder={placeholderForInput}
                className={classNamesInput}
            />
        </div>
    );
};

