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
}
export const ModalAddTodo: React.FC<ModalAddTodoProps> = (props) => {
    const {isActiveModalAddTodo,
        setIsActiveModalAddTodo,
        cancelText,
        okText,
        handlerAddTodo,
        } = props
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
        }
        setIsActiveModalAddTodo?.(false)
    }

    const handleIsActiveModalAddTodo = () => setIsActiveModalAddTodo?.(false)

    const modalAddTodoStyleClass = classNames(style.modal, {
        [style.active]: isActiveModalAddTodo
    });
    const portalAddModalTodo = usePortal("modalAddTodo");
    return createPortal(
        <div className={modalAddTodoStyleClass} onClick={handleIsActiveModalAddTodo}>
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
                    <Button onClick={handleIsActiveModalAddTodo} buttonSize={"extraLarge"}>
                        {okText}
                    </Button>
                    <Button onClick={onAddTodo} buttonSize={"extraLarge"}>
                        {cancelText}
                    </Button>
                </div>
            </div>
        </div>, portalAddModalTodo)
};

