import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./headerStandStyle.module.scss"
import useTheme from "../../hooks/useTheme";
import {ModalAddTasks} from "../modals/modalAddTask/ModalAddTasks";
import Input from "../manipulationsWithTasks/Input";
import FilterSelect from "./FilterSelect";
import {UniversalButton} from "../button/UniversalButton";
import {FilterValuesType} from "../todolist/Todolist";
import {Icon} from "../svg/SvgLoader";
import VectorLight from "/src/img/VectorLight.svg"
import VectorDark from "/src/img/VectorDark.svg"
import Add from "/src/img/Add.svg"


type ToggleFunction = (isShake: boolean) => void;

type HeaderStand = {
    addItem: (title: string) => void;
    withSelect?: boolean;
    changeFilter?: (value: FilterValuesType) => void;
    withSwitchTheme?: boolean;
    Toggle?: ToggleFunction;
    isShake?: boolean;
    className?: string;
    placeholder: string;
    modalActiveAddTask?: boolean;
    setModalActiveAddTask?: ((modalActiveAddTask: boolean) => void) | undefined;
    errorModal?: boolean
    setErrorModal?: ((errorModal: boolean) => void) | undefined
    size: "small" | "extraLarge" | "large";
    level: "primary" | "secondary";
    titleValue: string
    setTitleValue: (titleValue: string) => void
}

export function HeaderStand(props: HeaderStand) {
    // let [title, setTitle] = useState("")

    let [error, setError] = useState<boolean>(false)
    const {isDark, setIsDark} = useTheme()

    const addItemCallback = () => {
        if (props.titleValue.trim() !== "") {
            props.addItem(props.titleValue);
           props.setTitleValue("");
        } else {
            setError(true);
            startShake();
            props.setModalActiveAddTask && props.setModalActiveAddTask(true);
        }
    }
    const startShake = () => {
        props.Toggle?.(true);
        setTimeout(() => {
            props.Toggle?.(false);
        }, 500);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitleValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === "Enter") {
            addItemCallback();
        }
    }
    return (
        <div>
            <div
                className={`${s.header} ${props.isShake ? s.shake : ""} ${isDark ? s.switchThemeDark : s.switchThemeLight} `}>
                <Input value={props.titleValue}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       placeholder={props.placeholder}
                       errorText={"Input have little symbol"}
                       isError={error}
                       isShaking={true}
                       size={props.size}
                />
                {
                    props.withSelect ? <FilterSelect onChange={props.changeFilter || (() => {
                    })}/> : null
                }
                <ModalAddTasks active={!!props.modalActiveAddTask} setActive={props.setModalActiveAddTask || (() => {
                })}
                               cancelText={"Apply"} OkText={"Cancel"} addItem={props.addItem}/>
                <UniversalButton callBack={addItemCallback} size={"large"} level={props.level}>
                    <Icon Svg={Add} width={20} height={20}/>
                </UniversalButton>
                {props.withSwitchTheme ?
                    <UniversalButton callBack={() => setIsDark ? setIsDark(!isDark) : null} size={"large"}
                                     level={undefined}>
                        <Icon Svg={isDark ? VectorDark : VectorLight} width={20} height={20}/>
                    </UniversalButton> : null}
            </div>
        </div>);
}
