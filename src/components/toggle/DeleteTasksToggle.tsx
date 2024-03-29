import React, {useState} from 'react';
import style from "./toglerStyles.module.scss"
import {useDispatch} from "react-redux";
import {deleteAllTasks} from "../../state/tasks-reducer";
import {useAppSelector} from "../../state/store";
import classNames from "classnames";

type DeleteTasksToggleProps = {
    toggleIsShackingToggle: (isShake: boolean) => void
    setIsModalShowActiveAddTask: (isModalShowActiveAddTask: boolean) => void
    setIsErrorShowModal: (isErrorShowModal: boolean) => void
    titleValueInputForCondition: string
}
export const DeleteTasksToggle: React.FC<DeleteTasksToggleProps> = (props) => {
    const {
        toggleIsShackingToggle,
        setIsModalShowActiveAddTask,
        setIsErrorShowModal,
        titleValueInputForCondition
    } = props
    const dispatch = useDispatch()
    const tasks = useAppSelector(state => state.tasks.todos)
    const deletedTotal = useAppSelector((state) => state.tasks.deletedTotal);
    const isEmptyTasks = Object.keys(tasks).length === 0

    const [isChecked, setIsChecked] = useState(false);
    const [isShake, setIsShake] = useState(false)
    const handleDeleteTasks = () => {
        if (isEmptyTasks) {
           toggleIsShackingToggle(true);
            setIsModalShowActiveAddTask(true);
            setIsShake(true);
            setTimeout(() => {
                setIsShake(false);
                props.toggleIsShackingToggle(false);
            }, 500);
        } else if (titleValueInputForCondition.trim() === "" && deletedTotal && deletedTotal > 0) {
            setIsShake(true);
            setTimeout(() => {
                setIsErrorShowModal(true);
            }, 100);
        } else {
            setIsChecked(true);
            setTimeout(() => {
                setIsChecked(false);
            }, 100);
            dispatch(deleteAllTasks());
        }
    }
    const stylesForToggleInput = classNames(
        style.checkedToggle, style.inputToggle
    )
    const stylesForToggleSpan = classNames(
        style.button, {
            [style.shake]: isShake,

        }
    )
    return (
        <div className={style.container}>
            <label>
                <input type="checkbox" className={stylesForToggleInput} checked={isChecked}/>
                <span className={stylesForToggleSpan} onClick={handleDeleteTasks}></span>
            </label>
        </div>
    );
};
