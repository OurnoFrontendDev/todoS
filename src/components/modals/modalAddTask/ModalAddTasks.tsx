import React, {ChangeEvent, ReactNode, useState} from 'react';
import s from "./modal.module.scss"
import Input from "../../manipulationsWithTasks/Input";
import {Button} from "../../button/Button";
import ReactDOM from "react-dom";

type ModalProps = {
    isActiveModalAddTodo?: boolean | undefined
    setIsActiveModalAddTodo?: (active: boolean | undefined) => void
    cancelText: string
    okText: string
    children?: ReactNode
    addItem: (title: string) => void
    toggle?: (isShake: boolean) => void
}
export const ModalAddTasks = (props: ModalProps) => {
    const [titleTodo, setTitleTitleTodo] = useState("")
    const [displayValueTitleTodo, setDisplayValueTitleTodo] = useState("New Note");
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleTitleTodo(e.target.value);
        setDisplayValueTitleTodo(e.target.value || "NEW NOTE");
    }
    const addItemCallBack = () => {
        if (titleTodo.trim() !== "") {
            props.addItem(titleTodo);
            setTitleTitleTodo("");
        } else {
            startShake();
        }
        props.setIsActiveModalAddTodo && props.setIsActiveModalAddTodo(false)
    }
    const startShake = () => {
        props.toggle?.(true);
        setTimeout(() => {
            props.toggle?.(false);
        }, 500);
    };
    const portal = document.getElementById('portal');
    if (!portal) {
        return null;
    }
    if (!props.isActiveModalAddTodo && portal) return null
    const activeModalAddTodo = () => props.setIsActiveModalAddTodo && props.setIsActiveModalAddTodo(false)
    return (
        ReactDOM.createPortal(
            <div className={`${s.modal} ${props.isActiveModalAddTodo ? s.active : ""}`} onClick={activeModalAddTodo}>
                <div className={s.modal__content} onClick={e => e.stopPropagation()}>
                    <div className={s.contantInner}>
                        <div className={s.text__clue__container}>
                            <span className={s.text__clue}>{displayValueTitleTodo}</span>
                        </div>
                        <Input onChange={handleInputChange} value={titleTodo} placeholder={"Input your note..."}
                               size={"extraLarge"}/>
                    </div>
                    <div className={s.buttons}>
                        <Button onClick={activeModalAddTodo} size={"extraLarge"}>
                            {props.okText}
                        </Button>
                        <Button onClick={addItemCallBack} size={"extraLarge"}>
                            {props.cancelText}
                        </Button>
                    </div>
                </div>
            </div>, portal)
    );
};

