import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./headerStandStyle.module.scss"
import {useTheme} from "../../hooks/useTheme";
import {ModalAddTasks} from "../modals/modalAddTask/ModalAddTasks";
import {Input} from "../manipulationsWithTasks/Input";
import {FilterValuesType} from "../todolist/Todolist";
import {Icon} from "../svg/SvgLoader";
import SwitchToDark from "/src/img/VectorLight.svg"
import SwitchToLight from "/src/img/VectorDark.svg"
import Add from "/src/img/Add.svg"
import {FilterSelectTaskStatus} from "./FilterSelectTaskStatus";
import {Button, buttonSizeToClassNameMap, buttonVariantToClassNameMap} from "../button/Button";

type ToggleFunction = (isShake: boolean) => void;

type HeaderStand = {
    addItem: (title: string) => void;
    withSelectTasksStatus?: boolean;
    changeFilterTasksStatus?: (value: FilterValuesType) => void;
    withSwitchTheme?: boolean;
    toggle?: ToggleFunction;
    isShake?: boolean;
    className?: string;
    placeholder: string;
    isModalVisibleAddTask?: boolean | undefined;
    setIsModalVisibleAddTask?: ((isModalVisibleAddTask?: boolean | undefined) => void) | undefined;
    withErrorModal?: boolean
    setWithErrorModal?: (withErrorModal: boolean) => void
    size: buttonSizeToClassNameMap
    variant: buttonVariantToClassNameMap;
    titleValueAddItem: string
    setTitleValueAddItem: (titleValueAddItem: string) => void
}

export function HeaderControls(props: HeaderStand) {
    let [error, setError] = useState(false)
    const {isDark, setIsDark} = useTheme()
    const addTodoItemAndTasks = () => {
        if (props.titleValueAddItem.trim() !== "") {
            props.addItem(props.titleValueAddItem);
            props.setTitleValueAddItem("");
        } else {
            setError(true);
            startShake();
            props.setIsModalVisibleAddTask && props.setIsModalVisibleAddTask(true);
        }
    }
    const startShake = () => {
        props.toggle?.(true);
        setTimeout(() => {
            props.toggle?.(false);
        }, 500);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitleValueAddItem(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === "Enter") {
            addTodoItemAndTasks();
        }
    }
    const inputClassName = `${s.header} ${props.isShake ? s.shake : ""} ${isDark ? s.switchThemeDark : s.switchThemeLight} `
    const iconSwitchTheme = isDark ? SwitchToLight : SwitchToDark
    const switchTheme = () => setIsDark ? setIsDark(!isDark) : null
    return (
        <div>
            <div
                className={inputClassName}>
                <Input value={props.titleValueAddItem}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       placeholder={props.placeholder}
                       errorText={"Input have little symbol"}
                       isError={error}
                       isShaking={true}
                       size={props.size}
                />
                {
                    props.withSelectTasksStatus ?
                        <FilterSelectTaskStatus onChange={props.changeFilterTasksStatus || (() => {
                        })}/> : null
                }
                <ModalAddTasks isActiveModalAddTodo={!!props.isModalVisibleAddTask}
                               setIsActiveModalAddTodo={props.setIsModalVisibleAddTask}
                               cancelText={"Apply"} okText={"Cancel"} addItem={props.addItem}/>
                <Button onClick={addTodoItemAndTasks} size={"large"} variant={props.variant}>
                    <Icon Svg={Add} width={20} height={20}/>
                </Button>
                {props.withSwitchTheme ?
                    <Button onClick={switchTheme} size={"large"} variant={undefined}>
                        <Icon Svg={iconSwitchTheme} width={20} height={20}/>
                    </Button> : null}
            </div>
        </div>);
}
