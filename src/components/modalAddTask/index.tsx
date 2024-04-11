import React, {ChangeEvent, useState,MouseEvent} from 'react';
import style from "./styles.module.scss"
import {Button} from "../button";
import {createPortal} from "react-dom";
import {InputAddTaskOrTodo} from "../InputAddTaskOrTodo";
import classNames from "classnames";
import {usePortal} from "../../hooks/useCreatePortal";

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
    const handleStopPropagation =(e:MouseEvent<HTMLDivElement>) => e.stopPropagation()

    const classNameModalAddTodo = classNames(style.container, {
        [style.active]: isActiveModalAddTodo
    });
    const portalAddModalTodo = usePortal("modalAddTodo");
    return createPortal(
        <div className={classNameModalAddTodo} onClick={handleIsActiveModalAddTodo}>
            <div className={style.container_content} onClick={handleStopPropagation}>
                <div className={style.contentInner}>
                    <div className={style.text__clue__container}>
                        <span className={style.text__clue}>{displayValueTitleTodo}</span>
                    </div>
                    <InputAddTaskOrTodo onChange={handleInputChange}
                                        value={titleValueTodo}
                                        placeholder={"Input your note..."} size={"extraLarge"}/>
                </div>
                <div className={style.modalFooter}>
                    <Button onClick={handleIsActiveModalAddTodo} size={"extraLarge"}>
                        {okText}
                    </Button>
                    <Button onClick={onAddTodo } size={"extraLarge"}>
                        {cancelText}
                    </Button>
                </div>
            </div>
        </div>, portalAddModalTodo)
};


