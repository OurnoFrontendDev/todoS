import React, {useEffect, useRef, useState} from 'react';
import s from "./toglerStyle.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {deleteAllTasks} from "../../state/tasks-reducer";
import {RootState, useAppSelector} from "../../state/store";
import {TasksStateType, TodolistType} from "../todolist/Todolist";
import {ModalAddTasks} from "../modals/modalAddTask/ModalAddTasks";

type ToggleType = {
    Toggle: (isShake: boolean) => void
    modalActiveAddTask: boolean
    setModalActiveAddTask: (modalActiveAddTask: boolean) => void
    errorModal: boolean
    setErrorModal: (errorModal: boolean) => void
    titleValue: string
}
//Если нет тасок, то у тоглера класс shake,
export const DeleteTasksToggle = (props: ToggleType) => {
    const dispatch = useDispatch()
    const tasks = useAppSelector(state => state.tasks.todos)// из стора таски
    const [isChecked, setIsChecked] = useState(false);//Состояние отката кружка(span)
    const [shake, sethake] = useState(false)//состояние анимации span
    const deletedTotal = useAppSelector((state) => state.tasks.deletedTotal);
    const isEmptyTasks = Object.keys(tasks).length === 0
    const deleteHandler = () => {
        if (isEmptyTasks) {
            props.Toggle(true);
            props.setModalActiveAddTask(true);
            sethake(true);
            setTimeout(() => {
                sethake(false);
                props.Toggle(false);
            }, 500);
        } else if (props.titleValue.trim() === "" && deletedTotal && deletedTotal > 0) {
            sethake(true);
            setTimeout(() => {
                props.setErrorModal(true);
            }, 100);
        } else  {
            setIsChecked(true);
            setTimeout(() => {
                setIsChecked(false);
            }, 100);
            dispatch(deleteAllTasks());
        }
    }

    return (
        <div className={s.container}>
            <label>
                <input type="checkbox" className={` ${s.checkedToggle} ${s.inputToggle}`} checked={isChecked}/>
                <span className={`${s.button} ${shake ? s.shake : ""}`} onClick={deleteHandler}></span>
            </label>
        </div>
    );
};
