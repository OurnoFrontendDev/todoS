import React, {ChangeEvent, KeyboardEvent} from 'react';
import style from "./todosListHeaderControlsStyle.module.scss"
import {useTheme} from "../../hooks/useTheme";
import {ModalAddTodo} from "../modals/modalAddTask/ModalAddTodo";
import {InputDisplayForTaskOrTodo, InputSize} from "../manipulationsWithTasks/InputDisplayForTaskOrTodo";
import {Icon} from "../svg/SvgLoader";
import SwitchToDarkIcon from "/src/img/VectorLight.svg"
import SwitchToLightIcon from "/src/img/VectorDark.svg"
import AddIcon from "/src/img/Add.svg"
import {FilterSelectTaskStatus, FilterValuesType} from "./FilterSelectTaskStatusProps";
import {Button, ButtonSize, ButtonVariations} from "../button/Button";
import classNames from "classnames";

type ToggleFunction = (isStartShakeElementsInputOrToggle: boolean) => void;

type TodosListHeaderControlsProps = {
    addItemTodoOrTasks: (title: string) => void;
    withFilterSelectTaskStatus?: boolean;
    handleChangeValueFilterTodo?: (value?: FilterValuesType) => void;
    withSwitchTheme?: boolean;
    setIsStartShakeElementsInputOrToggle?: ToggleFunction;
    isStartShakeElementsInputOrToggle?: boolean;
    className?: string;
    placeholderForInputElements: string;
    isModalVisibleAddTask?: boolean ;
    setIsModalVisibleAddTask?: (isModalVisibleAddTask?: boolean ) => void;
    withErrorModal?: boolean
    ButtonSize: ButtonSize
    ButtonVariations: ButtonVariations;
    titleValueAddItemTodoOrTasks: string
    setTitleValueAddItemTodoOrTasks: (titleValueAddItemTodoOrTasks: string) => void
    inputSize:InputSize
}
export const TodosListHeaderControls: React.FC<TodosListHeaderControlsProps> = (props) => {
    const {
        addItemTodoOrTasks,
        withFilterSelectTaskStatus,
        handleChangeValueFilterTodo,
        withSwitchTheme,
        setIsStartShakeElementsInputOrToggle,
        isStartShakeElementsInputOrToggle,
        placeholderForInputElements,
        isModalVisibleAddTask,
        setIsModalVisibleAddTask,
        ButtonSize,
        setTitleValueAddItemTodoOrTasks,
        ButtonVariations,
        titleValueAddItemTodoOrTasks,
        inputSize
    }: TodosListHeaderControlsProps = props;

    const {isDark, setIsDark} = useTheme()
    const addItemTodoOrTaskCallBack = () => {
        if (titleValueAddItemTodoOrTasks.trim() !== "") {
            addItemTodoOrTasks(titleValueAddItemTodoOrTasks);
            setTitleValueAddItemTodoOrTasks("");
        } else {
            handleStartShakeElementsInputOrToggle();
            setIsModalVisibleAddTask?.(true)
        }
    }
    const handleStartShakeElementsInputOrToggle = () => {
        setIsStartShakeElementsInputOrToggle?.(true);
        setTimeout(() => {
            setIsStartShakeElementsInputOrToggle?.(false);
        }, 500);
    };
    const onChangeHandlerValueAddItemTodoOrTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValueAddItemTodoOrTasks(e.currentTarget.value)
    }
    const onKeyPressHandlerItemInputValueTodoOrTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemTodoOrTaskCallBack();
        }
    }
    const inputClassName = classNames(
        style.header,
        {[style.shake]: isStartShakeElementsInputOrToggle},
        isDark ? style.switchThemeDark : style.switchThemeLight
    )

    const iconSwitchTheme = isDark ? SwitchToLightIcon : SwitchToDarkIcon
    const switchTheme = () => setIsDark ? setIsDark(!isDark) : null

    return (
        <div className={inputClassName}>
            <InputDisplayForTaskOrTodo value={titleValueAddItemTodoOrTasks}
                                       handleOnChangeValueTitleTodoOrTasksOfInput={onChangeHandlerValueAddItemTodoOrTask}
                                       handleOnKeyDownValueTitleTodoOrTasksOfInput={onKeyPressHandlerItemInputValueTodoOrTask}
                                       placeholderForInput={placeholderForInputElements}
                                       inputSize={inputSize}
            />
            {
                withFilterSelectTaskStatus && (<FilterSelectTaskStatus onChange={handleChangeValueFilterTodo}/>)
            }
            <ModalAddTodo isActiveModalAddTodo={!!isModalVisibleAddTask}
                          setIsActiveModalAddTodo={setIsModalVisibleAddTask}
                          cancelText={"Apply"} okText={"Cancel"} handlerAddTodo={addItemTodoOrTasks}/>
            <Button onClick={addItemTodoOrTaskCallBack} buttonSize={ButtonSize} buttonVariations={ButtonVariations}>
                <Icon Svg={AddIcon} width={20} height={20}/>
            </Button>
            {withSwitchTheme && (
                <Button onClick={switchTheme} buttonSize={"large"} buttonVariations={undefined}>
                    <Icon Svg={iconSwitchTheme} width={20} height={20}/>
                </Button>)}
        </div>
    );
}
