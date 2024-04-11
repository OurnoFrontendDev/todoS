import React, {ChangeEvent, KeyboardEvent} from 'react';
import style from "./style.module.scss"
import {useTheme} from "../../hooks/useTheme";
import {ModalAddTodo} from "../modalAddTask";
import {InputAddTaskOrTodo, InputSize} from "../InputAddTaskOrTodo";
import {Icon} from "../svg/SvgLoader";
import SwitchToDarkIcon from "/src/img/LightModeIcon.svg"
import SwitchToLightIcon from "/src/img/DarkModeIcon.svg"
import AddTodoOrTaskIcon from "/src/img/AddTodoOrTaskIcon.svg"
import {FilterSelectTaskStatus, FilterValuesType} from "../FilterSelectTaskStatus";
import {Button, ButtonSize, ButtonVariant} from "../button";
import classNames from "classnames";

type TodosListHeaderControlsProps = {
    addTodoOrTodoList: (title: string) => void;
    withFilterSelectTaskStatus?: boolean;
    handleChangeFilterTaskStatus?: (value?: FilterValuesType) => void;
    withSwitchTheme?: boolean;
    setIsStartShakingInputOrToggle?: (isStartShakeElementsInputOrToggle: boolean) => void;
    isStartShakingInputOrToggle?: boolean;
    className?: string;
    placeholderAddingTaskOrTodo: string;
    isModalVisibleAddTask?: boolean;
    setIsModalVisibleAddTask?: (isModalVisibleAddTask?: boolean) => void;
    withErrorModal?: boolean
    buttonSize: ButtonSize
    titleAddItemTodoOrTasks: string
    setTitleAddItemTodoOrTasks: (titleAddItemTodoOrTasks: string) => void
    inputAddingTaskOrTodo: InputSize
    buttonVariant?: ButtonVariant
    buttonClassNameAddingTaskOrTodo?: string
}
export const TodosListHeaderControls: React.FC<TodosListHeaderControlsProps> = (props) => {
    const {
        addTodoOrTodoList,
        withFilterSelectTaskStatus,
        handleChangeFilterTaskStatus,
        withSwitchTheme,
        setIsStartShakingInputOrToggle,
        isStartShakingInputOrToggle,
        placeholderAddingTaskOrTodo,
        isModalVisibleAddTask,
        setIsModalVisibleAddTask,
        buttonSize,
        setTitleAddItemTodoOrTasks,
        titleAddItemTodoOrTasks,
        inputAddingTaskOrTodo,
        buttonVariant,
        buttonClassNameAddingTaskOrTodo
    } = props;

    const {isDark, setIsDark} = useTheme()

    const handleAddTodoOrTask = () => {
        if (titleAddItemTodoOrTasks.trim() !== "") {
            addTodoOrTodoList(titleAddItemTodoOrTasks);
            setTitleAddItemTodoOrTasks("");
        } else {
            handleStartShaking();
            setIsModalVisibleAddTask?.(true)
        }
    }

    const handleStartShaking = () => {
        setIsStartShakingInputOrToggle?.(true);
        setTimeout(() => {
            setIsStartShakingInputOrToggle?.(false);
        }, 500);
    };

    const onChangeInputValueAddTodoOrTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleAddItemTodoOrTasks(e.currentTarget.value)
    }

    const onKeyPressInputAddTodoOrTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddTodoOrTask();
        }
    }

    const iconSwitchTheme = isDark ? SwitchToLightIcon : SwitchToDarkIcon

    const inputClassName = classNames(
        style.container,
        {[style.shake]: isStartShakingInputOrToggle},
        {[style.switchThemeDark]: isDark},
        {[style.switchThemeLight]: !isDark}
    );

    const handleSwitchTheme = () => setIsDark ? setIsDark(!isDark) : null
    return (
        <div className={inputClassName}>
            <InputAddTaskOrTodo value={titleAddItemTodoOrTasks}
                                onChange={onChangeInputValueAddTodoOrTask}
                                onKeyDown={onKeyPressInputAddTodoOrTask}
                                placeholder={placeholderAddingTaskOrTodo}
                                size={inputAddingTaskOrTodo}
            />
            {
                withFilterSelectTaskStatus && (<FilterSelectTaskStatus onChange={handleChangeFilterTaskStatus}/>)
            }
            <ModalAddTodo isActiveModalAddTodo={isModalVisibleAddTask}
                          setIsActiveModalAddTodo={setIsModalVisibleAddTask}
                          cancelText={"Apply"} okText={"Cancel"} handleAddTodo={addTodoOrTodoList}/>
            <Button onClick={handleAddTodoOrTask} size={buttonSize} className={buttonClassNameAddingTaskOrTodo} variant={buttonVariant}>
                <Icon Svg={AddTodoOrTaskIcon} width={20} height={20}/>
            </Button>
            {withSwitchTheme && (
                <Button onClick={handleSwitchTheme} size={"large"}>
                    <Icon Svg={iconSwitchTheme} width={20} height={20}/>
                </Button>)}
        </div>
    );
}
