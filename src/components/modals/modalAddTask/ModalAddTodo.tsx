import React, {ChangeEvent, useState} from 'react';
import style from "./modalAddTodoStyles.module.scss"
import {Button} from "../../button/Button";
import {createPortal} from "react-dom";
import {InputDisplayForTaskOrTodo} from "../../manipulationsWithTasks/InputDisplayForTaskOrTodo";
import classNames from "classnames";
import {usePortal} from "../../../hooks/useCreatePortal";

type ModalAddTodoProps = {
    isActiveModalAddTodo?: boolean
    setIsActiveModalAddTodo?: (active?: boolean) => void
    cancelText: string
    okText: string
    handlerAddTodo: (title: string) => void
    toggle?: (isShake: boolean) => void
}
export const ModalAddTodo: React.FC<ModalAddTodoProps> = (props) => {
    const {isActiveModalAddTodo,
        setIsActiveModalAddTodo,
        cancelText,
        okText,
        handlerAddTodo,
        toggle} = props
    const [titleValueTodo, setTitleValueTodo] = useState("")
    const [displayValueTitleTodo, setDisplayValueTitleTodo] = useState("New Note");
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValueTodo(e.target.value);
        setDisplayValueTitleTodo(e.target.value || "NEW NOTE");
    }
    const onAddTodo = () => {
        if (titleValueTodo.trim() !== "") {
            handlerAddTodo(titleValueTodo);
            setTitleValueTodo("");
        } else {
            handleStartShake();
        }
        setIsActiveModalAddTodo?.(false)
    }
    const handleStartShake = () => {
        toggle?.(true);
        setTimeout(() => {
            toggle?.(false);
        }, 500);
    };
    const activeModalAddTodo = () => setIsActiveModalAddTodo?.(false)

    const modalAddTodoStyleClass = classNames(style.modal, {
        [style.active]: isActiveModalAddTodo
    });
    const portalAddModalTodo = usePortal("modalAddTodo");
    return createPortal(
        <div className={modalAddTodoStyleClass} onClick={activeModalAddTodo}>
            <div className={style.modal__content} onClick={e => e.stopPropagation()}>
                <div className={style.contantInner}>
                    <div className={style.text__clue__container}>
                        <span className={style.text__clue}>{displayValueTitleTodo}</span>
                    </div>
                    <InputDisplayForTaskOrTodo handleOnChangeValueTitleTodoOrTasksOfInput={handleInputChange}
                                               value={titleValueTodo}
                                               placeholderForInput={"Input your note..."} inputSize={"extraLarge"}/>
                </div>
                <div className={style.buttons}>
                    <Button onClick={activeModalAddTodo} buttonSize={"extraLarge"}>
                        {okText}
                    </Button>
                    <Button onClick={onAddTodo} buttonSize={"extraLarge"}>
                        {cancelText}
                    </Button>
                </div>
            </div>
        </div>, portalAddModalTodo)
};

