import React, {useState} from 'react';
import s from "./toglerStyle.module.scss"
import {useDispatch} from "react-redux";
import {deleteAllTasks} from "../../state/tasks-reducer";
import { useAppSelector} from "../../state/store";

type ToggleType = {
    toggleActiveShackingInput: (isShake: boolean) => void
    isModalShowActiveAddTask: boolean |undefined
    setIsModalShowActiveAddTask: (isModalShowActiveAddTask: boolean) => void
    isErrorShowModal: boolean
    setIsErrorShowModal: (isErrorShowModal: boolean) => void
    titleValueInputForCondition: string
}
export const DeleteTasksToggle = (props: ToggleType) => {
    const dispatch = useDispatch()
    const tasks = useAppSelector(state => state.tasks.todos)
    const [isChecked, setIsChecked] = useState(false);
    const [isShake, setIsShake] = useState(false)
    const deletedTotal = useAppSelector((state) => state.tasks.deletedTotal);
    const isEmptyTasks = Object.keys(tasks).length === 0
    const handleDeleteTasks = () => {
        if (isEmptyTasks) {
            props.toggleActiveShackingInput(true);
            props.setIsModalShowActiveAddTask(true);
            setIsShake(true);
            setTimeout(() => {
                setIsShake(false);
                props.toggleActiveShackingInput(false);
            }, 500);
        } else if (props.titleValueInputForCondition.trim() === "" && deletedTotal && deletedTotal > 0) {
            setIsShake(true);
            setTimeout(() => {
                props.setIsErrorShowModal(true);
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
                <span className={`${s.button} ${isShake ? s.shake : ""}`} onClick={handleDeleteTasks}></span>
            </label>
        </div>
    );
};
