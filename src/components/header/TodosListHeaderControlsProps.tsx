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
    isShake?: boolean;
    className?: string;
    placeholderForInputElements: string;
    isModalVisibleAddTask?: boolean ;
    setIsModalVisibleAddTask?: (isModalVisibleAddTask?: boolean ) => void;
    withErrorModal?: boolean
    ButtonSize: ButtonSize
    ButtonVariations: ButtonVariations;
    titleValueAddItem: string
    setTitleValueAddItem: (titleValueAddItem: string) => void
    inputSize:InputSize
}
export const TodosListHeaderControls: React.FC<TodosListHeaderControlsProps> = (props) => {
    const {
        addItemTodoOrTasks,
        withFilterSelectTaskStatus,
        handleChangeValueFilterTodo,
        withSwitchTheme,
        setIsStartShakeElementsInputOrToggle,
        isShake,
        placeholderForInputElements,
        isModalVisibleAddTask,
        setIsModalVisibleAddTask,
        ButtonSize,
        setTitleValueAddItem,
        ButtonVariations,
        titleValueAddItem,
        inputSize
    }: TodosListHeaderControlsProps = props;

    const {isDark, setIsDark} = useTheme()
    const addItemTodoOrTaskCallBack = () => {
        if (titleValueAddItem.trim() !== "") {
            addItemTodoOrTasks(titleValueAddItem);
            setTitleValueAddItem("");
        } else {
            startShake();
            setIsModalVisibleAddTask?.(true)
        }
    }
    const startShake = () => {
        setIsStartShakeElementsInputOrToggle?.(true);
        setTimeout(() => {
            setIsStartShakeElementsInputOrToggle?.(false);
        }, 500);
    };
    const onChangeHandlerValueAddItem = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValueAddItem(e.currentTarget.value)
    }
    const onKeyPressHandlerItemInputValue = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemTodoOrTaskCallBack();
        }
    }
    const inputClassName = classNames(
        style.header,
        {[style.shake]: isShake},
        isDark ? style.switchThemeDark : style.switchThemeLight
    )

    const iconSwitchTheme = isDark ? SwitchToLightIcon : SwitchToDarkIcon
    const switchTheme = () => setIsDark ? setIsDark(!isDark) : null

    return (
        <div className={inputClassName}>
            <InputDisplayForTaskOrTodo value={titleValueAddItem}
                                       handleOnChangeValueTitleTodoOrTasksOfInput={onChangeHandlerValueAddItem}
                                       handleOnKeyDownValueTitleTodoOrTasksOfInput={onKeyPressHandlerItemInputValue}
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
