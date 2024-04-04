import React, {ChangeEvent, useState,MouseEvent} from 'react';
import style from "./modalAddTodoStyles.module.scss"
import {Button} from "../../button/Button";
import {createPortal} from "react-dom";
import {InputDisplayForAddTaskOrTodo} from "../../manipulationsWithTasks/InputDisplayForAddTaskOrTodo";
import classNames from "classnames";
import {usePortal} from "../../../hooks/useCreatePortal";

type ModalAddTodoProps = {
    isActiveModalAddTodo?: boolean
    setIsActiveModalAddTodo?: (active?: boolean) => void
    cancelText: string
    okText: string
    handleAddTodo: (title: string) => void
}
export const ModalAddTodo: React.FC<ModalAddTodoProps> = (props) => {
    const {
        isActiveModalAddTodo,
        setIsActiveModalAddTodo,
        cancelText,
        okText,
        handleAddTodo,
    } = props
    const [titleValueTodo, setTitleValueTodo] = useState("")
    const [displayValueTitleTodo, setDisplayValueTitleTodo] = useState("New Note");
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValueTodo(e.target.value);
        setDisplayValueTitleTodo(e.target.value || "NEW NOTE");
    }
    const onAddTodo  = () => {
        if (titleValueTodo.trim()) {
            handleAddTodo(titleValueTodo);
            setTitleValueTodo("");
        }
        setIsActiveModalAddTodo?.(false)
    }

    const handleIsActiveModalAddTodo = () => setIsActiveModalAddTodo?.(false)
    const handleStopPropagationViewAddingTodoModal =(e:MouseEvent<HTMLDivElement>) => e.stopPropagation()

    const modalAddTodoStyleClass = classNames(style.container, {
        [style.active]: isActiveModalAddTodo
    });
    const portalAddModalTodo = usePortal("modalAddTodo");
    return createPortal(
        <div className={modalAddTodoStyleClass} onClick={handleIsActiveModalAddTodo}>
            <div className={style.container__content} onClick={handleStopPropagationViewAddingTodoModal}>
                <div className={style.contEntInner}>
                    <div className={style.text__clue__container}>
                        <span className={style.text__clue}>{displayValueTitleTodo}</span>
                    </div>
                    <InputDisplayForAddTaskOrTodo onChange={handleInputChange}
                                                  value={titleValueTodo}
                                                  placeholder={"Input your note..."} inputSize={"extraLarge"}/>
                </div>
                <div className={style.addingTodoAndCloseModalButtons}>
                    <Button onClick={handleIsActiveModalAddTodo} buttonSize={"extraLarge"}>
                        {okText}
                    </Button>
                    <Button onClick={onAddTodo } buttonSize={"extraLarge"}>
                        {cancelText}
                    </Button>
                </div>
            </div>
        </div>, portalAddModalTodo)
};


