import React, {ChangeEvent, ReactNode, useState} from 'react';
import s from "./modal.module.scss"
import Input from "../../manipulationsWithTasks/Input";
import {UniversalButton} from "../../button/UniversalButton";
import useTheme from "../../../hooks/useTheme";
import ReactDOM from "react-dom";

type ModalProps = {
    active: boolean
    setActive: (active: boolean) => void
    cancelText: string
    OkText: string
    children?: ReactNode
    addItem: (title: string) => void
    size?: "small" | "large"
    Toggle?: (isShake: boolean) => void
}
export const ModalAddTasks = (props: ModalProps) => {
    const [title, setTitle] = useState("")
    const [note, setNote] = useState("New Note");
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setNote(e.target.value || "NEW NOTE");
    }
    const addItemCallBack = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            startShake();
        }
        props.setActive(false)
    }
    const startShake = () => {
        props.Toggle?.(true);
        setTimeout(() => {
            props.Toggle?.(false);
        }, 500);
    };
    const portal = document.getElementById('portal');
    if (!portal) {return null;}
    if (!props.active && portal) return null
    return (
        ReactDOM.createPortal(
            <div className={`${s.modal} ${props.active ? s.active : ""}`} onClick={() => props.setActive(false)}>
            <div className={s.modal__content} onClick={e => e.stopPropagation()}>
                <div className={s.contantInner}>
                    <div className={s.text__clue__container}>
                        <span className={s.text__clue}>{note}</span>
                    </div>
                    <Input onChange={handleInputChange} value={title} placeholder={"Input your note..."} size={"extraLarge"}/>
                </div>
                <div className={s.buttons}>
                    <UniversalButton callBack={() => {props.setActive(false)}} size={"extraLargeBT"}>
                        {props.OkText}
                    </UniversalButton>
                    <UniversalButton callBack={addItemCallBack} size={"extraLargeBT"} >
                        {props.cancelText}
                    </UniversalButton>
                </div>
            </div>
        </div>, portal)
    );
};

