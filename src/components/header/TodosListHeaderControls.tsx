import React, {ChangeEvent, KeyboardEvent} from 'react';
import style from "./todosListHeaderControlsStyle.module.scss"
import {useTheme} from "../../hooks/useTheme";
import {ModalAddTodo} from "../modals/modalAddTask/ModalAddTodo";
import {InputDisplayForAddTaskOrTodo, InputSize} from "../manipulationsWithTasks/InputDisplayForAddTaskOrTodo";
import {Icon} from "../svg/SvgLoader";
import SwitchToDarkIcon from "/src/img/LightModeIcon.svg"
import SwitchToLightIcon from "/src/img/DarkModeIcon.svg"
import AddTodoOrTaskIcon from "/src/img/AddTodoOrTaskIcon.svg"
import {FilterSelectTaskStatus, FilterValuesType} from "./FilterSelectTaskStatus";
import {Button, ButtonSize, ButtonVariant} from "../button/Button";
import classNames from "classnames";

type ToggleStartingShakingInputOrToggle = (isStartShakeElementsInputOrToggle: boolean) => void;

type TodosListHeaderControls = {
    addTodoOrTodoList: (title: string) => void;
    withFilterSelectTaskStatus?: boolean;
    handleChangeFilterTaskStatus?: (value?: FilterValuesType) => void;
    withSwitchTheme?: boolean;
    setIsStartShakingInputOrToggle?: ToggleStartingShakingInputOrToggle;
    isStartShakingInputOrToggle?: boolean;
    className?: string;
    inputPlaceholder: string;
    isModalVisibleAddTask?: boolean;
    setIsModalVisibleAddTask?: (isModalVisibleAddTask?: boolean) => void;
    withErrorModal?: boolean
    buttonSize: ButtonSize
    titleValueAddItemTodoOrTasks: string
    setTitleValueAddItemTodoOrTasks: (titleValueAddItemTodoOrTasks: string) => void
    inputSizeAddTodoOrTask: InputSize
    buttonVariant?:ButtonVariant
    classNameForButton?:string
}
export const TodosListHeaderControls: React.FC<TodosListHeaderControls> = (props) => {
    const {
        addTodoOrTodoList,
        withFilterSelectTaskStatus,
        handleChangeFilterTaskStatus,
        withSwitchTheme,
        setIsStartShakingInputOrToggle,
        isStartShakingInputOrToggle,
        inputPlaceholder,
        isModalVisibleAddTask,
        setIsModalVisibleAddTask,
        buttonSize,
        setTitleValueAddItemTodoOrTasks,
        titleValueAddItemTodoOrTasks,
        inputSizeAddTodoOrTask,
        buttonVariant,
        classNameForButton
    } = props;

    const {isDark, setIsDark} = useTheme()

    const handleAddTodoOrTask = () => {
        if (titleValueAddItemTodoOrTasks.trim() !== "") {
            addTodoOrTodoList(titleValueAddItemTodoOrTasks);
            setTitleValueAddItemTodoOrTasks("");
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
        setTitleValueAddItemTodoOrTasks(e.currentTarget.value)
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
        {[style.switchThemeDark ]: isDark},
        {[style.switchThemeLight]: !isDark}
    );

    const switchTheme = () => setIsDark ? setIsDark(!isDark) : null
    console.log("sdfsdf",buttonVariant)
    return (
        <div className={inputClassName}>
            <InputDisplayForAddTaskOrTodo value={titleValueAddItemTodoOrTasks}
                                          onChange={onChangeInputValueAddTodoOrTask}
                                          onKeyDown={onKeyPressInputAddTodoOrTask}
                                          placeholder={inputPlaceholder}
                                          inputSize={inputSizeAddTodoOrTask}
            />
            {
                withFilterSelectTaskStatus && (<FilterSelectTaskStatus onChange={handleChangeFilterTaskStatus}/>)
            }
            <ModalAddTodo isActiveModalAddTodo={!!isModalVisibleAddTask}
                          setIsActiveModalAddTodo={setIsModalVisibleAddTask}
                          cancelText={"Apply"} okText={"Cancel"} handleAddTodo={addTodoOrTodoList}/>
            <Button onClick={handleAddTodoOrTask} buttonSize={buttonSize} className={classNameForButton} buttonVariant={buttonVariant}>
                <Icon Svg={AddTodoOrTaskIcon} width={20} height={20}/>
            </Button>
            {withSwitchTheme && (
                <Button onClick={switchTheme} buttonSize={"large"}>
                    <Icon Svg={iconSwitchTheme} width={20} height={20}/>
                </Button>)}
        </div>
    );
}
